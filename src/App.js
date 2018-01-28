import './App.css';

import React, { Component } from 'react';
import { http, submitItem, updateItemInput } from './actions';

import { connect } from 'react-redux';

const { getItems, removeItem } = http;

class App extends Component {
  componentDidMount() {
    console.log(this.props);
    const { fetchItems } = this.props;
    fetchItems();
  }

  render() {
    const { items, itemInput, removeItem, submitItem, updateItemInput } = this.props;
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
          onSubmit={e => {
            e.preventDefault();
            submitItem();
          }}
        >
          <input value={itemInput} type="text" onChange={e => updateItemInput(e.target.value)} />
          <input type="submit" value="Add" />
        </form>
      </div>
    );
  }
}

export default connect(state => state, {
  updateItemInput,
  submitItem,
  removeItem: removeItem.fetch,
  fetchItems: getItems.fetch,
})(App);
