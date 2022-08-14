/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import userSlice from "../user/userSlice";

axios.defaults.baseURL = "http://localhost:3065";
axios.defaults.withCredentials = true; // cookie share between front, backend

// export const loadPosts = createAsyncThunk(`posts?lastId=${lastId || 0}`, async ()=>{

// })
export const loadPosts = createAsyncThunk(
  "post/loadPosts", // Action name declare. (액션 이름 에 pending, fulfilled, rejected 의 상태에 대한 action 을 자동으로 생성해줌. 나중에 postSlice -> extraReducers -> addCase에서 actionName.pending, fulfilled, rejected로 사용 될 것임)
  async (data) => {
    const response = await axios.get(`/posts?last=${data?.lastId || 0}`);
    return response.data;
  },

  // // 해당 request가 원래는 throttle 옵션을 준 케이스 였음.
  // {
  //   condition: (data, { getState }) => {
  //     const { post } = getState();
  //     console.log("post: ", post);
  //     if (post.loadPostsLoading) {
  //       return false;
  //     }
  //     return true;
  //   },
  // },
);

export const addPost = createAsyncThunk(
  "post/addPost",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post("/post", data);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const removePost = createAsyncThunk(
  "post/removePost",
  async (data, thunkAPI) => {
    try {
      console.log("remove post data: ", data);
      // DELETE /post/1/
      const response = await axios.delete(`/post/${data.postId}`);
      thunkAPI.dispatch(userSlice.actions.removePostOfMe(response.data.id));
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const addComment = createAsyncThunk(
  "post/addComment",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`/post/${data.PostId}/comment`, data);
      return response;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const uploadImages = createAsyncThunk(
  "post/uploadImages",
  async (data, thunkAPI) => {
    try {
      const response = axios.post("/post/images", data);
      return response;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const retweet = createAsyncThunk(
  "post/retweet",
  async (data, thunkAPI) => {
    try {
      const response = axios.post(`/post/${data}/retweet`, data);
      return response;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const postService = { loadPosts };
export default postService;
