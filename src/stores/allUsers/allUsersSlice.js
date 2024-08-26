import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllUsersThunk } from "./allUsersThunk";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  users: [],
  totalUsers: 0
};

export const getAllUsers = createAsyncThunk(
  "user/getUsers",
  async (_, thunkAPI) => {
    return getAllUsersThunk("/user/", thunkAPI);
  }
);

const allUsersSlice = createSlice({
  name: "allUsers",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    clearAllUserValue: () => {
      return { ...initialState };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.users = payload.users;
        state.totalUsers = payload.count;
      })
      .addCase(getAllUsers.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  }
});

export const { showLoading, hideLoading, clearAllUserValue } =
  allUsersSlice.actions;
export default allUsersSlice.reducer;
