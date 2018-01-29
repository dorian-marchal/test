import './index.css';

import * as actions from './actions';

import { handleActions } from 'redux-actions';

const defaultState = {
  itemInput: '',
  fetchingItems: false,
  // @FIXME dispatch errors with noty.
  errorMessage: null,
  items: [],
};

// @FIXME Use combineReducers https://redux.js.org/docs/api/combineReducers.html
// @FIXME Global access.
// @FIXME Move reducer and action same place
// @FIXME Test errors.
const reducer = handleActions(
  {
    [actions.http.getItems._fetch]: (state, { payload }) => ({
      ...state,
      errorMessage: payload.status === 'error' ? 'Erreur de chargement' : undefined,
      fetchingItems: payload.status === 'pending',
      // @FIXME validate response in action creator.
      items: payload.status === 'success' ? payload.response : state.items,
    }),
    [actions.http.addItem._fetch]: (state, { payload }) => ({
      ...state,
      errorMessage: payload.status === 'error' ? "Erreur d'ajout" : undefined,
      // @FIXME Add pending state.
      // @FIXME validate response in action creator.
      itemInput: '',
      items: payload.status === 'success' ? [...state.items, payload.request.item] : state.items,
    }),
    [actions.http.removeItem._fetch]: (state, { payload }) => ({
      ...state,
      errorMessage: payload.status === 'error' ? 'Erreur de suppression' : undefined,
      // @FIXME Add pending state.
      items:
        payload.status === 'success'
          ? state.items.filter((_, index) => index !== payload.request.index)
          : state.items,
    }),
    [actions.updateItemInput]: (state, action) => ({
      ...state,
      itemInput: action.payload.input,
    }),
  },
  defaultState,
);

export default reducer;
