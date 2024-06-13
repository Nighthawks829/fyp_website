import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addNotificationThunk,
  editNotificationThunk,
  getNotificationThunk,
} from "./notificationThunk";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  userId: "",
  sensorId: "",
  name: "",
  message: "",
  threshold: "",
  condition: "bigger",
  platform: "email",
  address: "",
};

export const addNotification = createAsyncThunk(
  "notification/addNotification",
  async (notification, thunkAPI) => {
    return addNotificationThunk("/notification/", notification, thunkAPI);
  }
);

export const getNotification = createAsyncThunk(
  "notification/getNotification",
  async (notificationId, thunkAPI) => {
    return getNotificationThunk(`/notification/${notificationId}`, thunkAPI);
  }
);

export const editNotification = createAsyncThunk(
  "/notification/editNotification",
  async ({ notificationId, notification }, thunkAPI) => {
    return editNotificationThunk(
      `/notification/${notificationId}`,
      notification,
      thunkAPI
    );
  }
);

export const deleteNotification = createAsyncThunk(
  "notification/deleteNotification",
  async (notificationId, thunkAPI) => {
    return deleteNotification(`/notification/${notificationId}`, thunkAPI);
  }
);

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    handleNotificationChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearNotificationValues: () => {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNotification.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNotification.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Add notification successful!");
      })
      .addCase(addNotification.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(getNotification.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotification.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.userId = payload.userId;
        state.sensorId = payload.sensorId;
        state.name = payload.name;
        state.message = payload.message;
        state.threshold = payload.threshold;
        state.condition = payload.condition;
        state.payload = payload.platform;
        state.address = payload.address;
      })
      .addCase(getNotification.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(editNotification.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editNotification.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success("Edit sensor successful!");
      })
      .addCase(deleteNotification.pending, (state, { payload }) => {
        state.isLoading = true;
        toast.error(payload);
      })
      .addCase(deleteNotification.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success("Notification deleted successfully!");
      })
      .addCase(deleteNotification.rejected, (state, { payload }) => {
        state.isLoading = true;
        toast.error(payload);
      });
  },
});

export const { handleNotificationChange, clearNotificationValues } =
  notificationSlice.actions;
export default notificationSlice.reducer;
