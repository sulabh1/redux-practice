import {
  CREATE_TASK_SUCCESS,
  CREATE_TASK_FAIL,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_ERROR,
} from "../actions/types";

const initialState = { name: "", date: "" };

const createTask = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_TASK_SUCCESS:
    case UPDATE_TASK_SUCCESS:
      return { ...state, ...payload };

    case CREATE_TASK_FAIL:
    case UPDATE_TASK_ERROR:
      return { name: "", date: "" };

    default:
      return state;
  }
};
export default createTask;
