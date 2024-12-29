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
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./Components/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: "root",
  storage,
  blacklist: [
    "currentPlayingSong",
    "menuClickedStatus",
    "artists",
    "topAlbum",
    "tracks",
    "userImages",
    "userSong",
    "auth",
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          "userSong/postSongRequest",
        ],
      },
    }).concat(sagaMiddleware),
});

const persistedStore = persistStore(store);
sagaMiddleware.run(rootSaga);
export { store, persistedStore };
