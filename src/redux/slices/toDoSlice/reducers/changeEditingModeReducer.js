// utils
import { manageLocalStorage } from '../../../../utils/manageLocalStorage';
// constants
import { LSNAME_TODO } from '../../../../constants/constants';

export const changeEditingModeReducer = (state, action) => {
  const { id, changeAll = false } = action.payload
  let updState;
  switch (changeAll) {
    case false:
      updState = [...state].map((el) => {
        if (el.id === id) el.isEditing = !el.isEditing
        return el
      })
      break
    case true:
      updState = [...state].map((el) => {
        el.isEditing = false
        return el
      })
      break
    default:
      updState = state
  }

  manageLocalStorage(LSNAME_TODO, 'set', updState)
  // return updState
}