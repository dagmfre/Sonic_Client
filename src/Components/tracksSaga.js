import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { fetchTracksSuccess, fetchTracksFailure } from "./tracksSlice";
import Cookies from "js-cookie";

function* fetchTracksSaga() {
  const token = Cookies.get("token");
  try {
    const response = yield call(axios.get, "http://localhost:3001/api/tracks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true, 
    });
    yield put(fetchTracksSuccess(response.data));
  } catch (error) {
    yield put(fetchTracksFailure(error.message));
  }
}

export default function* watchFetchTracks() {
  yield takeLatest("tracks/fetchTracksRequest", fetchTracksSaga);
}
