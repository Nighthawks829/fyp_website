import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllDashboardsThunk } from "./allDashboardsThunk";
import { toast } from "react-toastify";

/**
 * Initial state for the allDashboards slice.
 * 
 * @property {boolean} isLoading - Indicates if dashboard data is being fetched.
 * @property {Array} dashboards - Stores the list of dashboards.
 * @property {number} totalDashboards - Stores the total number of dashboards.
 */
const initialState = {
  isLoading: false,
  dashboards: [],
  totalDashboards: 0
};

/**
 * Async thunk to fetch all dashboards.
 * This function calls `getAllDashboardsThunk` to make an API request
 * and handles the response using Redux Thunk.
 *
 * @async
 * @function getAllDashboards
 * @param {object} thunkAPI - Redux Thunk API object for handling async logic.
 * @returns {Promise<object>} - The response containing dashboard data or an error message.
 */
export const getAllDashboards = createAsyncThunk(
  "dashboard/getDashboards",
  async (_, thunkAPI) => {
    return getAllDashboardsThunk("/dashboard/", thunkAPI);
  }
);

/**
 * Redux slice for managing dashboard-related state and actions.
 */
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
    clearAllDashboardValue: () => {
      return { ...initialState };
    }
  },
  extraReducers: (builder) => {
    builder
      // Handles the pending state of `getAllDashboards` by setting `isLoading` to `true`.
      .addCase(getAllDashboards.pending, (state) => {
        state.isLoading = true;
      })
      // Handles the fulfilled state of `getAllDashboards`.
      // Updates the dashboards list and total dashboard count in the state.
      .addCase(getAllDashboards.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.dashboards = payload.dashboards;
        state.totalDashboards = payload.cont;
      })
      // Handles the rejected state of `getAllDashboards`.
      .addCase(getAllDashboards.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  }
});

// Export actions for modifying loading state and clearing dashboard values
export const { showLoading, hideLoding, clearAllDashboardValue } =
  allDashboardsSlice.actions;

// Export the reducer to be used in the Redux store
export default allDashboardsSlice.reducer;
