import { IBooks, Reducer } from '../../../../types/types';

export const setErrorReducer: Reducer<IBooks, string> = (state, { payload }) => {
  return {
    ...state,
    error: payload,
  };
};