import React, { Component } from "react";
import Todo from './Todo';
import TodoForm from './TodoForm'

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = { todos: [] };
  }

  createTask = (newTask) => {
    this.setState({
      todos: [...this.state.todos, newTask ]
    });
  } 

  removeTask = (id) => {
    this.setState({
      todos: this.state.todos.filter(todo => (
        todo.id !== id
      ))
    });
  }

  render() {
    const todos = this.state.todos.map((todo) => (
      <Todo 
        key={todo.id}
        task={todo.task}
        removeTask={this.removeTask}
        id={todo.id}
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
