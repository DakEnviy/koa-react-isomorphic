/* @flow */
import React from 'react';
import type { ApiAddTodoActionType } from './types';

export default class TodosAdd extends React.PureComponent {
  state: { todo: string } = {
    todo: '',
  };

  props: {
    apiAddTodo: ApiAddTodoActionType;
  };

  updateTodo(e: Object) {
    this.setState({ todo: e.target.value });
  }

  addTodo() {
    this.props.apiAddTodo(this.state.todo);
    this.setState({ todo: '' });
  }

  render() {
    return (
      <div className="gr-12@md">
        <div className="form-inline">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Todo"
              value={this.state.todo} onChange={this.updateTodo.bind(this)}
            />
          </div>
          <button type="button" className="btn btn-success" onClick={this.addTodo.bind(this)}>Add todo</button>
        </div>
      </div>
    );
  }
}
