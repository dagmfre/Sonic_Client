import { createSlice } from "@reduxjs/toolkit";

const userSongSlice = createSlice({
  name: "userSong",
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  reducers: {
    postSongRequest(state) {
      state.loading = true;
      state.error = null;
    },
    postSongSuccess(state, action) {
      state.loading = false;
      state.data.push(action.payload);
    },
    postSongFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteSongRequest(state) {
      state.loading = true;
      state.error = null;
    },
    deleteSongSuccess(state, action) {
      state.loading = false;
      state.data = state.data.filter(
        (song) => song.audioFileName !== action.payload
      );
    },
    deleteSongFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  postSongRequest,
  postSongSuccess,
  postSongFailure,
  deleteSongRequest,
  deleteSongSuccess,
  deleteSongFailure,
} = userSongSlice.actions;

export default userSongSlice.reducer;
