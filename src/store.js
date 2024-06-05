import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./stores/auth/authSlice";
import allUsersSlice from "./stores/allUsers/allUsersSlice";
import userSlice from "./stores/user/userSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    allUsers: allUsersSlice,
    user: userSlice,
  },
});
