import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,  // Stores the entire user object {prn, role}
  isAuthenticated: false,

};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;  // Store full user object
      state.isAuthenticated = true;
     
    },
    
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
