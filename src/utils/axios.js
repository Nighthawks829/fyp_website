import axios from "axios";
import { getTokenFromCookies } from "./cookies";
import { clearAuthStore } from "../stores/auth/authSlice";

const customFetch = axios.create({
  baseURL: "http://192.168.0.110:3001/api/v1",
  withCredentials: true,
});

customFetch.interceptors.request.use((config) => {
  const token = getTokenFromCookies();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export const checkForUnauthorizedResponse = (error, thunkAPI) => {
  if (error.response.status === 401) {
    thunkAPI.dispatch(clearAuthStore());
    return thunkAPI.rejectWithValue("Unauthorized! Logging Out...");
  }
  const errorMessage = error.response?.data?.msg || "An error occurred";
  return thunkAPI.rejectWithValue(errorMessage);
};

export default customFetch;
