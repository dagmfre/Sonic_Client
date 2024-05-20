// currentPlayingSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMenuClicked: false,
};

const isMenuClickedSlice = createSlice({
  name: "menuClickedStatus",
  initialState,
  reducers: {
    toggleMenuClick: (state) => {
      state.isMenuClicked = !state.isMenuClicked;
    },
  },
});

export const { toggleMenuClick } = isMenuClickedSlice.actions;

export default isMenuClickedSlice.reducer;
