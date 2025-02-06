import { createSlice } from "@reduxjs/toolkit";

const artistSlice = createSlice({
  name: "artists",
  initialState: {
    artists: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchArtistRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchArtistSuccess: (state, action) => {
      state.loading = false;
      state.artists = action.payload;
    },
    fetchArtistFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchArtistRequest, fetchArtistSuccess, fetchArtistFailure } =
  artistSlice.actions;

export default artistSlice.reducer;
