import shortId from "shortid";

export const initialState = {
  mainPosts: [
    {
      id: shortId.generate(),
      User: {
        id: 1,
        nickname: "jhkevin21",
      },
      content: "First post test #Hashtag, #Node",
      Images: [
        {
          src: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2022-chevrolet-corvette-z06-1607016574.jpg?crop=0.737xw:0.738xh;0.181xw,0.218xh&resize=640:*",
        },
        {
          src: "https://www.fastweb.com/uploads/article_photo/photo/2161/crop380w_istock_000002193842xsmall-books.jpg",
        },
        {
          src: "https://assets.carpages.ca/dealersite/prod-wp-autorama/uploads/2020/07/autorttr-car-1-1.png",
        },
      ],
      Comments: [
        {
          User: {
            nickname: "kevin.kim",
          },
          content: "first comment test",
        },
        {
          User: { nickname: "aquaqua12" },
          content: "second comment test",
        },
      ],
    },
  ],
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

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

const dummyPost = (data) => ({
  id: shortId.generate(),
  User: {
    id: 1,
    nickname: "jhkevin21",
  },
  content: data,
  Images: [],
  Comments: [],
});

const dummyComment = (data) => ({
  id: shortId.generate(),
  content: data,
  User: {
    id: 1,
    nickname: "jhkevin21",
  },
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST: {
      return {
        ...state,
        // mainPosts: [dummyPost, ...state.mainPosts],
        addPostLoading: true,
        addPostDone: false,
        addPostError: null,
      };
    }
    case ADD_POST_SUCCESS: {
      return {
        ...state,
        mainPosts: [dummyPost(action.data), ...state.mainPosts],
        addPostDone: true,
        addPostLoading: false,
      };
    }
    case ADD_POST_FAILURE: {
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error,
      };
    }
    case ADD_COMMENT_REQUEST: {
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null,
      };
    }
    case ADD_COMMENT_SUCCESS: {
      const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
      console.log("postIndex", postIndex);
      const post = { ...state.mainPosts[postIndex] };
      console.log("post", post);
      post.Comments = [dummyComment(action.data.content), ...post.Comments];
      console.log("postComments", post.Comments);
      const mainPosts = [...state.mainPosts];
      console.log("mainPosts", mainPosts);
      mainPosts[postIndex] = post;
      return {
        ...state,
        mainPosts,
        addCommentDone: true,
        addCommentLoading: false,
      };
    }
    case ADD_COMMENT_FAILURE: {
      return {
        ...state,
        addCommentLoading: false,
        addCommentError: action.error,
      };
    }
    default:
      return state;
  }
};

export default reducer;
