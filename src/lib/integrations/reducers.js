'use strict';

const _ = {
  each: require('lodash/each'),
  fromPairs: require('lodash/fromPairs'),
  includes: require('lodash/includes'),
  map: require('lodash/map'),
  merge: require('lodash/merge'),
  transform: require('lodash/transform')
};

var reducers = module.exports = {};

reducers.createIntegrationFetchReducer = function(integration, subject) {
  return function(state, action) {
    state = state || {
      errored: false,
      expiresAt: false,
      expired: false,
      fetching: false,
      fetched: false,
      lastError: null,
      lastErroredAt: null,
      lastFetchedAt: null
    };

    if (action && action.meta && action.meta.integration === integration && action.meta.subject === subject && action.meta.verb) {

      switch (action.meta.verb) {

      case 'REQUEST':
        return _.merge({}, state, {
          errored: false,
          fetching: true
        });

      case 'RECEIVE':
        if (action.error) {
          return _.merge({}, state, {
            fetching: false,
            errored: true,
            lastError: action.payload,
            lastErroredAt: new Date()
          });
        }
        return _.merge({}, state, {
          fetching: false,
          errored: false,
          fetched: true,
          lastFetchedAt: new Date()
        });
      }
    }

    return state;
  };
};
