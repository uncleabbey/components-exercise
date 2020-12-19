import React, { Component } from "react";
import NewTodoForm from "./NewTodoForm";

export class EditTodo extends Component {
  state = {
    title: "",
    description: "",
    todo: {},
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { id } = this.props.match.params;
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    const todo = todos.find((todo) => todo.id === Number(id));
    todo.title = this.state.title;
    todo.description = this.state.description;
    localStorage.setItem("todos", JSON.stringify([...todos]));
    this.props.history.push("/todo");
  };
  componentDidMount() {
    const { id } = this.props.match.params;
    // console.log(id);
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    const todo = todos.find((todo) => todo.id === Number(id));
    this.setState({
      title: todo.title,
      description: todo.description,
    });
    // console.log(todo)
  }

  render() {
    const { description, title } = this.state;
    return (
      <div>
        <h1 className="header">Edit Form</h1>
        <NewTodoForm
          description={description}
          title={title}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default EditTodo;
