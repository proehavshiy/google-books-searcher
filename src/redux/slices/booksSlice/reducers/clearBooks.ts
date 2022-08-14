import { IBooks } from '../../../../types/types';

export const clearBooksReducer = (state: IBooks): IBooks => {
  console.log('clearBooksReducer:', state);
  // const updState = {
  //   ...state,
  //   data: [],
  // };
  // return updState;

  return {
    ...state,
    data: [],
  };
};