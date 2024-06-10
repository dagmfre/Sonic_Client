import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  fetchUserImagesSuccess,
  fetchUserImagesFailure,
} from "./userImageSlice";
// import axios from "axios";

function* fetchUserImage(myList) {
  const response = yield call(fetch, `https://sonic-server-koyed-26491528.koyeb.app/file/${myList.imageFileName}`);
  const blob = yield call([response, 'blob']); // call method on response object
  return URL.createObjectURL(blob);
}

function* fetchUserImages(action) {
  try {
    const data = action.payload;
    const imageSrcs = yield all(data.map((myList) => call(fetchUserImage, myList)));

    const updatedLists = data.map((myList, index) => ({
      ...myList,
      imgSrc: imageSrcs[index],
    }));

    yield put(fetchUserImagesSuccess(updatedLists));
  } catch (error) {
    yield put(fetchUserImagesFailure(error.message));
  }
}

export function* watchUserImages() {
  yield takeLatest("userImages/fetchUserImagesRequest", fetchUserImages);
}
