import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  postSongSuccess,
  postSongFailure,
  deleteSongSuccess,
  deleteSongFailure,
} from "./userSongSlice";
import { fetchUserRequest } from "./authSlice";

function* postSongSaga(action) {
  const token = localStorage.getItem('token');
  console.log(action.payload);
  
  try {
    yield call(
      axios.post, 
      "https://sonic-server.vercel.app/api/songs", 
      action.payload, 
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      }
    );
    yield put(postSongSuccess());
    yield put(fetchUserRequest());
  } catch (error) {
    yield put(postSongFailure(error.message));
  }
}

function* deleteSongSaga(action) {
  try {
    const token = localStorage.getItem('token');
    yield call(
      axios.delete, 
      `https://sonic-server.vercel.app/file/${action.payload}`, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
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
