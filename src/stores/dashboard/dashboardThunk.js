import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import { clearDashboardValues } from "./dashboardSlice";

/**
 * Sends a POST request to add a new dashboard.
 * Dispatches `clearDashboardValues()` to reset the form after a successful request.
 *
 * @async
 * @function addDashboardThunk
 * @param {string} url - API endpoint for adding a dashboard.
 * @param {object} dashboard - Dashboard data to be added.
 * @param {object} thunkAPI - Redux Thunk API object for dispatching actions.
 * @returns {Promise<object>} - The created dashboard data or an error response.
 */
export const addDashboardThunk = async (url, dashboard, thunkAPI) => {
  try {
    const response = await customFetch.post(url, dashboard);
    // Reset form values after successful addition
    thunkAPI.dispatch(clearDashboardValues());
    return response.data.dashboard
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

/**
 * Sends a GET request to fetch a dashboard's details.
 *
 * @async
 * @function getDashboardThunk
 * @param {string} url - API endpoint to fetch a specific dashboard.
 * @param {object} thunkAPI - Redux Thunk API object for handling authentication errors.
 * @returns {Promise<object>} - The retrieved dashboard data or an error response.
 */
export const getDashboardThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.get(url);
    return response.data.dashboard;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

/**
 * Sends a PATCH request to update an existing dashboard.
 * Dispatches `clearDashboardValues()` to reset the form after a successful update.
 *
 * @async
 * @function editDashboardThunk
 * @param {string} url - API endpoint to update a dashboard.
 * @param {object} dashboard - Updated dashboard data.
 * @param {object} thunkAPI - Redux Thunk API object for dispatching actions.
 * @returns {Promise<object>} - The updated dashboard data or an error response.
 */
export const editDashboardThunk = async (url, dashboard, thunkAPI) => {
  try {
    const response = await customFetch.patch(url, dashboard);
    // Reset form values after successful update
    thunkAPI.dispatch(clearDashboardValues());
    return response.data.dashboard;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

/**
 * Sends a DELETE request to remove a dashboard.
 * Dispatches `clearDashboardValues()` after a successful deletion.
 *
 * @async
 * @function deleteDashboardThunk
 * @param {string} url - API endpoint to delete a dashboard.
 * @param {object} thunkAPI - Redux Thunk API object for dispatching actions.
 * @returns {Promise<string>} - A success message or an error response.
 */
export const deleteDashboardThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.delete(url);
    // Reset form values after deletion
    thunkAPI.dispatch(clearDashboardValues());
    return response.data.msg;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
