import { createSlice } from "@reduxjs/toolkit";
// constants
import { LSNAME_TODO } from "../../../constants/constants";
// reducers
import { addNewToDoReducer } from "./reducers/addNewToDoReducer";
import { deleteToDoReducer } from "./reducers/deleteToDoReducer";
import { changeStatusReducer } from "./reducers/changeStatusReducer";
import { changeValueReducer } from "./reducers/changeValueReducer";
import { changeEditingModeReducer } from "./reducers/changeEditingModeReducer";
import { displayAllReducer } from "./reducers/displayAllReducer";
import { displayActiveReducer } from "./reducers/displayActiveReducer";
import { displayCompletedReducer } from "./reducers/displayCompletedReducer";

export const toDoSlice = createSlice({
  name: LSNAME_TODO,
  initialState: '',
  reducers: {
    addNewToDo: addNewToDoReducer,
    deleteToDo: deleteToDoReducer,
    changeStatus: changeStatusReducer,
    changeValue: changeValueReducer,
    changeEditingMode: changeEditingModeReducer,
    displayAll: displayAllReducer,
    displayActive: displayActiveReducer,
    displayCompleted: displayCompletedReducer,
  }
})

export const { addNewToDo, deleteToDo, changeStatus, changeValue, changeEditingMode, displayAll, displayActive, displayCompleted } = toDoSlice.actions
export default toDoSlice.reducer