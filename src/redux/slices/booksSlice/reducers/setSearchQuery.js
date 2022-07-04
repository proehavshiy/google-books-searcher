// utils
// import { manageLocalStorage } from '../../../../utils/manageLocalStorage';
// constants
// import { LSNAME_FILTER } from '../../../../constants/constants';

export const setSearchQueryReducer = (state, { payload }) => {
  const updState = {
    ...state,
    searchQuery: payload,
  }
  return updState
}