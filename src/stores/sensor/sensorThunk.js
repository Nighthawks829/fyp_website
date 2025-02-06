import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import { clearSensorValues } from "./sensorSlice";

/**
 * Sends a POST request to add a new sensor.
 * Dispatches `clearSensorValues()` after successful addition.
 * 
 * @param {string} url - The API endpoint for adding a sensor.
 * @param {FormData} formData - The sensor data to be sent in multipart form.
 * @param {object} thunkAPI - The Redux Toolkit's thunkAPI for dispatching actions.
 * @returns {Promise<object>} - The newly added sensor data.
 */

export const addSensorThunk = async (url, formData, thunkAPI) => {
  try {
    const response = await customFetch.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    
    // Clears sensor form values after successful addition
    thunkAPI.dispatch(clearSensorValues());   
    return response.data.sensors;
  } catch (error) {
    // Handles unauthorized errors
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

/**
 * Sends a GET request to fetch details of a specific sensor.
 * 
 * @param {string} url - The API endpoint for retrieving a sensor.
 * @param {object} thunkAPI - The Redux Toolkit's thunkAPI for handling errors.
 * @returns {Promise<object>} - The fetched sensor data.
 */
export const getSensorThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.get(url);
    return response.data.sensor;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

/**
 * Sends a PATCH request to update sensor details.
 * Dispatches `clearSensorValues()` after successful update.
 * 
 * @param {string} url - The API endpoint for editing a sensor.
 * @param {FormData} formData - The updated sensor data.
 * @param {object} thunkAPI - The Redux Toolkit's thunkAPI for dispatching actions.
 * @returns {Promise<object>} - The updated sensor data.
 */
export const editSensorThunk = async (url, formData, thunkAPI) => {
  try {
    const response = await customFetch.patch(url, formData);
    thunkAPI.dispatch(clearSensorValues()); // Clears form values after successful edit
    return response.data.sensor;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

/**
 * Sends a DELETE request to remove a sensor.
 * Dispatches `clearSensorValues()` after successful deletion.
 * 
 * @param {string} url - The API endpoint for deleting a sensor.
 * @param {object} thunkAPI - The Redux Toolkit's thunkAPI for dispatching actions.
 * @returns {Promise<string>} - A success message confirming deletion.
 */
export const deleteSensorThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.delete(url);
    thunkAPI.dispatch(clearSensorValues()); // Clears sensor data after deletion
    return response.data.msg;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
