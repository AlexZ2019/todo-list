import * as React from "react";
import { useDispatch } from "react-redux";

const { useState, useContext } = React;

export default function NewTodo() {
  const [todo, setTodo] = useState("");
  const dispatch  = useDispatch();

  function handleSubmit(event: { preventDefault: () => void; }) {
    event.preventDefault();
    setTodo('');
    dispatch({ type: "ADD_TODO", payload: todo });
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.keyCode === 13) {
      handleSubmit(event);
    }
  }

  return (
    <>
      <input
        type="text"
        value={todo}
        onChange={e => setTodo(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSubmit}>Add</button>
    </>
  );
};
