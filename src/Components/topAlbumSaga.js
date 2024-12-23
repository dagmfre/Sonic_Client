import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { fetchTopAlbumFailure, fetchTopAlbumSuccess } from "./topAlbumSlice";

function fisherYatesShuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function* fetchTopAlbumSaga() {
  try {
    const token = yield localStorage.getItem("token");;
    const response = yield call(
      axios.get,
      "http://localhost:3001/api/topArtists",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const shuffledData = fisherYatesShuffle(response.data);
    yield put(fetchTopAlbumSuccess(shuffledData));
  } catch (error) {
    yield put(fetchTopAlbumFailure(error.message));
  }
}

export default function* watchTopAlbum() {
  yield takeLatest("topAlbum/fetchTopAlbumRequest", fetchTopAlbumSaga);
}
