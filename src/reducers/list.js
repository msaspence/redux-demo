'use strict';

const _ = {
  size: require('lodash/size'),
  max: require('lodash/max')
}
const {
  ADD_LIST_ITEM,
  DELETE_LIST_ITEM
} = require('../actionTypes');

module.exports = function(state, action) {
  state = Object.assign({}, state || {});

  if (action.type === 'ADD_LIST_ITEM') {
    state[parseInt(_.max(Object.keys(state))) + 1 || 0] = action.payload;
  }

  if (action.type === 'DELETE_LIST_ITEM') {
    delete state[action.payload];
  }

  return state;
};
