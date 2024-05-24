import { createSlice } from "@reduxjs/toolkit";

const topAlbumSlice = createSlice({
  name: "topAlbum",
  initialState: {
    album: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchTopAlbumRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTopAlbumSuccess: (state, action) => {
      state.loading = false;
      state.album = action.payload;
    },
    fetchTopAlbumFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchTopAlbumRequest,
  fetchTopAlbumSuccess,
  fetchTopAlbumFailure,
} = topAlbumSlice.actions;

export default topAlbumSlice.reducer;
