/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3065";
axios.defaults.withCredentials = true;

// thunkAPI, error handling not neccessary?
export const loadMyInfo = createAsyncThunk(
  "user/loadMyInfo",
  async (thunkAPI) => {
    try {
      const response = await axios.get("/user");
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const login = createAsyncThunk("user/login", async (data, thunkAPI) => {
  try {
    const response = await axios.post("/user/login", data);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// thunkAPI not neccessary?
export const logout = createAsyncThunk("user/logout", async (thunkAPI) => {
  try {
    const response = await axios.post("/user/logout");
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const follow = createAsyncThunk(
  "user/follow",
  async (data, thunkAPI) => {
    try {
      const response = await axios.patch(`/user/${data.userId}/follow`, data);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);
export const unfollow = createAsyncThunk(
  "user/unfollow",
  async (data, thunkAPI) => {
    try {
      console.log("unfollow data", data);
      const response = await axios.delete(`/user/${data.userId}/follow`, data);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);
export const changeNickname = createAsyncThunk(
  "user/changeNickname",
  async (data, thunkAPI) => {
    try {
      // 아래 nickname: data로 줄 지, 그냥 data로 줄지.
      const response = await axios.patch("/user/nickname", { nickname: data });
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);
export const loadFollowings = createAsyncThunk(
  "user/loadFollowings",
  async (thunkAPI) => {
    try {
      const response = await axios.get("/user/followings");
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);
export const loadFollowers = createAsyncThunk(
  "user/loadFollowers",
  async (thunkAPI) => {
    try {
      const response = await axios.get("/user/followers");
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);
export const removeFollower = createAsyncThunk(
  "user/removeFollower",
  async (data, thunkAPI) => {
    try {
      const response = await axios.delete(`/user/follower/${data}`);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);
export const signup = createAsyncThunk(
  "user/signup",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post("/user", data);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);
