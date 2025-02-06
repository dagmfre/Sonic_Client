import { createSlice } from "@reduxjs/toolkit";

const userImageSlice = createSlice({
  name: "userImages",
  initialState: {
    userImages: [],
    imageFetchLoading: false,
    imageFetchError: null,
  },
  reducers: {
    fetchUserImagesRequest: (state) => {
      state.imageFetchLoading = true;
      state.imageFetchError = null;
    },
    fetchUserImagesSuccess: (state, action) => {
      state.imageFetchLoading = false;
      state.userImages = action.payload;
    },
    fetchUserImagesFailure: (state, action) => {
      state.imageFetchLoading = false;
      state.imageFetchError = action.payload;
    },
  },
});

export const {
  fetchUserImagesRequest,
  fetchUserImagesSuccess,
  fetchUserImagesFailure,
} = userImageSlice.actions;

export default userImageSlice.reducer;
