import { combineReducers } from "@reduxjs/toolkit";
import currentPlayingReducer from "./currentPlayingSlice";
import favoriteListReducer from "./favoriteListSlice";
import isMenuClickedReducer from "./menuClickSlice";
import artistReducer from "./artistSlice";
import topAlbumReducer from "./topAlbumSlice";
import tracksReducer from "./tracksSlice";
import userSongReducer from "./userSongSlice";
import userImageReducer from "./userImageSlice";

const rootReducer = combineReducers({
  currentPlayingSong: currentPlayingReducer,
  favoriteList: favoriteListReducer,
  menuClickedStatus: isMenuClickedReducer,
  topAlbum: topAlbumReducer,
  artists: artistReducer,
  tracks: tracksReducer,
  userSong: userSongReducer,
  userImages: userImageReducer
});

export default rootReducer;
