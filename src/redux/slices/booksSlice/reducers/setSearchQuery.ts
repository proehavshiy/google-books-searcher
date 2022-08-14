import { PayloadAction } from '@reduxjs/toolkit';

import { IBooks } from '../../../../types/types';

export const setSearchQueryReducer = (state: IBooks, { payload }: PayloadAction<string>): IBooks => {
  // const updState = {
  //   ...state,
  //   searchQuery: payload,
  // };
  // return updState;
  return {
    ...state,
    searchQuery: payload,
  };
};