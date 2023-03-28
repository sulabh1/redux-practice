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
      localStorage.setItem("token", payload);
      return { ...state, ...payload, isAuthenticated: true, loading: false };

    case LOGIN_FAIL:
      localStorage.removeItem("token");
      return { ...state, token: null, isAuthenticated: false, loading: false };

    default:
      return state;
  }
};

export default login;
