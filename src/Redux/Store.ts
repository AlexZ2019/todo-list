import {combineReducers, createStore} from 'redux';
import TodoReducer from './reducer';


const rootReducer = combineReducers({
  todo: TodoReducer,
})

const store = createStore(rootReducer);

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

export default store;
