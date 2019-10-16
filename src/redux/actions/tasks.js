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
const getTasksRequest = () => {
  return {
    type: FETCH_TASKS_REQUEST
  };
};
const getTasksSuccess = tasks => {
  return {
    type: FETCH_TASKS_SUCCESS,
    payload: tasks
  };
};
const getTasksFailure = error => {
  return {
    type: FETCH_TASKS_FAILURE,
    payload: error
  };
};

const createTaskRequest = () => {
  return {
    type: CREATE_TASKS_REQUEST
  };
};
const createTaskSuccess = () => {
  return {
    type: CREATE_TASKS_SUCCESS
  };
};
const createTaskFailure = error => {
  return {
    type: CREATE_TASKS_FAILURE,
    payload: error
  };
};

const updateTaskRequest = () => {
  return {
    type: UPDATE_TASKS_REQUEST
  };
};
const updateTaskSuccess = () => {
  localStorage.setItem("editTask", null);
  return {
    type: UPDATE_TASKS_SUCCESS
  };
};
const updateTaskFailure = error => {
  return {
    type: UPDATE_TASKS_FAILURE,
    payload: error
  };
};

const selectTask = () => editTask => dispatch => {
  localStorage.setItem("editTask", JSON.stringify(editTask));
  return dispatch({
    type: SELECT_TASK,
    payload: editTask
  });
};

const getTasks = api => (page, sorterField, sorterOrder) => dispatch => {
  dispatch(getTasksRequest());
  api
    .getTasks(page, sorterField, sorterOrder)
    .then(data => {
      if (data.status === "error") {
        return dispatch(getTasksFailure(data.message));
      }
      return dispatch(getTasksSuccess(data));
    })
    .catch(err => dispatch(getTasksFailure(err)));
};

const addTask = api => (username, email, text) => dispatch => {
  dispatch(createTaskRequest());
  api
    .createTask(username, email, text)
    .then(data => {
      if (data.status === "error") {
        return dispatch(
          createTaskFailure(
            data.message.username || data.message.text || data.message.email
          )
        );
      }
      return dispatch(createTaskSuccess());
    })
    .catch(err => dispatch(createTaskFailure(err)));
};

const updateTask = api => (description, status, id) => dispatch => {
  dispatch(updateTaskRequest());
  api
    .updateTask(description, status, id)
    .then(data => {
      if (data.status === "error") {
        return dispatch(
          updateTaskFailure(
            data.message.description ||
              data.message.status ||
              data.message.id ||
              data.message.token
          )
        );
      }
      return dispatch(updateTaskSuccess());
    })
    .catch(err => dispatch(updateTaskFailure(err)));
};

export { getTasks, addTask, updateTask, selectTask };
