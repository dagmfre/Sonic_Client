import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { fetchArtistSuccess, fetchArtistFailure } from "./artistSlice";
import Cookies from "js-cookie";

function* fetchMusicSaga() {
  try {
    const token = Cookies.get("token");
    const response = yield call(
      axios.get,
      "https://sonic-server.onrender.com/api/artists",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
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
