import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import { clearUserValues } from "./userSlice";

export const addUserThunk = async (url, formData, thunkAPI) => {
  try {
    // console.log(user);
    const response = await customFetch.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    thunkAPI.dispatch(clearUserValues());
    return response.data.msg;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const getUserThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.get(url);
    return response.data.user;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const editUserThunk = async (url, user, thunkAPI) => {
  try {
    const response = await customFetch.patch(url, user);
    thunkAPI.dispatch(clearUserValues());
    return response.data.user;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const deleteUserThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.delete(url);
    thunkAPI.dispatch(clearUserValues());
    return response.data.msg;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
