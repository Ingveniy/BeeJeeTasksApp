import {
  FETCH_LOGIN_REQUEST,
  FETCH_LOGIN_SUCCESS,
  FETCH_LOGIN_FAILURE,
  FETCH_LOGOUT_REQUEST,
  FETCH_LOGOUT_SUCCESS,
  FETCH_LOGOUT_FAILURE
} from "../types/auth";

const initialState = {
  token: localStorage.getItem("token") || null,
  username: localStorage.getItem("username") || null,
  error: null,
  loading: false
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOGIN_REQUEST:
      return {
        ...state,
        token: null,
        loading: true,
        error: null
      };
    case FETCH_LOGIN_SUCCESS:
      return {
        token: action.payload.token,
        loading: false,
        error: null,
        username: action.payload.username
      };
    case FETCH_LOGIN_FAILURE:
      return {
        ...state,
        token: null,
        loading: false,
        error: action.payload
      };

    case FETCH_LOGOUT_REQUEST:
      return {
        ...state,
        token: null,
        loading: true,
        error: null
      };
    case FETCH_LOGOUT_SUCCESS:
      return {
        token: null,
        loading: false,
        error: null,
        username: null
      };
    case FETCH_LOGOUT_FAILURE:
      return {
        ...state,
        token: null,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default auth;
