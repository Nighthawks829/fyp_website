import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addUserThunk } from "./userThunk";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  name: "",
  email: "",
  role: "user",
  password: "",
  confirmPassword: "",
  image: "",
};

export const addUser = createAsyncThunk(
  "user/addUser",
  async (user, thunkAPI) => {
    return addUserThunk("/user/", user, thunkAPI);
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    handleUserChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearUserValues: () => {
      //   return { ...initialState };
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addUser.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Add user successful!");
      })
      .addCase(addUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export const { handleUserChange, clearUserValues } = userSlice.actions;

export default userSlice.reducer;
