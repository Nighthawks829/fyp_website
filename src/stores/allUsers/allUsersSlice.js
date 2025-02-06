import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllUsersThunk } from "./allUsersThunk";
import { toast } from "react-toastify";

// Initial state for the allUsers slice
const initialState = {
  isLoading: false,   // Flag indicating if the request is in progress
  users: [],          // Array to hold the list of users
  totalUsers: 0       // Total count of users (can be used for pagination or other purposes)
};

/**
 * Thunk function for fetching all users.
 * This action dispatches the getAllUsersThunk to fetch users from the backend.
 */
export const getAllUsers = createAsyncThunk(
  "user/getUsers",
  async (_, thunkAPI) => {
    // Call the async thunk to get users from the backend API
    return getAllUsersThunk("/user/", thunkAPI);
  }
);

// Create the allUsers slice
const allUsersSlice = createSlice({
  name: "allUsers",   // Name of the slice
  initialState,       // Initial state for the slice
  reducers: {
    // Reducer to show loading state
    showLoading: (state) => {
      state.isLoading = true;   // Set isLoading to true when a request starts
    },
    // Reducer to hide loading state
    hideLoading: (state) => {
      state.isLoading = false;  // Set isLoading to false when a request completes
    },
    // Reducer to clear all user-related state
    clearAllUserValue: () => {
      return { ...initialState };   // Reset the state to the initial values
    }
  },
  extraReducers: (builder) => {
    // Handle the pending state of the getAllUsers async thunk (when the request is in progress)
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      // Handle the fulfilled state of the getAllUsers async thunk (when the request is successful)
      .addCase(getAllUsers.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.users = payload.users;
        state.totalUsers = payload.count;
      })
      // Handle the rejected state of the getAllUsers async thunk (when the request fails)
      .addCase(getAllUsers.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  }
});

// Export the actions for use in components
export const { showLoading, hideLoading, clearAllUserValue } =
  allUsersSlice.actions;

// Export the reducer to be included in the Redux store
export default allUsersSlice.reducer;
