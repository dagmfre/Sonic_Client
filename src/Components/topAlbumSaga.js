import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { fetchTopAlbumFailure, fetchTopAlbumSuccess } from "./topAlbumSlice";


function* fetchTopAlbumSaga() {
  try {
    const response = yield call(
      axios.get,
      "https://sonic-api.onrender.com/api/topArtists"
    );
    yield put(fetchTopAlbumSuccess(response.data));
  } catch (error) {
    yield put(fetchTopAlbumFailure(error.message));
  }
}

export default function* watchTopAlbum() {
  yield takeLatest("topAlbum/fetchTopAlbumRequest", fetchTopAlbumSaga);
}