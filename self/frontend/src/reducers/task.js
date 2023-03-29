import {
  LOAD_TASK_FAIL,
  LOAD_TASK_SUCCESS,
  LOAD_SINGLE_TASK,
  LOAD_ERROR_TASK,
} from "../actions/types";

const initialState = {};

const task = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_TASK_SUCCESS:
    case LOAD_SINGLE_TASK:
      return { ...state, ...payload };
    case LOAD_TASK_FAIL:
    case LOAD_ERROR_TASK:
      return {};
    default:
      return state;
  }
};

export default task;
