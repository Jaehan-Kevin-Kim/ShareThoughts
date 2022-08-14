import { createSlice } from "@reduxjs/toolkit";
import { _remove } from "lodash/remove";
import {
  changeNickname,
  follow,
  loadFollowers,
  loadFollowings,
  loadMyInfo,
  login,
  logout,
  removeFollower,
  signup,
  unfollow,
} from "./userService";

export const initialState = {
  loadMyInfoLoading: false, // 로그인 시도 중
  loadMyInfoDone: false,
  loadMyInfoError: false,
  logInLoading: false, // 로그인 시도 중
  logInDone: false,
  logInError: false,
  logOutLoading: false, // 로그아웃 시도 중
  logOutDone: false,
  logOutError: null,
  signUpLoading: false, // 회원가입 시도 중
  signUpDone: false,
  signUpError: null,
  changeNicknameLoading: false, // Nickname 변경 시도 중
  changeNicknameDone: false,
  changeNicknameError: null,
  followLoading: false,
  followDone: false,
  followError: null,
  unfollowLoading: false,
  unfollowDone: false,
  unfollowError: null,
  loadFollowingsLoading: false,
  loadFollowingsDone: false,
  loadFollowingsError: null,
  loadFollwersLoading: false,
  loadFollwersDone: false,
  loadFollwersError: null,
  removeFollowerLoading: false,
  removeFollowerDone: false,
  removeFollowerError: null,
  me: null,
  signUpData: {},
  loginData: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addPostToMe(state, action) {
      state.me.Posts.unshift({ id: action.payload });
    },
    removePostOfMe(state, action) {
      _remove(state.me.Posts, (v) => v.id === action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // loadMyInfo reducer
      .addCase(loadMyInfo.pending, (state) => {
        state.loadMyInfoLoading = true;
        state.loadMyInfoDone = false;
        state.loadMyInfoError = null;
      })
      .addCase(loadMyInfo.fulfilled, (state, action) => {
        state.loadMyInfoLoading = false;
        state.loadMyInfoDone = true;
        state.loadMyInfoError = null;
        state.me = action.payload;
      })
      .addCase(loadMyInfo.rejected, (state, action) => {
        state.loadMyInfoLoading = false;
        state.loadMyInfoError = action.error.message;
      })
      // login reducer
      .addCase(login.pending, (state) => {
        state.loginLoading = true;
        state.loginDone = false;
        state.loginError = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.loginDone = true;
        state.me = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginError = action.error.message;
      })
      // logout reducer
      .addCase(logout.pending, (state) => {
        state.logoutLoading = true;
        state.logoutDone = false;
        state.loginDone = true;
        state.logoutError = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.logoutLoading = false;
        state.logoutDone = true;
        state.logInDone = false;
        state.me = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.logoutLoading = false;
        state.logoutError = action.error.message;
      })
      // follow reducer
      .addCase(follow.pending, (state) => {
        state.followLoading = true;
        state.followDone = false;
        state.followError = null;
      })
      .addCase(follow.fulfilled, (state, action) => {
        state.followLoading = false;
        state.followDone = true;
        state.me.Followings.push({ id: action.payload.UserId });
      })
      .addCase(follow.rejected, (state, action) => {
        state.followLoading = false;
        state.followError = action.error.message;
      })
      // unfollow reducer
      .addCase(unfollow.pending, (state) => {
        state.unfollowLoading = true;
        state.unfollowDone = false;
        state.unfollowError = null;
      })
      .addCase(unfollow.fulfilled, (state, action) => {
        state.unfollowLoading = false;
        state.unfollowDone = true;
        console.log("unfollow action", action.payload);
        // _remove(state.me.Followings, {
        //   id: action.payload.UserId,
        // });
        state.me.Followings = state.me.Followings.filter(
          (v) => v.UserId !== action.payload.UserId,
        );
      })
      .addCase(unfollow.rejected, (state, action) => {
        state.unfollowLoading = false;
        state.unfollowError = action.error.message;
      })
      // loadFollowings reducer
      .addCase(loadFollowings.pending, (state) => {
        state.loadFollowingsLoading = true;
        state.loadFollowingsDone = false;
        state.loadFollowingsError = null;
      })
      .addCase(loadFollowings.fulfilled, (state, action) => {
        state.loadFollowingsLoading = false;
        state.loadFollowingsDone = true;
        state.me.nickname = action.payload.nickname;
      })
      .addCase(loadFollowings.rejected, (state, action) => {
        state.loadFollowingsLoading = false;
        state.loadFollowingsError = action.error.message;
      })
      // loadFollowers reducer
      .addCase(loadFollowers.pending, (state) => {
        state.loadFollowersLoading = true;
        state.loadFollowersDone = false;
        state.loadFollowersError = null;
      })
      .addCase(loadFollowers.fulfilled, (state, action) => {
        state.loadFollowersLoading = false;
        state.loadFollowersDone = true;
        state.me.Followers = action.payload;
      })
      .addCase(loadFollowers.rejected, (state, action) => {
        state.loadFollowersLoading = false;
        state.loadFollowersError = action.error.message;
      })
      // removeFollower reducer
      .addCase(removeFollower.pending, (state) => {
        state.removeFollowerLoading = true;
        state.removeFollowerDone = false;
        state.removeFollowerError = null;
      })
      .addCase(removeFollower.fulfilled, (state, action) => {
        state.removeFollowerLoading = false;
        state.removeFollowerDone = true;
        state.me.Followers = _remove(state.me.Followers, {
          id: action.state.userId,
        });
      })
      .addCase(removeFollower.rejected, (state, action) => {
        state.removeFollowerLoading = false;
        state.removeFollowerError = action.error.message;
      })
      // signup reducer
      .addCase(signup.pending, (state) => {
        state.signupLoading = true;
        state.signupDone = false;
        state.signupError = null;
      })
      .addCase(signup.fulfilled, (state) => {
        state.signupLoading = false;
        state.signupDone = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.signupLoading = false;
        state.signupError = action.error.message;
      })
      // chnageNickname reducer
      .addCase(changeNickname.pending, (state) => {
        state.changeNicknameLoading = true;
        state.changeNicknameDone = false;
        state.changeNicknameError = null;
      })
      .addCase(changeNickname.fulfilled, (state, action) => {
        state.changeNicknameLoading = false;
        state.changeNicknameDone = true;
        console.log("change nickname action.payload: ", action.payload);
        state.me.nickname = action.payload.nickname;
      })
      .addCase(changeNickname.rejected, (state, action) => {
        state.changeNicknameLoading = false;
        state.changeNicknameError = action.error.message;
      });
  },
});

