import { createSlice } from "@reduxjs/toolkit";
import {
  addComment,
  addLike,
  addPost,
  addReport,
  loadHashtagPosts,
  loadPost,
  loadPosts,
  loadUserPosts,
  removeImage,
  removeLike,
  removePost,
  retweet,
  updatePost,
  uploadImages,
} from "./postService";

export const initialState = {
  mainPosts: [],
  singlePost: null,
  imagePaths: [],
  updateImagePaths: [],
  hasMorePost: true,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  loadHashtagPostsLoading: false,
  loadHashtagPostsDone: false,
  loadHashtagPostsError: null,
  loadUserPostsLoading: false,
  loadUserPostsDone: false,
  loadUserPostsError: null,
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,
  updatePostLoading: false,
  updatePostDone: false,
  updatePostError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  uploadImagesLoading: false,
  uploadImagesDone: false,
  uploadImagesError: null,
  updateImagesLoading: false,
  updateImagesDone: false,
  updateImagesError: null,
  removeImageLoading: false,
  removeImageDone: false,
  removeImageError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  retweetLoading: false,
  retweetDone: false,
  retweetError: null,
  addLikeLoading: false,
  addLikeDone: false,
  addLikeError: null,
  removeLikeLoading: false,
  removeLikeDone: false,
  removeLikeError: null,
  addReportLoading: false,
  addReportDone: false,
  addReportError: null,
  loadReportsLoading: false,
  loadReportsDone: false,
  loadReportsError: null,
  postAppealLoading: false,
  postAppealDone: false,
  postAppealError: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    removeImage(state, action) {
      state.imagePaths.filter((image, index) => index !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUserPosts.pending, (state) => {
        state.loadUserPostsLoading = true;
        state.loadUserPostsDone = false;
        state.loadUserPostsError = null;
      })
      .addCase(loadUserPosts.fulfilled, (state, action) => {
        console.log("fulfilled", action.payload);
        state.loadUserPostsLoading = false;
        state.loadUserPostsDone = true;
        state.loadUserPostsError = null;
        // state.me = action.payload || null;
        state.mainPosts = state.mainPosts.concat(action.payload);
        state.hasMorePost = action.payload.length === 10;
      })
      .addCase(loadUserPosts.rejected, (state, action) => {
        state.loadUserPostsLoading = false;
        state.loadUserPostsError = action.error;
      })
      .addCase(loadHashtagPosts.pending, (state) => {
        state.loadHashtagPostsLoading = true;
        state.loadHashtagPostsDone = false;
        state.loadHashtagPostsError = null;
      })
      .addCase(loadHashtagPosts.fulfilled, (state, action) => {
        console.log("fulfilled", action.payload);
        state.loadHashtagPostsLoading = false;
        state.loadHashtagPostsDone = true;
        state.loadHashtagPostsError = null;
        // state.me = action.payload || null;
        state.mainPosts = state.mainPosts.concat(action.payload);
        state.hasMorePost = action.payload.length === 10;
      })
      .addCase(loadHashtagPosts.rejected, (state, action) => {
        state.loadHashtagPostsLoading = false;
        state.loadHashtagPostsError = action.error;
      })
      .addCase(loadPosts.pending, (state) => {
        state.loadPostsLoading = true;
        state.loadPostsDone = false;
        state.loadPostsError = null;
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        console.log("fulfilled", action.payload);
        state.loadPostsLoading = false;
        state.loadPostsDone = true;
        state.loadPostsError = null;
        // state.me = action.payload || null;
        state.mainPosts = state.mainPosts.concat(action.payload);
        state.hasMorePost = action.payload.length === 10;
      })
      .addCase(loadPosts.rejected, (state, action) => {
        state.loadPostsLoading = false;
        state.loadPostsError = action.error;
      })
      .addCase(loadPost.pending, (state) => {
        state.loadPostLoading = true;
        state.loadPostDone = false;
        state.loadPostError = null;
      })
      .addCase(loadPost.fulfilled, (state, action) => {
        console.log("fulfilled", action.payload);
        state.loadPostLoading = false;
        state.loadPostDone = true;
        state.loadPostError = null;
        state.singlePost = action.payload;
      })
      .addCase(loadPost.rejected, (state, action) => {
        state.loadPostLoading = false;
        state.loadPostError = action.error;
      })

      .addCase(addPost.pending, (state) => {
        state.addPostLoading = true;
        state.addPostDone = false;
        state.addPostError = null;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        console.log("fulfilled", action.payload);
        state.addPostLoading = false;
        state.addPostDone = true;
        state.addPostError = null;
        state.mainPosts.unshift(action.payload);
        state.imagePaths = [];
      })
      .addCase(removePost.rejected, (state, action) => {
        state.removePostLoading = false;
        state.removePostError = action.error;
      })

      .addCase(removePost.pending, (state) => {
        state.removePostLoading = true;
        state.removePostDone = false;
        state.removePostError = null;
      })
      .addCase(removePost.fulfilled, (state, action) => {
        console.log("fulfilled", action.payload);
        state.removePostLoading = false;
        state.removePostDone = true;
        state.removePostError = null;
        const postIndex = state.mainPosts.findIndex(
          (post) => post.id === action.payload.PostId,
        );
        state.mainPosts.splice(postIndex, 0);
      })
      .addCase(removePost.rejected, (state, action) => {
        state.removePostLoading = false;
        state.removePostError = action.error;
      })

      .addCase(updatePost.pending, (state) => {
        state.updatePostLoading = true;
        state.updatePostDone = false;
        state.updatePostError = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        console.log("fulfilled", action.payload);
        state.updatePostLoading = false;
        state.updatePostDone = true;
        state.updatePostError = null;
        // const postIndex = state.mainPosts.findIndex((post)=>post.id === action.payload.PostId);
        // state.mainPosts[postIndex] = state.payload.body;
        state.mainPosts.find(
          (post) => post.Id === action.payload.PostId,
        ).content = action.payload.body.content;
        state.mainPosts.find(
          (post) => post.Id === action.payload.PostId,
        ).Images = action.payload.body.Images;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.updatePostLoading = false;
        state.updatePostError = action.error;
      })

      .addCase(addComment.pending, (state) => {
        state.addCommentLoading = true;
        state.addCommentDone = false;
        state.addCommentError = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        console.log("fulfilled", action.payload);
        state.addCommentLoading = false;
        state.addCommentDone = true;
        state.addCommentError = null;
        state.mainPosts
          .find((post) => post.id === action.payload.data.PostId)
          .Comments.unshift(action.payload);
      })
      .addCase(addComment.rejected, (state, action) => {
        state.addCommentLoading = false;
        state.addCommentError = action.error;
      })

      .addCase(uploadImages.pending, (state) => {
        state.uploadImagesLoading = true;
        state.uploadImagesDone = false;
        state.uploadImagesError = null;
      })
      .addCase(uploadImages.fulfilled, (state, action) => {
        console.log("fulfilled", action.payload);
        state.uploadImagesLoading = false;
        state.uploadImagesDone = true;
        state.uploadImagesError = null;
        state.imagePaths = state.imagePaths.concnat(action.payload);
      })
      .addCase(uploadImages.rejected, (state, action) => {
        state.uploadImagesLoading = false;
        state.uploadImagesError = action.error;
      })

      .addCase(removeImage.pending, (state) => {
        state.removeImageLoading = true;
        state.removeImageDone = false;
        state.removeImageError = null;
      })
      .addCase(removeImage.fulfilled, (state, action) => {
        console.log("fulfilled", action.payload);
        state.removeImageLoading = false;
        state.removeImageDone = true;
        state.removeImageError = null;
        // state.imagePaths = state.imagePaths.concnat(action.payload);
        const postIndex = state.mainPosts.findIndex(
          (post) => post.id === action.payload.pstId,
        );
        state.mainPosts[postIndex].Images = state.mainPosts[
          postIndex
        ].Images.filter((image) => image.src !== action.payload.src);
      })
      .addCase(removeImage.rejected, (state, action) => {
        state.removeImageLoading = false;
        state.removeImageError = action.error;
      })

      .addCase(retweet.pending, (state) => {
        state.retweetLoading = true;
        state.retweetDone = false;
        state.retweetError = null;
      })
      .addCase(retweet.fulfilled, (state, action) => {
        console.log("fulfilled", action.payload);
        state.retweetLoading = false;
        state.retweetDone = true;
        state.retweetError = null;
        // state.imagePaths = state.imagePaths.concnat(action.payload);
        state.mainPosts.unshift(action.payload);
      })
      .addCase(retweet.rejected, (state, action) => {
        state.retweetLoading = false;
        state.retweetError = action.error;
      })

      .addCase(addLike.pending, (state) => {
        state.addLikeLoading = true;
        state.addLikeDone = false;
        state.addLikeError = null;
      })
      .addCase(addLike.fulfilled, (state, action) => {
        console.log("fulfilled", action.payload);
        state.addLikeLoading = false;
        state.addLikeDone = true;
        state.addLikeError = null;
        // state.imagePaths = state.imagePaths.concnat(action.payload);
        const postIndex = state.mainPosts.findIndex(
          (v) => v.id === parseInt(action.payload.PostId, 10),
        );
        if (state.mainPosts[postIndex]?.Likers) {
          state.mainPosts[postIndex].Likers.push({
            id: action.payload.User.id,
            nickname: action.payload.User.nickname,
            Like: {
              UserId: action.payload.User.id,
              PostId: action.payload.PostId,
            },
          });
        } else {
          state.mainPosts[postIndex].push({
            Likers: {
              id: action.payload.User.id,
              nickname: action.payload.User.nickname,
              Like: { UserId: action.User.id, PostId: action.payload.PostId },
            },
          });
        }
      })
      .addCase(addLike.rejected, (state, action) => {
        state.addLikeLoading = false;
        state.addLikeError = action.error;
      })

      .addCase(removeLike.pending, (state) => {
        state.removeLike.Loading = true;
        state.removeLike.Done = false;
        state.removeLike.Error = null;
      })
      .addCase(removeLike.fulfilled, (state, action) => {
        console.log("fulfilled", action.payload);
        state.removeLike.Loading = false;
        state.removeLike.Done = true;
        state.removeLike.Error = null;
        const post = state.mainPosts.find(
          // eslint-disable-next-line no-shadow
          (post) => post.id === action.payload.PostId,
        );
        post.Likers = post.Likers.filter(
          (liker) => liker.id !== action.payload.UserId,
        );
      })
      .addCase(removeLike.rejected, (state, action) => {
        state.removeLike.Loading = false;
        state.removeLike.Error = action.error;
      })

      .addCase(addReport.pending, (state) => {
        state.addReport.Loading = true;
        state.addReport.Done = false;
        state.addReport.Error = null;
      })
      .addCase(addReport.fulfilled, (state, action) => {
        console.log("fulfilled", action.payload);
        state.addReport.Loading = false;
        state.addReport.Done = true;
        state.addReport.Error = null;
        // const post = state.mainPosts.find(post=>post.id === action.payload.PostId);
        // post.Likers = post.Likers.filter(liker => liker.id !== action.payload.UserId);
        // haven't implemented for add report front-end part yet?
      })
      .addCase(addReport.rejected, (state, action) => {
        state.addReport.Loading = false;
        state.addReport.Error = action.error;
      });
  },
});

export default postSlice;
