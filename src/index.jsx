'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const { createStore, applyMiddleware, compose } = require('redux');
const { Provider } = require('react-redux');
const ReduxThunk = require('redux-thunk').default;
const reducers = require('./reducers');

const App = require('./containers/App.jsx');

const createStoreWithMiddleware = compose(
  applyMiddleware(ReduxThunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);
const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('application'));
