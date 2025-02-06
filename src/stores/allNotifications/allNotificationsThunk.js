import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";

/**
 * Fetches all notifications from the given API endpoint.
 *
 * @param {string} url - The API endpoint for retrieving notifications.
 * @param {object} thunkAPI - The Redux Toolkit's thunkAPI object, used for handling async actions.
 * @returns {Promise<object>} - Resolves with the notifications data if successful.
 * @throws {object} - Returns an error response if the request fails, handling unauthorized responses.
 */
export const getAllNotificationsThunk = async (url, thunkAPI) => {
  try {
    // Send a GET request to fetch notifications
    const response = await customFetch.get(url);
    return response.data;
  } catch (error) {
    // Handle unauthorized response or other API errors
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
