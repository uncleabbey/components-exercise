import React from "react";

const NewTodoForm = ({ handleSubmit, title, handleChange, description }) => {
  return (
    <form onSubmit={handleSubmit} className="todo-form" >
      <div className="form-group">
        <label>Title</label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <br />
        <input
          type="text"
          id="description"
          name="description"
          value={description}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <button type="submit" className="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default NewTodoForm;
