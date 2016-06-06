'use strict';

const React = require('react');
const { connect } = require('react-redux');
const _ = {
  map: require('lodash/map')
}
const {
  addListItem,
  deleteListItem
} = require('../actions')

var App = React.createClass({

  propTypes: {},

  handleAddListItem(event) {
    this.props.dispatch(addListItem(this.refs.text.value));
    this.refs.text.value = "";
  },

  handleRemoveListItem(event) {
    this.props.dispatch(deleteListItem(event.target.getAttribute("data-id")));
  },

  render() {
    const { hasItems, items } = this.props;
    const linkStyle = { color: "blue", textDecoration: "underline", cursor: "pointer" };

    return (
      <div>
        {hasItems && <div>
          <h1>The List</h1>
          <ul>
            {_.map(items, (value, key) => {
              return (<li key={key}>
                <span>{parseInt(key)+1}: {value}&nbsp;</span>
                <span style={linkStyle} onClick={this.handleRemoveListItem} data-id={key}>Remove Item</span>
              </li>);
            })}
          </ul>
        </div>}
        {!hasItems && <h1>There are no items in the list yet.</h1>}
        <form onSubmit={function(event) { event.preventDefault() }}>
          <input type="text" ref="text"/>
          <input type="submit" onClick={this.handleAddListItem} value="Add Item" />
        </form>
      </div>
    );
  }

});

function mapStateToProps(state) {
  const { list } = state;
  return {
    hasItems: list && (Object.keys(list).length > 0),
    items: list
  };
}

module.exports = connect(mapStateToProps)(App);
