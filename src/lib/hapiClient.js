'use strict';

var HapiClient = require('hapi-sdk');
var config = require('config');

module.exports = new HapiClient(config.hapi.token, config.hapi.options);
