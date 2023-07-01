import * as React from "react";
import { context } from "./Provider";
import { motion, AnimatePresence } from "framer-motion";
import { Todo } from "./interfaces";

const { useContext } = React;

export default function TodoList() {
  const { state, dispatch } = useContext(context);

  function handleDelete(todo: Todo) {
    dispatch({ type: "DELETE_TODO", payload: todo.id });
  }

  function handleEdit(todo: Todo) {
    // dispatch({ type: "EDIT_TODO", payload: { id: todo.id, text: todo.text } });
  }

  function handleCheckboxClick(todo: Todo) {
    dispatch({ type: "TOGGLE_TODO_COMPLETED", payload: todo });
  }

  if (!state.todos) {
    return <div />;
  }

  return (
    <>
      <ul className="todo-list">
        {state.todos.map((todo: Todo) => {
          return (
            <AnimatePresence exitBeforeEnter key={todo.id}>
              <motion.li
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="todo-list__item"
              >
                <span onClick={() => handleCheckboxClick(todo)}>
                  {todo.completed ? (
                    <span className="todo-list__item__completed" />
                  ) : (
                    <span className="todo-list__item__not-completed" />
                  )}
                </span>
                <input
                  value={todo.text}
                />
                <span
                  className="todo-list__item__delete-button"
                  onClick={() => handleDelete(todo)}
                >
                  X
                </span>
              </motion.li>
            </AnimatePresence>
          );
        })}
      </ul>
    </>
  );
}
