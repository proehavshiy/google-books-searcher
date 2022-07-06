// utils
// import { manageLocalStorage } from '../../../../utils/manageLocalStorage';
// constants
// import { LSNAME_FILTER } from '../../../../constants/constants';

export const setErrorReducer = (state, { payload }) => {
  const updState = {
    ...state,
    error: payload,
  };
  return updState;
};