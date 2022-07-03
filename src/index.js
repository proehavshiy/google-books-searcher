import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import store from './redux/store';
import { Provider } from 'react-redux';
// import { configureStore } from "@reduxjs/toolkit";
// import rootReducer from './redux/rootReducer';
import store from './redux/rootReducer';

// const store = configureStore(rootReducer)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);