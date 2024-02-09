import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
// import logger from "redux-logger";
import logger from "redux-logger";
import rootReducer from "../features/index";

const isDev = process.env.NODE_ENV === "development";
// export type RootState = ReturnType<typeof rootReducer>;

function getServerState() {
  return typeof document !== "undefined"
    ? JSON.parse(document.querySelector("#__NEXT_DATA__").textContent)?.props
        .pageProps.initialState
    : undefined;
}

const serverState = getServerState();
// // console.log("serverState: ", serverState);

// 원래 아래 동작하던 코드 이렇게 사용안해야 되는구나
// const makeStore: () => Store<RootState> = () => {
//   // const middleware = getDefaultMiddleware();
//   const store = configureStore({
//     reducer: rootReducer,
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
//     devTools: isDev,
//     preloadedState: serverState, //SSR
//   });

//   return store;
// };

export const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: isDev,
    preloadedState: serverState, //SSR
  });

  return store;
};

const store = makeStore();

// export type AppDispatch = ReturnType<typeof makeStore>["dispatch"];
// export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}

const wrapper = createWrapper(makeStore, {
  debug: isDev,
});

export default wrapper;

/*
const configureStore = () => {
  //enhancer는 middleware 설치 위해 필요 함.
  //아래는 reduxDevTools는 무조건 development 모드에서만 사용하기 (해킹의 위험이 있음). 따라서 production모드일때는 middleware를 사용안하게 설정 해 둠.
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, loggerMiddleware];
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(reducer, enhancer);

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};
const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === "development", // 지금 이 줄은 option 줄. 이거는 개발 시 디버그 모드 허용하는 옵션임.
});
export default wrapper;
*/
