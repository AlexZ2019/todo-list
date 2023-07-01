import { AnimatePresence, motion } from "framer-motion";
import * as React from "react";
import { Todo } from "./interfaces";
import { Actions } from "./Provider";
import { FC, useState } from "react";

type PropsType = {
  todo: Todo,
  dispatch: React.Dispatch<Actions>
}
const TotoItem: FC<PropsType> = ({todo, dispatch}) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [todoText, setTodoText] = useState<string>(todo.text || "");
  function handleDelete(todo: Todo) {
    dispatch({ type: "DELETE_TODO", payload: todo.id });
  }

  function updateTodo() {
    dispatch({ type: "EDIT_TODO", payload: { id: todo.id, text: todoText } });
    setIsEdit(false);
  }

  function handleCheckboxClick(todo: Todo) {
    dispatch({ type: "TOGGLE_TODO_COMPLETED", payload: todo });
  }

  return <AnimatePresence exitBeforeEnter key={todo.id}>
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
      {!isEdit
        ? todoText
        : <input
          value={todoText}
          onChange={(e => setTodoText(e.target.value))}
        />
      }
      {!isEdit
        ? <button onClick={() => setIsEdit(true)}>Edit</button>
        : <button onClick={updateTodo}>Save</button>
      }
      <span
        className="todo-list__item__delete-button"
        onClick={() => handleDelete(todo)}
      >
                  X
                </span>
    </motion.li>
  </AnimatePresence>
}

export default TotoItem;
