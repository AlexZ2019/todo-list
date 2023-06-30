import * as React from "react";
import { context } from "./Provider";

import TodoList from "./TodoList";
import NewTodo from "./NewTodo";

const { useContext } = React;

export default function Todo() {
  const { dispatch } = useContext(context);
  const id = React.useRef({
    value: 0
  });
  function handleClearButtonClick(event) {
    event.preventDefault();

    dispatch({ type: "CLEAR_TODOS" });
  }

  return (
    <>
      <button onClick={handleClearButtonClick}>Clear items</button>
      <TodoList id={id} />
      <NewTodo />
    </>
  );
}
