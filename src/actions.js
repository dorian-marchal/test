import { createAction } from 'redux-actions';
import logger from './logger';

const serverBaseUrl = 'http://localhost:3001';

// @FIXME What a mess. Maybe redux-saga can help me?
const createFetchAction = (method, path, makeParams = () => {}) => {
  const type = `${method} ${path}`;
  // @FIXME Oh dear, please rename me.
  const _fetch = createAction(type, (status, responseBody, requestBody) => ({
    status,
    response: responseBody,
    request: requestBody,
  }));

  // @FIXME Improve shape.
  return {
    _fetch,
    fetch: (...args) =>
      // cf https://redux.js.org/docs/advanced/AsyncActions.html
      async function(dispatch) {
        dispatch(_fetch('pending'));

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
          dispatch(_fetch(e));
          logger.error(e);
          return;
        }

        // @FIXME Doesn't always receive something.
        // @FIXME What if I want to receive something else?
        // @FIXME This looks weird...
        dispatch(_fetch('success', responseBody, requestBody));
      },
  };
};

const updateItemInput = createAction('UPDATE_ITEM_INPUT', (input) => ({ input }));

const http = {
  getItems: createFetchAction('GET', '/items'),
  addItem: createFetchAction('POST', '/items/add', (item) => ({ item })),
  removeItem: createFetchAction('POST', '/items/remove', (index) => ({ index })),
};

const submitItem = () => (dispatch, getState) => {
  const { itemInput } = getState();
  if (itemInput === '') {
    return;
  }

  dispatch(http.addItem.fetch(itemInput));
};

export { submitItem, updateItemInput, http };
