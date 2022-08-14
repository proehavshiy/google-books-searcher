import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IBooks } from '../../../types/types';

import { RootState } from './../../rootReducer';

import { clearBooksReducer } from './reducers/clearBooks';
import { setErrorReducer } from './reducers/setError';
import { setSearchQueryReducer } from './reducers/setSearchQuery';
import { setSelectedCategoryReducer } from './reducers/setSelectedCategory';

import { fetchBooks, handleFulfilledFetchBooks } from './MiddleWares/fetchBooks';
import { getCurrentBook, handleFulfilledGetCurrentBook } from './MiddleWares/getCurrentBook';
import { setSelectedSortOptionReducer } from './reducers/setSelectedSortOption';


const initialState: IBooks = {
  data: [],
  currentBook: {},
  pagination: {
    totalItems: null,
    // поправка на дубликаты (totalItems - дубликаты). 
    // Нужна для пагинации, чтобы вовремя скрыть кнопку. Google Books API выдает дубли в запросах
    duplicates: 0,
    startIndex: 0,
    maxResultsIndex: 30,
  },
  isFetchDone: true,
  error: null,
  searchQuery: '',
  selectedCategory: { name: 'all', value: 'all', id: 1 },
  selectedSortOption: { name: 'relevance', value: '', id: 1 },
  categories: [
    { name: 'all', value: 'all', id: 1 },
    { name: 'art', value: 'art', id: 2 },
    { name: 'biography', value: 'biography', id: 3 },
    { name: 'computers', value: 'computers', id: 4 },
    { name: 'history', value: 'history', id: 5 },
    { name: 'medical', value: 'medical', id: 6 },
    { name: 'poetry', value: 'poetry', id: 7 },
  ],
  sortOptions: [
    { name: 'relevance', value: '', id: 1 },
    { name: 'newest', value: 'newest', id: 2 },
    { name: 'oldest', value: 'oldest', id: 3 },
  ],
};

//extraReducers helpers
const handlePending = (state: IBooks): IBooks => {
  return {
    ...state,
    isFetchDone: false,
    error: null,
  }
  // state.isFetchDone = false;
  // state.error = null;
};
const handleError = (state: IBooks, { payload }: PayloadAction<string>): IBooks => {
  return {
    ...state,
    isFetchDone: true,
    error: payload,
  }
  // state.isFetchDone = true;
  // state.error = payload;
};

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    clearBooks: clearBooksReducer,
    setSearchQuery: setSearchQueryReducer,
    setSelectedCategory: setSelectedCategoryReducer,
    setSelectedSortOption: setSelectedSortOptionReducer,
    setError: setErrorReducer,
  },
  extraReducers: builder => {
    builder.addCase(fetchBooks.pending, handlePending);
    builder.addCase(fetchBooks.fulfilled, handleFulfilledFetchBooks);
    // builder.addCase(fetchBooks.rejected, handleError);
    builder.addCase(getCurrentBook.pending, handlePending);
    builder.addCase(getCurrentBook.fulfilled, handleFulfilledGetCurrentBook);
    // builder.addCase(getCurrentBook.rejected, handleError);
  },
  // extraReducers: {
  //   [fetchBooks.pending]: handlePending,
  //   [getCurrentBook.pending]: handlePending,
  //   [fetchBooks.fulfilled]: handleFulfilledFetchBooks,
  //   [getCurrentBook.fulfilled]: handleFulfilledGetCurrentBook,
  //   [fetchBooks.rejected]: handleError,
  //   [getCurrentBook.rejected]: handleError,
  // },
});

export const {
  clearBooks,
  setSearchQuery,
  setSelectedCategory,
  setSelectedSortOption,
  setError,
} = booksSlice.actions;

export default booksSlice.reducer;