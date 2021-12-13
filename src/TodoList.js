import React, { Component } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import './todoList.css';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      todos: []
    };
  }

  componentDidMount() {
    const todos = JSON.parse(localStorage.getItem('todos'));
    if (todos) {
      this.setState({
        todos: todos
      })
    }
  }

  createTask = (newTask) => {
    // newTask = { task: "task1", id: "id1", isCompleted: false }
    let updatedTodos = [...this.state.todos, newTask ];
    this.setState({
      todos: updatedTodos
    }, () => {
      this.saveToLocalStorage(updatedTodos);
    });
  } 

  saveToLocalStorage(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  removeTask = (id) => {
    this.setState({
      todos: this.state.todos.filter((todo) => (
        todo.id !== id
      ))
    });
  }

  updateTask = (id, updatedTask) => {
    const updatedTodos = this.state.todos.map((todo) => {
      if(todo.id === id) {
        return {...todo, task: updatedTask };
      } else {
        return todo;
      }
    });
    this.setState({ todos: updatedTodos });
  }

  toggleTaskCompletion = (id) => {
    const completedTodos = this.state.todos.map((todo) => {
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
      <TodoItem 
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
      <div className="todo-list">
        <h1>Todo List</h1>
        <TodoForm createTask={this.createTask}/>
        <ul>{todos}</ul>
      </div>
    );
  }
}

export default TodoList;
