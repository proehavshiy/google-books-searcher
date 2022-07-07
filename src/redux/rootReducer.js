import { configureStore } from '@reduxjs/toolkit';

import booksSlice from './slices/booksSlice/booksSlice';

export const rootReducer = {
  books: booksSlice,
};

export const preloadedState = {
  books: {
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
    selectedCategory: 'all',
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
  },
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState,
});

export default store;