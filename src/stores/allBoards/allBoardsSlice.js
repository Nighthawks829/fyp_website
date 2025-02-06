import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllBoardsThunk } from "./allBoardsThunk";
import { toast } from "react-toastify";

// Initial state for the allBoards slice
const initialState = {
  isLoading: false,   // Indicates whether the boards data is being fetched
  boards: [],         // Stores the list of all boards retrieved from the API
  totalBoards: 0      // Stores the total count of boards
};

export const getAllBoards = createAsyncThunk(
  "board/getBoards",
  async (_, thunkAPI) => {
    return getAllBoardsThunk("/board/", thunkAPI);
  }
);

// Redux slice for managing the state of all boards
const allBoardsSlice = createSlice({
  name: "allBoards",
  initialState,
  reducers: {
    // Sets isLoading to true to indicate a loading state
    showLoading: (state) => {
      state.isLoading = true;
    },
    // Sets isLoading to false to indicate loading has finished
    hideLoading: (state) => {
      state.isLoading = false;
    },
    // Resets the state back to the initial values
    clearAllBoardValue: () => {
      return { ...initialState };
    }
  },
  extraReducers: (builder) => {
    builder
      // Handles the pending state when fetching boards (loading starts)
      .addCase(getAllBoards.pending, (state) => {
        state.isLoading = true;
      })
      // Handles the fulfilled state when fetching boards is successful
      .addCase(getAllBoards.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.boards = payload.boards;      // Stores the list of boards
        state.totalBoards = payload.count;  // Stores the total board count
      })
      // Handles the rejected state when an error occurs during fetching
      .addCase(getAllBoards.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  }
});

// Export actions for use in components
export const { showLoading, hideLoading, clearAllBoardValue } =
  allBoardsSlice.actions;

// Export reducer to be used in the Redux store  
export default allBoardsSlice.reducer;
