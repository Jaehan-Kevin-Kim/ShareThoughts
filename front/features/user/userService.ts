import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loadMyInfo = createAsyncThunk(
  "user/loadMyInfo",
  async (thunkAPI) => {
    try {
      const response = await axios.get("/user");
      console.log("userj response", response.data);
      return response.data || null;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const loadUser = createAsyncThunk(
  "user/loadUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/user/${data}`);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return rejectWithValue(message);
    }
  },
);

export const login = createAsyncThunk("user/login", async (data) => {
  // const response = await axios.post("http://localhost:3065/user/login", data);
  const response = await axios.post("/user/login", data);
  return response.data;
});

export const logout = createAsyncThunk("user/logout", async () => {
  const response = await axios.post("/user/logout");
  return response.data;
});

export const signupUser = createAsyncThunk("user/signup", async (data) => {
  const response = await axios.post("/user", data);
  return response.data;
});

export const follow = createAsyncThunk("user/follow", async (data) => {
  const response = await axios.patch(`/user/${data}/follow`);
  return response.data;
});

export const unfollow = createAsyncThunk("user/unfollow", async (data) => {
  const response = await axios.delete(`/user/${data}/follow`);
  return response.data;
});

export const changeNickname = createAsyncThunk(
  "user/nickname",
  async (data) => {
    const response = await axios.patch("/user/nickname", { nickname: data });
    return response.data;
  },
);

export const loadFollowings = createAsyncThunk("user/followings", async () => {
  const response = await axios.get("/user/followings");
  return response.data;
});

export const loadFollowers = createAsyncThunk("user/followers", async () => {
  const response = await axios.get("/user/followers");
  return response.data;
});

export const removeFollower = createAsyncThunk(
  "user/removeFollower",
  async (data) => {
    const response = await axios.delete(`/user/follower/${data}`);
    return response.data;
  },
);
