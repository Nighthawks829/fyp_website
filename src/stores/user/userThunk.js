import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import { clearUserValues } from "./userSlice";

export const addUserThunk = async (url, user, thunkAPI) => {
  try {
    const response = await customFetch.post(url, user);
    thunkAPI.dispatch(clearUserValues());
    return response.data.msg;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
