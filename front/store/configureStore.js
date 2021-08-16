import { createWrapper } from "next-redux-wrapper";
import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import reducer from "../reducers";

const configureStore = () => {
  //enhancer는 middleware 설치 위해 필요 함.
  //아래는 reduxDevTools는 무조건 development 모드에서만 사용하기 (해킹의 위험이 있음). 따라서 production모드일때는 middleware를 사용안하게 설정 해 둠.
  const middlewares = [];
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(reducer, enhancer);
  return store;
};
const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === "development", // 지금 이 줄은 option 줄. 이거는 개발 시 디버그 모드 허용하는 옵션임.
});
export default wrapper;
