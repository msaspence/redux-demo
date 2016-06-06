'use strict';

const tracker = require('tracker');

tracker.initialise({ env: process.env.DEPLOY_ENV, service: 'trip-planner' });
