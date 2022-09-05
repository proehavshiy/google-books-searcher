import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
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

import booksSlice from './slices/booksSlice/booksSlice';

const rootReducer = {
  books: booksSlice,
};

const rootPersistConfig = {
  key: 'GoogleBooksSearcher',
  storage,
  blacklist: ['isFetchDone', 'error', 'categories', 'sortOptions'],
};

const persistedReducer = persistReducer(rootPersistConfig, combineReducers(rootReducer));

function initStore(preloadedState?: any) {
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

const store = initStore();
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