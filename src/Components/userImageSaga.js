import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  fetchUserImagesSuccess,
  fetchUserImagesFailure,
} from "./userImageSlice";
import axios from "axios";
import Cookies from "js-cookie";

function* fetchUserImage(myList) {
  const token = Cookies.get("token");
  const response = yield call(
    axios.get,
    `https://sonic-server.onrender.com/file/${myList.imageFileName}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: 'blob', // Ensure the response is a blob
      withCredentials: true, 
    }
  );
  const blob = response.data; // Access the blob from response.data
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
