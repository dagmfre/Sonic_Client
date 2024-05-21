import { combineReducers } from "@reduxjs/toolkit";
import currentPlayingReducer from "./currentPlayingSlice";
import favoriteListReducer from "./favoriteListSlice";
import isMenuClickedReducer from "./menuClickSlice";
import artistSlice from "./artistSlice";

const rootReducer = combineReducers({
  currentPlayingSong: currentPlayingReducer,
  favoriteList: favoriteListReducer,
  menuClickedStatus: isMenuClickedReducer,
  artists: artistSlice,
});

export default rootReducer;
