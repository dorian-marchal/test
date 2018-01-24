const addNewItem = () => ({ type: 'ADD_NEW_ITEM' });
const removeItem = index => ({ type: 'REMOVE_ITEM', index });
const updateNewItemLabel = newItemLabel => ({ type: 'UPDATE_NEW_ITEM_LABEL', newItemLabel });

export { addNewItem, removeItem, updateNewItemLabel };
