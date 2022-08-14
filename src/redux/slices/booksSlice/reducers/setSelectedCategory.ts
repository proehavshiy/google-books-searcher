import { PayloadAction } from '@reduxjs/toolkit';

import { IBooks, ICategory, Reducer } from './../../../../types/types';


export const setSelectedCategoryReducer: Reducer<IBooks, ICategory> = (state, { payload }) => {
  // const updState = {
  //   ...state,
  //   selectedCategory: payload,
  // };
  // return updState;
  return {
    ...state,
    selectedCategory: payload,
  };
};