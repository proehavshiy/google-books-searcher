import { IBooks, Reducer } from '../../../../types/types';

export const setSearchQueryReducer: Reducer<IBooks, string> = (state, { payload }) => {
  return {
    ...state,
    searchQuery: payload,
  };
};