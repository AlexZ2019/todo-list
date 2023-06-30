import * as React from "react";
import { context } from "./Provider";
import { motion, AnimatePresence } from "framer-motion";

const { useContext } = React;

export default function TodoList({ id }) {
  const { state, dispatch } = useContext(context);
  const itemsRef = React.useRef([]);

  React.useEffect(() => {
    itemsRef?.current[id.current.value]?.focus();
  }, [id]);

  function handleDelete(todo) {
    dispatch({ type: "DELETE_TODO", payload: todo.id });
  }

  function handleEdit(todo) {
    id.current.value = todo.id;
    dispatch({ type: "EDIT_TODO", payload: { id: todo.id, text: todo.text } });
  }

  function handleCheckboxClick(todo) {
    dispatch({ type: "TOGGLE_TODO_COMPLETED", payload: todo });
  }

  if (!state.todos) {
    return <div />;
  }

  return (
    <>
      <ul className="todo-list">
        {state.todos.map((todo) => {
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
                  ref={(el) => (itemsRef.current[todo.id] = el)}
                  value={todo.text}
                  onChange={(e) =>
                    handleEdit({ id: todo.id, text: e.target.value })
                  }
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
