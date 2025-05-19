import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const authSlice = createSlice({
  name: "auth", // the name of this slice is auth
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload)); // converting the object to javascript string

      const expirationTime = new Date().getTime + 30 * 24 * 60 * 60 * 1000;
      localStorage.setItem("expirationTime", expirationTime);
    },
    logout: (state) => {
      (state.userInfo = null), localStorage.clear();
    },
  },
});
export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer; // default export so we can name it anything while importing
