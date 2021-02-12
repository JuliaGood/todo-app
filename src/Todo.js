import React, { Component } from "react";
import './Todo.css';

class Todo extends Component {
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
    let result;
    if(this.state.isEditing) {
      result = (
        <div className="Todo">
          <form onSubmit={this.handleUpdate} className='TodoForm'>
            <input 
              type='text'
              name="task"
              value={this.state.task}
              onChange={this.editingChange}
            />
            <button>Save</button>
          </form>
        </div>
      )
    } else {
    result = (
      <div className="Todo">
        <li className={this.props.completed ? 'Todo-task completed' : 'Todo-task'}
          onClick={this.toggleTask}
        >
          {this.props.task}
        </li>
        <div className='Todo-btns'>
          <button onClick={this.toggleForm}>
            <i className='fas fa-pen' />
          </button>
          <button onClick={this.handleRemove}>
          <i className='fas fa-trash' />
          </button>
        </div>

      </div>
    );
    }
    return result;
  }
}

export default Todo;
