import { REGISTER_FAIL, REGISTER_SUCCESS } from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
};

const register = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      localStorage.setItem("token", payload);
      return { ...state, ...payload, isAuthenticated: true, loading: false };
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return { ...state, token: null, isAuthenticated: false, loading: false };

    default:
      return state;
  }
};

export default register;
