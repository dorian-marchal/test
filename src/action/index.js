import { createAction, createActions } from 'redux-actions';
import _ from 'lodash';
import logger from '../logger';

const serverBaseUrl = 'http://localhost:3001';

// @FIXME doc
const createFetchActions = ({
  type,
  method = 'GET',
  path,
  createBody = _.noop,
  // @FIXME doc takes requestBody/[responseBody]
  onPending = _.noop,
  onSuccess = _.noop,
  onError = _.noop,
}) => {
  const pending = createAction(`${type}_PENDING`, onPending);
  const success = createAction(`${type}_SUCCESS`, onSuccess);
  const error = createAction(`${type}_ERROR`, onError);
  return {
    [pending]: pending,
    [success]: success,
    [error]: error,
    [type]: (...args) =>
      async function(dispatch) {
        const requestBody = createBody(...args);

        dispatch(pending(requestBody));

        let responseBody = undefined;
        try {
          const response = await fetch(`${serverBaseUrl}${path}`, {
            method,
            body: requestBody ? JSON.stringify(requestBody) : undefined,
            headers: { 'Content-Type': 'application/json' },
          });
          if (response.headers.get('Content-Type').match(/application\/json/)) {
            responseBody = await response.json();
          }
          if (response.status >= 300) {
            throw response;
          }
        } catch (e) {
          dispatch(error(e));
          logger.error({ e });
          return;
        }

        dispatch(success(requestBody, responseBody));
      },
  };
};

const actions = _.mapKeys(
  {
    ...createActions({
      UPDATE_ITEM_INPUT: (input) => ({ input }),
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
      // @FIXME Validate?
      onSuccess: (requestBody, responseBody) => ({ items: responseBody }),
      // @FIXME Errors, replace _.noop with _.identity?
    }),
    ...createFetchActions({
      type: 'ADD_ITEM',
      method: 'POST',
      path: '/items/add',
      createBody: (item) => ({ item }),
      onSuccess: (requestBody, responseBody) => ({ item: responseBody }),
    }),
    ...createFetchActions({
      type: 'REMOVE_ITEM',
      method: 'POST',
      path: '/items/remove',
      createBody: (id) => ({ id }),
      onPending: (requestBody) => ({ id: requestBody.id }),
      onSuccess: (requestBody) => ({ id: requestBody.id }),
    }),
  },
  (action, key) => _.camelCase(key),
);

export default actions;
