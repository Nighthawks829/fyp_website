import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addBoardThunk, getBoardThunk } from "./boardThunk";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  name: "",
  type: "",
  location: "",
  ipAddress: "",
  image: "",
  sensors: "",
};

export const addBoard = createAsyncThunk(
  "board/addBoard",
  async (formData, thunkAPI) => {
    return addBoardThunk("/board/", formData, thunkAPI);
  }
);

export const getBoard = createAsyncThunk(
  "board/getBoard",
  async (boardId, thunkAPI) => {
    return getBoardThunk(`/board/${boardId}`, thunkAPI);
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
      })
      .addCase(getBoard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBoard.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.name = payload.name;
        state.type = payload.type;
        state.location = payload.location;
        state.ipAddress = payload.ip_address;
        state.image = payload.image;
        state.sensors = payload.sensors;
      })
      .addCase(getBoard.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export const { handleBoardChange, clearBoardValues } = boardSlice.actions;
export default boardSlice.reducer;
