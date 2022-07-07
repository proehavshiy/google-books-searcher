export const setSelectedCategoryReducer = (state, { payload }) => {
  const updState = {
    ...state,
    selectedCategory: payload,
  };
  return updState;
};