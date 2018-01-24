import './index.css';

import App from './App';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import registerServiceWorker from './registerServiceWorker';

// @FIXME Better way to default state?
const defaultState = {
  newItemLabel: '',
  items: [],
};

// @FIXME Refactor?
// @FIXME Global access.
const store = createStore((state = defaultState, action) => {
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
});

// @FIXME Split presentational & container components.
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
