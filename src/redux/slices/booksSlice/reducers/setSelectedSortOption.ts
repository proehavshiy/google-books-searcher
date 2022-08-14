import { Reducer, IBooks, ICategory } from './../../../../types/types';

export const setSelectedSortOptionReducer: Reducer<IBooks, ICategory> = (state, { payload }) => {
  // const updState = {
  //   ...state,
  //   selectedSortOption: payload,
  // };
  // return updState;
  return {
    ...state,
    selectedSortOption: payload,
  };
};