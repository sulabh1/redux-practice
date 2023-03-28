import baseUrl from "../config/axios.config";
import setAlert from "./alert";
import { CREATE_TASK_SUCCESS, CREATE_TASK_FAIL } from "./types";

const createTask =
  ({ name, date }) =>
  async (dispatch) => {
    const token = localStorage.getItem("token");

    const config = {
      headers: { "Content-Type": "application/json", "x-access-token": token },
    };
    const body = JSON.stringify({ name, date });

    try {
      const res = await baseUrl.post("/tasks", body, config);

      dispatch({ type: CREATE_TASK_SUCCESS, payload: res.data.task });
    } catch (error) {
      const err = error.response.data.message;
      if (err) {
        dispatch(setAlert(err, "danger"));
      }
      dispatch({ type: CREATE_TASK_FAIL });
    }
  };

export default createTask;
