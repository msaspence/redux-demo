'use strict';

const {
  ADD_LIST_ITEM,
  DELETE_LIST_ITEM,

} = require('./actionTypes');

module.exports = {

  addListItem(text) {
    return {
      type: ADD_LIST_ITEM,
      payload: text
    };
  },

  deleteListItem(id) {
    return {
      type: DELETE_LIST_ITEM,
      payload: id
    };
  }

};
