import './index.css';

import { applyMiddleware, createStore } from 'redux';

import App from './App';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
// import { createLogger } from 'redux-logger';
import registerServiceWorker from './registerServiceWorker';
import thunkMiddleware from 'redux-thunk';

// @FIXME Better way to default state?
const defaultState = {
  newItemLabel: '',
  isFetching: false,
  items: [],
};

// @FIXME Use combineReducers https://redux.js.org/docs/api/combineReducers.html
// @FIXME Global access.
const store = createStore(
  (state = defaultState, action) => {
    if (action.type === 'REQUEST_ITEMS') {
      return { ...state, isFetching: true };
    }
    if (action.type === 'RECEIVE_ITEMS') {
      return { ...state, items: action.items, isFetching: false };
    }

    if (action.type === 'ADD_NEW_ITEM') {
      if (state.newItemLabel === '') {
        return state;
      }
      return {
        ...state,
        newItemLabel: '',
        items: [...state.items, state.newItemLabel],
      };
    }

    if (action.type === 'REMOVE_ITEM') {
      return {
        ...state,
        items: state.items.filter((_, index) => index !== action.index),
      };
    }

    if (action.type === 'UPDATE_NEW_ITEM_LABEL') {
      return {
        ...state,
        newItemLabel: action.newItemLabel,
      };
    }

    return state;
  },
  applyMiddleware(
    thunkMiddleware,
    // loggerMiddleware
  ),
);

// @FIXME Split presentational & container components.
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
