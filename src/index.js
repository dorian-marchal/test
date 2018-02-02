import { applyMiddleware, createStore } from 'redux';

import App from './App';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducer';
import thunk from 'redux-thunk';

// @FIXME Use combineReducers https://redux.js.org/docs/api/combineReducers.html
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

// @FIXME Split presentational & container components.
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
