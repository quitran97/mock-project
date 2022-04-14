import React, { useState, useContext } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { TodoActionContext } from "./TodoContext";

const TodoForm = () => {
  const [input, setInput] = useState("");
  const dispatch = useContext(TodoActionContext);

  const handleSubmit = e => {
    e.preventDefault();

    if (!input) {
      return;
    }

    dispatch({
      type: "ADD_TODO",
      payload: input
    });

    setInput("");
  };

  return (
    <form
      className="bg-white w-2/3 mx-auto shadow p-6 rounded-lg"
      onSubmit={handleSubmit}
    >
      <header className="text-2xl font-bold text-center">Todo Form</header>

      <TextField
        fullWidth //
        id="add-todo-input"
        label="Add Todo"
        onChange={e => setInput(e.target.value)}
        value={input}
      />

      <Button
        type="submit"
        color="primary"
        variant="contained"
        fullWidth
        disableElevation
        classes={{ root: "mt-4 normal-case" }}
      >
        Submit
      </Button>
    </form>
  );
};

export default TodoForm;
