import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  postSongSuccess,
  postSongFailure,
  deleteSongSuccess,
  deleteSongFailure,
} from "./userSongSlice";

function* postSongSaga(action) {
  const token = yield localStorage.getItem("token");
  try {
    const response = yield call(
      axios.post,
      "http://localhost:3001/api/songs",
      action.payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    yield put(postSongSuccess(response.data));
  } catch (error) {
    yield put(postSongFailure(error.message));
  }
}

function* deleteSongSaga(action) {
  try {
    const token = yield localStorage.getItem("token");
    yield call(axios.delete, `http://localhost:3001/file/${action.payload}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    yield put(deleteSongSuccess(action.payload[0]));
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
