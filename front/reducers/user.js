import { axios } from "axios";
export const initialState = {
  logInLoading: false, // 로그인 시도 중
  logInDone: false,
  logInError: false,
  logOutLoading: false, // 로그아웃 시도 중
  logOutDone: false,
  logOutError: null,
  signUpLoading: false, // 회원가입 시도 중
  signUpDone: false,
  signUpError: null,
  changeNicknameLoading: false, // Nickname 변경 시도 중
  changeNicknameDone: false,
  changeNicknameError: null,
  me: null,
  signUpData: {},
  loginData: {},
};

/*
export const loginAction = (data) => {
  return (dispatch, getState) => {
    const state = getState(); // initial state
    dispatch(loginRequestAction());
    axios
      .post("/api/login")
      .then((res) => {
        dispatch(loginSuccessAction(res.data));
      })
      .catch((err) => {
        dispatch(loginFailureAction(err));
      });
  };
};
*/
// export const loginAction = (data) => {
//   return {
//     type: "LOG_IN",
//     data,
//   };
// };

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const CHANGE_NICKNAME_REQUEST = "CHANGE_NICKNAME_REQUEST";
export const CHANGE_NICKNAME_SUCCESS = "CHANGE_NICKNAME_SUCCESS";
export const CHANGE_NICKNAME_FAILURE = "CHANGE_NICKNAME_FAILURE";

export const FOLLOW_REQUEST = "FOLLOW_REQUEST";
export const FOLLOW_SUCCESS = "FOLLOW_SUCCESS";
export const FOLLOW_FAILURE = "FOLLOW_FAILURE";

export const UNFOLLOW_REQUEST = "UNFOLLOW_REQUEST";
export const UNFOLLOW_SUCCESS = "UNFOLLOW_SUCCESS";
export const UNFOLLOW_FAILURE = "UNFOLLOW_FAILURE";

const dummyUser = (data) => ({
  ...data,
  nickname: "Kevin",
  id: 1,
  Posts: [],
  Followings: [],
  Followers: [],
});

export const loginRequestAction = (data) => ({
  type: LOG_IN_REQUEST,
  data,
});

export const logoutRequestAction = () => {
  return {
    type: LOG_OUT_REQUEST,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_REQUEST: {
      console.log("reducer login");
      return {
        ...state,
        logInLoading: true,
        logInError: null,
        logInDone: false,
      };
    }
    case LOG_IN_SUCCESS: {
      return {
        ...state,
        logInLoading: false,
        logInDone: true,
        me: dummyUser(action.data),
        // me: { ...action.data, nickname: "Kevin Kim" },
      };
    }
    case LOG_IN_FAILURE: {
      return {
        ...state,
        logInLoading: false,
        logInError: action.error,
      };
    }
    case LOG_OUT_REQUEST: {
      return {
        ...state,
        logOutLoading: true,
        logOutDone: true,
        logOutError: null,
      };
    }
    case LOG_OUT_SUCCESS: {
      return {
        ...state,
        logOutLoading: false,
        logOutDone: true,
        me: null,
      };
    }
    case LOG_OUT_FAILURE: {
      return {
        ...state,
        logOutLoading: false,
        logOutError: action.error,
      };
    }
    case SIGN_UP_REQUEST: {
      return {
        ...state,
        signUpLoading: true,
        signUpDone: true,
        signUpError: null,
      };
    }
    case SIGN_UP_SUCCESS: {
      return {
        ...state,
        signUpLoading: false,
        signUpDone: true,
      };
    }
    case SIGN_UP_FAILURE: {
      return {
        ...state,
        signUpLoading: false,
        signUpError: action.error,
      };
    }
    case CHANGE_NICKNAME_REQUEST: {
      return {
        ...state,
        changeNicknameLoading: true,
        changeNicknameDone: true,
        changeNicknameError: null,
      };
    }
    case CHANGE_NICKNAME_SUCCESS: {
      return {
        ...state,
        changeNicknameLoading: false,
        changeNicknameDone: true,
      };
    }
    case CHANGE_NICKNAME_FAILURE: {
      return {
        ...state,
        changeNicknameLoading: false,
        changeNicknameError: action.error,
      };
    }
    default:
      return state;
  }
};

export default reducer;
