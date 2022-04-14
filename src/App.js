import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import CheckCircleOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";
import {
  TodoActionContext,
  useTodoContext,
  useTodosToDisplaySelector
} from "./TodoContext";
import TodoForm from "./TodoForm";
import { IconButton } from "@material-ui/core";

const App = () => {
  const state = useTodoContext();
  const dispatch = useContext(TodoActionContext);

  const { filterState } = state;

  const todosToDisplay = useTodosToDisplaySelector();

  const handleDelete = todoIdToDelete => () => {
    dispatch({
      type: "REMOVE_TODO",
      payload: todoIdToDelete
    });
  };

  const handleFilterStateChange = filterState => () => {
    dispatch({
      type: "CHANGE_FILTER_STATE",
      payload: filterState
    });
  };

  const handleToggle = todoIdToToggle => () => {
    dispatch({
      type: "TOGGLE_TODO",
      payload: todoIdToToggle
    });
  };

  return (
    <main className="bg-gray-400 min-h-screen">
      <section style={{ width: "500px" }} className="pt-10 mx-auto">
        <TodoForm />
      </section>

      <section style={{ width: "500px" }} className="pt-10 mx-auto">
        <div className="bg-white w-2/3 mx-auto shadow p-6 rounded-lg">
          <header className="text-2xl font-bold text-center">Todo List</header>

          <section className="flex justify-center pt-4">
            <Button
              color="secondary"
              variant={filterState === "All" ? "contained" : "outlined"}
              disableElevation
              classes={{ root: "normal-case" }}
              onClick={handleFilterStateChange("All")}
            >
              All
            </Button>
            <Button
              color="secondary"
              variant={filterState === "Active" ? "contained" : "outlined"}
              disableElevation
              classes={{ root: "ml-2 normal-case" }}
              onClick={handleFilterStateChange("Active")}
            >
              Active
            </Button>
            <Button
              color="secondary"
              variant={filterState === "Completed" ? "contained" : "outlined"}
              disableElevation
              classes={{ root: "ml-2 normal-case" }}
              onClick={handleFilterStateChange("Completed")}
            >
              Completed
            </Button>
          </section>

          <ul className="pt-4">
            {todosToDisplay.map(({ id, body, isCompleted }) => (
              <li key={id} className="flex justify-between">
                <div className="flex items-center">
                  {isCompleted ? (
                    <IconButton
                      classes={{ root: "p-1" }}
                      onClick={handleToggle(id)}
                    >
                      <CheckCircleOutlinedIcon
                        classes={{ root: "fill-current text-green-500" }}
                      />
                    </IconButton>
                  ) : (
                    <IconButton
                      classes={{ root: "p-1" }}
                      onClick={handleToggle(id)}
                    >
                      <RadioButtonUncheckedIcon />
                    </IconButton>
                  )}

                  <p
                    className={`pl-2 ${isCompleted &&
                      "line-through text-gray-600"}`}
                  >
                    {body}
                  </p>
                </div>
                <IconButton
                  classes={{ root: "p-1" }}
                  onClick={handleDelete(id)}
                >
                  <ClearOutlinedIcon
                    classes={{ root: "fill-current text-red-500" }}
                  />
                </IconButton>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
};

export default App;
