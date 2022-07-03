import { createSlice } from "@reduxjs/toolkit";
// constants
import { LSNAME_FILTER } from "../../../constants/constants";
// reducers
import { setFilterStatusReducer } from "./reducers/setFilterStatusReducer";

export const filterSlice = createSlice({
  name: LSNAME_FILTER,
  initialState: '',
  reducers: {
    setFilterStatus: setFilterStatusReducer,
  }
})

export const { setFilterStatus } = filterSlice.actions
export default filterSlice.reducer