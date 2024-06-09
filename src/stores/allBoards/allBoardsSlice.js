import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllBoardsThunk } from "./allBoardsThunk";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  boards: [],
  totalBoards: 0,
};

export const getAllBoards = createAsyncThunk(
  "board/getBoards",
  async (_, thunkAPI) => {
    return getAllBoardsThunk("/board/", thunkAPI);
  }
);

const allBoardsSlice = createSlice({
  name: "allBoards",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBoards.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBoards.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.boards = payload.boards;
        state.totalBoards = payload.count;
      })
      .addCase(getAllBoards.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export const { showLoading, hideLoading } = allBoardsSlice.actions;
export default allBoardsSlice.reducer;
