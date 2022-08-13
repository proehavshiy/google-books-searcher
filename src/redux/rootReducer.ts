import { configureStore, StateFromReducersMapObject, Slice, PreloadedState, ThunkDispatch } from '@reduxjs/toolkit';
import { AnyAction, combineReducers } from 'redux';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { IBooks, IPreloadedState } from './../types/types';

import booksSlice from './slices/booksSlice/booksSlice';

const rootReducer = {
  books: booksSlice,
};

const booksPreloadedState: IBooks = {
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

const preloadedState: IPreloadedState = {
  books: booksPreloadedState,
};


const rootPersistConfig = {
  key: 'GoogleBooksSearcher',
  storage,
  blacklist: ['isFetchDone', 'error', 'categories', 'sortOptions'],
};

const reducers = combineReducers(rootReducer);
const persistedReducer = persistReducer(rootPersistConfig, reducers);


function initStore(preloadedState: any) {
  return configureStore({
    reducer: persistedReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
}

const store = initStore(preloadedState);
export default store;

// потому что useSelector не дружит с типами (когда хочешь получить state => state.something), 
// приходится создавать этот тип для кастомной обертки - хука useTypedSelector
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch
// export type ReduxState = ReturnType<typeof persistedReducer>;
// export type AppDispatch = ThunkDispatch<ReduxState, any, AnyAction>;
export type AppDispatch = typeof store.dispatch;