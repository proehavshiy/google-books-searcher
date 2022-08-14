export const setSelectedSortOptionReducer = (state, { payload }) => {
  const updState = {
    ...state,
    selectedSortOption: payload,
  };
  return updState;
};