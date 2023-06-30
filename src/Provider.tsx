import * as React from "react";
import produce from "immer";
import { Dispatch } from "react";

const { useReducer, createContext, useEffect } = React;

interface Todo {
  text: string;
  id: number;
  completed: boolean;
}

interface State {
  todos?: Todo[];
  id?: number;
}

type Actions =
  | { type: "SET_TODOS"; payload: Todo[] }
  | { type: "ADD_TODO"; payload: string }
  | { type: "DELETE_TODO"; payload: number }
  | { type: "CLEAR_TODOS" }
  | { type: "TOGGLE_TODO_COMPLETED"; payload: Todo }
  | { type: "EDIT_TODO"; payload: Todo };

const todosReducer = produce((state: State, action: Actions) => {
  switch (action.type) {
    case "SET_TODOS":
      state.todos = action.payload;
      break;
    case "ADD_TODO":
      const todo: Todo = {
        text: action.payload,
        id: state.id,
        completed: false
      };
      state.todos.push(todo);
      state.id = state.id + 1;
      break;
    case "EDIT_TODO":
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            id: todo.id,
            text: action.payload.text
          };
        }
        return todo;
      });
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

let context;

export default function Provider(props: Props) {
  context = createContext<{ state: State; dispatch: Dispatch<Actions> }>({
    state: {},
    dispatch: () => {}
  });
  const [state, dispatch] = useReducer(todosReducer, initialState);

  useEffect(() => {
    const todos: string = window.localStorage.getItem("todos");
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
