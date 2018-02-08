import _ from 'lodash';
import actions from '../action';
import { handleActions } from 'redux-actions';

const defaultState = {
  itemInput: '',
  fetchItemsInProgress: false,
  addItemInProgress: false,
  errorMessage: null,
  items: [],
};

const reducer = handleActions(
  {
    [actions.fetchItemsPending]: (state) => ({
      ...state,
      fetchItemsInProgress: true,
    }),
    [actions.fetchItemsSuccess]: (state, { payload }) => ({
      ...state,
      fetchItemsInProgress: false,
      items: payload.items,
    }),
    [actions.fetchItemsError]: (state) => ({
      ...state,
      fetchItemsInProgress: false,
      errorMessage: 'Impossible de récupérer les produits.',
    }),
    [actions.addItemPending]: (state) => ({
      ...state,
      addItemInProgress: true,
    }),
    [actions.addItemSuccess]: (state, { payload }) => ({
      ...state,
      itemInput: '',
      addItemInProgress: false,
      items: [...state.items, payload.item],
    }),
    [actions.addItemError]: (state) => ({
      ...state,
      addItemInProgress: false,
      errorMessage: "Le produit n'a pas été ajouté.",
    }),
    [actions.removeItemPending]: (state, { payload }) => ({
      ...state,
      items: state.items.map(
        (item) => (item.id === payload.id ? { ...item, removingInProgress: true } : item),
      ),
    }),
    [actions.removeItemSuccess]: (state, { payload }) => ({
      ...state,
      items: _.reject(state.items, (item) => item.id === payload.id),
    }),
    [actions.removeItemError]: (state, { payload }) => ({
      ...state,
      errorMessage: "Le produit n'a pas été supprimé.",
      items: state.items.map(
        (item) => (item.id === payload.id ? { ...item, removingInProgress: false } : item),
      ),
    }),
    [actions.updateItemInput]: (state, { payload }) => ({
      ...state,
      itemInput: payload.input,
    }),
  },
  defaultState,
);

export default reducer;
