import React, { Component } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import {arrayMoveImmutable} from 'array-move';
import './todoList.css';

const SortableItem = SortableElement(({ todo }) => todo);
const SortableList = SortableContainer(({ todos }) => {
  return (
    <div>
      {todos.map((todo, index) => (
        <SortableItem key={`todo-item-${index}`} index={index} todo={todo} />
      ))}
    </div>
  );
});

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

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState((currentState) => ({
      todos: arrayMoveImmutable(currentState.todos, oldIndex, newIndex),
    }), () => {
      this.saveToLocalStorage(this.state.todos);
    });
  };

  createTask = (newTask) => {
    // newTask = { task: "task1", id: "id1", isCompleted: false }
    let updatedTodos = [...this.state.todos, newTask];
    this.setState({
      todos: updatedTodos
    }, () => {
      this.saveToLocalStorage(updatedTodos);
    });
  }

  removeTask = (id) => {
    let updatedTodos = this.state.todos.filter((todo) => (
      todo.id !== id
    ))
    this.setState({
      todos: updatedTodos
    }, () => {
      this.saveToLocalStorage(updatedTodos);
    });
  }

  updateTask = (id, updatedTask) => {
    const updatedTodos = this.state.todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, task: updatedTask };
      } else {
        return todo;
      }
    });
    this.setState({ 
      todos: updatedTodos
    }, () => {
      this.saveToLocalStorage(updatedTodos);
    });
  }

  toggleTaskCompletion = (id) => {
    const updatedTodos = this.state.todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      } else {
        return todo;
      }
    });
    this.setState({ 
      todos: updatedTodos
    }, () => {
      this.saveToLocalStorage(updatedTodos);
    });
  }

  saveToLocalStorage(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  render() {
    const todos = this.state.todos.map((todo) => (
        <TodoItem
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
        <TodoForm createTask={this.createTask} />
        <SortableList 
          todos={todos} 
          onSortEnd={this.onSortEnd}
          distance={10}
        />
      </div>
    );
  }
}

export default TodoList;
