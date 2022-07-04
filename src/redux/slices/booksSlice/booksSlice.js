import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// constants
// import { LSNAME_FILTER } from "../../../constants/constants";
// reducers
import { getBooksReducer } from "./reducers/getBooks";

const API_KEY = 'AIzaSyBNyDVH2q0vYAyz4zBazhe1_P5iLDa1ScU'
const REQUEST_ADRESS = 'https://www.googleapis.com/books/v1/volumes'

export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async function ({ searchPhrase, category }, thunkAPI) {
    console.log('searchPhrase:', searchPhrase);
    const intitleQuery = `+intitle:${searchPhrase}`
    console.log('intitleQuery:', intitleQuery);
    const categoryQuery = category = 'all' ? '' : `+subject:${category}`
    console.log('categoryQuery:', categoryQuery);
    console.log('searchString:', `${REQUEST_ADRESS}?q=${intitleQuery}${categoryQuery}&key=${API_KEY}`);
    const response = await fetch(`${REQUEST_ADRESS}?q=${intitleQuery}${categoryQuery}&key=${API_KEY}`)
    const data = await response.json()
    console.log('data:', data);
    return data
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
      state.isFetchFulfilled = false

      state.error = null
    },
    [fetchBooks.fulfilled]: (state, action) => {
      console.log('fulfilled!:');
      console.log('isFetchFulfilled:', state.isFetchFulfilled);


      console.log(' action.payload:', action.payload);
      state.data = action.payload.items
      console.log('state.books:', state.data);
    },
    [fetchBooks.rejected]: (state, action) => {
      console.log('rejected!:');
    },

  }
})


export const { getBooks } = booksSlice.actions
export default booksSlice.reducer