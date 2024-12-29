import { takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  signupRequest,
  signupSuccess,
  signupFailure,
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure,
} from "./authSlice";

const API_URL = "http://localhost:3001";

function* loginSaga(action) {
  try {
    const response = yield call(
      axios.post,
      `${API_URL}/login`,
      action.payload,
      { withCredentials: true }
    );
    if (response.data.success) {
      yield put(loginSuccess(response.data.user));
    } else {
      yield put(loginFailure(response.data.message));
    }
  } catch (error) {
    yield put(loginFailure(error.response?.data?.message || "Login failed"));
  }
}

function* signupSaga(action) {
  try {
    const response = yield call(
      axios.post,
      `${API_URL}/register`,
      action.payload,
      { withCredentials: true }
    );
    if (response.data.success) {
      yield put(signupSuccess(response.data.user));
    } else {
      yield put(signupFailure(response.data.message));
    }
  } catch (error) {
    yield put(signupFailure(error.response?.data?.message || "Signup failed"));
  }
}

function* fetchUserSaga() {
  try {
    const response = yield call(axios.get, `${API_URL}/api/user`, {
      withCredentials: true,
    });
    yield put(fetchUserSuccess(response.data));
  } catch (error) {
    yield put(fetchUserFailure(error.response?.data?.message || "Fetch user failed"));
  }
}

export function* watchAuth() {
  yield takeLatest(loginRequest.type, loginSaga);
  yield takeLatest(signupRequest.type, signupSaga);
  yield takeLatest(fetchUserRequest.type, fetchUserSaga);
}