import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";

/**
 * Thunk function to fetch all sensors from the API.
 * 
 * @param {string} url - The API endpoint for fetching sensors.
 * @param {object} thunkAPI - Thunk API object for dispatching actions and handling errors.
 * @returns {Promise<object>} - A promise that resolves with the fetched sensor data or handles errors.
 */
export const getAllSensorsThunk = async (url, thunkAPI) => {
  try {
    // Make a GET request to fetch all sensors
    const response = await customFetch.get(url);
    return response.data; // Return the sensor data from the response
  } catch (error) {
    // Handle unauthorized response or other errors
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
