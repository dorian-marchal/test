import { createActions } from 'redux-actions';

import _ from 'lodash';
import getFetchActionsCreator from '../lib/getFetchActionsCreator';

const serverBaseUrl = 'http://localhost:3001';

const createFetchActions = getFetchActionsCreator(serverBaseUrl);

const actions = _.mapKeys(
  {
    ...createActions({
      UPDATE_ITEM_INPUT: (input) => ({
        input,
      }),
      NOTIFY_ERROR: (message) => ({ message }),
    }),
    SUBMIT_ITEM: () => (dispatch, getState) => {
      const { itemInput, addItemInProgress } = getState();
      if (addItemInProgress || itemInput === '') {
        return;
      }

      dispatch(actions.addItem(itemInput));
    },
    ...createFetchActions({
      type: 'FETCH_ITEMS',
      path: '/items',
      createSuccessPayload: (requestBody, responseBody) => ({ items: responseBody }),
      onError: (dispatch) => {
        dispatch(actions.notifyError('Impossible de récupérer les items'));
      },
    }),
    ...createFetchActions({
      type: 'ADD_ITEM',
      method: 'POST',
      path: '/items/add',
      createBody: (item) => ({ item }),
      createSuccessPayload: (requestBody, responseBody) => ({ item: responseBody }),
      onError: (dispatch) => {
        dispatch(actions.notifyError("Impossible d'ajouter cet item"));
      },
    }),
    ...createFetchActions({
      type: 'REMOVE_ITEM',
      method: 'POST',
      path: '/items/remove',
      createBody: (id) => ({ id }),
      createPendingPayload: (requestBody) => ({ id: requestBody.id }),
      createSuccessPayload: (requestBody) => ({ id: requestBody.id }),
      createErrorPayload: (_, requestBody) => ({ id: requestBody.id }),
      onError: (dispatch) => {
        dispatch(actions.notifyError("Impossible de supprimer l'item"));
      },
    }),
  },
  (action, key) => _.camelCase(key),
);

export default actions;
export { createFetchActions };
