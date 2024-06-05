import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./stores/auth/authSlice";
import allUsersSlice from "./stores/allUsers/allUsersSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    allUsers: allUsersSlice,
  },
});
