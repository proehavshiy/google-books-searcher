// utils
// import { manageLocalStorage } from '../../../../utils/manageLocalStorage';
// constants
// import { LSNAME_FILTER } from '../../../../constants/constants';

export const getBooksReducer = (state, { payload }) => {
  const updState = {
    ...state,
    books: [state.books, ...payload],
  }
  return updState
}