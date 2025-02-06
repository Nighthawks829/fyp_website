import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";

/**
 * Thunk function to fetch all users.
 * @param {string} url - The API endpoint for retrieving the list of users.
 * @param {Object} thunkAPI - Redux Thunk API for dispatching actions and handling state.
 * @returns {Promise<Object>} - Returns the response data or handles errors through the checkForUnauthorizedResponse function.
 */
export const getAllUsersThunk = async (url, thunkAPI) => {
  try {
    // Send GET request to fetch the list of users from the provided URL
    const response = await customFetch.get(url);

    // Return the response data containing the list of users
    return response.data;
  } catch (error) {
    // Pass the error to the checkForUnauthorizedResponse function for handling unauthorized access
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
