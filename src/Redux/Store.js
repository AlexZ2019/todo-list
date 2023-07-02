import {combineReducers, createStore} from 'redux';
import TodoReducer from './reducer';


let reducers = combineReducers({
  TodoReducer,
})

const store = createStore(reducers);

window.store = store

export default store;
