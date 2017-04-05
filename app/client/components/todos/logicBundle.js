/* @flow */
import fetch from 'isomorphic-fetch';
import identity from 'lodash/identity';
import { createAction, handleActions } from 'redux-actions';
import globalizeSelectors from '../../helpers/globalizeSelectors';
import { getUrl } from '../../helpers/handleHTTP';
import type {
  AddTodoActionType,
  CompleteTodoActionType,
  RemoveTodoActionType,
  SetTodosActionType,
  ApiAddTodoActionType,
  TodoType
} from './types';

/* Constants */
export const mountPoint = 'todos';

/* Selectors */
export const selectors = globalizeSelectors({
  getTodos: identity,
}, mountPoint);

/* Types */
export const ADD_TODO = 'todos/ADD_TODO';
export const REMOVE_TODO = 'todos/REMOVE_TODO';
export const COMPLETE_TODO = 'todos/COMPLETE_TODO';
export const SET_TODOS = 'todos/SET_TODOS';

/* Actions */
export const addTodo: AddTodoActionType = createAction(ADD_TODO);
export const removeTodo: RemoveTodoActionType = createAction(REMOVE_TODO);
export const completeTodo: CompleteTodoActionType = createAction(COMPLETE_TODO);
export const setTodos: SetTodosActionType = createAction(SET_TODOS);
export const apiAddTodo: ApiAddTodoActionType = (text: string) => {
  return (dispatch: Function): Promise<TodoType> => {
    return fetch(getUrl('/api/v1/todo'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    })
      .then(res => res.json())
      .then(({ text: _text }: { text: string }) => dispatch(addTodo(_text)));
  };
};
export const fetchTodos = () => (dispatch: Function): Promise<TodoType[]> =>
  fetch(getUrl('/api/v1/todos'))
    .then(res => res.json())
    .then((res: TodoType[]) => dispatch(setTodos(res)));

/* Reducer */
export default handleActions({
  [ADD_TODO]: (state, { payload: text }) => [
    ...state, { text, complete: false },
  ],
  [REMOVE_TODO]: (state, { payload: index }) => [
    ...state.slice(0, index),
    ...state.slice(index + 1),
  ],
  [COMPLETE_TODO]: (state, { payload: index }) => [
    ...state.slice(0, index),
    { ...state[index], complete: !state[index].complete },
    ...state.slice(index + 1),
  ],
  [SET_TODOS]: (state, { payload: todos }) => todos,
}, []);