export default userSlice;

/**
import axios from "axios";
import produce from "immer";
export const initialState = {
  loadMyInfoLoading: false, // 로그인 시도 중
  loadMyInfoDone: false,
  loadMyInfoError: false,
  logInLoading: false, // 로그인 시도 중
  logInDone: false,
  logInError: false,
  logOutLoading: false, // 로그아웃 시도 중
  logOutDone: false,
  logOutError: null,
  signUpLoading: false, // 회원가입 시도 중
  signUpDone: false,
  signUpError: null,
  changeNicknameLoading: false, // Nickname 변경 시도 중
  changeNicknameDone: false,
  changeNicknameError: null,
  followLoading: false,
  followDone: false,
  followError: null,
  unfollowLoading: false,
  unfollowDone: false,
  unfollowError: null,
  loadFollowingsLoading: false,
  loadFollowingsDone: false,
  loadFollowingsError: null,
  loadFollwersLoading: false,
  loadFollwersDone: false,
  loadFollwersError: null,
  removeFollowerLoading: false,
  removeFollowerDone: false,
  removeFollowerError: null,
  me: null,
  signUpData: {},
  loginData: {},
};



export const LOAD_MY_INFO_REQUEST = "LOAD_MY_INFO_REQUEST";
export const LOAD_MY_INFO_SUCCESS = "LOAD_MY_INFO_SUCCESS";
export const LOAD_MY_INFO_FAILURE = "LOAD_MY_INFO_FAILURE";

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const CHANGE_NICKNAME_REQUEST = "CHANGE_NICKNAME_REQUEST";
export const CHANGE_NICKNAME_SUCCESS = "CHANGE_NICKNAME_SUCCESS";
export const CHANGE_NICKNAME_FAILURE = "CHANGE_NICKNAME_FAILURE";

export const FOLLOW_REQUEST = "FOLLOW_REQUEST";
export const FOLLOW_SUCCESS = "FOLLOW_SUCCESS";
export const FOLLOW_FAILURE = "FOLLOW_FAILURE";

export const UNFOLLOW_REQUEST = "UNFOLLOW_REQUEST";
export const UNFOLLOW_SUCCESS = "UNFOLLOW_SUCCESS";
export const UNFOLLOW_FAILURE = "UNFOLLOW_FAILURE";

export const LOAD_FOLLOWERS_REQUEST = "LOAD_FOLLOWERS_REQUEST";
export const LOAD_FOLLOWERS_SUCCESS = "LOAD_FOLLOWERS_SUCCESS";
export const LOAD_FOLLOWERS_FAILURE = "LOAD_FOLLOWERS_FAILURE";

export const LOAD_FOLLOWINGS_REQUEST = "LOAD_FOLLOWINGS_REQUEST";
export const LOAD_FOLLOWINGS_SUCCESS = "LOAD_FOLLOWINGS_SUCCESS";
export const LOAD_FOLLOWINGS_FAILURE = "LOAD_FOLLOWINGS_FAILURE";

export const REMOVE_FOLLOWER_REQUEST = "REMOVE_FOLLOWER_REQUEST";
export const REMOVE_FOLLOWER_SUCCESS = "REMOVE_FOLLOWER_SUCCESS";
export const REMOVE_FOLLOWER_FAILURE = "REMOVE_FOLLOWER_FAILURE";

export const ADD_POST_TO_ME = "ADD_POST_TO_ME";
export const REMOVE_POST_OF_ME = "REMOVE_POST_OF_ME";

const dummyUser = (data) => ({
  ...data,
  nickname: "Kevin",
  id: 1,
  Posts: [{ id: 1 }],
  Followings: [{ nickname: "kevin" }, { nickname: "Kayn" }, { nickname: "Jaehan" }],
  Followers: [{ nickname: "kevin" }, { nickname: "Kayn" }, { nickname: "Jaehan" }],
});

export const loginRequestAction = (data) => ({
  type: LOG_IN_REQUEST,
  data,
});

export const logoutRequestAction = () => {
  return {
    type: LOG_OUT_REQUEST,
  };
};

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOAD_MY_INFO_REQUEST: {
        draft.loadMyInfoLoading = true;
        draft.loadMyInfoDone = false;
        draft.loadMyInfoError = null;
        break;
      }
      case LOAD_MY_INFO_SUCCESS: {
        draft.loadMyInfoLoading = false;
        draft.loadMyInfoDone = true;
        draft.me = action.data;
        break;
      }
      case LOAD_MY_INFO_FAILURE: {
        draft.loadMyInfoLoading = false;
        draft.loadMyInfoError = action.error;
        break;
      }
      case LOG_IN_REQUEST: {
        console.log("reducer login");
        draft.logInLoading = true;
        draft.logInDone = false;
        draft.logInError = null;
        break;
      }
      case LOG_IN_SUCCESS: {
        draft.logInLoading = false;
        draft.logInDone = true;
        draft.me = action.data;
        break;
      }
      case LOG_IN_FAILURE: {
        draft.logInLoading = false;
        draft.logInError = action.error;
        break;
      }
      case LOG_OUT_REQUEST: {
        draft.logOutLoading = true;
        draft.logOutDone = false;
        draft.logOutError = null;
        break;
        // return {
        //   ...state,
        //   logOutLoading: true,
        //   logOutDone: true,
        //   logOutError: null,
        // };
      }
      case LOG_OUT_SUCCESS: {
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.logInDone = false;
        draft.me = null;
        console.log("draft", draft);
        break;
        // return {
        //   ...state,
        //   logOutLoading: false,
        //   logOutDone: true,
        //   me: null,
        // };
      }
      case LOG_OUT_FAILURE: {
        draft.logOutLoading = false;
        draft.logOutError = action.error;
        break;
        // return {
        //   ...state,
        //   logOutLoading: false,
        //   logOutError: action.error,
        // };
      }
      case SIGN_UP_REQUEST: {
        draft.signUpLoading = true;
        draft.singUpDone = false;
        draft.signUpError = null;
        break;
      }
      case SIGN_UP_SUCCESS: {
        draft.signUpLoading = false;
        draft.signUpDone = true;
        break;
      }
      case SIGN_UP_FAILURE: {
        draft.signUpLoading = false;
        draft.signUpError = action.error;
        // console.log(action.error);
        break;
      }
      case CHANGE_NICKNAME_REQUEST: {
        draft.changeNicknameLoading = true;
        draft.changeNicknameDone = true;
        draft.changeNicknameError = null;
        break;
      }
      case CHANGE_NICKNAME_SUCCESS: {
        draft.me.nickname = action.data.nickname;
        draft.changeNicknameLoading = false;
        draft.changeNicknameDone = true;
        break;
      }
      case CHANGE_NICKNAME_FAILURE: {
        draft.changeNicknameLoading = false;
        draft.changeNicknameError = action.error;
        break;
      }
      case FOLLOW_REQUEST: {
        draft.followLoading = true;
        draft.followDone = true;
        draft.followError = null;
        break;
      }
      case FOLLOW_SUCCESS: {
        draft.followLoading = false;
        draft.followDone = true;
        draft.me.Followings.push({ id: action.data.UserId });
        break;
      }
      case FOLLOW_FAILURE: {
        draft.followLoading = false;
        draft.followError = action.error;
        break;
      }
      case UNFOLLOW_REQUEST: {
        draft.unfollowLoading = true;
        draft.unfollowDone = true;
        draft.unfollowError = null;
        break;
      }
      case UNFOLLOW_SUCCESS: {
        draft.unfollowLoading = false;
        draft.unfollowDone = true;
        draft.me.Followings = draft.me.Followings.filter((v) => v.id !== action.data.UserId);
        break;
      }
      case UNFOLLOW_FAILURE: {
        draft.unfollowLoading = false;
        draft.unfollowError = action.error;
        break;
      }
      case LOAD_FOLLOWINGS_REQUEST: {
        draft.loadFollowingsLoading = true;
        draft.loadFollowingsDone = true;
        draft.loadFollowingsError = null;
        break;
      }
      case LOAD_FOLLOWINGS_SUCCESS: {
        draft.loadFollowingsLoading = false;
        draft.loadFollowingsDone = true;
        draft.me.Followings = action.data;
        break;
      }
      case LOAD_FOLLOWINGS_FAILURE: {
        draft.loadFollowingsLoading = false;
        draft.loadFollowingsError = action.error;
        break;
      }
      case LOAD_FOLLOWERS_REQUEST: {
        draft.loadFollowersLoading = true;
        draft.loadFollowersDone = true;
        draft.loadFollowersError = null;
        break;
      }
      case LOAD_FOLLOWERS_SUCCESS: {
        draft.loadFollowersLoading = false;
        draft.loadFollowersDone = true;
        draft.me.Followers = action.data;
        break;
      }
      case LOAD_FOLLOWERS_FAILURE: {
        draft.loadFollowersLoading = false;
        draft.loadFollowersError = action.error;
        break;
      }
      case REMOVE_FOLLOWER_REQUEST: {
        draft.loadFollowersLoading = true;
        draft.loadFollowersDone = true;
        draft.loadFollowersError = null;
        break;
      }
      case REMOVE_FOLLOWER_SUCCESS: {
        draft.loadFollowersLoading = false;
        draft.loadFollowersDone = true;
        draft.me.Followers = draft.me.Followers.filter((v) => v.id !== action.data.UserId);
        break;
      }
      case REMOVE_FOLLOWER_FAILURE: {
        draft.loadFollowersLoading = false;
        draft.loadFollowersError = action.error;
        break;
      }
      case ADD_POST_TO_ME: {
        draft.me.Posts.unshift({ id: action.data });
        break;
        // return {
        //   ...state,
        //   me: {
        //     ...state.me,
        //     Posts: [{ id: action.data }, ...state.me.Posts],
        //   },
        // };
      }
      case REMOVE_POST_OF_ME: {
        draft.me.Posts = draft.me.Posts.filter((v) => v.id !== action.data);
        break;
        // return {
        //   ...state,
        //   me: {
        //     ...state.me,
        //     Posts: state.me.Posts.filter((v) => v.id !== action.data),
        //   },
        // };
      }
      default:
        // return state;
        break;
    }
  });

export default reducer;
 */
