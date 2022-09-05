import { Reducer, IBooks, ICategory } from './../../../../types/types';

export const setSelectedSortOptionReducer: Reducer<IBooks, ICategory> = (state, { payload }) => {
  return {
    ...state,
    selectedSortOption: payload,
  };
};