import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import { clearNotificationValues } from "./notificationSlice";

export const addNotificationThunk = async (url, notification, thunkAPI) => {
  try {
    const response = await customFetch.post(url, notification);
    thunkAPI.dispatch(clearNotificationValues());
    return response.data.notification;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const getNotificationThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.get(url);
    return response.data.notification;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const editNotificationThunk = async (url, notification, thunkAPI) => {
  try {
    const response = await customFetch.patch(url, notification);
    thunkAPI.dispatch(clearNotificationValues());
    return response.data.notification;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const deleteNotificationThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.delete(url);
    thunkAPI.dispatch(clearNotificationValues());
    return response.data.msg;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
