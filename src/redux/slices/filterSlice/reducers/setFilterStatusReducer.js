// utils
import { manageLocalStorage } from '../../../../utils/manageLocalStorage';
// constants
import { LSNAME_FILTER } from '../../../../constants/constants';

export const setFilterStatusReducer = (state, { payload }) => {
  const updState = {
    ...state,
    currentStatus: payload,
  }
  // save to localStorage arr of todos
  manageLocalStorage(LSNAME_FILTER, 'set', updState)
  return updState
}