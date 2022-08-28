import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: "",
  refreshToken: "",
  isStaff: null,
  isAuthenticated: false,
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      const { accessToken, refreshToken, isStaff } = action.payload;
      return {
        accessToken,
        refreshToken,
        isStaff,
        isAuthenticated: true,
      };
    },
    logout(state) {
      return initialState;
    },
  },
});

export const authActions = auth.actions;
export default auth.reducer;
