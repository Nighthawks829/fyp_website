import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import { clearNotificationValues } from "./notificationSlice";

/**
 * Handles adding a new notification by sending a POST request.
 * Dispatches `clearNotificationValues` to reset the notification state after a successful request.
 *
 * @async
 * @function addNotificationThunk
 * @param {string} url - The API endpoint for adding a notification.
 * @param {object} notification - The notification data to be sent.
 * @param {object} thunkAPI - Redux Toolkit's thunkAPI object for dispatching actions and handling errors.
 * @returns {Promise<object>} - Resolves with the newly created notification data.
 */
export const addNotificationThunk = async (url, notification, thunkAPI) => {
  try {
    const response = await customFetch.post(url, notification);
    thunkAPI.dispatch(clearNotificationValues());
    return response.data.notification;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

/**
 * Fetches a single notification by sending a GET request.
 *
 * @async
 * @function getNotificationThunk
 * @param {string} url - The API endpoint for retrieving the notification.
 * @param {object} thunkAPI - Redux Toolkit's thunkAPI object for handling errors.
 * @returns {Promise<object>} - Resolves with the fetched notification data.
 */
export const getNotificationThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.get(url);
    return response.data.notification;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

/**
 * Handles editing an existing notification by sending a PATCH request.
 * Dispatches `clearNotificationValues` to reset the notification state after a successful update.
 *
 * @async
 * @function editNotificationThunk
 * @param {string} url - The API endpoint for editing a notification.
 * @param {object} notification - The updated notification data.
 * @param {object} thunkAPI - Redux Toolkit's thunkAPI object for dispatching actions and handling errors.
 * @returns {Promise<object>} - Resolves with the updated notification data.
 */
export const editNotificationThunk = async (url, notification, thunkAPI) => {
  try {
    const response = await customFetch.patch(url, notification);
    thunkAPI.dispatch(clearNotificationValues());
    return response.data.notification;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

/**
 * Deletes a notification by sending a DELETE request.
 * Dispatches `clearNotificationValues` to reset the notification state after a successful deletion.
 *
 * @async
 * @function deleteNotificationThunk
 * @param {string} url - The API endpoint for deleting a notification.
 * @param {object} thunkAPI - Redux Toolkit's thunkAPI object for dispatching actions and handling errors.
 * @returns {Promise<string>} - Resolves with a success message upon successful deletion.
 */
export const deleteNotificationThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.delete(url);
    thunkAPI.dispatch(clearNotificationValues());
    return response.data.msg;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
