import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./Components/rootReducer";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
// import createSagaMiddleware from "redux-saga";
// import rootSaga from "./Components/sagas";
// const sagaMiddleware = createSagaMiddleware();
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["currentPlayingSong", "menuClickedStatus"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistedStore = persistStore(store);

export { store, persistedStore };
