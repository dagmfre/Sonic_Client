// currentPlayingSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSongInfo: {},
  recentSongs: [
    {
      name: "BLEED",
      singer: "The Kid LAROI",
      albumName: "BLEED",
      cover:
        "https://e-cdns-images.dzcdn.net/images/cover/10adb38fa6ded265e61d7c95377e5484/56x56-000000-80-0-0.jpg",
      musicSrc:
        "https://cdns-preview-3.dzcdn.net/stream/c-3ddf2becddc90f326694771b4b213e4c-1.mp3",
      duration: 171,
      id: 1,
    },
    {
      name: "WITHOUT YOU",
      singer: "The Kid LAROI",
      albumName: "F*CK LOVE 3+: OVER YOU",
      cover:
        "https://e-cdns-images.dzcdn.net/images/cover/e306d320822388a809c1c6ce4708d353/56x56-000000-80-0-0.jpg",
      musicSrc:
        "https://cdns-preview-c.dzcdn.net/stream/c-cbb579b14693660b8f7da8d5939591ea-3.mp3",
      duration: 161,
      id: 1,
    },
    {
      name: "GO",
      singer: "The Kid LAROI",
      albumName: "F*CK LOVE 3+: OVER YOU",
      cover:
        "https://e-cdns-images.dzcdn.net/images/cover/e306d320822388a809c1c6ce4708d353/56x56-000000-80-0-0.jpg",
      musicSrc:
        "https://cdns-preview-1.dzcdn.net/stream/c-19d9dc8743770ddb88862425689c24e6-3.mp3",
      duration: 181,
      id: 1,
    },
    {
      name: "STAY",
      singer: "The Kid LAROI",
      albumName: "STAY",
      cover:
        "https://e-cdns-images.dzcdn.net/images/cover/dd6fe7fa9267185c4b835bd4f155d1d2/56x56-000000-80-0-0.jpg",
      musicSrc:
        "https://cdns-preview-f.dzcdn.net/stream/c-fd9572c7a11401267a6c5c3402254160-5.mp3",
      duration: 141,
      id: 1,
    },
  ],
  isPlaying: false,
};

const currentPlayingSlice = createSlice({
  name: "currentPlayingSong",
  initialState,
  reducers: {
    addCurrentPlayingSong: (state, action) => {
      // Check if the clicked song is the same as the currently playing song
      const clickedSong = { ...action.payload, id: 1 };
      const isSameSong = clickedSong.name === state.currentSongInfo.name;
      const isSongExists = state.recentSongs.some(
        (song) => song.name === clickedSong.name
      );

      typeof action.payload === "object"
        ? (state.currentSongInfo = clickedSong)
        : console.log("Received unknown action type:", action.type);

      // Toggle isPlaying if it's the same song, otherwise set it to true
      if (typeof action.payload === "object") {
        state.isPlaying = isSameSong ? !state.isPlaying : true;
      } else if (typeof action.payload === "boolean") {
        if (action.payload) {
          state.isPlaying = true;
        } else {
          state.isPlaying = false;
        }
      }

      // Add the song to the recentSongs array if it doesn't exist
      if (!isSongExists && typeof action.payload === "object") {
        state.recentSongs.unshift(clickedSong);
        state.recentSongs = state.recentSongs.slice(0, 4);
      }
    },
  },
});

export const { addCurrentPlayingSong } = currentPlayingSlice.actions;

export default currentPlayingSlice.reducer;
