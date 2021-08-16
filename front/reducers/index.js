import { HYDRATE } from "next-redux-wrapper";
import user from "./user";
import post from "./post";
import { combineReducers } from "redux";

//index: ~~~~ HYDRATE넣어 주는 이유: REDUX SERVERSIDE RENDERING 위해서 사용. 만약 SSR이 필요 없으면 저기 INDEX 부분이 필요 없음.
const rootReducer = combineReducers({
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE: {
        console.log("HYDRATE", action);
        return {
          ...state,
          ...action.payload,
        };
      }
      default:
        return state;
    }
  },
  user,
  post,
});

export default rootReducer;
