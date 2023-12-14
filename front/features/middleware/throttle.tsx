import { loadHashtagPosts } from "features/post/postService";
import _ from "lodash";
import { Action, AnyAction, Dispatch, Middleware } from "redux";

// // Throttle 미들웨어
// const throttleMiddleware: Middleware = (store) => (next) => (action) => {
//   if (action.type === "post/loadHashtagPosts") {
//     // `myAction`에 대해 500ms 간격으로 throttle 적용
//     _.throttle(() => next(action), 5000);
//   } else {
//     next(action);
//   }
// };

// export default throttleMiddleware;

// import { Middleware } from 'redux';
// import _ from 'lodash';

// const throttleMiddleware: Middleware = store => {
//   const throttledActions = new Map<string, ReturnType<typeof _.throttle>>();

//   return next => action => {
//     if (action.type === loadHashtagPosts.pending.type) {
//       // loadHashtagPosts 액션에 대한 throttle 처리
//       if (!throttledActions.has(action.type)) {
//         throttledActions.set(action.type, _.throttle(next, 5000));
//       }
//       const throttled = throttledActions.get(action.type);
//       throttled(action);
//     } else {
//       next(action);
//     }
//   };
// };

// export default throttleMiddleware;

const throttleMiddleware: Middleware<any> = (store) => {
  const throttledActions = new Map<string, ReturnType<typeof _.throttle>>();
  return (next: Dispatch<Action>) => (action: Action) => {
    if (
      action.type === "post/loadHashtagPosts/fulfilled" ||
      action.type === "post/loadHashtagPosts/pending"
    ) {
      if (!throttledActions.has(action.type)) {
        throttledActions.set(
          action.type,
          _.throttle((action: Action) => next(action), 5000),
        );
      }
      const throttled = throttledActions.get(action.type);
      if (throttled) {
        throttled(action);
      }
      // throttled(action);
    } else {
      next(action);
    }
  };
  // const throttleMiddleware: Middleware = () => {
  //   const throttledDispatches = new Map<string, _.DebouncedFunc<Dispatch<AnyAction>>>();

  //   return (next: Dispatch<AnyAction>) => (action: AnyAction) => {
  //     if (action.type === loadHashtagPosts.pending.type || action.type === loadHashtagPosts.fulfilled.type) {
  //       if (!throttledDispatches.has(action.type)) {
  //         throttledDispatches.set(action.type, _.throttle(next, 5000));
  //       }
  //       const throttledDispatch = throttledDispatches.get(action.type);
  //       if (throttledDispatch) {
  //         throttledDispatch(action);
  //       }
  //     } else {
  //       next(action);
  //     }
  //   };
  // };

  // const throttledActions = new Map();

  // return next => action => {
  //   if (action.type === 'post/loadHashtagPosts/fulfilled' || action.type === 'post/loadHashtagPosts/pending') {
  //     if (!throttledActions.has(action.type)) {
  //       // 특정 액션에 대해 throttle 함수를 생성하고 저장
  //       throttledActions.set(
  //         action.type,
  //         _.throttle((action) => next(action), 5000)
  //       );
  //     }
  //     const throttled = throttledActions.get(action.type);
  //     throttled(action);
  //   } else {
  //     next(action); // 다른 액션에 대해서는 throttle 적용하지 않음
  //   }
  // };
};

export default throttleMiddleware;
