import './App.css';

import React, { Component } from 'react';
import { addNewItem, removeItem, updateNewItemLabel } from './actions';

import { connect } from 'react-redux';

class App extends Component {
  render() {
    const { items, newItemLabel, addNewItem, removeItem, updateNewItemLabel } = this.props;
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
            addNewItem();
          }}
        >
          <input value={newItemLabel} type="text" onChange={e => updateNewItemLabel(e.target.value)} />
          <input type="submit" value="Add" />
        </form>
      </div>
    );
  }
}

export default connect(state => state, { addNewItem, removeItem, updateNewItemLabel })(App);
