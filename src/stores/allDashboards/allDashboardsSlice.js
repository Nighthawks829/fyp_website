import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllDashboardsThunk } from "./allDashboardsThunk";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  dashboards: [],
  totalDashboards: 0,
};

export const getAllDashboards = createAsyncThunk(
  "dashboard/getDashboards",
  async (userId, thunkAPI) => {
    return getAllDashboardsThunk(`/dashboard/getAllDashboards/${userId}`, thunkAPI);
  }
);

const allDashboardsSlice = createSlice({
  name: "allDashboards",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllDashboards.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllDashboards.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.dashboards = payload.dashboards;
        state.totalDashboards = payload.cont;
      })
      .addCase(getAllDashboards.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export const { showLoading, hideLoding } = allDashboardsSlice.actions;
export default allDashboardsSlice.reducer;
