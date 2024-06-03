import axios from "axios";
import { getTokenFromCookies } from "./cookies";

const customFetch = axios.create({
  baseURL: "http://192.168.0.110:3001/api/v1",
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
    return thunkAPI.rejectWithValue("Unauthorized! Logging Out...");
  }
  return thunkAPI.rejectWithValue(error.response.data.msg);
};

export default customFetch;
