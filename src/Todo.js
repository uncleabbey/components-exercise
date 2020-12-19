import React, { Component } from "react";
import NewTodoForm from "./NewTodoForm";
import { Link } from "react-router-dom";

const Todo = ({
  id,
  title,
  isComplete,
  description,
  handleChange,
  handleDelete,
}) => {
  return (
    <div className="todo">
      <input
        id={id}
        type="checkbox"
        name="isComplete"
        className="checkbox"
        checked={isComplete}
        onChange={handleChange}
      />
      <div className={isComplete ? "isComplete" : ""}>
        <span>{title}</span>
        <p>{description}</p>
      </div>

      <Link to={`/todo/edit/${id}`}>
        <button className="edit-btn">Edit</button> </Link>
      <button className="delete" id={id} onClick={handleDelete}>
        X
      </button>
    </div>
  );
};

const changeEle = (arr, id) => {
  const todo = arr.find((item) => item.id === Number(id));
  if (todo.isComplete) {
    todo.isComplete = false;
  } else {
    todo.isComplete = true;
  }
  return arr;
};

export class TodoList extends Component {
  state = {
    todolist: [],
    title: "",
    description: "",
  };
  handleChange = (e) => {
    const { id } = e.target;
    this.setState({
      todolist: changeEle(this.state.todolist, id),
    });
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    localStorage.setItem("todos", JSON.stringify(changeEle(todos, id)))
  };
  handleDelete = (e) => {
    const { id } = e.target;
    this.setState({
      todolist: this.state.todolist.filter((todo) => todo.id !== Number(id)),
    });
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    localStorage.setItem("todos", JSON.stringify(todos.filter((todo) => todo.id !== Number(id))))
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      id: Math.floor(Math.random() * 100),
      isComplete: false,
      title: this.state.title,
      description: this.state.description,
    };
    this.setState({
      todolist: [data, ...this.state.todolist],
      title: "",
      description: "",
    });
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    localStorage.setItem("todos", JSON.stringify([data, ...todos]))
  };
  componentDidMount() {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];

    this.setState({
      todolist: todos
    });
  }
  
  render() {
    const { title, description } = this.state;
    return (
      <div>
        <h1 className="header">Todo List</h1>
        <div className="add-todo">
          <NewTodoForm
            title={title}
            description={description}
            handleChange={this.onChange}
            handleSubmit={this.handleSubmit}
          />
        </div>
        {this.state.todolist.map(({ id, title, isComplete, description }) => (
          <Todo
            key={id}
            id={id}
            title={title}
            description={description}
            isComplete={isComplete}
            handleChange={this.handleChange}
            handleDelete={this.handleDelete}
          />
        ))}
      </div>
    );
  }
}

export default TodoList;
