'use strict';

const { combineReducers } = require('redux');
const list = require('./list');

module.exports = combineReducers({
  list
});
