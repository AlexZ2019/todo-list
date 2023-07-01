import * as React from "react";
import { context } from "./Provider";
import { motion, AnimatePresence } from "framer-motion";
import { Todo } from "./interfaces";
import TotoItem from "./TotoItem";

const { useContext } = React;

export default function TodoList() {
  const { state, dispatch } = useContext(context);

  if (!state.todos) {
    return <div />;
  }

  return (
    <>
      <ul className="todo-list">
        {state.todos.map((todo: Todo) => {
          return (
            <TotoItem todo={todo} dispatch={dispatch} key={todo.id}/>
          );
        })}
      </ul>
    </>
  );
}
