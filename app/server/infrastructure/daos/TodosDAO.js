/* @flow */
import DataLoader from 'dataloader';
import Todo from '../../domain/Todo';

type TodoRawType = {
  id: number,
  text: string,
  complete: boolean,
  toJSON: Function
};
type TodoOutType = {
  id: number,
  text: string,
  complete: boolean,
};

// noinspection JSUnresolvedFunction
const builder = (todo: TodoRawType): TodoOutType =>
  todo.toJSON();

const dataloader = new DataLoader(
  // $FlowFixMe
  (ids: number[]): Promise<Array<TodoOutType | Error>> => {
    return Todo.findAll({ where: { id: ids } })
      .then(todos => todos.map(builder));
  }
);

export const count = (): Promise<number> => Todo.count();

export const all = (): Promise<TodoOutType[]> => Todo.findAll().then(todos => todos.map(builder));

export const add = (text: string): Promise<TodoOutType> => {
  return Todo.create({ text, complete: false }).then(builder);
};

export const getById = (id: number): Promise<TodoOutType> => dataloader.load(id);

export const getByIds = (ids: number[]): Promise<TodoOutType[]> => dataloader.loadMany(ids);
