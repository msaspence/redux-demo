'use strict';

/**
 * This i18n class is a bit weird in that it
 * returns a class but is used like a singleton.
 *
 */

const enLocale = require('../translations/en');

const _ = {
  forEach: require('lodash/each')
};


const I18n = module.exports = function(options) {
  options = options || {};
  // Determine locale and load a translation file for it.
  // var localeString = (window.locale || navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage || 'en').toLowerCase();
  // var prefix = localeString.substring(0, 2);

  // Default to English
  this._translations = options.translations || enLocale;
};

I18n.prototype.localise = function(key, params) {
  params = params || {};

  if (!key) return '';

  var trans = this._translations[key];

  if (!trans) {
    trans = key.replace(/\_/g, ' ');
  }

  _.forEach(params, function(value, index) {
    trans = trans.replace(new RegExp('\\' + index, 'g'), value);
  });

  return trans;
};

I18n.localise = function(key, params) {
  if (!I18n.instance) {
    I18n.instance = new I18n();
  }
  return I18n.instance.localise(key, params);
};
