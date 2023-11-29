import axios from "axios";
import { combineReducers } from "redux";
import userSlice from "./user/userSlice";
import postSlice from "./post/postSlice";

const rootReducer = combineReducers({
  user: userSlice.reducer,
  post: postSlice.reducer,
});

export default rootReducer;
