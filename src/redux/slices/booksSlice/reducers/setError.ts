import { IBooks, Reducer } from '../../../../types/types';

export const setErrorReducer: Reducer<IBooks, string | null> = (state, { payload }) => {
  return {
    ...state,
    error: payload,
  };
};