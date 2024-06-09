import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import { clearBoardValues } from "./boardSlice";

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

export const getBoardThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.get(url);
    return response.data.board;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const editBoardThunk = async (url, formData, thunkAPI) => {
  try {
    const response = await customFetch.patch(url, formData);
    thunkAPI.dispatch(clearBoardValues());
    return response.data.boaord;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const deleteBoardThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.delete(url);
    thunkAPI.dispatch(clearBoardValues());
    return response.data.msg;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
