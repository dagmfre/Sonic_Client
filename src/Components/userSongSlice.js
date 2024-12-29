import { createSlice } from "@reduxjs/toolkit";

const userSongSlice = createSlice({
  name: "userSong",
  initialState: {
    loading: false,
    error: null,
    deleteLoading: false,
    deleteError: null,
    deleteSuccess: false, 
  },
  reducers: {
    postSongRequest(state) {
      state.loading = true;
      state.error = null;
    },
    postSongSuccess(state) {
      state.loading = false;
    },
    postSongFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteSongRequest(state) {
      state.deleteLoading = true;
      state.deleteError = null;
      state.deleteSuccess = false; // Reset deleteSuccess on request
    },
    deleteSongSuccess(state, action) {
      state.deleteLoading = false;
      state.deleteSuccess = true; // Set deleteSuccess on success
    },
    deleteSongFailure(state, action) {
      state.deleteLoading = false;
      state.deleteError = action.payload;
      state.deleteSuccess = false; // Ensure deleteSuccess is false on failure
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
