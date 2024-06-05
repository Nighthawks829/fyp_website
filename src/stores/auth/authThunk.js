import customFetch from "../../utils/axios";
import { clearUserValues } from "../user/userSlice";
import { logoutUser } from "./authSlice";

export const loginUserThunk = async (url, user, thunkAPI) => {
  try {
    const response = await customFetch.post(url, user);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.msg || "An error occurred";
    return thunkAPI.rejectWithValue(errorMessage);
  }
};

export const logoutUserThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.post(url);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.msg || "An error occurred";
    return thunkAPI.rejectWithValue(errorMessage);
  }
};

export const clearAuthStoreThunk = async (message, thunkAPI) => {
  try {
    thunkAPI.dispatch(logoutUser());
    thunkAPI.dispatch(clearUserValues());
    return Promise.resolve();
  } catch (error) {
    return Promise.reject();
  }
};
