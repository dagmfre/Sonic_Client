import { combineReducers } from "@reduxjs/toolkit";
import currentPlayingReducer from "./currentPlayingSlice";
import favoriteListReducer from "./favoriteListSlice";
import isMenuClickedReducer from "./menuClickSlice";

const rootReducer = combineReducers({
  currentPlayingSong: currentPlayingReducer,
  favoriteList: favoriteListReducer,
  menuClickedStatus: isMenuClickedReducer,
});

export default rootReducer;
