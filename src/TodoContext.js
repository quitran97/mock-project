import React, { createContext, useReducer, useEffect, useContext } from "react";

const fetchFakeTodos = userId => {
  return Promise.resolve([
    { id: 1, body: "Todo 1", isCompleted: false },
    { id: 2, body: "Todo 2", isCompleted: true }
  ]);
};

export const TodoContext = createContext();
export const TodoActionContext = createContext();

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw Error("....");
  }
  return context;
};

export const useTodosToDisplaySelector = () => {
  const { filterState, todos } = useTodoContext();
  let todosToDisplay;
  if (filterState === "All") {
    todosToDisplay = todos;
  } else if (filterState === "Active") {
    todosToDisplay = todos.filter(({ isCompleted }) => !isCompleted);
  } else if (filterState === "Completed") {
    todosToDisplay = todos.filter(({ isCompleted }) => isCompleted);
  }
  return todosToDisplay;
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "ADD_TODOS":
      return {
        ...state,
        todos: payload
      };
    case "ADD_TODO":
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: Date.now(), body: payload, isCompleted: false }
        ]
      };
    case "REMOVE_TODO": {
      return {
        ...state,
        todos: state.todos.filter(({ id }) => id !== payload)
      };
    }
    case "CHANGE_FILTER_STATE":
      return {
        ...state,
        filterState: payload
      };
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === payload) {
            return {
              ...todo,
              isCompleted: !todo.isCompleted
            };
          }
          return todo;
        })
      };
    default:
      return state;
  }
};

const initialState = {
  todos: [],
  filterState: "All"
};

const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const userId = 1;

  useEffect(() => {
    if (userId) {
      fetchFakeTodos(userId).then(res => {
        dispatch({
          type: "ADD_TODOS",
          payload: res
        });
      });
    }
  }, [userId]);

  return (
    <TodoContext.Provider value={state}>
      <TodoActionContext.Provider value={dispatch}>
        {children}
      </TodoActionContext.Provider>
    </TodoContext.Provider>
  );
};

export default TodoProvider;
