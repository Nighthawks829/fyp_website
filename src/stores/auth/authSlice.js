import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserFromCookies } from "../../utils/cookies";
import {
  clearAuthStoreThunk,
  loginUserThunk,
  logoutUserThunk,
} from "./authThunk";
import { toast } from "react-toastify";

// Initial state for the authentication slice
const initialState = {
  user: getUserFromCookies(), // Retrieve user data from cookies (if available)
  loggedIn: false,            // Flag indicating whether the user is logged in
  isLoading: false,           // Flag for indicating loading state during async operations
  sidebar: "Dashboard",       // Default sidebar view
};

// Async thunk for logging in a user
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user, thunkAPI) => {
    // Call the loginUserThunk for logging in
    return loginUserThunk("/auth/login", user, thunkAPI);
  }
);

// Async thunk for logging out a user
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    // Call the logoutUserThunk for logging out
    return logoutUserThunk("auth/logout", thunkAPI);
  }
);

// Async thunk for clearing the authentication store
export const clearAuthStore = createAsyncThunk(
  "auth/clearStore",
  // Use the clearAuthStoreThunk function to clear store data
  clearAuthStoreThunk
);

// Create the authentication slice
const authSlice = createSlice({
  name: "auth",   // Name of the slice
  initialState,   // Initial state defined above
  reducers: {
    // Reducer for setting the loggedIn state
    loggedInUser: (state, { payload }) => {
      // Set the loggedIn state based on the payload
      state.loggedIn = payload.loggedIn;
    },
    // Reducer for switching the sidebar view
    switchSidebar: (state, { payload }) => {
      // Update the sidebar state with the new value
      state.sidebar = payload.sidebar;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle login user request
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;   // Set isLoading to true when login is pending
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;  // Set isLoading to false when login is successful
        state.user = user;        // Set user data in the state
        state.loggedIn = true;    // Set loggedIn to true
        toast.success(`Login successful! Welcome Back ${user.name}`); // Show success toast
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;  // Set isLoading to false on failed login
        toast.error(payload);     // Show error toast with the error message
      })
      // Handle logout user request
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;   // Set isLoading to true when logout is pending
      })
      .addCase(logoutUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;  // Set isLoading to false when logout is successful
        state.loggedIn = false;   // Set loggedIn to false
        state.user = null;        // Clear user data
        state.sidebar = "";       // Clear sidebar state
        toast.success("Logout successful!");    // Show success toast
      })
      .addCase(logoutUser.rejected, (state, { payload }) => {
        state.isLoading = false;    // Set isLoading to false on failed logout
        toast.error(payload);       // Show error toast with the error message
      })
      // Handle clearing auth store request
      .addCase(clearAuthStore.rejected, () => {
        // Show error toast if clearing the auth store fails
        toast.error("There was an error");
      });
  },
});

// Export the actions to be used in components
export const { switchSidebar, loggedInUser } = authSlice.actions;

// Export the reducer to be included in the store
export default authSlice.reducer;
