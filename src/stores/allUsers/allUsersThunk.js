import customFetch from "../../utils/axios";

export const getAllUsersThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.get(url);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.msg || "An error occurred";
    return thunkAPI.rejectWithValue(errorMessage);
  }
};
