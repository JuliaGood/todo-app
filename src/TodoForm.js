import React, { Component } from "react";
import { v4 as uuidv4 } from 'uuid';

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
    const newTask = {...this.state, id: uuidv4(), completed: false }
    this.props.createTask(newTask);
    this.setState({ task: '' })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="taskId">New Task:</label>
        <input
          type="text"
          name='task'
          value={this.state.task}
          placeholder="new task to do"
          id="taskId"
          onChange={this.handleChange}
        />
        <button>Add Task</button>
      </form>
    );
  }
}

export default TodoForm;
