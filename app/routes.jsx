/* @flow */
import React from 'react';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory, createMemoryHistory, Router, Route } from 'react-router';

export const getClientHistory = (store: Object): Object =>
  syncHistoryWithStore(browserHistory, store);

export const getServerHistory = (store: Object, url: string): Object =>
  syncHistoryWithStore(createMemoryHistory(url), store);

export const getRoutes = (history: Object, options: Object = {}): Object => (
  <Router history={history} {...options}>
    <Route
      path="/"
      getComponent={(nextState, cb) => {
        // $FlowFixMe
        require.ensure([], (require) => {
          cb(null, require('./client/components/todos').default);
        }, 'todos-page');
      }}
    />
    <Route
      path="/static-page"
      getComponent={(nextState, cb) => {
        // $FlowFixMe
        require.ensure([], (require) => {
          cb(null, require('./client/components/static-page').default);
        }, 'static-page');
      }}
    />
  </Router>
);
