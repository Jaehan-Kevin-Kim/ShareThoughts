import { axios } from "axios";
export const initialState = {
  isLoggedIn: false,
  me: null,
  signUpData: {},
  loginData: {},
};

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
// export const loginAction = (data) => {
//   return {
//     type: "LOG_IN",
//     data,
//   };
// };

export const logoutAction = () => {
  return {
    type: "LOG_OUT",
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN": {
      return {
        ...state,
        isLoggedIn: true,
        me: action.data,
      };
    }
    case "LOG_OUT": {
      return {
        ...state,
        isLoggedIn: false,
        me: null,
      };
    }
    default:
      return state;
  }
};

export default reducer;
