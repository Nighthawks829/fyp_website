import axios from "axios";
import { getTokenFromCookies } from "./cookies";
import { clearAuthStore } from "../stores/auth/authSlice";

/**
 * Creates a custom Axios instance with a predefined base URL and credentials.
 * This instance is used for making API requests to the backend.
 */
const customFetch = axios.create({
  baseURL: "http://192.168.0.110:3001/api/v1",    // Backend API base URL
  // baseURL: "http://localhost:3001/api/v1",     // Ensures cookies are sent with cross-origin requests
  withCredentials: true,
});

/**
 * Axios request interceptor to attach the authentication token to request headers.
 * This ensures that all requests include the Bearer token for authentication.
 */
customFetch.interceptors.request.use((config) => {
  const token = getTokenFromCookies();    // Retrieve token from cookies
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;  // Attach token to headers
  }
  return config;
});

/**
 * Handles unauthorized responses (HTTP 401) by dispatching an action to clear authentication state.
 * If the response status is 401, the user is logged out and the authentication store is cleared.
 * 
 * @param {Object} error - The error object received from the API response.
 * @param {Object} thunkAPI - The Redux Toolkit thunkAPI object, used to dispatch actions.
 * @returns {Object} - A rejected action containing the error message.
 */

export const checkForUnauthorizedResponse = (error, thunkAPI) => {
  if (error.response.status === 401) {
    thunkAPI.dispatch(clearAuthStore());    // Clear authentication state
    return thunkAPI.rejectWithValue("Unauthorized! Logging Out...");    // Notify user
  }

  // Extract error message from API response or use a default message
  const errorMessage = error.response?.data?.msg || "An error occurred";
  return thunkAPI.rejectWithValue(errorMessage);
};

export default customFetch;
