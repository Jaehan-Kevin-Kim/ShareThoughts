import produce from "immer";

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

// export const generateDummyPost = (number) =>
//   Array(number)
//     .fill()
//     .map(() => ({
//       id: shortId.generate(),
//       User: {
//         id: shortId.generate(),
//         nickname: faker.name.findName(),
//       },
//       content: faker.lorem.paragraph(),
//       Images: [
//         {
//           src: faker.image.image(),
//         },
//       ],
//       Comments: [
//         {
//           id: shortId.generate(),
//           User: {
//             id: shortId.generate(),
//             nickname: faker.name.findName(),
//           },
//           content: faker.lorem.sentence(),
//         },
//       ],
//     }));

// initialState.mainPosts = initialState.mainPosts.concat(generateDummyPost(10));

export const LOAD_POSTS_REQUEST = "LOAD_POSTS_REQUEST";
export const LOAD_POSTS_SUCCESS = "LOAD_POSTS_SUCCESS";
export const LOAD_POSTS_FAILURE = "LOAD_POSTS_FAILURE";

export const LOAD_USER_POSTS_REQUEST = "LOAD_USER_POSTS_REQUEST";
export const LOAD_USER_POSTS_SUCCESS = "LOAD_USER_POSTS_SUCCESS";
export const LOAD_USER_POSTS_FAILURE = "LOAD_USER_POSTS_FAILURE";

export const LOAD_HASHTAG_POSTS_REQUEST = "LOAD_HASHTAG_POSTS_REQUEST";
export const LOAD_HASHTAG_POSTS_SUCCESS = "LOAD_HASHTAG_POSTS_SUCCESS";
export const LOAD_HASHTAG_POSTS_FAILURE = "LOAD_HASHTAG_POSTS_FAILURE";

export const LOAD_POST_REQUEST = "LOAD_POST_REQUEST";
export const LOAD_POST_SUCCESS = "LOAD_POST_SUCCESS";
export const LOAD_POST_FAILURE = "LOAD_POST_FAILURE";

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST";
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS";
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE";

export const UPDATE_POST_REQUEST = "UPDATE_POST_REQUEST";
export const UPDATE_POST_SUCCESS = "UPDATE_POST_SUCCESS";
export const UPDATE_POST_FAILURE = "UPDATE_POST_FAILURE";

export const UPLOAD_IMAGES_REQUEST = "UPLOAD_IMAGES_REQUEST";
export const UPLOAD_IMAGES_SUCCESS = "UPLOAD_IMAGES_SUCCESS";
export const UPLOAD_IMAGES_FAILURE = "UPLOAD_IMAGES_FAILURE";

export const UPDATE_IMAGES_REQUEST = "UPDATE_IMAGES_REQUEST";
export const UPDATE_IMAGES_SUCCESS = "UPDATE_IMAGES_SUCCESS";
export const UPDATE_IMAGES_FAILURE = "UPDATE_IMAGES_FAILURE";

export const REMOVE_IMAGE_REQUEST = "REMOVE_IMAGE_REQUEST";
export const REMOVE_IMAGE_SUCCESS = "REMOVE_IMAGE_SUCCESS";
export const REMOVE_IMAGE_FAILURE = "REMOVE_IMAGE_FAILURE";

export const RETWEET_REQUEST = "RETWEET_REQUEST";
export const RETWEET_SUCCESS = "RETWEET_SUCCESS";
export const RETWEET_FAILURE = "RETWEET_FAILURE";

export const REMOVE_IMAGE = "REMOVE_IMAGE";
export const REMOVE_UPDATEIMAGE = "REMOVE_UPDATEIMAGE";
export const REMOVE_UPDATEIMAGEALL = "REMOVE_UPDATEIMAGEALL";

export const ADD_LIKE_REQUEST = "ADD_LIKE_REQUEST";
export const ADD_LIKE_SUCCESS = "ADD_LIKE_SUCCESS";
export const ADD_LIKE_FAILURE = "ADD_LIKE_FAILURE";

export const REMOVE_LIKE_REQUEST = "REMOVE_LIKE_REQUEST";
export const REMOVE_LIKE_SUCCESS = "REMOVE_LIKE_SUCCESS";
export const REMOVE_LIKE_FAILURE = "REMOVE_LIKE_FAILURE";

export const ADD_REPORT_REQUEST = "ADD_REPORT_REQUEST";
export const ADD_REPORT_SUCCESS = "ADD_REPORT_SUCCESS";
export const ADD_REPORT_FAILURE = "ADD_REPORT_FAILURE";

