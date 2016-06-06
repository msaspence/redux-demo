'use strict';

const qs = require('qs');
const _ = {
  get: require('lodash/get')
};

const urlParams = module.exports = {

  getBaseBookingRef() {
    return urlParams._getParams().base_booking_ref || null;
  },

  getBaseBookingID() {
    return _.get(urlParams._getParams(), 'track.base_booking_id') || null;
  },

  _locationSearch() {
    return window.location.search;
  },

  _getParams() {
    return qs.parse(urlParams._locationSearch().substring(1));
  }

};
