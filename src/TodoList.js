import React, { Component } from "react";
import Todo from './Todo';
import TodoForm from './TodoForm'

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = { todos: [
      {task: 'do 1'},
      {task: 'do 2'}
    ] };
  }

  createTask = (newTask) => {
    this.setState({
      todos: [...this.state.todos, newTask ]
    });
  } 

  render() {
    const todos = this.state.todos.map((todo, index) => (
      <Todo 
        key={index}
        task={todo.task}
      />
    ));
    return (
      <div >
        <h1>Todo List</h1>
        <TodoForm createTask={this.createTask}/>
        <ul>{todos}</ul>
      </div>
    );
  }
}

export default TodoList;
