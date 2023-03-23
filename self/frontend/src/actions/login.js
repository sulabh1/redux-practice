import baseUrl from "../config/axios.config";
import setAlert from "./alert";
import { LOGIN_FAIL, LOGIN_SUCCESS } from "./types";

const login =
  ({ email, password }) =>
  async (dispatch) => {
    const body = JSON.stringify({ email, password });
    const config = { headers: { "Content-Type": "application/json" } };

    try {
      const res = await baseUrl.post("/users/login", body, config);
      console.log(res.data, "login");

      dispatch({ type: LOGIN_SUCCESS, payload: res.data.token });
    } catch (error) {
      const err = error.res.data.errors;
      if (err) {
        err.forEach((element) => dispatch(setAlert(element.message, "danger")));
      }
      dispatch({ type: LOGIN_FAIL });
    }
  };

export default login;
