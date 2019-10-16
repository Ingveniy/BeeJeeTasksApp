import {
  FETCH_LOGIN_REQUEST,
  FETCH_LOGIN_SUCCESS,
  FETCH_LOGIN_FAILURE,
  FETCH_LOGOUT_REQUEST,
  FETCH_LOGOUT_SUCCESS,
  FETCH_LOGOUT_FAILURE
} from "../types/auth";

const loginRequest = () => {
  return {
    type: FETCH_LOGIN_REQUEST
  };
};

const loginSuccess = ({ username, token }) => {
  localStorage.setItem('username', username);
  localStorage.setItem('token', token);
  return {
    type: FETCH_LOGIN_SUCCESS,
    payload: { username, token }
  };
};

const loginFailure = error => {
  return {
    type: FETCH_LOGIN_FAILURE,
    payload: error
  };
};

const logoutRequest = () => {
  return {
    type: FETCH_LOGOUT_REQUEST
  };
};

const logoutSuccess = () => {
  localStorage.setItem('username', null);
  localStorage.setItem('token', null);
  return {
    type: FETCH_LOGOUT_SUCCESS
  };
};

const logoutFailure = error => {
  return {
    type: FETCH_LOGOUT_FAILURE,
    payload: error
  };
};

const login = api => (username, password) => dispatch => {
  dispatch(loginRequest());
  api
    .getAuthToken(username, password)
    .then(data => {
      if (data.status === "error") {
        return dispatch(loginFailure(data.message.password));
      }
      return dispatch(loginSuccess({ token: data.message.token, username }));
    })
    .catch(err => dispatch(loginFailure(err)));
};

const logout = () => () => dispatch => {
  dispatch(logoutRequest());
  try {
    dispatch(logoutSuccess());
  } catch (err) {
    dispatch(logoutFailure(err));
  }
};

export { login, logout };
