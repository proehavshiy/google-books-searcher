// utils
import { manageLocalStorage } from '../../../../utils/manageLocalStorage';
// constants
import { LSNAME_TODO, DATA_PRESET } from '../../../../constants/constants';

export const addNewToDoReducer = (state, action) => {
  const updState = [...state, DATA_PRESET(action.payload)]
  // save to localStorage arr of todos
  manageLocalStorage(LSNAME_TODO, 'set', updState)
  return updState
}