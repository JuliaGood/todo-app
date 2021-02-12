import React, { Component } from "react";
import Todo from './Todo';
import TodoForm from './TodoForm'
import './TodoList.css';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = { todos: [] };
  }

  createTask = (newTask) => {
    // newTask = { task: "lalala", id: "123", isCompleted: false }
    // ALWAYS the property isCompleted: false !!!
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

  updateTask = (id, updatedTask) => {
    const updatedTodos = this.state.todos.map(todo => {
      if(todo.id === id) {
        return {...todo, task: updatedTask };
      } else {
        return todo;
      }
    });
    this.setState({ todos: updatedTodos });
  }

  toggleTaskCompletion = (id) => {
    const completedTodos = this.state.todos.map(todo => {
      if(todo.id === id) {
        return {...todo, isCompleted: !todo.isCompleted };
      } else {
        return todo;
      }
    });
    this.setState({ todos: completedTodos });
  }

  render() {
    const todos = this.state.todos.map((todo) => (
      <Todo 
        key={todo.id}
        task={todo.task}
        removeTask={this.removeTask}
        id={todo.id}
        updateTask={this.updateTask}
        completed={todo.isCompleted}
        completedTask={this.toggleTaskCompletion}
      />
    ));
    return (
      <div className="TodoList">
        <h1>Todo List</h1>
        <TodoForm createTask={this.createTask}/>
        <ul>{todos}</ul>
      </div>
    );
  }
}

export default TodoList;
