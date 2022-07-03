// utils
import { manageLocalStorage } from '../../../../utils/manageLocalStorage';
// constants
import { LSNAME_TODO } from '../../../../constants/constants';

export const displayAllReducer = (state, action) => {
  const updState = [...state].map((el) => {
    el.isDisplay = true
    return el
  })

  manageLocalStorage(LSNAME_TODO, 'set', updState)
  // return updState
}