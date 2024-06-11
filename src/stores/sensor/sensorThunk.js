import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import { clearSensorValues } from "./sensorSlice";

export const addSensorThunk = async (url, formData, thunkAPI) => {
  try {
    const response = await customFetch.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    thunkAPI.dispatch(clearSensorValues());
    return response.data.sensors;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const getSensorThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.get(url);
    return response.data.sensor;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const editSensorThunk = async (url, formData, thunkAPI) => {
  try {
    const response = await customFetch.patch(url, formData);
    thunkAPI.dispatch(clearSensorValues());
    return response.data.sensor;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const deleteSensorThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.delete(url);
    thunkAPI.dispatch(clearSensorValues());
    return response.data.msg;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
