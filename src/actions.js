import { createAction } from 'redux-actions';
import logger from './logger';

const serverBaseUrl = 'http://localhost:3001';

const httpAction = (method, path, makeParams = () => {}) => {
  const request = createAction(`REQUEST ${path}`);
  const receive = createAction(`RECEIVE ${path}`, (responseBody, requestBody) => ({
    response: responseBody,
    request: requestBody,
  }));
  const fail = createAction(`FAIL ${path}`);

  // @FIXME Improve shape.
  return {
    request,
    receive,
    fail,
    fetch: (...args) =>
      // cf https://redux.js.org/docs/advanced/AsyncActions.html
      async function(dispatch) {
        dispatch(request());

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
            // @FIXME only when content type is json.
            if (response.headers.get('Content-Type').match(/application\/json/)) {
              responseBody = await response.json();
            } else {
              responseBody = await response.text();
            }
          } else {
            throw response;
          }
        } catch (e) {
          dispatch(fail());
          logger.error(e);
          return;
        }

        // @FIXME Doesn't always receive something.
        // @FIXME What if I want to receive something else ?
        // @FIXME This looks weird.
        dispatch(receive(responseBody, requestBody));
      },
  };
};

const updateItemInput = createAction('UPDATE_ITEM_INPUT', input => ({ input }));

const http = {
  getItems: httpAction('GET', '/items'),
  addItem: httpAction('POST', '/items/add', item => ({ item })),
  removeItem: httpAction('POST', '/items/remove', index => ({ index })),
};

const submitItem = () => (dispatch, getState) => {
  const { itemInput } = getState();
  if (itemInput === '') {
    return;
  }

  dispatch(http.addItem.fetch(itemInput));
};

export { submitItem, updateItemInput, http };
