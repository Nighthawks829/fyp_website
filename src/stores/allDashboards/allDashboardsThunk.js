import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";

/**
 * Asynchronous thunk function to fetch all dashboards from the backend.
 * 
 * @param {string} url - The API endpoint to fetch dashboards.
 * @param {object} thunkAPI - The Redux Thunk API object for dispatching actions or handling errors.
 * @returns {Promise<object>} - The response data containing all dashboards if successful, or an error response if unauthorized.
 */
export const getAllDashboardsThunk = async (url, thunkAPI) => {
  try {
    // Send a GET request to fetch all dashboards
    const response = await customFetch.get(url);
    return response.data;
  } catch (error) {
    // Handle unauthorized errors and return appropriate response
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
