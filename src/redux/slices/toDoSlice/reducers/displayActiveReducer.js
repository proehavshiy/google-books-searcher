// utils
import { manageLocalStorage } from '../../../../utils/manageLocalStorage';
// constants
import { LSNAME_TODO } from '../../../../constants/constants';

export const displayActiveReducer = (state, action) => {
  const updState = [...state].map((el) => {
    if (!el.isDone) {
      el.isDisplay = true
    } else {
      el.isDisplay = false
    }
    return el
  })

  manageLocalStorage(LSNAME_TODO, 'set', updState)
  // return updState
}