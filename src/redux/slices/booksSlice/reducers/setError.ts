import { PayloadAction } from '@reduxjs/toolkit';

import { IBooks } from '../../../../types/types';

export const setErrorReducer = (state: IBooks, { payload }: PayloadAction<string>): IBooks => {
  // const updState = {
  //   ...state,
  //   error: payload,
  // };
  // return updState;
  return {
    ...state,
    error: payload,
  };
};