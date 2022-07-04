import { configureStore } from "@reduxjs/toolkit";
// reducers
// import sliceToDoReducer from './slices/toDoSlice/toDoSlice';
// import sliceFilterReducer from './slices/filterSlice/filterSlice';
import booksSlice from "./slices/booksSlice/booksSlice";
// constants
import { LSNAME_TODO, LSNAME_FILTER } from "../constants/constants";
// import { initState } from "../utils/initState";

// export const rootReducer = {
//   [LSNAME_TODO]: sliceToDoReducer,
//   [LSNAME_FILTER]: sliceFilterReducer,
// }

export const rootReducer = {
  books: booksSlice,
}

export const preloadedState = {
  books: {
    data: [],
    pagination: {
      totalItems: 0,
      duplicates: 0, // поправка на дубликаты (totalItems - дубликаты). Нужна для пагинации, чтобы вовремя скрыть кнопку
      startIndex: 0,
      maxResultsIndex: 2,
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
  }
  // [LSNAME_TODO]: initState(LSNAME_TODO),
  // [LSNAME_FILTER]: initState(LSNAME_FILTER),
}

const store = configureStore({
  reducer: rootReducer,
  preloadedState,
})

export default store;