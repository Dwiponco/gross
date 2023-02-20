import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  id: "",
  username: "",
  email: "",
  firstName: "",
  lastName: "",
  gender: "",
  image: "",
  token: "",
  authority: [],
};

export const userSlice = createSlice({
  name: "auth/user",
  initialState,
  reducers: {
    setUser: (_, action) => action.payload,
    userLoggedOut: () => initialState,
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
