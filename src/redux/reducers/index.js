import { combineReducers } from "redux";
import tasks from "./tasks";
import auth from "./auth";

const rootReducer = combineReducers({
  tasks,
  auth
});

export default rootReducer;
