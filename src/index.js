import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import "./tailwind.css";
import TodoProvider from "./TodoContext";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <TodoProvider>
      <App />
    </TodoProvider>
  </React.StrictMode>,
  rootElement
);
