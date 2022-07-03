// utils
import { manageLocalStorage } from '../../../../utils/manageLocalStorage';
// constants
import { LSNAME_TODO } from '../../../../constants/constants';

export const changeStatusReducer = (state, action) => {
  const { id, changeAll = false } = action.payload
  let updState;
  switch (changeAll) {
    case false:
      // change status of a current single ToDo
      updState = [...state].map((el) => {
        if (el.id === id) el.isDone = !el.isDone
        return el
      })
      break
    case true:
      // change statuses of all ToDos
      const checkStatuses = state.every((el) => el.isDone === true)
      checkStatuses
        ? updState = [...state].map((el) => {
          el.isDone = false
          return el
        })
        : updState = [...state].map((el) => {
          el.isDone = true
          return el
        })
      break
    default:
      updState = state
  }

  // upd localStorage
  manageLocalStorage(LSNAME_TODO, 'set', updState)
  // immer error so dont return
  //return updState
}