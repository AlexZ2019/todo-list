import * as React from "react";

import TodoList from "./TodoList";
import NewTodo from "./NewTodo";
import { useDispatch } from "react-redux";

const { useContext } = React;

export default function Todo() {
  const dispatch = useDispatch();
  function handleClearButtonClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    dispatch({ type: "CLEAR_TODOS" });
  }

  return (
    <>
      <button onClick={handleClearButtonClick}>Clear items</button>
      <TodoList />
      <NewTodo />
    </>
  );
}
