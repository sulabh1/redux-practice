import { LOGIN_FAIL, LOGIN_SUCCESS } from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  user: null,
  loading: false,
};

const login = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      return { ...state, ...payload, isAuthenticated: true, loading: false };

    case LOGIN_FAIL:
      return { ...state, token: null, isAuthenticated: false, loading: false };

    default:
      return state;
  }
};

export default login;
