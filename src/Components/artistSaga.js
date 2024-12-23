import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { fetchArtistSuccess, fetchArtistFailure } from "./artistSlice";

function* fetchMusicSaga() {
  try {
    const token = yield localStorage.getItem("token");
    const response = yield call(
      axios.get,
      "http://localhost:3001/api/artists",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    yield put(fetchArtistSuccess(response.data?.reverse()));
  } catch (error) {
    yield put(fetchArtistFailure(error.message));
  }
}

export default function* watchFetchArtist() {
  yield takeLatest("artists/fetchArtistRequest", fetchMusicSaga);
}
