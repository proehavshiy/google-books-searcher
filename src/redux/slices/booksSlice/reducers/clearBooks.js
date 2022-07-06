// utils
// import { manageLocalStorage } from '../../../../utils/manageLocalStorage';
// constants
// import { LSNAME_FILTER } from '../../../../constants/constants';

export const clearBooksReducer = (state, action) => {
  const updState = {
    ...state,
    data: [],
  };
  return updState;
};