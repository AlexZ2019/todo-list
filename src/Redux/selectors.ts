import { AppStateType } from "./Store";

export const getTodos = (state: AppStateType) => state.todo.todos;
