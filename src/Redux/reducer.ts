import { Todo } from "../interfaces";

type Actions =
  | { type: "SET_TODOS"; payload: Todo[] }
  | { type: "ADD_TODO"; payload: string }
  | { type: "DELETE_TODO"; payload: number }
  | { type: "CLEAR_TODOS" }
  | { type: "TOGGLE_TODO_COMPLETED"; payload: Todo }
  | { type: "EDIT_TODO"; payload: { id: number, text: string } };

const initialState = {
  todos: [],
  id: 0
};

const TodoReducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case "SET_TODOS":
      return {...state, todos: action.payload};
    case "ADD_TODO":
      const todo = {
        text: action.payload,
        id: state.todos.length ? Math.max(...state.todos.map((todo: Todo) => todo.id)) + 1 : 1,
        completed: false
      };
      return {...state, todos: [...state.todos, todo]};
    case "EDIT_TODO":
      const todos = state.todos.map((todo: Todo) => {
        if (todo.id === action.payload.id) {
          return {...todo, text: action.payload.text}
        }
        return todo;
      });
      return {...state, todos }
    case "DELETE_TODO":
      return {...state, todos: state.todos.filter((todo: Todo) => todo.id !== action.payload)};
    case "CLEAR_TODOS":
      return {...state, todos: []};
    case "TOGGLE_TODO_COMPLETED":
      return {...state, todos: state.todos.map((todo: Todo) => {
        if (todo.id === action.payload.id) {
          return {...todo, completed: !action.payload.completed}
        }
        return todo;
        }) }
    default:
      return state
  }
}

export default TodoReducer;
