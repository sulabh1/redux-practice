import { LOAD_TASK_FAIL, LOAD_TASK_SUCCESS } from "../actions/types";

const initialState = [];

const task = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_TASK_SUCCESS:
      return [...state, ...payload];
    case LOAD_TASK_FAIL:
      return [];
    default:
      return state;
  }
};

export default task;
