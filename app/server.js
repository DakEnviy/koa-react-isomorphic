/* @flow */
/* global process */
import http from 'http';
import './server/infrastructure';
import app from './server/infrastructure/app';

const server = http.createServer(app.callback());

const PORT = process.env.PORT || 3000;
// $FlowFixMe
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`); // eslint-disable-line no-console
});
