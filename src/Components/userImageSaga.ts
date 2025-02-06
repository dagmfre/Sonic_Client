import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  fetchUserImagesSuccess,
  fetchUserImagesFailure,
} from "./userImageSlice";
import axios from "axios";

function* fetchUserImage(myList) {
  const token = localStorage.getItem('token');
  const response = yield call(
    axios.get,
    `https://sonic-server.vercel.app/file/${myList.imageFileName}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: 'blob',
    }
  );
  const blob = response.data;
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