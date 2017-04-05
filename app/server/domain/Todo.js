/* @flow */
// noinspection JSUnresolvedVariable
import { Model, DataTypes } from 'sequelize';
import { Options, Attributes } from 'sequelize-decorators';
import sequelize from '../infrastructure/database';

@Options({
  sequelize,
  tableName: 'todos',
  timestamps: false,
})
@Attributes({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  text: DataTypes.STRING,
  complete: DataTypes.BOOLEAN,
})
export default class Todo extends Model {}
