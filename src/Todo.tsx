import * as React from "react";

import TodoList from "./TodoList";
import NewTodo from "./NewTodo";
import { useDispatch, useSelector } from "react-redux";
import { getTodos } from "./Redux/selectors";

export default function Todo() {
  const todos = useSelector(getTodos);
  const dispatch = useDispatch();
  function handleClearButtonClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    dispatch({ type: "CLEAR_TODOS" });
  }

  React.useEffect(() => {
    const todos: string = window.localStorage.getItem("todos") || "";
    dispatch({
      type: "SET_TODOS",
      payload: JSON.parse(todos)
    });
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <button onClick={handleClearButtonClick}>Clear items</button>
      <TodoList />
      <NewTodo />
    </>
  );
}
