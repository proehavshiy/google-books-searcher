import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';

import App from './components/App/App';
import store from './redux/rootReducer';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router basename='/'>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);