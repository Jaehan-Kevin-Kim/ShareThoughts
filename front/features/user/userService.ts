import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loadMyInfo = createAsyncThunk(
  "user/loadMyInfo",
  async () => {
    // try {
    const response = await axios.get("/user");
    // console.log("user response", response.data);
    return response.data || null;
    // } catch (error) {
    //   const message =
    //     error.response?.data?.message || error.message || error.toString();
    //   return thunkAPI.rejectWithValue(message);
    // }
  },
);

export const loadUser = createAsyncThunk(
  "user/loadUser",
  async (data: number, { rejectWithValue }) => {
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

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }: { email: string; password: string }) => {
    // const response = await axios.post("http://localhost:3065/user/login", data);
    const response = await axios.post("/user/login", { email, password });
    return response.data;
  },
);

export const logout = createAsyncThunk("user/logout", async () => {
  const response = await axios.post("/user/logout");
  return response.data;
});

export const signupUser = createAsyncThunk(
  "user/signup",
  async (data: { email; password; nickname }) => {
    const response = await axios.post("/user", data);
    return response.data;
  },
);

export const follow = createAsyncThunk(
  "user/follow",
  async (userId: number) => {
    const response = await axios.patch(`/user/${userId}/follow`);
    return response.data;
  },
);

export const unfollow = createAsyncThunk(
  "user/unfollow",
  async (userId: number) => {
    const response = await axios.delete(`/user/${userId}/follow`);
    return response.data;
  },
);

export const changeNickname = createAsyncThunk(
  "user/nickname",
  async (nickname: string) => {
    const response = await axios.patch("/user/nickname", {
      nickname: nickname,
    });
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
