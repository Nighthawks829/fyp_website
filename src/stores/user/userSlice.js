import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addUserThunk,
  deleteUserThunk,
  editUserThunk,
  getUserThunk,
} from "./userThunk";
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
  async (formData, thunkAPI) => {
    return addUserThunk("/user/", formData, thunkAPI);
  }
);

export const getUser = createAsyncThunk(
  "user/getUser",
  async (userId, thunkAPI) => {
    return getUserThunk(`/user/${userId}`, thunkAPI);
  }
);

export const editUser = createAsyncThunk(
  "user/editUser",
  async ({ userId, formData }, thunkAPI) => {
    return editUserThunk(`/user/${userId}`, formData, thunkAPI);
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userId, thunkAPI) => {
    return deleteUserThunk(`/user/${userId}`, thunkAPI);
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
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.name = payload.name;
        state.email = payload.email;
        state.role = payload.role;
        state.image = payload.image;
      })
      .addCase(getUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(editUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success("Edit user successful!");
      })
      .addCase(editUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success("User deleted successfully");
      })
      .addCase(deleteUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export const { handleUserChange, clearUserValues } = userSlice.actions;

export default userSlice.reducer;
