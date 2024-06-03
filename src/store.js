import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./stores/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
});
