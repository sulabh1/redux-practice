import { LOAD_TASK_FAIL, LOAD_TASK_SUCCESS } from "./types";
import setAlert from "./alert";
import baseUrl from "../config/axios.config";

export const task = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: { "Content-Type": "application/json", "x-access-token": token },
  };
  try {
    const res = await baseUrl.get("/tasks", config);
    console.log(res.data.task, "listing task>>>>>>>>>>>>>>");
    dispatch({ type: LOAD_TASK_SUCCESS, payload: res.data.task });
  } catch (error) {
    const err = error.response.data.message;
    if (err) {
      dispatch(setAlert(err, "danger"));
    }
    dispatch({ type: LOAD_TASK_FAIL });
  }
};
