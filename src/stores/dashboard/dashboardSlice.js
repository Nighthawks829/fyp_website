import { toast } from "react-toastify";
import {
  addDashboardThunk,
  deleteDashboardThunk,
  editDashboardThunk,
  getDashboardThunk,
} from "./dashboardThunk";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  id: "",
  userId: "",
  sensorId: "",
  name: "",
  control: "",
  type: "widget",
};

export const addDashboard = createAsyncThunk(
  "dashboard/addDashboard",
  async (dashboard, thunkAPI) => {
    return addDashboardThunk("/dashboard/", dashboard, thunkAPI);
  }
);

export const getDashboard = createAsyncThunk(
  "dashboard/getDashboard",
  async (dashboardId, thunkAPI) => {
    return getDashboardThunk(`/dashboard/${dashboardId}`, thunkAPI);
  }
);

export const editDashboard = createAsyncThunk(
  "dashboard/editDashboard",
  async ({ dashboardId, dashboard }, thunkAPI) => {
    return editDashboardThunk(`/dashboard/${dashboardId}`, dashboard, thunkAPI);
  }
);

export const deleteDashboard = createAsyncThunk(
  "dashboard/deleteDashboard",
  async (dashboardId, thunkAPI) => {
    return deleteDashboardThunk(`/dashboard/${dashboardId}`, thunkAPI);
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    handleDashboardChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearDashboardValues: () => {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addDashboard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addDashboard.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Add dashboard successful!");
      })
      .addCase(addDashboard.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(getDashboard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDashboard.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.id = payload.id;
        state.userId = payload.userId;
        state.sensorId = payload.sensorId;
        state.name = payload.name;
        state.control = payload.control;
        state.type = payload.type;
      })
      .addCase(getDashboard.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(editDashboard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editDashboard.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success("Edit dashboard successful!");
      })
      .addCase(editDashboard.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(deleteDashboard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteDashboard.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Dashboard deleted successful!");
      })
      .addCase(deleteDashboard.rejected, (state, { payload }) => {
        state.isLoading = true;
        toast.error(payload);
      });
  },
});

export const { handleDashboardChange, clearDashboardValues } =
  dashboardSlice.actions;
export default dashboardSlice.reducer;
