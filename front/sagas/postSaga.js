import {
  all,
  fork,
  call,
  delay,
  takeLatest,
  put,
  throttle,
} from "redux-saga/effects";
import axios from "axios";
import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_REQUEST,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  LOAD_POSTS_REQUEST,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  RETWEET_REQUEST,
  RETWEET_FAILURE,
  RETWEET_SUCCESS,
  LOAD_USER_POSTS_REQUEST,
  LOAD_HASHTAG_POSTS_REQUEST,
  LOAD_USER_POSTS_SUCCESS,
  LOAD_USER_POSTS_FAILURE,
  LOAD_HASHTAG_POSTS_SUCCESS,
  LOAD_HASHTAG_POSTS_FAILURE,
  UPDATE_POST_FAILURE,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  REMOVE_IMAGE_REQUEST,
  REMOVE_IMAGE_SUCCESS,
  REMOVE_IMAGE_FAILURE,
  UPDATE_IMAGES_REQUEST,
  UPDATE_IMAGES_SUCCESS,
  UPDATE_IMAGES_FAILURE,
  ADD_LIKE_REQUEST,
  ADD_LIKE_SUCCESS,
  ADD_LIKE_FAILURE,
  REMOVE_LIKE_REQUEST,
  REMOVE_LIKE_SUCCESS,
  REMOVE_LIKE_FAILURE,
  LOAD_REPORTS_REQUEST,
  ADD_REPORT_REQUEST,
  ADD_REPORT_FAILURE,
  ADD_REPORT_SUCCESS,
  LOAD_REPORTS_FAILURE,
  LOAD_REPORTS_SUCCESS,
  POST_APPEAL_REQUEST,
  POST_APPEAL_SUCCESS,
  POST_APPEAL_FAILURE,
} from "../reducers/post";

import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from "../reducers/user";

function loadUserPostsAPI(data, lastId) {
  return axios.get(`/user/${data}/posts?lastId=${lastId || 0}`);
}

function* loadUserPosts(action) {
  try {
    const result = yield call(loadUserPostsAPI, action.data, action.lastId);
    // yield delay(1000);
    yield put({
      type: LOAD_USER_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOAD_USER_POSTS_FAILURE,
      error: error.response.data,
    });
  }
}

function loadHashtagPostsAPI(data, lastId) {
  return axios.get(
    `/hashtag/${encodeURIComponent(data)}?lastId=${lastId || 0}`,
  );
}

function* loadHashtagPosts(action) {
  try {
    console.log("action in hashtag", action);
    const result = yield call(loadHashtagPostsAPI, action.data, action.lastId);
    // yield delay(1000);
    yield put({
      type: LOAD_HASHTAG_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOAD_HASHTAG_POSTS_FAILURE,
      error: error.response.data,
    });
  }
}

function loadPostsAPI(lastId) {
  return axios.get(`/posts?lastId=${lastId || 0}`);
}

function* loadPosts(action) {
  try {
    const result = yield call(loadPostsAPI, action.lastId);
    // yield delay(1000);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOAD_POSTS_FAILURE,
      error: error.response.data,
    });
  }
}

function loadPostAPI(data) {
  return axios.get(`/post/${data}`);
}

function* loadPost(action) {
  try {
    const result = yield call(loadPostAPI, action.data);
    // yield delay(1000);
    yield put({
      type: LOAD_POST_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOAD_POST_FAILURE,
      error: error.response.data,
    });
  }
}

function addPostAPI(data) {
  return axios.post("/post", data);
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);

    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: result.data.id,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: ADD_POST_FAILURE,
      error: error.response.data,
    });
  }
}

function removePostAPI(data) {
  return axios.delete(`/post/${data}`);
}

function* removePost(action) {
  try {
    const result = yield call(removePostAPI, action.data);
    // yield delay(1000);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: REMOVE_POST_FAILURE,
      error: error.response.data,
    });
  }
}

function updatePostAPI(data) {
  return axios.patch(`/post/${data.postId}`, data.formData);
}

function* updatePost(action) {
  try {
    const result = yield call(updatePostAPI, action.data);
    console.log("result: ", result);
    yield put({
      type: UPDATE_POST_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: UPDATE_POST_FAILURE,
      error: error.response.data,
    });
  }
}

function addCommentAPI(data) {
  return axios.post(`/post/${data.postId}/comment`, data, {
    withCredentials: true,
  });
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    // yield delay(1000);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: error.response.data,
    });
  }
}

function uploadImagesAPI(data) {
  return axios.post("/post/images", data); //해당은 formdata 보내는 요청. !!formdata는 이렇게 data그대로 보내야 함. 만약 {images:data} 이런식으로 보내면 json이 되어버려서 formdata 형식으로 안보내 짐!!
}

function* uploadImages(action) {
  try {
    const result = yield call(uploadImagesAPI, action.data);
    // yield delay(1000);
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      error: error.response.data,
    });
  }
}

