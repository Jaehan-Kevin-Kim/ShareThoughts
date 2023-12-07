import axios from "axios";
import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import userSlice from "./user/userSlice";
import postSlice from "./post/postSlice";

axios.defaults.baseURL = "http://localhost:3065";
axios.defaults.withCredentials = true;

const rootReducer = combineReducers({
  user: userSlice.reducer,
  post: postSlice.reducer,
});

// const rootReducer = (state, action) => {
//   switch (action.type) {
//     case HYDRATE:
//       return action.payload;

//     default: {
//       const combineReducer = combineReducers({
//         user: userSlice.reducer,
//         post: postSlice.reducer,
//       });
//       return combineReducer(state, action);
//     }
//   }
// };

export default rootReducer;
