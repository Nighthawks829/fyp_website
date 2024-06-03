import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserFromCookies } from "../../utils/cookies";
import { loginUserThunk, logoutUserThunk } from "./userThunk";
import { toast } from "react-toastify";

const initialState = {
  user: getUserFromCookies(),
  loggedIn: false,
  isLoading: false,
  sidebar: "Dashboard",
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    return loginUserThunk("/auth/login", user, thunkAPI);
  }
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, thunkAPI) => {
    return logoutUserThunk("auth/logout", thunkAPI);
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loggedInUser: (state, { payload }) => {
      state.loggedIn = payload.loggedIn;
    },
    switchSidebar: (state, { payload }) => {
      state.sidebar = payload.sidebar;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        state.loggedIn = true;
        toast.success(`Login successful! Welcome Back ${user.name}`);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.loggedIn = false;
        state.user = null;
        toast.success("Logout successful!");
      })
      .addCase(logoutUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export const { switchSidebar, loggedInUser } = userSlice.actions;
export default userSlice.reducer;
