import { createSlice } from "@reduxjs/toolkit";

export const sessionSlice = createSlice({
  name: "auth/session",
  initialState: {
    token: "",
    modalExpired: false,
    signedIn: false,
  },
  reducers: {
    onSignInSuccess: (state, action) => {
      state.signedIn = true;
      state.token = action.payload;
    },
    onSignOutSuccess: (state) => {
      state.signedIn = false;
      state.token = "";
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    tokenExpired: (state, action) => {
      state.modalExpired = action.payload;
    },
  },
});

export const { onSignInSuccess, onSignOutSuccess, setToken, tokenExpired } =
  sessionSlice.actions;

export default sessionSlice.reducer;
