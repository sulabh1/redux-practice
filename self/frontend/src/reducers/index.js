import { combineReducers } from "redux";
import alert from "./alert";
import register from "./register";
import login from "./login";
import task from "./task";

export default combineReducers({ alert, register, login, task });
