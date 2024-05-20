// currentPlayingSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriteList: [],
};

const favoriteListSlice = createSlice({
  name: "favoriteList",
  initialState,
  reducers: {
    addRemoveFavoriteSong: (state, action) => {
      const songIndex = state.favoriteList.findIndex(
        (song) => song.name === action.payload.name
      );

      if (songIndex === -1) {
        // Song is not in the favoriteList, so add it
        state.favoriteList.push(action.payload);
      } else {
        // Song is already in the favoriteList, so remove it
        state.favoriteList.splice(songIndex, 1);
      }
    },
  },
});

export const { addRemoveFavoriteSong } = favoriteListSlice.actions;

export default favoriteListSlice.reducer;
