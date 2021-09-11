import { all, fork } from "@redux-saga/core/effects";
import postSaga from "./postSaga";
import userSaga from "./userSaga";

export default function* rootSaga() {
  yield all([fork(postSaga), fork(userSaga)]);
}

/*
import { all, fork, call, take, put } from "redux-saga/effects";
import { axios } from "axios";

//아래는 예외적으로 generator함수가 아니므로 *을 빼기
function logInAPI(data) {
  return axios.post("/api/login", data);
}

/**fork vs call 
fork는 함수를 실행하는 것. call 과 비슷하지만 다른 부분이 있음. (fork는 비동기 함수 호출, call은 동기 함수 호출)
아래에서 const result = yield call(logInAPI)에서 fork를 하면 비동기 기 때문에 result에 들어올 결과를 기다리지 않고 바로 다음 함수가 실행 됨.
call을 하면 .then()이나 aysnc에서 await를 쓴거와 같음. 따라서 call 을 하면 result 값이 들어올 때 까지 기다린 뒤 실행 됨.
//fork를 하면 아래와 같음
    const result = yield fork(logInAPI);
    axios.post("/api/login");
    yield put({
      type: "LOG_IN_SUCCESS",
      data: result.data,
    });

//call을 하면 아래와 같음
    const result = yield call(logInAPI);
    axios.post("/api/login")
     .then((result)=>{
        yield put({
        type: "LOG_IN_SUCCESS",
        data: result.data,
        });
    })


function* logIn(action) {
  try {
    //항상 call,all,fork,take,put 과 같이 effect앞에는 yield를 붙여줘야 함.
    // const result = yield call(logInAPI, action.data);
    yield delay(1000);
    //요청 성공 하면 성공 결과는 result.data에 담기고

    //put은 dispatch와 같음. (action객체를 dispatch 함)
    yield put({
      type: "LOG_IN_SUCCESS",
      data: result.data,
    });
  } catch (err) {
    //요청이 실패하면 실패 결과는 err.response.data에 담김
    //put은 dispatch와 같음. (action객체를 dispatch 함)
    yield put({
      type: "LOG_IN_FAILURE",
      data: err.response.data,
    });
  }
}

function logOutAPI() {
  return axios.post("/api/logout");
}

function* logOut() {
  try {
    // const result = yield call(logOutAPI);
    yield delay(1000);
    yield put({
      type: "LOG_OUT_SUCCESS",
      data: "result.data",
    });
  } catch (err) {
    yield put({
      type: "LOG_OUT_FAILURE",
      data: err.response.data,
    });
  }
}
function addPostAPI() {
  return axios.post("/api/post");
}

function* addPost() {
  try {
    // const result = yield call(addPostAPI);
    yield delay(1000);
    yield put({
      type: "ADD_POST_SUCCESS",
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: "ADD_POST_FAILURE",
      data: err.response.data,
    });
  }
}

function* watchLogIn() {
  yield takeLatest("LOG_IN_REQUEST", logIn); //take: take안에 들어있는 action이 실행 될 때 까지 기다림: 해당 action이 실행 되면 function이 실행 됨.
}
function* watchLogOut() {
  yield takeLatest("LOG_OUT_REQUEST", logOut);
}
function* watchAddPost() {
  yield takeLatest("ADD_POST_REQUEST", addPost);
}

export default function* rootSaga() {
  yield all([
    //yield all는 값을 배열로 받고, 그 배열안에 들어가 있는 것들을 한방에 다 실행 해줌(안에 있는 fork나 call을 다 실행 시켜 줌))
    fork(watchLogIn), //fork는 함수를 실행하는 것. call 과 비슷하지만 다른 부분이 있음. (fork는 비동기 함수 호출, call은 동기 함수 호출)
    fort(watchLogOut),
    fork(watchAddPost),
  ]);
}
*/
