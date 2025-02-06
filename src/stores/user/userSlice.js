import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addUserThunk,
  deleteUserThunk,
  editUserThunk,
  getUserThunk,
} from "./userThunk";
import { toast } from "react-toastify";

// Initial state for the user slice
const initialState = {
  isLoading: false,   // To manage loading state (e.g., during API calls)
  name: "",
  email: "",
  role: "user",
  password: "",
  confirmPassword: "",
  image: "",
};

/**
 * Thunk function to add a new user.
 * Dispatches the addUserThunk and handles the response for user creation.
 * @param {Object} formData - The data (including files) to be sent for adding a user.
 * @param {Object} thunkAPI - Redux Thunk API to dispatch actions and handle state changes.
 * @returns {Promise<string>} - Success or error message after the operation.
 */
export const addUser = createAsyncThunk(
  "user/addUser",
  async (formData, thunkAPI) => {
    return addUserThunk("/user/", formData, thunkAPI);
  }
);

/**
 * Thunk function to fetch a user's details by their ID.
 * Dispatches the getUserThunk and handles the response for fetching user data.
 * @param {string} userId - The unique identifier of the user to fetch.
 * @param {Object} thunkAPI - Redux Thunk API to dispatch actions and handle state changes.
 * @returns {Promise<Object>} - User data (name, email, role, image).
 */
export const getUser = createAsyncThunk(
  "user/getUser",
  async (userId, thunkAPI) => {
    return getUserThunk(`/user/${userId}`, thunkAPI);
  }
);

/**
 * Thunk function to edit an existing user's details.
 * Dispatches the editUserThunk and handles the response for user update.
 * @param {Object} param0 - An object containing userId and formData for editing the user.
 * @param {Object} thunkAPI - Redux Thunk API to dispatch actions and handle state changes.
 * @returns {Promise<Object>} - Updated user data after the edit.
 */
export const editUser = createAsyncThunk(
  "user/editUser",
  async ({ userId, formData }, thunkAPI) => {
    return editUserThunk(`/user/${userId}`, formData, thunkAPI);
  }
);

/**
 * Thunk function to delete a user by their ID.
 * Dispatches the deleteUserThunk and handles the response for user deletion.
 * @param {string} userId - The unique identifier of the user to delete.
 * @param {Object} thunkAPI - Redux Thunk API to dispatch actions and handle state changes.
 * @returns {Promise<string>} - Success or error message after the operation.
 */
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userId, thunkAPI) => {
    return deleteUserThunk(`/user/${userId}`, thunkAPI);
  }
);

// Redux slice for managing user state and actions
const userSlice = createSlice({
  name: "user",
  initialState,   // Initial state of the user
  reducers: {
    // Action to handle changes to user input fields (e.g., name, email).
    handleUserChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    // Action to clear all user-related values (reset state to initial state).
    clearUserValues: () => {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle add user request
      .addCase(addUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addUser.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Add user successful!");
      })
      .addCase(addUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      // Handle get user request
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        // Update state with the fetched user data
        state.name = payload.name;
        state.email = payload.email;
        state.role = payload.role;
        state.image = payload.image;
      })
      .addCase(getUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      // Handle edit user request 
      .addCase(editUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success("Edit user successful!");
      })
      .addCase(editUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      // Handle delete user request 
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success("User deleted successfully");
      })
      .addCase(deleteUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

// Export the actions to be used in components
export const { handleUserChange, clearUserValues } = userSlice.actions;

// Export the reducer to be included in the store
export default userSlice.reducer;
