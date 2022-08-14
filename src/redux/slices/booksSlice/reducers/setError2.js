export const setErrorReducer = (state, { payload }) => {
  const updState = {
    ...state,
    error: payload,
  };
  return updState;
};