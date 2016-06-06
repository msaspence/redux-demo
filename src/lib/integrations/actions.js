'use strict';

const { REQUEST, RECEIVE } = require('./constants');

module.exports = {

  createIntegrationFetchAction(integration, subject, fetchProc) {

    return function() {
      const calledWithArguments = arguments;

      return function(dispatch) {
        const request = function() {
          return {
            type: `${integration}:${REQUEST}_${subject}`,
            meta: {
              integration: integration,
              verb: REQUEST,
              subject: subject
            }
          };
        };

        const receive = function() {
          return {
            type: `${integration}:${RECEIVE}_${subject}`,
            meta: {
              integration: integration,
              verb: RECEIVE,
              subject: subject
            }
          };
        };

        const error = function(err) {
          if (typeof err === 'string') {
            err = new Error(err);
          }
          return {
            type: `${integration}:${RECEIVE}_${subject}`,
            error: true,
            payload: err,
            meta: {
              integration: integration,
              verb: RECEIVE,
              subject: subject
            }
          };
        };

        const args = [dispatch, { request, receive, error }];
        args.push.apply(args, calledWithArguments);
        return fetchProc.apply(this, args);
      };
    };

  }
};
