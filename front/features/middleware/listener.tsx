// import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
// // import {
// //   createListenerMiddleware,
// //   addListener,
// // } from "@redux-toolkit/query/react";
// import { loadHashtagPosts } from "features/post/postService";
// import rootReducer from "features";

// // 리스너 미들웨어 생성
// const listenerMiddleware = createListenerMiddleware();

// // loadHashtagPosts 액션에 대한 리스너 추가
// listenerMiddleware.startListening({
//   actionCreator: loadHashtagPosts,
//   effect: async (action, listenerApi) => {
//     // 여기에 loadHashtagPosts 액션을 처리하는 로직을 추가합니다.
//     try {
//         const response = await fetchSomeData
//     }
//   },
//   throttle: 5000, // 5초 동안 throttle
// });

// const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(listenerMiddleware.middleware),
// });
