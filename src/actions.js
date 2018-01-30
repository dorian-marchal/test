import { createAction } from 'redux-actions';
import logger from './logger';

const serverBaseUrl = 'http://localhost:3001';

// @FIXME What a mess. Maybe redux-saga can help me?
const createFetchActions = (type, method, path, makeParams = () => {}) => {
  // @FIXME Oh dear, please rename me.
  const pending = createAction(`${type}_PENDING`);
  const success = createAction(`${type}_SUCCESS`, (responseBody, requestBody) => ({
    response: responseBody,
    request: requestBody,
  }));
  const error = createAction(`${type}_ERROR`);

  // @FIXME Improve shape.
  return {
    // @FIXME DRY.
    [`${type}_PENDING`]: pending,
    [`${type}_SUCCESS`]: success,
    [`${type}_ERROR`]: error,
    [type]: (...args) =>
      // cf https://redux.js.org/docs/advanced/AsyncActions.html
      async function(dispatch) {
        dispatch(pending());

        // @FIXME More generic, support post request.
        const requestBody = makeParams(...args);
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
          logger.error(e);
          return;
        }

        // @FIXME Doesn't always receive something.
        // @FIXME What if I want to receive something else?
        // @FIXME This looks weird...
        dispatch(success(responseBody, requestBody));
      },
  };
};

const actions = {
  // @FIXME Use createAction_s_.
  UPDATE_ITEM_INPUT: createAction('UPDATE_ITEM_INPUT', (input) => ({ input })),
  SUBMIT_ITEM: () => (dispatch, getState) => {
    const { itemInput } = getState();
    if (itemInput === '') {
      return;
    }

    dispatch(actions.ADD_ITEM(itemInput));
  },
  ...createFetchActions('FETCH_ITEMS', 'GET', '/items'),
  ...createFetchActions('ADD_ITEM', 'POST', '/items/add', (item) => ({ item })),
  ...createFetchActions('REMOVE_ITEM', 'POST', '/items/remove', (index) => ({ index })),
};

export default actions;
