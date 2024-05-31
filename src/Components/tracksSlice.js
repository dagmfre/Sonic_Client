import { createSlice } from "@reduxjs/toolkit";

const tracksSlice = createSlice({
  name: "tracks",
  initialState: {
    tracks: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchTracksRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTracksSuccess: (state, action) => {
      state.loading = false;
      state.tracks = action.payload;
    },
    fetchTracksFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchTracksRequest, fetchTracksSuccess, fetchTracksFailure } =
  tracksSlice.actions;

export default tracksSlice.reducer;
