import { createAsyncThunk } from "@reduxjs/toolkit";
import _ from "lodash";
import axios from "axios";

// const loadUserPostsThrottle = async (data: string, lastId: number) => {
//   const response = await axios.get(`/user/${data}/posts?lastId=${lastId || 0}`);
//   return response.data;
// };

// export const loadUserPosts = createAsyncThunk(
//   "post/loadUserPosts",
//   _.throttle(loadUserPostsThrottle, 5000),
// );

export const loadUserPosts = createAsyncThunk(
  "post/loadUserPosts",
  async ({ data, lastId }: { data: string; lastId: number }) => {
    const response = await axios.get(
      `/user/${data}/posts?lastId=${lastId || 0}`,
    );
    return response.data;
  },
);

// const loadHashtagPostsThrottle = async ({
//   data,
//   lastId,
// }: {
//   data: string;
//   lastId: number;
// }) => {
//   const response = await axios.get(
//     `/hashtag/${encodeURIComponent(data)}?lastId=${lastId || 0}`,
//   );
//   return response.data;
// };

// export const loadHashtagPosts = createAsyncThunk(
//   "post/loadHashtagPosts",
//   _.throttle(loadHashtagPostsThrottle, 5000),
// );

export const loadHashtagPosts = createAsyncThunk(
  "post/loadHashtagPosts",
  async ({ data, lastId }: { data: string; lastId: number }) => {
    const response = await axios.get(
      `/hashtag/${encodeURIComponent(data)}?lastId=${lastId || 0}`,
    );
    return response.data;
  },
);

const loadPostsThrottle = async (lastId: number) => {
  const response = await axios.get(`/posts?lastId=${lastId || 0}`);
  return response.data;
};

export const loadPosts = createAsyncThunk(
  "post/loadPosts",
  _.throttle(loadPostsThrottle, 5000),
);

export const loadPost = createAsyncThunk(
  "post/loadPost",
  async (data: number) => {
    const response = await axios.get(`/post/${data}`);
    return response.data;
  },
);

export const addPost = createAsyncThunk("post/addPost", async (data) => {
  const response = await axios.post("/post", data);
  return response.data;
});

export const removePost = createAsyncThunk(
  "post/removePost",
  async (postId: number) => {
    const response = await axios.delete(`/post/${postId}`);
    return response.data;
  },
);

export const updatePost = createAsyncThunk(
  "post/updatePost",
  async ({ postId, formData }: { postId: number; formData: FormData }) => {
    const response = await axios.patch(`/post/${postId}`, formData);
    return response.data;
  },
);

export const addComment = createAsyncThunk(
  "post/addComment",
  async ({ content, postId }: { content: string; postId: number }) => {
    const response = await axios.post(`/post/${postId}/comment`, content);
    return response.data;
  },
);

export const uploadImages = createAsyncThunk(
  "post/uploadImages",
  async (data) => {
    const response = await axios.post("/post/images", data);
    return response.data;
  },
);

export const removeImage = createAsyncThunk(
  "post/removeImage",
  async (src: string) => {
    const response = await axios.patch(`/post/image/${src}`);
    return response.data;
  },
);

export const updateImages = createAsyncThunk(
  "post/updateImages",
  async (data: FormData) => {
    const response = await axios.post("/post/images", data);
    return response.data;
  },
);

export const retweet = createAsyncThunk(
  "post/retweet",
  async (postId: number) => {
    const response = await axios.post(`/post/${postId}/retweet`, postId);
    return response.data;
  },
);

export const addLike = createAsyncThunk(
  "post/addLike",
  async (data: number) => {
    const response = await axios.post(`/post/like/${data}`);
    return response.data;
  },
);

export const removeLike = createAsyncThunk(
  "post/removeLike",
  async (data: number) => {
    const response = await axios.post(`/post/unlike/${data}`);
    return response.data;
  },
);

// Report API
export const addReport = createAsyncThunk(
  "post/addReport",
  async ({ postId, reason }: { postId: number; reason: string }) => {
    const response = await axios.post(`/report/${postId}`, reason);
    return response.data;
  },
);

export const loadReport = createAsyncThunk(
  "post/loadReport",
  async (postId) => {
    const response = await axios.get(`/report/${postId}`);
    return response.data;
  },
);

export const postAppeal = createAsyncThunk(
  "post/postAppeal",
  async ({ postId, appeal }: { postId: number; appeal: string }) => {
    const response = await axios.patch(`/post/appeal/${postId}`, appeal);
    return response.data;
  },
);
