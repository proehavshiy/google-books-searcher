import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// constants
// import { LSNAME_FILTER } from "../../../constants/constants";
// reducers
import { getBooksReducer } from "./reducers/getBooks";

const API_KEY = 'AIzaSyBNyDVH2q0vYAyz4zBazhe1_P5iLDa1ScU'
const REQUEST_ADRESS = 'https://www.googleapis.com/books/v1/volumes'

export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async function ({ searchPhrase, category }, { getState, rejectWithValue }) {
    try {
      //  console.log('searchPhrase:', searchPhrase);
      const intitleQuery = `+intitle:${searchPhrase}`
      // console.log('intitleQuery:', intitleQuery);
      const categoryQuery = category = 'all' ? '' : `+subject:${category}`
      // console.log('categoryQuery:', categoryQuery);
      // console.log('thunkAPI:', thunkAPI);
      const { startIndex, maxResultsIndex } = getState().books.pagination
      console.log('startIndex:', startIndex);
      console.log('maxResultsIndex:', maxResultsIndex);
      console.log('searchString:', `${REQUEST_ADRESS}?q=${intitleQuery}${categoryQuery}&startIndex=${startIndex}&maxResults=${maxResultsIndex}&key=${API_KEY}`);
      const response = await fetch(`${REQUEST_ADRESS}?q=${intitleQuery}${categoryQuery}&startIndex=${startIndex}&maxResults=${maxResultsIndex}&key=${API_KEY}`)

      if (!response.ok) {
        throw new Error('Ошибка запроса к серверу. Попробуйте позднее')
      }

      const data = await response.json()
      console.log('data:', data);
      return data

    } catch (error) {
      return rejectWithValue(error.message)
    }



    // .then(response => response.json())
    // .then(json => {
    //   console.log(json)
    //   dispatch(getBooks(json))
    // })
  }

)


export const booksSlice = createSlice({
  name: 'books',
  initialState: '',
  reducers: {
    getBooks: getBooksReducer,
  },
  extraReducers: {
    [fetchBooks.pending]: (state, action) => {
      console.log('pending!:');
      state.isFetchDone = false
      state.error = null
    },
    [fetchBooks.fulfilled]: (state, { payload }) => {
      state.isFetchDone = true

      console.log('fulfilled!:');
      console.log('isFetchFulfilled:', state.isFetchDone);


      console.log(' action.payload:', payload);
      state.data = [...state.data, ...payload.items]
      state.pagination.totalItems = payload.totalItems
      state.pagination.startIndex += state.pagination.maxResultsIndex
      console.log('state.books:', state.data);
    },
    [fetchBooks.rejected]: (state, { payload }) => {
      state.isFetchDone = true
      state.error = payload
      console.log(payload)
    },

  }
})


export const { getBooks } = booksSlice.actions
export default booksSlice.reducer