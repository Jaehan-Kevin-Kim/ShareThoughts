import { createAsyncThunk } from "@reduxjs/toolkit";
import _ from "lodash";
import axios from "axios";

const loadUserPostsThrottle = async (data, lastId) => {
  const response = await axios.get(`/user/${data}/posts?lastId=${lastId || 0}`);
  return response.data;
};

export const loadUserPosts = createAsyncThunk(
  "post/loadUserPosts",
  _.throttle(loadUserPostsThrottle, 5000),
);

const loadHashtagPostsThrottle = async (data, lastId) => {
  const response = await axios.get(
    `/hashtag/${encodeURIComponent(data)}?lastId=${lastId || 0}`,
  );
  return response.data;
};

export const loadHashtagPosts = createAsyncThunk(
  "post/loadHashtagPosts",
  _.throttle(loadHashtagPostsThrottle, 5000),
);

const loadPostsThrottle = async (lastId) => {
  const response = await axios.get(`/posts?lastId=${lastId || 0}`);
  return response.data;
};

export const loadPosts = createAsyncThunk(
  "post/loadPosts",
  _.throttle(loadPostsThrottle, 5000),
);

export const loadPost = createAsyncThunk("post/loadPost", async (data) => {
  const response = await axios.get(`/post/${data}`);
  return response.data;
});

export const addPost = createAsyncThunk("post/addPost", async (data) => {
  const response = await axios.post("/post", data);
  return response.data;
});

export const removePost = createAsyncThunk("post/removePost", async (data) => {
  const response = await axios.delete(`/post/${data}`);
  return response.data;
});

export const updatePost = createAsyncThunk("post/updatePost", async (data) => {
  const response = await axios.patch(`/post/${data.postId}`, data.formData);
  return response.data;
});

export const addComment = createAsyncThunk("post/addComment", async (data) => {
  const response = await axios.post(`/post/${data.postId}/comment`, data);
  return response.data;
});

export const uploadImages = createAsyncThunk(
  "post/uploadImages",
  async (data) => {
    const response = await axios.post("/post/images", data);
    return response.data;
  },
);

export const removeImage = createAsyncThunk(
  "post/removeImage",
  async (data) => {
    const response = await axios.patch("/post/image/${data.src", data);
    return response.data;
  },
);

export const updateImages = createAsyncThunk(
  "post/updateImages",
  async (data) => {
    const response = await axios.post("/post/images", data);
    return response.data;
  },
);

export const retweet = createAsyncThunk("post/retweet", async (data) => {
  const response = await axios.post(`/post/${data}/retweet`, data);
  return response.data;
});

export const addLike = createAsyncThunk("post/addLike", async (data) => {
  const response = await axios.post(`/post/like/${data}`, data);
  return response.data;
});

export const removeLike = createAsyncThunk("post/removeLike", async (data) => {
  const response = await axios.post(`/post/unlike/${data}`, data);
  return response.data;
});

// Report API
export const addReport = createAsyncThunk("post/addReport", async (data) => {
  const response = await axios.post(`/report/${data.postId}`, data);
  return response.data;
});

export const loadReport = createAsyncThunk("post/loadReport", async (data) => {
  const response = await axios.get(`/report/${data.postId}`, data);
  return response.data;
});

export const postAppeal = createAsyncThunk("post/postAppeal", async (data) => {
  const response = await axios.patch(`/post/appeal/${data.postId}`, data);
  return response.data;
});
