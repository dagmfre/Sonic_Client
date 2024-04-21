import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSongInfo: {},
  isPlaying: false,
};

const currentPlayingSlice = createSlice({
  name: "currentPlayingSong",
  initialState,
  reducers: {
    addCurrentPlayingSong: (state, action) => {
      state.currentSongInfo = action.payload;
    },
    togglePlayPause: (state, action) => {
      state.isPlaying = !state.isPlaying;
    },
  },
});

export const { addCurrentPlayingSong, togglePlayPause } =
  currentPlayingSlice.actions;

export default currentPlayingSlice.reducer;
