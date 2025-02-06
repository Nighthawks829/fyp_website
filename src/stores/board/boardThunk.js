import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import { clearBoardValues } from "./boardSlice";


/**
 * Thunk function to add a new board.
 * 
 * This function sends a POST request with form data to the given URL
 * to create a new board. It includes the necessary headers for multipart 
 * form data submission. Upon success, it dispatches the `clearBoardValues` 
 * action to reset the board state.
 * 
 * @param {string} url - API endpoint for adding a board.
 * @param {FormData} formData - Form data containing board details.
 * @param {object} thunkAPI - Thunk API object for dispatching actions.
 * @returns {Promise<object>} - Returns the created board data or handles an error.
 */
export const addBoardThunk = async (url, formData, thunkAPI) => {
  try {
    const response = await customFetch.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    thunkAPI.dispatch(clearBoardValues());
    return response.data.board;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

/**
 * Thunk function to fetch a specific board.
 * 
 * This function sends a GET request to the provided URL to retrieve 
 * a board's details.
 * 
 * @param {string} url - API endpoint for fetching a board.
 * @param {object} thunkAPI - Thunk API object for error handling.
 * @returns {Promise<object>} - Returns the board data or handles an error.
 */
export const getBoardThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.get(url);
    return response.data.board;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

/**
 * Thunk function to edit an existing board.
 * 
 * This function sends a PATCH request with form data to update board details.
 * Upon success, it dispatches the `clearBoardValues` action to reset the board state.
 * 
 * @param {string} url - API endpoint for editing a board.
 * @param {FormData} formData - Form data containing updated board details.
 * @param {object} thunkAPI - Thunk API object for dispatching actions.
 * @returns {Promise<object>} - Returns the updated board data or handles an error.
 */
export const editBoardThunk = async (url, formData, thunkAPI) => {
  try {
    const response = await customFetch.patch(url, formData);
    thunkAPI.dispatch(clearBoardValues());
    return response.data.boaord;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

/**
 * Thunk function to delete a board.
 * 
 * This function sends a DELETE request to remove a board from the system.
 * Upon success, it dispatches the `clearBoardValues` action to reset the board state.
 * 
 * @param {string} url - API endpoint for deleting a board.
 * @param {object} thunkAPI - Thunk API object for dispatching actions.
 * @returns {Promise<string>} - Returns a success message or handles an error.
 */
export const deleteBoardThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.delete(url);
    thunkAPI.dispatch(clearBoardValues());
    return response.data.msg;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
