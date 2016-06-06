'use strict';
var config = require('./webpack.config.js');
var path = require('path');

config.entry = path.resolve('./test/index.js');

config.output.filename = 'index.test.js';

config.module.loaders = [
  {
    test: require.resolve('sinon'),
    loader: 'expose?sinon'
  },
  {
    test: /\.jsx?$/,
    exclude: /(test|node_modules)\//,
    loader: 'isparta'
  }
].concat(config.module.loaders);

config.resolve = {
  alias: {
    sinon: require.resolve('sinon'),
    config: path.join(__dirname, 'src', 'config', process.env.DEPLOY_ENV || process.env.NODE_ENV || 'development')
  }
};

config.externals = {
  'jsdom': 'window',
  'react/lib/ExecutionEnvironment': true,
  'react/lib/ReactContext': true
};

module.exports = config;
