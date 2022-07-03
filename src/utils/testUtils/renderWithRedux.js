import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit"
import { render } from '@testing-library/react';
import { rootReducer } from "../../redux/rootReducer";
import { preloadedState } from "../../redux/rootReducer";

export const renderWithRedux = (
  component,
  { initialState = preloadedState,
    store = configureStore({
      reducer: rootReducer,
      preloadedState: initialState,
    })
  } = {}
) => {
  return {
    ...render(
      <Provider store={store}>
        {component}
      </Provider>
    ),
    store
  }
}
