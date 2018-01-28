import './index.css';

import * as actions from './actions';

import { applyMiddleware, createStore } from 'redux';

import App from './App';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import registerServiceWorker from './registerServiceWorker';
import thunk from 'redux-thunk';

console.log(actions);

// @FIXME Better way to default state?
const defaultState = {
  httpStatus: {},
  itemInput: '',
  items: [],
};

const _status = (state, key, value) => ({ httpStatus: { ...state.httpStatus, [key]: value } });

// @FIXME Use combineReducers https://redux.js.org/docs/api/combineReducers.html
// @FIXME Global access.
// @FIXME Move reducer and action same place
const store = createStore((state = defaultState, action) => {
  if (action.type === actions.http.getItems.request.type) {
    return { ...state, ..._status(state, 'items', 'pending') };
  }
  if (action.type === actions.http.getItems.fail.type) {
    return { ...state, ..._status(state, 'items', 'error') };
  }
  if (action.type === actions.http.getItems.receive.type) {
    // @FIXME validate
    return { ...state, items: action.response, ..._status(state, 'items', 'success') };
  }

  if (action.type === actions.http.addItem.request.type) {
    return { ...state, ..._status(state, 'addItem', 'pending') };
  }
  if (action.type === actions.http.addItem.fail.type) {
    return { ...state, ..._status(state, 'addItem', 'error') };
  }
  if (action.type === actions.http.addItem.receive.type) {
    return {
      ...state,
      ..._status(state, 'addItem', 'success'),
      itemInput: '',
      items: [...state.items, action.request.item],
    };
  }

  if (action.type === actions.updateItemInput.type) {
    return {
      ...state,
      itemInput: action.input,
    };
  }

  if (action.type === actions.http.removeItem.request.type) {
    return { ...state, ..._status(state, 'removeItem', 'pending') };
  }
  if (action.type === actions.http.removeItem.fail.type) {
    return { ...state, ..._status(state, 'removeItem', 'error') };
  }
  if (action.type === actions.http.removeItem.receive.type) {
    return {
      ...state,
      ..._status(state, 'removeItem', 'success'),
      items: state.items.filter((_, index) => index !== action.request.index),
    };
  }

  return state;
}, composeWithDevTools(applyMiddleware(thunk, logger)));

// @FIXME Split presentational & container components.
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
