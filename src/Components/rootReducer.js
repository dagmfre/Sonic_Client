import { combineReducers } from "@reduxjs/toolkit";
import currentPlayingReducer from "./currentPlayingSlice";
import favoriteListReducer from "./favoriteListSlice";
import isMenuClickedReducer from "./menuClickSlice";
import artistSlice from "./artistSlice";
import topAlbumReducer from "./topAlbumSlice";
import tracksReducer from "./tracksSlice";
import userSongSlice from "./userSongSlice";

const rootReducer = combineReducers({
  currentPlayingSong: currentPlayingReducer,
  favoriteList: favoriteListReducer,
  menuClickedStatus: isMenuClickedReducer,
  topAlbum: topAlbumReducer,
  artists: artistSlice,
  tracks: tracksReducer,
  userSong: userSongSlice,
});

export default rootReducer;
