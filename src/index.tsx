import * as React from "react";
import { render } from "react-dom";

import Todo from "./Todo";

import "./styles.css";
import { Provider } from "react-redux";
import store from "./Redux/Store";

function App() {
  return (
    <div className="container">
      <h1>Todo</h1>
      <Provider store={store}>
        <Todo />
      </Provider>
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
