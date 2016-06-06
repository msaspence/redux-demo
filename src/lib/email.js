'use strict';
const config = require('config');
const hapiClient = require('./hapiClient');

module.exports = {

  sendWelcomeEmail(state) {
    hapiClient.util.request('post', '/dispatch/email', this._getWelcomeEmailParams(state), function(err) {
      if (err) {
        window.Bugsnag.notify('EmailDispatchError', 'Error with heha welcome email', { error: err }, 'error');
      }
    });
  },

  _getWelcomeEmailParams(state) {

    var emailUrl = config.render.emails.base + config.render.emails.paths.heha_welcome;
    var bookingRef = state.legacy.trip.baseBookingRef;
    var railsBookingId = state.legacy.trip.baseBookingId;
    var email = state.legacy.trip.emailAddress;

    var params = {
      client: 'TRIPPLANNER',
      from: {
        name: 'HEHA!',
        email: 'heha@holidayextras.com'
      },
      to: {
        name: state.legacy.trip.firstName,
        email: email
      },
      subject: 'Welcome to HEHA!',
      body: {
        html: {
          location: `${emailUrl}?booking_ref=${bookingRef}&email=${encodeURIComponent(email)}&product_type=carparks&agent=WK741&heha_id=${railsBookingId}`
        }
      },
      archive: true,
      archiveLabel: bookingRef,
      type: 'HehaWelcome',
      tracking: {
        categories: ['heha_welcome']
      }
    };

    return params;
  }
};
