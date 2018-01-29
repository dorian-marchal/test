import './index.css';

import * as actions from './actions';

import { applyMiddleware, createStore } from 'redux';

import App from './App';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import { handleActions } from 'redux-actions';
import logger from 'redux-logger';
import registerServiceWorker from './registerServiceWorker';
import thunk from 'redux-thunk';

// @FIXME Better project structure.

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
// @FIXME Manage errors.
const store = createStore(
  handleActions(
    {
      [actions.http.getItems.request]: state => ({
        ...state,
        ..._status(state, 'items', 'pending'),
      }),
      [actions.http.getItems.fail]: state => ({
        ...state,
        ..._status(state, 'items', 'error'),
      }),
      [actions.http.getItems.receive]: (state, action) => ({
        // @FIXME validate
        ...state,
        items: action.payload.response,
        ..._status(state, 'items', 'success'),
      }),
      [actions.http.addItem.request]: state => ({
        ...state,
        ..._status(state, 'addItem', 'pending'),
      }),
      [actions.http.addItem.fail]: state => ({
        ...state,
        ..._status(state, 'addItem', 'error'),
      }),
      [actions.http.addItem.receive]: (state, action) => ({
        ...state,
        ..._status(state, 'addItem', 'success'),
        itemInput: '',
        items: [...state.items, action.payload.request.item],
      }),
      [actions.updateItemInput]: (state, action) => ({
        ...state,
        itemInput: action.payload.input,
      }),
      [actions.http.removeItem.request]: state => ({
        ...state,
        ..._status(state, 'removeItem', 'pending'),
      }),
      [actions.http.removeItem.fail]: state => ({
        ...state,
        ..._status(state, 'removeItem', 'error'),
      }),
      [actions.http.removeItem.receive]: (state, action) => ({
        ...state,
        ..._status(state, 'removeItem', 'success'),
        items: state.items.filter((_, index) => index !== action.payload.request.index),
      }),
    },
    defaultState,
  ),
  composeWithDevTools(applyMiddleware(thunk, logger)),
);

// @FIXME Split presentational & container components.
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
