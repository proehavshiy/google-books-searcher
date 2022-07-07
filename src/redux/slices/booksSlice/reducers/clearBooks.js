export const clearBooksReducer = (state) => {
  const updState = {
    ...state,
    data: [],
  };
  return updState;
};