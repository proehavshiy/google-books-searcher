// utils
import { manageLocalStorage } from '../../../../utils/manageLocalStorage';
// constants
import { LSNAME_TODO } from '../../../../constants/constants';

export const deleteToDoReducer = (state, action) => {
  const { id, deleteCompleted = false } = action.payload
  // delete all completed ToDos or current toDo
  let updState;
  deleteCompleted
    ? updState = [...state].filter((el) => !el.isDone)
    : updState = [...state].filter((el) => el.id !== id)
  // save to localStorage arr of todos
  manageLocalStorage(LSNAME_TODO, 'set', updState)
  return updState
}