export const LOAD_REPORTS_REQUEST = "LOAD_REPORTS_REQUEST";
export const LOAD_REPORTS_SUCCESS = "LOAD_REPORTS_SUCCESS";
export const LOAD_REPORTS_FAILURE = "LOAD_REPORTS_FAILURE";

export const POST_APPEAL_REQUEST = "POST_APPEAL_REQUEST";
export const POST_APPEAL_SUCCESS = "POST_APPEAL_SUCCESS";
export const POST_APPEAL_FAILURE = "POST_APPEAL_FAILURE";

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = (data) => {
  return {
    type: ADD_COMMENT_REQUEST,
    data,
  };
};

// const dummyPost = (data) => ({
//   id: data.id,
//   User: {
//     id: 1,
//     nickname: "jhkevin21",
//   },
//   content: data.content,
//   Images: [],
//   Comments: [],
// });

// const dummyComment = (data) => ({
//   id: shortId.generate(),
//   content: data,
//   User: {
//     id: 1,
//     nickname: "jhkevin21",
//   },
// });

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOAD_USER_POSTS_REQUEST:
      case LOAD_HASHTAG_POSTS_REQUEST:
      case LOAD_POSTS_REQUEST: {
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
        break;
      }
      case LOAD_USER_POSTS_SUCCESS:
      case LOAD_HASHTAG_POSTS_SUCCESS:
      case LOAD_POSTS_SUCCESS: {
        console.log("action.data", action.data);
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.mainPosts = draft.mainPosts.concat(action.data);
        // draft.hasMorePost = draft.mainPosts.length < 50;
        draft.hasMorePost = action.data.length === 10;
        break;
      }
      case LOAD_USER_POSTS_FAILURE:
      case LOAD_HASHTAG_POSTS_FAILURE:
      case LOAD_POSTS_FAILURE: {
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error;
        break;
      }
      case LOAD_POST_REQUEST: {
        draft.loadPostLoading = true;
        draft.loadPostDone = false;
        draft.loadPostError = null;
        break;
      }
      case LOAD_POST_SUCCESS: {
        console.log("action.data", action.data);
        draft.loadPostLoading = false;
        draft.loadPostDone = true;
        draft.singlePost = action.data;
        // draft.hasMorePost = action.data.length === 10;
        break;
      }
      case LOAD_POST_FAILURE: {
        draft.loadPostLoading = false;
        draft.loadPostError = action.error;
        break;
      }
      case ADD_POST_REQUEST: {
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      }
      case ADD_POST_SUCCESS: {
        console.log("action.data", action.data);
        draft.mainPosts.unshift(action.data);
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.imagePaths = [];
        break;
      }
      case ADD_POST_FAILURE: {
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;
      }
      case REMOVE_POST_REQUEST: {
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostEror = null;
        break;
      }
      case REMOVE_POST_SUCCESS: {
        draft.removePostDone = true;
        draft.removePostLoading = false;
        const postIndex = state.mainPosts.findIndex(
          (v) => v.id === action.data.PostId,
        );
        console.log("postIndex", postIndex);
        draft.mainPosts.splice(postIndex, 1);
        break;
      }
      case REMOVE_POST_FAILURE: {
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;
      }
      case UPDATE_POST_REQUEST: {
        draft.updatePostLoading = true;
        draft.updatePostDone = false;
        draft.updatePostEror = null;
        break;
      }
      case UPDATE_POST_SUCCESS: {
        draft.updatePostDone = true;
        draft.updatePostLoading = false;
        draft.mainPosts.find((v) => v.id === action.data.PostId).content =
          action.data.body.content;
        draft.mainPosts.find((v) => v.id === action.data.PostId).Images =
          action.data.body.Images;
        break;
      }
      case UPDATE_POST_FAILURE: {
        draft.updatePostLoading = false;
        draft.updatePostError = action.error;
        break;
      }
      case UPLOAD_IMAGES_REQUEST: {
        draft.uploadImagesLoading = true;
        draft.uploadImagesDone = false;
        draft.uploadImagesEror = null;
        break;
      }
      case UPLOAD_IMAGES_SUCCESS: {
        draft.uploadImagesDone = true;
        draft.uploadImagesLoading = false;
        draft.imagePaths = draft.imagePaths.concat(action.data); //backend에서 filename들을 보내줬고, 해당 filename들은 post.imagePaths에 front에서 저장 되도록 설정 함.
        break;
      }
      case UPLOAD_IMAGES_FAILURE: {
        draft.uploadImagesLoading = false;
        draft.uploadImagesError = action.error;
        break;
      }
      case UPDATE_IMAGES_REQUEST: {
        draft.updateImagesLoading = true;
        draft.updateImagesDone = false;
        draft.updateImagesEror = null;
        break;
      }
      case UPDATE_IMAGES_SUCCESS: {
        draft.updateImagesDone = true;
        draft.updateImagesLoading = false;
        draft.updateImagePaths = draft.updateImagePaths.concat(action.data); //backend에서 filename들을 보내줬고, 해당 filename들은 post.imagePaths에 front에서 저장 되도록 설정 함.
        break;
      }
      case UPDATE_IMAGES_FAILURE: {
        draft.updateImagesLoading = false;
        draft.updateImagesError = action.error;
        break;
      }
      case ADD_LIKE_REQUEST: {
        draft.addLikeLoading = true;
        draft.addLikeDone = false;
        draft.addLikeEror = null;
        break;
      }
      case ADD_LIKE_SUCCESS: {
        draft.addLikeDone = true;
        draft.addLikeLoading = false;
        const postIndex = draft.mainPosts.findIndex(
          (v) => v.id === parseInt(action.data.PostId, 10),
        );
        // console.log("postIndex: ", postIndex);
        // console.log("action.data: ", action.data);
        // console.log(
        //   "draft.mainPosts ",
        //   draft.mainPosts[parseInt(postIndex, 10)],
        // );
        // console.log("전: ", draft.mainPosts[postIndex]?.Likers);

        if (draft.mainPosts[postIndex]?.Likers) {
          draft.mainPosts[postIndex].Likers.push({
            id: action.data.User.id,
            nickname: action.data.User.nickname,
            Like: { UserId: action.data.User.id, PostId: action.data.PostId },
          });
        } else {
          draft.mainPosts[postIndex].push({
            Likers: {
              id: action.data.User.id,
              nickname: action.data.User.nickname,
              Like: { UserId: action.User.id, PostId: action.data.PostId },
            },
          });
        }

        // draft.mainPosts[postIndex].Likers.filter(
        //   (v) => v.id !== action.data.UserId,
        // );
        // console.log("후: ", draft.mainPosts[postIndex].Likers);
        // console.log("likers last check: ", initialState.mainPosts[postIndex]);
        break;
      }
      case ADD_LIKE_FAILURE: {
        draft.addLikeLoading = false;
        draft.addLikeError = action.error;
        break;
      }
      case REMOVE_LIKE_REQUEST: {
        draft.removeLikeLoading = true;
        draft.removeLikeDone = false;
        draft.removeLikeEror = null;
        break;
      }
      case REMOVE_LIKE_SUCCESS: {
        draft.removeLikeDone = true;
        draft.removeLikeLoading = false;
        const postIndex = draft.mainPosts.findIndex(
          (v) => v.id === parseInt(action.data.PostId, 10),
        );

        draft.mainPosts[postIndex].Likers = draft.mainPosts[
          postIndex
        ].Likers.filter((v) => v.id !== action.data.UserId);
        // console.log("postIndex: ", postIndex);
        // console.log("action.data: ", action.data);
        // console.log(
        //   "draft.mainPosts ",
        //   draft.mainPosts[parseInt(postIndex, 10)],
        // );
        // console.log("전: ", draft.mainPosts[postIndex]?.Likers);

        // if (draft.mainPosts[postIndex]?.Likers) {
        //   draft.mainPosts[postIndex].Likers.push({
        //     id: action.data.User.id,
        //     nickname: action.data.User.nickname,
        //     Like: { UserId: action.data.User.id, PostId: action.data.PostId },
        //   });
        // } else {
        //   draft.mainPosts[postIndex].push({
        //     Likers: {
        //       id: action.data.User.id,
        //       nickname: action.data.User.nickname,
        //       Like: { UserId: action.User.id, PostId: action.data.PostId },
        //     },
        //   });
        // }

        // draft.mainPosts[postIndex].Likers.filter(
        //   (v) => v.id !== action.data.UserId,
        // );
        // console.log("후: ", draft.mainPosts[postIndex].Likers);
        // console.log("likers last check: ", initialState.mainPosts[postIndex]);
        break;
      }
      case REMOVE_LIKE_FAILURE: {
        draft.removeLikeLoading = false;
        draft.removeLikeError = action.error;
        break;
      }
      case REMOVE_IMAGE_REQUEST: {
        draft.removeImageLoading = true;
        draft.removeImageDone = false;
        draft.removeImageEror = null;
        break;
      }
      case REMOVE_IMAGE_SUCCESS: {
        draft.removeImageDone = true;
        draft.removeImageLoading = false;
        console.log("action.data: ", action.data);
        const postIndex = draft.mainPosts.findIndex(
          (v) => v.id === action.data.postId,
        );
        draft.mainPosts[postIndex].Images = draft.mainPosts[
          postIndex
        ].Images.filter((v) => v.src !== action.data.src);
        // draft.mainPosts
        //   .find((v) => v.id === action.data.postId)
        //   .filter((v) => v.src !== action.data.src);
        // draft.imagePaths = draft.imagePaths.concat(action.data); //backend에서 filename들을 보내줬고, 해당 filename들은 post.imagePaths에 front에서 저장 되도록 설정 함.

        break;
      }
      case REMOVE_IMAGE_FAILURE: {
        draft.removeImageLoading = false;
        draft.removeImageError = action.error;
        break;
      }
      case RETWEET_REQUEST: {
        draft.retweetLoading = true;
        draft.retweetDone = false;
        draft.retweetEror = null;
        break;
      }
      case RETWEET_SUCCESS: {
        draft.retweetDone = true;
        draft.retweetLoading = false;
        draft.mainPosts.unshift(action.data);
        break;
      }
      case RETWEET_FAILURE: {
        draft.retweetLoading = false;
        draft.retweetError = action.error;
        break;
      }
      case ADD_COMMENT_REQUEST: {
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      }
      case ADD_COMMENT_SUCCESS: {
        const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
        post.Comments.unshift(action.data);
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
        // const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
        // const post = { ...state.mainPosts[postIndex] };
        // post.Comments = [dummyComment(action.data.content), ...post.Comments];
        // const mainPosts = [...state.mainPosts];
        // mainPosts[postIndex] = post;
        // return {
        //   ...state,
        //   mainPosts,
        //   addCommentDone: true,
        //   addCommentLoading: false,
        // };
      }
      case ADD_COMMENT_FAILURE: {
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;
      }

      case ADD_REPORT_REQUEST: {
        draft.addReportLoading = true;
        draft.addReportDone = false;
        draft.addReportError = null;
        break;
      }

      case ADD_REPORT_SUCCESS: {
        draft.addReportLoading = false;
        draft.addReportDone = true;
        draft.addReportError = null;
        console.log("action.data: ", action.data);
        break;
      }

      case ADD_REPORT_FAILURE: {
        draft.addReportLoading = false;
        draft.addReportError = action.error;
        console.log("action.error: ", action.error);
        break;
      }

      case LOAD_REPORTS_REQUEST: {
        draft.loadReportsLoading = true;
        draft.loadReportsDone = false;
        draft.loadReportsError = null;
        break;
      }

      case LOAD_REPORTS_SUCCESS: {
        draft.loadReportsLoading = false;
        draft.loadReportsDone = true;
        draft.loadReportsError = null;
        break;
      }

      case LOAD_REPORTS_FAILURE: {
        draft.loadReportsLoading = false;
        draft.loadReportsError = action.error;
        break;
      }
      case POST_APPEAL_REQUEST: {
        draft.postAppealLoading = true;
        draft.postAppealDone = false;
        draft.postAppealError = null;
        break;
      }

      case POST_APPEAL_SUCCESS: {
        draft.postAppealLoading = false;
        draft.postAppealDone = true;
        draft.postAppealError = null;
        draft.mainPosts.find((v) => v.id === action.data.id).appeal =
          action.data.appeal;

        // console.log("action.data.appeal: ", action.data.appeal);
        break;
      }

      case POST_APPEAL_FAILURE: {
        draft.postAppealLoading = false;
        draft.postAppealError = action.error;
        break;
      }

      case REMOVE_IMAGE: {
        draft.imagePaths = draft.imagePaths.filter((v, i) => i !== action.data);
        break;
      }
      case REMOVE_UPDATEIMAGE: {
        draft.updateImagePaths = draft.updateImagePaths.filter(
          (v, i) => i !== action.data,
        );
        break;
      }
      case REMOVE_UPDATEIMAGEALL: {
        draft.updateImagePaths = [];
        break;
      }
      default:
        break;
    }
  });

export default reducer;
