import baseUrl from "../config/axios.config";
import setAlert from "./alert";
import { REGISTER_FAIL, REGISTER_SUCCESS } from "./types";

export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    console.log(name, "action name");
    const config = { headers: { "Content-Type": "application/json" } };
    const body = JSON.stringify({ name, email, password });

    try {
      const res = await baseUrl.post("/users/register", body, config);
      console.log(res, "res");
      dispatch({ type: REGISTER_SUCCESS, payload: res.data.token });
    } catch (error) {
      const err = error.response.data.errors;

      if (err) {
        err.forEach((element) => dispatch(setAlert(element.message, "danger")));
      }

      dispatch({ type: REGISTER_FAIL });
    }
  };
