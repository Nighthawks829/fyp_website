import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";

/**
 * Asynchronous thunk function to fetch all boards from the given URL.
 *
 * @param {string} url - The API endpoint to fetch board data.
 * @param {object} thunkAPI - The Redux Thunk API object, used for dispatching actions and accessing state.
 * @returns {Promise<object>} - The response data if the request is successful, or an error response if unauthorized.
 */
export const getAllBoardsThunk = async (url, thunkAPI) => {
  try {
    // Send a GET request using customFetch to retrieve board data
    const response = await customFetch.get(url);
    return response.data;
  } catch (error) {
    // Handle unauthorized responses by invoking checkForUnauthorizedResponse
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
