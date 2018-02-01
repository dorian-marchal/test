import { createAction, createActions } from 'redux-actions';

import _ from 'lodash';
import logger from '../logger';

const serverBaseUrl = 'http://localhost:3001';

// @FIXME doc
const createFetchActions = (type, method, path, makeParams = () => ({})) => {
  const pending = createAction(`${type}_PENDING`, (requestBody) => ({ request: requestBody }));
  const success = createAction(`${type}_SUCCESS`, (responseBody, requestBody) => ({
    response: responseBody,
    request: requestBody,
  }));
  const error = createAction(`${type}_ERROR`);

  return {
    [pending]: pending,
    [success]: success,
    [error]: error,
    [type]: (...args) =>
      async function(dispatch) {
        const requestBody = makeParams(...args);

        dispatch(pending(requestBody));

        let responseBody = undefined;
        try {
          const response = await fetch(`${serverBaseUrl}${path}`, {
            method,
            body: method === 'POST' ? JSON.stringify(requestBody) : undefined,
            headers: { 'Content-Type': 'application/json' },
          });
          if (response.status < 300) {
            // @FIXME How to handle this?
            if (response.headers.get('Content-Type').match(/application\/json/)) {
              responseBody = await response.json();
            } else {
              responseBody = await response.text();
            }
          } else {
            throw response;
          }
        } catch (e) {
          dispatch(error(e));
          logger.error({ e });
          return;
        }

        // @FIXME Doesn't always receive something.
        // @FIXME What if I want to receive something else?
        // @FIXME This looks weird...
        dispatch(success(responseBody, requestBody));
      },
  };
};

const actions = _.mapKeys(
  {
    ...createActions({
      UPDATE_ITEM_INPUT: (input) => ({ input }),
    }),
    SUBMIT_ITEM: () => (dispatch, getState) => {
      const { itemInput, addingItem } = getState();
      if (addingItem || itemInput === '') {
        return;
      }

      dispatch(actions.addItem(itemInput));
    },
    ...createFetchActions('FETCH_ITEMS', 'GET', '/items'),
    ...createFetchActions('ADD_ITEM', 'POST', '/items/add', (item) => ({ item })),
    ...createFetchActions('REMOVE_ITEM', 'POST', '/items/remove', (id) => ({ id })),
  },
  (action, key) => _.camelCase(key),
);

export default actions;
