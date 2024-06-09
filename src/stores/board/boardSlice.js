import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addBoardThunk, editBoardThunk, getBoardThunk } from "./boardThunk";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  name: "",
  type: "",
  location: "",
  ip_address: "",
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

export const editBoard = createAsyncThunk(
  "board/editBoard",
  async ({ boardId, formData }, thunkAPI) => {
    return editBoardThunk(`/board/${boardId}`, formData, thunkAPI);
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
        state.ip_address = payload.ip_address;
        state.image = payload.image;
        state.sensors = payload.sensors;
      })
      .addCase(getBoard.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(editBoard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editBoard.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success("Edit board dusccessful!");
      })
      .addCase(editBoard.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export const { handleBoardChange, clearBoardValues } = boardSlice.actions;
export default boardSlice.reducer;
