import {combineReducers, createStore} from "redux";
import formReducer from "./message-form-reducer";

const store = createStore(combineReducers({formReducer}))

export default store