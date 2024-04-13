import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import cartReducer from "./Components/cartSlice";
import rootSaga from "./Components/sagas";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;