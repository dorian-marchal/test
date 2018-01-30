import './index.css';

import actions from './actions';
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
    [actions.FETCH_ITEMS_PENDING]: (state) => ({
      ...state,
      fetchingItems: true,
    }),
    [actions.FETCH_ITEMS_SUCCESS]: (state, { payload }) => ({
      ...state,
      fetchingItems: false,
      // @FIXME validate response in action creator.
      items: payload.response,
    }),
    [actions.FETCH_ITEMS_ERROR]: (state) => ({
      ...state,
      fetchingItems: false,
      errorMessage: 'Erreur de chargement',
    }),
    // @FIXME
    [actions.ADD_ITEM_PENDING]: (state) => state,
    [actions.ADD_ITEM_SUCCESS]: (state, { payload }) => ({
      ...state,
      itemInput: '',
      items: [...state.items, payload.request.item],
    }),
    [actions.ADD_ITEM_ERROR]: (state) => ({
      ...state,
      errorMessage: "Erreur d'ajout",
    }),
    // @FIXME
    [actions.REMOVE_ITEM_PENDING]: (state) => state,
    [actions.REMOVE_ITEM_SUCCESS]: (state, { payload }) => ({
      ...state,
      items: state.items.filter((_, index) => index !== payload.request.index),
    }),
    [actions.REMOVE_ITEM_ERROR]: (state) => ({
      ...state,
      errorMessage: 'Erreur de suppression',
    }),
    [actions.UPDATE_ITEM_INPUT]: (state, { payload }) => ({
      ...state,
      itemInput: payload.input,
    }),
  },
  defaultState,
);

export default reducer;
