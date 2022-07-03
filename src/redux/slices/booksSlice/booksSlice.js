import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// constants
// import { LSNAME_FILTER } from "../../../constants/constants";
// reducers
import { getBooksReducer } from "./reducers/getBooks";

const API_KEY = 'AIzaSyBNyDVH2q0vYAyz4zBazhe1_P5iLDa1ScU'

export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async function (searchPhrase, thunkAPI) {
    console.log('searchPhrase:', searchPhrase);
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchPhrase}&key=${API_KEY}`)
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
      state.status = 'pending'
      console.log('state.status:', state.status);
      state.error = null
    },
    [fetchBooks.fulfilled]: (state, action) => {
      console.log('fulfilled!:');
      state.status = 'resolved'
      console.log('state.status:', state.status);


      state.data = action.payload
      console.log('state.books:', state.data);
    },
    [fetchBooks.rejected]: (state, action) => {
      console.log('rejected!:');
    },

  }
})


export const { getBooks } = booksSlice.actions
export default booksSlice.reducer