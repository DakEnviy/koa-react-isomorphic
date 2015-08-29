import { assert } from 'chai';
import reducer    from './todos';
import {
  addTodo,
  removeTodo,
  completeTodo,
  setTodos
} from './../actions/todos';

describe('Reducer: Todos', () => {
  it('should return the default state', () => {
    assert.deepEqual(
      reducer([], { type: 'ANOTHER_ACTION', random: 'random value' }),
      []
    );
  });

  it("should return a todos list with 1 todo item when calls 'addTodo' action", () => {
    assert.deepEqual(
      reducer([], addTodo('do chore')),
      [{ text: 'do chore', complete: false }]
    );
  });

  it("should return an empty todos list when calls 'removeTodo' action", () => {
    assert.deepEqual(
      reducer([{ text: 'do chore', complete: false }], removeTodo(0)),
      []
    );
  });

  it("should return an todos list when calls 'setTodos' action", () => {
    assert.deepEqual(
      reducer([], setTodos([{ text: 'do chore', complete: false }])),
      [{ text: 'do chore', complete: false }]
    );
  });

  it("should return a todos list with 1 completed todo when calls 'completeTodo' action", () => {
    assert.deepEqual(
      reducer([{ text: 'do chore', complete: false }], completeTodo(0)),
      [{ text: 'do chore', complete: true }]
    );
  });
});
