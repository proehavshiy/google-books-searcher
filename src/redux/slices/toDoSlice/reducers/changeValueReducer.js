// utils
import { manageLocalStorage } from '../../../../utils/manageLocalStorage';
// constants
import { LSNAME_TODO } from '../../../../constants/constants';

export const changeValueReducer = (state, action) => {
  const { id, newValue } = action.payload
  const updState = [...state].map((el) => {
    if (el.id === id) el.value = newValue
    return el
  })
  manageLocalStorage(LSNAME_TODO, 'set', updState)
  // return updState
}