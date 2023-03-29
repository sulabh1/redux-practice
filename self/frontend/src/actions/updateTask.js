import baseUrl from "../config/axios.config";
import setAlert from "./alert";
import { UPDATE_TASK_SUCCESS, UPDATE_TASK_ERROR } from "./types";

const updateTask =
  ({ name, date, completed, id }) =>
  async (dispatch) => {
    const token = localStorage.getItem("token");

    const config = {
      headers: { "Content-Type": "application/json", "x-access-token": token },
    };
    const body = JSON.stringify({ name, date, completed });

    try {
      const res = await baseUrl.put(`/tasks/${id}`, body, config);

      dispatch({ type: UPDATE_TASK_SUCCESS, payload: res.data.task });
    } catch (error) {
      const err = error.response.data.message;
      if (err) {
        dispatch(setAlert(err, "danger"));
      }
      dispatch({ type: UPDATE_TASK_ERROR });
    }
  };

export default updateTask;
