import baseUrl from "../config/axios.config";
import setAlert from "./alert";
import { REGISTER_FAIL, REGISTER_SUCCESS } from "./types";

export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = { headers: { "Content-Type": "application/json" } };
    const body = JSON.stringify({ name, email, password });

    try {
      const res = await baseUrl.post("/users/register", body, config);

      dispatch({ type: REGISTER_SUCCESS, payload: res.data.token });
    } catch (error) {
      const err = error.response.data.message;

      if (err) {
        dispatch(setAlert(err, "danger"));
      }

      dispatch({ type: REGISTER_FAIL });
    }
  };
