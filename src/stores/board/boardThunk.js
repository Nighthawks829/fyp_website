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
