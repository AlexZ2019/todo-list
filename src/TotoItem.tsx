import React, { FC, memo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Todo } from "./interfaces";

type Props = {
  todo: Todo,
  onChange: (id: number, text: string) => void,
  handleCheckboxClick: (todo: Todo) => void,
  handleDelete: (todo: Todo) => void
}

const TodoItem: FC<Props> = memo(({todo, onChange, handleCheckboxClick, handleDelete}) => {

  return (
    <AnimatePresence exitBeforeEnter>
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
          onChange={e => onChange(todo.id, e.target.value)}
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
  )
});

export default TodoItem;
