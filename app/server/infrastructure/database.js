import { Sequelize } from 'sequelize';
import config from '../../../config/initializers/db';

const sequelize = new Sequelize(config);

// noinspection JSUnresolvedFunction
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.'); // eslint-disable-line no-console
  })
  .catch(err => {
    console.log('Unable to connect to the database:', err); // eslint-disable-line no-console
  });

export default sequelize;
