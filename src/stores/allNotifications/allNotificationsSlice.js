import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAllNotificationsThunk } from "./allNotificationsThunk";

const initialState = {
  isLoading: false,
  notifications: [],
  totalNotifications: 0
};

export const getAllNotifications = createAsyncThunk(
  "notification/getNotifications",
  async (_, thunkAPI) => {
    return getAllNotificationsThunk("/notification/", thunkAPI);
  }
);

const allNotificationsSlice = createSlice({
  name: "allNotifications",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    clearAllNotificationValue: () => {
      return { ...initialState };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllNotifications.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllNotifications.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.notifications = payload.notifications;
        state.totalNotifications = payload.count;
      })
      .addCase(getAllNotifications.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  }
});

export const { showLoading, hideLoading, clearAllNotificationValue } =
  allNotificationsSlice.actions;
export default allNotificationsSlice.reducer;
