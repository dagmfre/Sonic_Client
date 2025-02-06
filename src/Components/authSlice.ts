import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  success: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
      state.success = "Login successful";
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = null;
    },
    signupRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    },
    signupSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
      state.success = "Signup successful";
    },
    signupFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = null;
    },
    fetchUserRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    fetchUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  signupRequest,
  signupSuccess,
  signupFailure,
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure,
} = authSlice.actions;

export default authSlice.reducer;