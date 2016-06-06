'use strict';

const webpack = require('webpack');
const path = require('path');
// const minifyReact = new webpack.DefinePlugin({ 'process.env': { 'NODE_ENV': JSON.stringify('production') } }); // This has effect on the react lib size
process.env.NODE_ENV = (process.env.NODE_ENV || 'development');

const config = {
  entry: path.resolve('./src/index.jsx'),
  output: {
    filename: 'index.js',
    path: path.resolve('./dist'),
    devtoolModuleFilenameTemplate: '[resource-path]'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'BUGSNAG_API_KEY': JSON.stringify(process.env.BUGSNAG_API_KEY),
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'DEPLOY_ENV': JSON.stringify(process.env.DEPLOY_ENV || process.env.NODE_ENV)
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true
        }
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.json$/,
        loader: require.resolve('json-loader')
      }
    ]
  },
  resolve: {
    alias: {
      config: path.join(__dirname, 'src', 'config', process.env.DEPLOY_ENV || process.env.NODE_ENV || 'development')
    }
  },
  devtool: 'cheap-module-source-map',
  recordsPath: path.resolve('/tmp/webpack.json'),
  devServer: {
    stats: {
      colors: true,
      chunks: false
    }
  }
};

if (process.env.DEPLOY_ENV === 'production') {
  config.plugins.push(new webpack.optimize.DedupePlugin());
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }));
}

module.exports = config;
