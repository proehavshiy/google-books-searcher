export const setSearchQueryReducer = (state, { payload }) => {
  const updState = {
    ...state,
    searchQuery: payload,
  };
  return updState;
};