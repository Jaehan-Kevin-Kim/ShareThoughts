import { SerializedError, createSlice } from "@reduxjs/toolkit";
import {
  changeNickname,
  follow,
  loadFollowers,
  loadFollowings,
  loadMyInfo,
  loadUser,
  login,
  logout,
  removeFollower,
  // signup,
  signupUser,
  unfollow,
} from "./userService";
import { HYDRATE } from "next-redux-wrapper";
import { IUser } from "@typings/db";

export interface UserState {
  loadMyInfoLoading: boolean;
  loadMyInfoDone: boolean;
  loadMyInfoError: SerializedError | null;
  loadUserLoading: boolean;
  loginLoading: boolean;
  loginDone: boolean;
  loginError: SerializedError | null;
  loadUserDone: boolean;
  loadUserError: SerializedError | null;
  logInLoading: boolean;
  logInDone: boolean;
  logInError: SerializedError | null;
  logOutLoading: boolean;
  logOutDone: boolean;
  logOutError: SerializedError | null;
  signUpLoading: boolean;
  signUpDone: boolean;
  signUpError: SerializedError | null;
  changeNicknameLoading: boolean;
  changeNicknameDone: boolean;
  changeNicknameError: SerializedError | null;
  logoutLoading: boolean;
  logoutDone: boolean;
  logoutError: SerializedError | null;
  signupUserLoading: boolean;
  signupUserDone: boolean;
  signupUserError: SerializedError | null;
  followLoading: boolean;
  followDone: boolean;
  followError: SerializedError | null;
  unfollowLoading: boolean;
  unfollowDone: boolean;
  unfollowError: SerializedError | null;
  loadFollowingsLoading: boolean;
  loadFollowingsDone: boolean;
  loadFollowingsError: SerializedError | null;
  loadFollowersLoading: boolean;
  loadFollowersDone: boolean;
  loadFollowersError: SerializedError | null;
  removeFollowerLoading: boolean;
  removeFollowerDone: boolean;
  removeFollowerError: SerializedError | null;
  me: Partial<IUser>;
  userInfo: Partial<IUser>;
}

