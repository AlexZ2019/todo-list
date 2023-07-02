import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Todo } from "./interfaces";
import TodoItem from "./TotoItem";
const TodoList = () => {
  // @ts-ignore
  const todos = useSelector((state) => state.TodoReducer.todos)
  const dispatch = useDispatch();

  function handleDelete(todo: Todo) {
    dispatch({ type: "DELETE_TODO", payload: todo.id });
  }

  function handleCheckboxClick(todo: Todo) {
    dispatch({ type: "TOGGLE_TODO_COMPLETED", payload: todo });
  }

  const onChange = useCallback((id, text) => {
    dispatch({ type: "EDIT_TODO", payload: { id, text } });
  }, [])

  if (!todos) {
    return <div/>
  }

  return (
    <>
      <ul className="todo-list">
        {todos.map((todo: Todo) => {
          return (
            <TodoItem
              key={todo.id}
              handleDelete={handleDelete}
              handleCheckboxClick={handleCheckboxClick}
              todo={todo}
              onChange={onChange}
            />
          )})}
      </ul>
    </>
  )

}
export default TodoList;
