import {
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAILURE,
  UPDATE_TASKS_REQUEST,
  UPDATE_TASKS_SUCCESS,
  UPDATE_TASKS_FAILURE,
  CREATE_TASKS_REQUEST,
  CREATE_TASKS_SUCCESS,
  CREATE_TASKS_FAILURE,
  SELECT_TASK
} from "../types/tasks";

let editTask = null;
try {
  editTask = JSON.parse(localStorage.getItem("editTask"));
} catch (err) {
  console.log(err, "err");
}
const initialState = {
  tasks: [],
  tasksCount: null,
  editTask: editTask,
  error: null,
  loading: true
};

const tasks = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TASKS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_TASKS_SUCCESS:
      return {
        ...state,
        tasks: action.payload.tasks,
        tasksCount: action.payload.tasksCount,
        loading: false,
        error: null
      };
    case FETCH_TASKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case UPDATE_TASKS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case UPDATE_TASKS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      };
    case UPDATE_TASKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case CREATE_TASKS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case CREATE_TASKS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      };
    case CREATE_TASKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case SELECT_TASK:
      return {
        ...state,
        editTask: action.payload
      };

    default:
      return state;
  }
};

export default tasks;
