import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// constants
// import { LSNAME_FILTER } from "../../../constants/constants";
// reducers
import { getBooksReducer } from "./reducers/getBooks";

const API_KEY = 'AIzaSyBNyDVH2q0vYAyz4zBazhe1_P5iLDa1ScU'
const REQUEST_ADRESS = 'https://www.googleapis.com/books/v1/volumes'

export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async function ({ searchPhrase, selectedCategory }, { getState, rejectWithValue }) {
    const categoryQuery = selectedCategory === 'all' ? '' : `+subject:${selectedCategory}`
    const intitleQuery = `+intitle:${searchPhrase}`

    try {
      const { startIndex, maxResultsIndex } = getState().books.pagination
      const adress = `${REQUEST_ADRESS}?q=${intitleQuery}${categoryQuery}&startIndex=${startIndex}&maxResults=${maxResultsIndex}&key=${API_KEY}`
      console.log('adress:', adress);
      const response = await fetch(adress)

      if (!response.ok) {
        throw new Error('Ошибка запроса к серверу. Попробуйте позднее')
      }

      const data = await response.json()
      return data

    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// helpers

const setError = (state, { payload }) => {
  state.isFetchDone = true
  state.error = payload
  console.log(payload)
}


export const booksSlice = createSlice({
  name: 'books',
  initialState: '',
  reducers: {
    getBooks: getBooksReducer,
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
      const booksWithoutDuplicates = Object.values(
        [...state.data, ...payload.items].reduce((acc, curr) => {
          acc[`${curr.id}`] = curr
          return acc
        }, {})
      )
      state.data = booksWithoutDuplicates
      state.pagination.totalItems = payload.totalItems
      console.log('state.pagination.totalItems:', state.pagination.totalItems);
      state.pagination.startIndex += state.pagination.maxResultsIndex
      console.log('length:', state.data.length);
    },
    [fetchBooks.rejected]: setError,

  }
})


export const { getBooks } = booksSlice.actions
export default booksSlice.reducer