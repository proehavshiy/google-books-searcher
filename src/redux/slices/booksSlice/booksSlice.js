import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { clearBooksReducer } from "./reducers/clearBooks";
// constants
// import { LSNAME_FILTER } from "../../../constants/constants";
// reducers
import { getBooksReducer } from "./reducers/getBooks";
import { setSearchQueryReducer } from "./reducers/setSearchQuery";
import { setSelectedCategoryReducer } from "./reducers/setSelectedCategory";

const API_KEY = 'AIzaSyBNyDVH2q0vYAyz4zBazhe1_P5iLDa1ScU'
const REQUEST_ADRESS = 'https://www.googleapis.com/books/v1/volumes'

export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async function (requestByForm = true, { getState, rejectWithValue, dispatch }) {
    const { pagination: {
      startIndex,
      maxResultsIndex
    }, searchQuery, selectedCategory } = getState().books

    // если запрос из формы, то очищаем все прошлые запросы
    if (requestByForm) dispatch(clearBooks())

    console.log('!!!:',);
    const categoryQuery = selectedCategory === 'all' ? '' : `+subject:${selectedCategory}`
    const intitleQuery = `+intitle:${searchQuery}`

    try {

      const adress = `${REQUEST_ADRESS}?q=${intitleQuery}${categoryQuery}&startIndex=${startIndex}&maxResults=${maxResultsIndex}&key=${API_KEY}`
      console.log('adress:', adress);
      const response = await fetch(adress)

      if (!response.ok) {
        console.log('error!:', response.ok);
        throw new Error('Ошибка запроса к серверу. Попробуйте позднее')
      }

      const data = await response.json()
      return data

    } catch (error) {
      console.log('error!!!:',);
      return rejectWithValue(error.message)
    }
  }
)

// helpers

const setError = (state, { payload }) => {
  console.log('seterror:',);
  state.isFetchDone = true
  state.error = payload
  console.log(payload)
}


export const booksSlice = createSlice({
  name: 'books',
  initialState: '',
  reducers: {
    getBooks: getBooksReducer,
    clearBooks: clearBooksReducer,
    setSearchQuery: setSearchQueryReducer,
    setSelectedCategory: setSelectedCategoryReducer,
  },
  extraReducers: {
    [fetchBooks.pending]: (state, action) => {
      state.isFetchDone = false
      state.error = null
    },
    [fetchBooks.fulfilled]: (state, { payload }) => {
      state.isFetchDone = true

      // тк api возвращает дубликаты (на форуме пишут об этом с 19 года), то приходится фильтровать каждый запрос
      // всего реальных книг будет чуть меньше, чем заявлено в totalItems
      let duplicates = 0

      // когда не пришли данные совсем
      if (!payload.items) {
        // подставлыем пустой мок, чтобы избежать ошибки
        payload.items = []
        payload.totalItems = 0
      }
      const booksWithoutDuplicates = Object.values(
        [...state.data, ...payload.items].reduce((acc, curr) => {
          if (acc[`${curr.id}`]) duplicates++
          acc[`${curr.id}`] = curr
          return acc
        }, {})
      )
      state.data = booksWithoutDuplicates
      state.pagination.totalItems = payload.totalItems
      state.pagination.duplicates = state.pagination.duplicates + duplicates
      state.pagination.startIndex += state.pagination.maxResultsIndex
      console.log('length:', state.data.length);
    },
    [fetchBooks.rejected]: setError,

  }
})


export const { getBooks, clearBooks, setSearchQuery, setSelectedCategory } = booksSlice.actions
export default booksSlice.reducer