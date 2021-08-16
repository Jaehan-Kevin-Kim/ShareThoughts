export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: "jhkevin21",
      },
      content: "First post test #Hashtag, #Node",
      Images: [
        {
          src: `https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2022-chevrolet-corvette-z06-1607016574.jpg?crop=0.737xw:0.738xh;0.181xw,0.218xh&resize=640:*`,
        },
        {
          src: "https://www.fastweb.com/uploads/article_photo/photo/2161/crop380w_istock_000002193842xsmall-books.jpg",
        },
        {
          src: "https://www.insidehighered.com/sites/default/server_files/media/iStock-520374378.jpg",
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
  postAdded: false,
};

const ADD_POST = "ADD_POST";
export const addPost = () => {
  return {
    type: ADD_POST,
  };
};

const dummyPost = {
  id: 2,
  User: {
    id: 1,
    nickname: "jhkevin21",
  },
  content: "dummyPost",
  Images: [],
  Comments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };
    }
    default:
      return state;
  }
};

export default reducer;
