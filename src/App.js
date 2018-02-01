import './App.css';

import React, { Component } from 'react';

import actions from './actions';
import { connect } from 'react-redux';

class App extends Component {
  componentDidMount() {
    const { fetchItems } = this.props;
    fetchItems();
  }

  componentDidUpdate(prevProps) {
    // Prevent losing focus when submitting an item.
    if (prevProps.addItemInProgress && !this.props.addItemInProgress) {
      this.input.focus();
    }
  }

  render() {
    const {
      items,
      itemInput,
      addItemInProgress,
      errorMessage,
      removeItem,
      onSubmitItem,
      onInputChange,
    } = this.props;
    return (
      <div className="App">
        {items.length === 0 ? "There's no item in the list, please add one. :)" : ''}
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.name}
              <button disabled={item.removingInProgress} onClick={() => removeItem(item.id)}>
                X
              </button>
            </li>
          ))}
        </ul>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmitItem();
          }}
        >
          <input
            ref={(input) => {
              this.input = input;
            }}
            disabled={addItemInProgress}
            value={itemInput}
            type="text"
            onChange={(e) => onInputChange(e.target.value)}
          />
          <input disabled={addItemInProgress} type="submit" value="Add" />
        </form>
        {errorMessage ? <div>{`Erreur : ${errorMessage}`}</div> : null}
      </div>
    );
  }
}

export default connect((state) => state, {
  onInputChange: actions.updateItemInput,
  onSubmitItem: actions.submitItem,
  removeItem: actions.removeItem,
  fetchItems: actions.fetchItems,
})(App);
