import { IBooks, Reducer } from '../../../../types/types';

export const clearBooksReducer: Reducer<IBooks> = (state) => {
  return {
    ...state,
    data: [],
  };
};