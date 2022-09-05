import { IBook, IBooks, Reducer } from './../../../../types/types';

export const setCurrentBookReducer: Reducer<IBooks, IBook> = (state, { payload }) => {
  state.isFetchDone = true;
  state.currentBook = payload;
};