function updateImagesAPI(data) {
  return axios.post("/post/images", data); //해당은 formdata 보내는 요청. !!formdata는 이렇게 data그대로 보내야 함. 만약 {images:data} 이런식으로 보내면 json이 되어버려서 formdata 형식으로 안보내 짐!!
}

function* updateImages(action) {
  try {
    const result = yield call(updateImagesAPI, action.data);
    // yield delay(1000);
    yield put({
      type: UPDATE_IMAGES_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: UPDATE_IMAGES_FAILURE,
      error: error.response.data,
    });
  }
}

function removeImageAPI(data) {
  return axios.patch(`/post/image/${data.src}`, data); //해당은 formdata 보내는 요청. !!formdata는 이렇게 data그대로 보내야 함. 만약 {images:data} 이런식으로 보내면 json이 되어버려서 formdata 형식으로 안보내 짐!!
}

function* removeImage(action) {
  try {
    const result = yield call(removeImageAPI, action.data);
    // yield delay(1000);
    yield put({
      type: REMOVE_IMAGE_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: REMOVE_IMAGE_FAILURE,
      error: error.response.data,
    });
  }
}

function retweetAPI(data) {
  return axios.post(`/post/${data}/retweet`, data); //해당은 formdata 보내는 요청. !!formdata는 이렇게 data그대로 보내야 함. 만약 {images:data} 이런식으로 보내면 json이 되어버려서 formdata 형식으로 안보내 짐!!
}

function* retweet(action) {
  try {
    const result = yield call(retweetAPI, action.data);
    // yield delay(1000);
    yield put({
      type: RETWEET_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: RETWEET_FAILURE,
      error: error.response.data,
    });
  }
}

function addLikeAPI(data) {
  return axios.post(`/post/like/${data}`);
}

function* addLike(action) {
  try {
    const result = yield call(addLikeAPI, action.data);

    yield put({
      type: ADD_LIKE_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: ADD_LIKE_FAILURE,
      error: error.response.data,
    });
  }
}

function removeLikeAPI(data) {
  return axios.delete(`/post/unlike/${data}`);
}

function* removeLike(action) {
  try {
    const result = yield call(removeLikeAPI, action.data);

    yield put({
      type: REMOVE_LIKE_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: REMOVE_LIKE_FAILURE,
      error: error.response.data,
    });
  }
}

function addReportAPI(data) {
  return axios.post(`/report/${data.postId}`, data);
}

function* addReport(action) {
  try {
    const result = yield call(addReportAPI, action.data);

    yield put({
      type: ADD_REPORT_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: ADD_REPORT_FAILURE,
      error: error.response.data,
    });
  }
}

function loadReportsAPI(data) {
  return axios.get(`/report/${data.postId}`);
}

function* loadReports(action) {
  try {
    const result = yield call(loadReportsAPI, action.data);

    yield put({
      type: LOAD_REPORTS_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOAD_REPORTS_FAILURE,
      error: error.response.data,
    });
  }
}

function postAppealAPI(data) {
  return axios.patch(`/post/appeal/${data.postId}`, data);
}

function* postAppeal(action) {
  try {
    const result = yield call(postAppealAPI, action.data);

    yield put({
      type: POST_APPEAL_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: POST_APPEAL_FAILURE,
      error: error.response.data,
    });
  }
}

function* watchLoadPosts() {
  yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
}
function* watchUserLoadPosts() {
  yield throttle(5000, LOAD_USER_POSTS_REQUEST, loadUserPosts);
}
function* watchHashtagLoadPosts() {
  yield throttle(5000, LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts);
}
function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost);
}
function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}
function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}
function* watchUpdateImages() {
  yield takeLatest(UPDATE_IMAGES_REQUEST, updateImages);
}
function* watchRemoveImage() {
  yield takeLatest(REMOVE_IMAGE_REQUEST, removeImage);
}
function* watchRetweet() {
  yield takeLatest(RETWEET_REQUEST, retweet);
}
function* watchUpdatePost() {
  yield takeLatest(UPDATE_POST_REQUEST, updatePost);
}
function* watchAddLike() {
  yield takeLatest(ADD_LIKE_REQUEST, addLike);
}
function* watchRemoveLike() {
  yield takeLatest(REMOVE_LIKE_REQUEST, removeLike);
}
function* watchAddReport() {
  yield takeLatest(ADD_REPORT_REQUEST, addReport);
}
function* watchLoadReports() {
  yield takeLatest(LOAD_REPORTS_REQUEST, loadReports);
}
function* watchPostAppeal() {
  yield takeLatest(POST_APPEAL_REQUEST, postAppeal);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchUserLoadPosts),
    fork(watchHashtagLoadPosts),
    fork(watchLoadPost),
    fork(watchAddPost),
    fork(watchAddComment),
    fork(watchRemovePost),
    fork(watchUploadImages),
    fork(watchUpdateImages),
    fork(watchRemoveImage),
    fork(watchRetweet),
    fork(watchUpdatePost),
    fork(watchAddLike),
    fork(watchRemoveLike),
    fork(watchAddReport),
    fork(watchLoadReports),
    fork(watchPostAppeal),
  ]);
}
