import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addBoardThunk } from "./boardThunk";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  name: "",
  type: "",
  location: "",
  ipAddress: "",
  image: "",
  associatedSensor: "",
};

export const addBoard = createAsyncThunk(
  "board/addBoard",
  async (formData, thunkAPI) => {
    return addBoardThunk("/board/", formData, thunkAPI);
  }
);

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    handleBoardChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearBoardValues: () => {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addBoard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addBoard.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Add board successful!");
      })
      .addCase(addBoard.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export const { handleBoardChange, clearBoardValues } = boardSlice.actions;
export default boardSlice.reducer;
