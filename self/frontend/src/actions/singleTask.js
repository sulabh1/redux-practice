import { LOAD_SINGLE_TASK } from "./types";
import setAlert from "./alert";
import baseUrl from "../config/axios.config";

export const singleTask = (id) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: { "Content-Type": "application/json", "x-access-token": token },
  };
  try {
    const res = await baseUrl.get(`/tasks/${id}`, config);

    dispatch({ type: LOAD_SINGLE_TASK, payload: res?.data?.task });
  } catch (error) {
    const err = error.response.data.message;

    dispatch(setAlert(err, "danger"));
  }
};
