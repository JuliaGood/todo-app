import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './TodoForm.css';

class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = { task: '' };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {...this.state, id: uuidv4(), isCompleted: false };
    if(newTask.task !== '') {
      this.props.createTask(newTask);
      this.resetForm();
    }
  }

  resetForm = () => {
    this.setState({ task: '' });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="todo-form">
        <label htmlFor="taskId">New Task:</label>
        <input
          type="text"
          name="task"
          value={this.state.task}
          placeholder="new task to do"
          id="taskId"
          onChange={this.handleChange}
          autoComplete="off"
        />
        <button>
          <i className="fas fa-plus" />
        </button>
      </form>
    );
  }
}

export default TodoForm;
