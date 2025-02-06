import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import { clearUserValues } from "./userSlice";

/**
 * Thunk function to add a new user.
 * @param {string} url - The API endpoint for adding a user.
 * @param {FormData} formData - The data to be sent to the backend, including user information and files (multipart/form-data).
 * @param {Object} thunkAPI - Redux Thunk API for dispatching actions and handling state.
 * @returns {Promise<string>} - Returns the message from the backend indicating success or failure.
 */
export const addUserThunk = async (url, formData, thunkAPI) => {
  try {
    // Send POST request to the backend with user data and file(s) (multipart form data)
    const response = await customFetch.post(url, formData, {
      headers: {
        // Set content type to multipart/form-data for file uploads
        "Content-Type": "multipart/form-data",
      },
    });

    // Dispatch the action to clear any previous user data in the Redux state
    thunkAPI.dispatch(clearUserValues());

    // Return success message from the response
    return response.data.msg;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

/**
 * Thunk function to get the details of a specific user.
 * @param {string} url - The API endpoint for fetching user details.
 * @param {Object} thunkAPI - Redux Thunk API for dispatching actions and handling state.
 * @returns {Promise<Object>} - Returns the user data from the backend.
 */
export const getUserThunk = async (url, thunkAPI) => {
  try {
    // Send GET request to fetch user details from the backend
    const response = await customFetch.get(url);

    // Return the user data from the response
    return response.data.user;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

/**
 * Thunk function to edit an existing user's details.
 * @param {string} url - The API endpoint for updating user details.
 * @param {FormData} formData - The data to be sent to the backend for the user update.
 * @param {Object} thunkAPI - Redux Thunk API for dispatching actions and handling state.
 * @returns {Promise<Object>} - Returns the updated user data from the backend.
 */
export const editUserThunk = async (url, formData, thunkAPI) => {
  try {
    // Send PATCH request to update user details on the backend
    const response = await customFetch.patch(url, formData);

    // Dispatch the action to clear any previous user data in the Redux state
    thunkAPI.dispatch(clearUserValues());

    // Return the updated user data from the response
    return response.data.user;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

/**
 * Thunk function to delete a user.
 * @param {string} url - The API endpoint for deleting a user.
 * @param {Object} thunkAPI - Redux Thunk API for dispatching actions and handling state.
 * @returns {Promise<string>} - Returns the success message from the backend after deleting the user.
 */
export const deleteUserThunk = async (url, thunkAPI) => {
  try {
    // Send DELETE request to remove the user from the backend
    const response = await customFetch.delete(url);

    // Dispatch the action to clear any previous user data in the Redux state
    thunkAPI.dispatch(clearUserValues());

    // Return success message from the response
    return response.data.msg;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
