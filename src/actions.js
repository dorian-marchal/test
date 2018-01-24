// @FIXME mutualize type.
const addNewItem = () => ({ type: 'ADD_NEW_ITEM' });
const removeItem = index => ({ type: 'REMOVE_ITEM', index });
const updateNewItemLabel = newItemLabel => ({ type: 'UPDATE_NEW_ITEM_LABEL', newItemLabel });
const requestItems = () => ({ type: 'REQUEST_ITEMS' });
const receiveItems = items => ({ type: 'RECEIVE_ITEMS', items });

// cf https://redux.js.org/docs/advanced/AsyncActions.html
function fetchItems() {
  return async function(dispatch) {
    dispatch(requestItems());

    const response = await fetch(`http://localhost:3000/items`);
    const items = await response.json();

    dispatch(receiveItems(items));
  };
}

export { addNewItem, removeItem, updateNewItemLabel, fetchItems };
