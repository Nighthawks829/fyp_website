import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";

/**
 * Thunk function to fetch sensor data from the server.
 * 
 * @param {string} url - The API endpoint to request sensor data.
 * @param {object} thunkAPI - The Redux Thunk API object for handling async actions.
 * @returns {Promise<object>} - The fetched sensor data or an error response.
 */
export const getSensorDataThunk = async (url, thunkAPI) => {
  try {
    // Make a GET request to fetch sensor data
    const response = await customFetch.get(url);
    return response.data;
  } catch (error) {
    // Handle unauthorized responses and other errors
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

