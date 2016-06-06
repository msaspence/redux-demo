'use strict';

const bugsnag = require('bugsnag-js');
const config = require('config');

const { apiKey, releaseStages, releaseStage } = config.bugsnag;

bugsnag.apiKey = apiKey;
bugsnag.releaseStages = releaseStages;
bugsnag.releaseStage = releaseStage;
