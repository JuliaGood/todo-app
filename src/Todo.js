import React, { Component } from "react";

class Todo extends Component {
  constructor(props) {
    super(props);
  }

  handleRemove = () => {
    this.props.removeTask(this.props.id);
  }

  render() {
    return (
      <div >
        <li>{this.props.task}</li>
        <button>Edit</button>
        <button onClick={this.handleRemove}>Delete</button>
      </div>
    );
  }
}

export default Todo;