export const initialState: UserState = {
  loadMyInfoLoading: false, // 로그인 시도 중
  loadMyInfoDone: false,
  loadMyInfoError: null,
  loadUserLoading: false,
  loginLoading: false,
  loginDone: false,
  loginError: null,
  loadUserDone: false,
  loadUserError: null,
  logInLoading: false, // 로그인 시도 중
  logInDone: false,
  logInError: null,
  logOutLoading: false, // 로그아웃 시도 중
  logOutDone: false,
  logOutError: null,
  signUpLoading: false, // 회원가입 시도 중
  signUpDone: false,
  signUpError: null,
  changeNicknameLoading: false, // Nickname 변경 시도 중
  changeNicknameDone: false,
  changeNicknameError: null,
  logoutLoading: false,
  logoutDone: false,
  logoutError: null,
  signupUserLoading: false,
  signupUserDone: false,
  signupUserError: null,
  followLoading: false,
  followDone: false,
  followError: null,
  unfollowLoading: false,
  unfollowDone: false,
  unfollowError: null,
  loadFollowingsLoading: false,
  loadFollowingsDone: false,
  loadFollowingsError: null,
  loadFollowersLoading: false,
  loadFollowersDone: false,
  loadFollowersError: null,
  removeFollowerLoading: false,
  removeFollowerDone: false,
  removeFollowerError: null,
  me: null,
  userInfo: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadMyInfo.pending, (state) => {
        state.loadMyInfoLoading = true;
        state.loadMyInfoDone = false;
        state.loadMyInfoError = null;
      })
      .addCase(loadMyInfo.fulfilled, (state, action) => {
        console.log("fulfilled", action.payload);
        state.loadMyInfoLoading = false;
        state.loadMyInfoDone = true;
        state.loadMyInfoError = null;
        state.me = action.payload || null;
      })
      .addCase(loadMyInfo.rejected, (state, action) => {
        state.loadMyInfoLoading = false;
        state.loadMyInfoError = action.error;
      })

      .addCase(loadUser.pending, (state) => {
        state.loadUserLoading = true;
        state.loadUserDone = false;
        state.loadUserError = null;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        console.log("fulfilled", action.payload);
        state.loadUserLoading = false;
        state.loadUserDone = true;
        state.loadUserError = null;
        state.userInfo = action.payload;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loadUserLoading = false;
        state.loadUserError = action.error;
      })
      .addCase(login.pending, (state) => {
        state.loginLoading = true;
        state.loginDone = false;
        state.loginError = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log("fulfilled", action.payload);
        state.loginLoading = false;
        state.loginDone = true;
        state.loginError = null;
        state.me = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginError = action.error;
      })
      .addCase(logout.pending, (state) => {
        state.logoutLoading = true;
        state.logoutDone = false;
        state.logoutError = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        console.log("fulfilled", action.payload);
        state.logoutLoading = false;
        state.logoutDone = true;
        // state.logoutError = null;
        state.me = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.logoutLoading = false;
        state.logoutError = action.error;
      })

      .addCase(signupUser.pending, (state) => {
        state.signupUserLoading = true;
        state.signupUserDone = false;
        state.signupUserError = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        console.log("fulfilled", action.payload);
        state.signupUserLoading = false;
        state.signupUserDone = true;

        // state.signupUserError = null;
        // state.me = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.signupUserLoading = false;
        state.signupUserError = action.error;
      })
      .addCase(follow.pending, (state) => {
        state.followLoading = true;
        state.followDone = false;
        state.followError = null;
      })
      .addCase(follow.fulfilled, (state, action) => {
        console.log("fulfilled", action.payload);
        state.followLoading = false;
        state.followDone = true;
        state.me.Followings.push({ id: action.payload.UserId });
        // state.me.Followings =
        // state.followError = null;
        // state.me = null;
      })
      .addCase(follow.rejected, (state, action) => {
        state.followLoading = false;
        state.followError = action.error;
      })

      .addCase(changeNickname.pending, (state) => {
        state.changeNicknameLoading = true;
        state.changeNicknameDone = false;
        state.changeNicknameError = null;
      })
      .addCase(changeNickname.fulfilled, (state, action) => {
        console.log("fulfilled", action.payload);
        state.changeNicknameLoading = false;
        state.changeNicknameDone = true;
        // state.me.Followings.push({ id: action.payload.UserId });
        state.me.nickname = action.payload.nickname;
        // state.changeNicknameError = null;
        // state.me = null;
      })
      .addCase(changeNickname.rejected, (state, action) => {
        state.changeNicknameLoading = false;
        state.changeNicknameError = action.error;
      })
      .addCase(loadFollowings.pending, (state) => {
        state.loadFollowingsLoading = true;
        state.loadFollowingsDone = false;
        state.loadFollowingsError = null;
      })
      .addCase(loadFollowings.fulfilled, (state, action) => {
        console.log("fulfilled", action.payload);
        state.loadFollowingsLoading = false;
        state.loadFollowingsDone = true;
        // state.me.Followings.push({ id: action.payload.UserId });
        state.me.Followings = action.payload;
        // state.loadFollowingsError = null;
        // state.me = null;
      })
      .addCase(loadFollowings.rejected, (state, action) => {
        state.loadFollowingsLoading = false;
        state.loadFollowingsError = action.error;
      })
      .addCase(loadFollowers.pending, (state) => {
        state.loadFollowersLoading = true;
        state.loadFollowersDone = false;
        state.loadFollowersError = null;
      })
      .addCase(loadFollowers.fulfilled, (state, action) => {
        console.log("fulfilled", action.payload);
        state.loadFollowersLoading = false;
        state.loadFollowersDone = true;
        // state.me.Followings.push({ id: action.payload.UserId });
        state.me.Followers = action.payload;
        // state.loadFollowersError = null;
        // state.me = null;
      })
      .addCase(loadFollowers.rejected, (state, action) => {
        state.loadFollowersLoading = false;
        state.loadFollowersError = action.error;
      })

      .addCase(removeFollower.pending, (state) => {
        state.removeFollowerLoading = true;
        state.removeFollowerDone = false;
        state.removeFollowerError = null;
      })
      .addCase(removeFollower.fulfilled, (state, action) => {
        console.log("fulfilled", action.payload);
        state.removeFollowerLoading = false;
        state.removeFollowerDone = true;
        // state.me.Followings.push({ id: action.payload.UserId });
        state.me.Followers = state.me.Followers.filter(
          (follower) => follower.id !== action.payload.UserId,
        );
        // state.removeFollowerError = null;
        // state.me = null;
      })
      .addCase(removeFollower.rejected, (state, action) => {
        state.removeFollowerLoading = false;
        state.removeFollowerError = action.error;
      })

      .addCase(unfollow.pending, (state) => {
        state.unfollowLoading = true;
        state.unfollowDone = false;
        state.unfollowError = null;
      })
      .addCase(unfollow.fulfilled, (state, action) => {
        console.log("fulfilled", action.payload);
        state.unfollowLoading = false;
        state.unfollowDone = true;
        // state.me.Followings.push({ id: action.payload.UserId });
        state.me.Followings = state.me.Followings.filter(
          (user) => user.id !== action.payload.UserId,
        );
        // state.unfollowError = null;
        // state.me = null;
      })
      .addCase(unfollow.rejected, (state, action) => {
        state.unfollowLoading = false;
        state.unfollowError = action.error;
      });
  },
});

export default userSlice;
