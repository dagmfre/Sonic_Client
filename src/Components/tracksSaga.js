import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { fetchTracksSuccess, fetchTracksFailure } from "./tracksSlice";

function* fetchTracksSaga() {
  const token = localStorage.getItem('token');
  try {
    const response = yield call(axios.get, "https://sonic-server.vercel.app/api/tracks", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    yield put(fetchTracksSuccess(response.data));
  } catch (error) {
    yield put(fetchTracksFailure(error.message));
  }
}

export default function* watchFetchTracks() {
  yield takeLatest("tracks/fetchTracksRequest", fetchTracksSaga);
}