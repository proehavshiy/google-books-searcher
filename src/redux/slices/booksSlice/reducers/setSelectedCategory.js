// utils
// import { manageLocalStorage } from '../../../../utils/manageLocalStorage';
// constants
// import { LSNAME_FILTER } from '../../../../constants/constants';

export const setSelectedCategoryReducer = (state, { payload }) => {
  const updState = {
    ...state,
    selectedCategory: payload,
  };
  return updState;
};