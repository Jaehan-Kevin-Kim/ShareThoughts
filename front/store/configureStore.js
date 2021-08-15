import { createWrapper } from "next-redux-wrapper";
import { createStore } from "redux";

import reducer from "../reducers";

const configureStore = () => {
  const store = createStore(reducer);
  return store;
};
const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === "development", // 지금 이 줄은 option 줄. 이거는 개발 시 디버그 모드 허용하는 옵션임.
});
export default wrapper;
