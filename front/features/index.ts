import axios from "axios";
import { HYDRATE } from "next-redux-wrapper";
import { AnyAction, combineReducers } from "redux";
import postSlice, { PostState } from "./post/postSlice";
import userSlice from "./user/userSlice";
// import { RootState } from "store/configureStore";

axios.defaults.baseURL = "http://localhost:3065";
axios.defaults.withCredentials = true;

const rootReducer = combineReducers({
  user: userSlice.reducer,
  post: postSlice.reducer,
});

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  } else {
    return rootReducer(state, action);
  }
};

export type RootState = ReturnType<typeof rootReducer>;
export default reducer;

/* 아래 코드 동작함
axios.defaults.baseURL = "http://localhost:3065";
axios.defaults.withCredentials = true;

// const rootReducer = combineReducers({
//   user: userSlice.reducer,
//   post: postSlice.reducer,
// });

interface RootState {
  post: PostState;
}

const combinedReducer = combineReducers({
  post: postSlice.reducer,
});

const rootReducer = (state: RootState | undefined, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      // return action.payload;
      return {
        ...state,
        ...action.payload,
      };

    default: {
      const combineReducer = combineReducers({
        // user: userSlice.reducer,
        post: postSlice.reducer,
      });
      return combineReducer(state, action);
    }
  }
};

// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof rootReducer>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}

export default rootReducer;
 */
