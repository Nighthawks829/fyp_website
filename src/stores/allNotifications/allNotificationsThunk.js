import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";

export const getAllNotificationsThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.get(url);
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
