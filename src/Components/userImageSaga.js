import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  fetchUserImagesSuccess,
  fetchUserImagesFailure,
} from "./userImageSlice";
import axios from "axios";

function* fetchUserImage(myList) {
  const token = yield localStorage.getItem("token");
  const response = yield call(
    axios.get,
    `http://localhost:3001/file/${myList.imageFileName}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const blob = yield call([response, "blob"]); // call method on response object
  return URL.createObjectURL(blob);
}

function* fetchUserImages(action) {
  try {
    const data = action.payload;
    const imageSrcs = yield all(
      data.map((myList) => call(fetchUserImage, myList))
    );

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
