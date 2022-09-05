import { IBooks, ICategory, Reducer } from './../../../../types/types';

export const setSelectedCategoryReducer: Reducer<IBooks, ICategory> = (state, { payload }) => {
  return {
    ...state,
    selectedCategory: payload,
  };
};