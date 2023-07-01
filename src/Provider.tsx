import * as React from "react";
import produce from "immer";
import { Dispatch } from "react";
import { Todo } from "./interfaces";

const { useReducer, createContext, useEffect } = React;

interface State {
  todos: Todo[];
  id: number;
}

export type Actions =
  | { type: "SET_TODOS"; payload: Todo[] }
  | { type: "ADD_TODO"; payload: string }
  | { type: "DELETE_TODO"; payload: number }
  | { type: "CLEAR_TODOS" }
  | { type: "TOGGLE_TODO_COMPLETED"; payload: Todo }
  | { type: "EDIT_TODO"; payload: { id: number, text: string } };

const todosReducer = produce((state: State, action: Actions) => {
  switch (action.type) {
    case "SET_TODOS":
      state.todos = action.payload;
      break;
    case "ADD_TODO":
      const todo = {
        text: action.payload,
        id: state.todos.length ? Math.max(...state.todos.map((todo) => todo.id)) + 1 : 1,
        completed: false
      };
      state.todos.push(todo);
      break;
    case "EDIT_TODO":
      const index = state.todos.findIndex(todo => todo.id === action.payload.id);
      state.todos[index].text = action.payload.text;
      break;
    case "DELETE_TODO":
      state.todos = state.todos.filter((el) => el.id !== action.payload);
      break;
    case "CLEAR_TODOS":
      state.todos = [];
      break;
    case "TOGGLE_TODO_COMPLETED":
      const todoIdx = state.todos.findIndex(
        (el) => el.id === action.payload.id
      );
      state.todos[todoIdx].completed = !state.todos[todoIdx].completed;
  }
});

const initialState: State = {
  todos: [],
  id: 0
};

interface Props {
  children: React.ReactNode;
}

let context: React.Context<{ state: State; dispatch: React.Dispatch<Actions> }>;

export default function Provider(props: Props) {
  context = createContext<{ state: State; dispatch: Dispatch<Actions> }>({
    state: initialState,
    dispatch: () => {}
  });
  const [state, dispatch] = useReducer(todosReducer, initialState);

  useEffect(() => {
    const todos: string = window.localStorage.getItem("todos") || "";
    dispatch({
      type: "SET_TODOS",
      payload: JSON.parse(todos) || []
    });
  }, []);

  useEffect(() => {
    window.localStorage.setItem("todos", JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <>
      <context.Provider value={{ state, dispatch }}>
        {props.children}
      </context.Provider>
    </>
  );
}

export { context };
