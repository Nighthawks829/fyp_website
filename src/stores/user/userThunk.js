import customFetch from "../../utils/axios";

export const loginUserThunk = async (url, user, thunkAPI) => {
  try {
    const response = await customFetch.post(url, user);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.msg || "An error occurred";
    return thunkAPI.rejectWithValue(errorMessage);
  }
};
