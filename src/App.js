import './App.css';

import React, { Component } from 'react';

import actions from './actions';
import { connect } from 'react-redux';

class App extends Component {
  componentDidMount() {
    const { fetchItems } = this.props;
    fetchItems();
  }

  render() {
    const { items, itemInput, removeItem, onSubmitItem, onInputChange } = this.props;
    // @FIXME disable buttons on click.
    return (
      <div className="App">
        {items.length === 0 ? "There's no item in the list, please add one. :)" : ''}
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              {item}
              <button onClick={() => removeItem(index)}>X</button>
            </li>
          ))}
        </ul>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmitItem();
          }}
        >
          <input value={itemInput} type="text" onChange={(e) => onInputChange(e.target.value)} />
          <input type="submit" value="Add" />
        </form>
      </div>
    );
  }
}

export default connect((state) => state, {
  onInputChange: actions.UPDATE_ITEM_INPUT,
  onSubmitItem: actions.SUBMIT_ITEM,
  removeItem: actions.REMOVE_ITEM,
  fetchItems: actions.FETCH_ITEMS,
})(App);
