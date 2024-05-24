import { combineReducers } from "@reduxjs/toolkit";
import currentPlayingReducer from "./currentPlayingSlice";
import favoriteListReducer from "./favoriteListSlice";
import isMenuClickedReducer from "./menuClickSlice";
import artistSlice from "./artistSlice";
import topAlbumReducer from "./topAlbumSlice";

const rootReducer = combineReducers({
  currentPlayingSong: currentPlayingReducer,
  favoriteList: favoriteListReducer,
  menuClickedStatus: isMenuClickedReducer,
  topAlbum: topAlbumReducer,
  artists: artistSlice,
});

export default rootReducer;
