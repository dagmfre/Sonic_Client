import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  postSongSuccess,
  postSongFailure,
  deleteSongSuccess,
  deleteSongFailure,
} from "./userSongSlice";
import { fetchUserRequest } from "./authSlice";
import Cookies from "js-cookie";

function* postSongSaga(action) {
  const token = Cookies.get("token");
  try {
    yield call(axios.post, "http://localhost:3001/api/songs", action.payload, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    yield put(postSongSuccess());
    yield put(fetchUserRequest());
  } catch (error) {
    yield put(postSongFailure(error.message));
  }
}
function* deleteSongSaga(action) {
  try {
    const token = Cookies.get("token");
    yield call(axios.delete, `http://localhost:3001/file/${action.payload}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    yield put(deleteSongSuccess(action.payload[0]));
    yield put(fetchUserRequest());
  } catch (error) {
    yield put(deleteSongFailure(error.message));
  }
}

export function* watchSongUpload() {
  yield takeLatest("userSong/postSongRequest", postSongSaga);
}

export function* watchDeleteSong() {
  yield takeLatest("userSong/deleteSongRequest", deleteSongSaga);
}
