import { createSlice } from '@reduxjs/toolkit';

import { clearBooksReducer } from './reducers/clearBooks';
import { setErrorReducer } from './reducers/setError';
import { setSearchQueryReducer } from './reducers/setSearchQuery';
import { setSelectedCategoryReducer } from './reducers/setSelectedCategory';

import { fetchBooks, handleFulfilledFetchBooks } from './MiddleWares/fetchBooks';
import { getCurrentBook, handleFulfilledGetCurrentBook } from './MiddleWares/fetchCurrentBook';
import { setSelectedSortOptionReducer } from './reducers/setSelectedSortOption';

//extraReducers helpers
const handlePending = (state) => {
  state.isFetchDone = false;
  state.error = null;
};
const handleError = (state, { payload }) => {
  state.isFetchDone = true;
  state.error = payload;
};

export const booksSlice = createSlice({
  name: 'books',
  initialState: '',
  reducers: {
    clearBooks: clearBooksReducer,
    setSearchQuery: setSearchQueryReducer,
    setSelectedCategory: setSelectedCategoryReducer,
    setSelectedSortOption: setSelectedSortOptionReducer,
    setError: setErrorReducer,
  },
  extraReducers: {
    [fetchBooks.pending]: handlePending,
    [getCurrentBook.pending]: handlePending,
    [fetchBooks.fulfilled]: handleFulfilledFetchBooks,
    [getCurrentBook.fulfilled]: handleFulfilledGetCurrentBook,
    [fetchBooks.rejected]: handleError,
    [getCurrentBook.rejected]: handleError,
  },
});

export const {
  clearBooks,
  setSearchQuery,
  setSelectedCategory,
  setSelectedSortOption,
  setError,
} = booksSlice.actions;

export default booksSlice.reducer;