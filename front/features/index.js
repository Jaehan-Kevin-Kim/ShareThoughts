import axios from "axios";
import { combineReducers } from "redux";
import userSlice from "./user/userSlice";
import postSlice from "./post/postSlice";

axios.defaults.baseURL = "http://localhost:3065";
axios.defaults.withCredentials = true;

const rootReducer = combineReducers({
  user: userSlice.reducer,
  post: postSlice.reducer,
});

export default rootReducer;
