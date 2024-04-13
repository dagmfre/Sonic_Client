import { takeEvery, put, call } from "redux-saga/effects";
import { fetchProductsSuccess, fetchProductsFailure } from "./cartSlice";

function* fetchProductsSaga() {
  try { 
    const response = yield call(() => fetch("https://fakestoreapi.com/products"));
    const data = yield response.json();
    yield put(fetchProductsSuccess(data));
  } catch (error) {
    yield put(fetchProductsFailure(error));
  }
}

function* watchFetchProducts() {
  yield takeEvery("cart/fetchProducts", fetchProductsSaga);
}

export default function* rootSaga() {
  yield watchFetchProducts();
}
