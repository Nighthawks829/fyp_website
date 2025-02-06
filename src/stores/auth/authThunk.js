import customFetch from "../../utils/axios";
import { clearUserValues } from "../user/userSlice";
import { logoutUser } from "./authSlice";

/**
 * Thunk function to handle user login.
 * @param {string} url - API endpoint for user login.
 * @param {Object} user - User credentials (email and password).
 * @param {Object} thunkAPI - Redux Thunk API for dispatching actions and handling state.
 * @returns {Promise<Object>} - Returns the response data or rejects with an error message.
 */
export const loginUserThunk = async (url, user, thunkAPI) => {
  try {

    // Send login request to the server
    const response = await customFetch.post(url, user);
    return response.data;
  } catch (error) {
    // Extract error message from response or use a default message
    const errorMessage = error.response?.data?.msg || "An error occurred";
    return thunkAPI.rejectWithValue(errorMessage);
  }
};

/**
 * Thunk function to handle user logout.
 * @param {string} url - API endpoint for user logout.
 * @param {Object} thunkAPI - Redux Thunk API for dispatching actions and handling state.
 * @returns {Promise<Object>} - Returns the response data or rejects with an error message.
 */
export const logoutUserThunk = async (url, thunkAPI) => {
  try {
    // Send logout request to the server
    const response = await customFetch.post(url);
    return response.data;
  } catch (error) {
    // Extract error message from response or use a default message
    const errorMessage = error.response?.data?.msg || "An error occurred";
    return thunkAPI.rejectWithValue(errorMessage);
  }
};

/**
 * Thunk function to clear authentication-related state from Redux store.
 * It dispatches actions to log out the user and clear user-related values.
 * @param {string} message - Optional message for logging or notifications.
 * @param {Object} thunkAPI - Redux Thunk API for dispatching actions.
 * @returns {Promise<void>} - Resolves immediately after dispatching actions.
 */
export const clearAuthStoreThunk = async (message, thunkAPI) => {
  try {
    // Dispatch logout action to reset authentication state
    thunkAPI.dispatch(logoutUser());

    // Dispatch action to clear user-related values from Redux store
    thunkAPI.dispatch(clearUserValues());

    return Promise.resolve();   // Return a resolved promise
  } catch (error) {
    return Promise.reject();    // Return a rejected promise in case of an error
  }
};
