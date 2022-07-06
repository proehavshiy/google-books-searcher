// utils
// import { manageLocalStorage } from '../../../../utils/manageLocalStorage';
// constants
// import { LSNAME_FILTER } from '../../../../constants/constants';

export const setCurrentBookIdReducer = (state, { payload }) => {
  console.log('bookreducer:',);
  const updState = {
    ...state,
    currentBookId: payload,
  }
  return updState
}