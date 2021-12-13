import React, { Component } from 'react';
import './todoItem.css';

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      task: this.props.task
    }
  }

  handleRemove = () => {
    this.props.removeTask(this.props.id);
  }

  toggleForm = () => {
    this.setState({ isEditing: !this.state.isEditing })
  }

  handleUpdate = (e) => {
    e.preventDefault();
    // take new task data and pass up to parent
    this.props.updateTask(this.props.id, this.state.task);
    this.setState({ isEditing: false })
  }

  editingChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  toggleTask = () => {
    this.props.completedTask(this.props.id);
  }

  render() {
    if (this.state.isEditing) {
      return (
        <div className="todo">
          <form onSubmit={this.handleUpdate} className="todo-form">
            <input
              type='text'
              name="task"
              value={this.state.task}
              onChange={this.editingChange}
              autoComplete="off"
            />
            <button>Save</button>
          </form>
        </div>
      )
    } else {
      return (
        <div className="todo">
          <div className={this.props.completed ? "todo-task completed" : "todo-task"}
            onClick={this.toggleTask}
          >
            {this.props.task}
          </div>
          <div className="todo-btns">
            <button onClick={this.toggleForm}>
              <i className="fas fa-pen" />
            </button>
            <button onClick={this.handleRemove}>
              <i className="fas fa-trash" />
            </button>
          </div>

        </div>
      );
    }
  }
}

export default TodoItem;
