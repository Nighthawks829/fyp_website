import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addBoardThunk,
  deleteBoardThunk,
  editBoardThunk,
  getBoardThunk,
} from "./boardThunk";
import { toast } from "react-toastify";

/**
 * Initial state for the board slice.
 * This state manages board details and the loading state.
 */
const initialState = {
  isLoading: false,   // Indicates whether an async action is in progress
  name: "",           // Name of the board
  type: "",           // Type of the board
  location: "",       // Location of the board
  ip_address: "",     // IP address of the board
  image: "",          // Image of the board
  sensors: "",        // Sensors associated with the board
};

/**
 * Async thunk to add a new board.
 * Dispatches an API request to create a board using `addBoardThunk`.
 * 
 * @param {FormData} formData - Form data containing board details.
 * @param {object} thunkAPI - Thunk API object for dispatching actions.
 * @returns {Promise<object>} - The newly created board data.
 */
export const addBoard = createAsyncThunk(
  "board/addBoard",
  async (formData, thunkAPI) => {
    return addBoardThunk("/board/", formData, thunkAPI);
  }
);

/**
 * Async thunk to fetch a specific board.
 * Dispatches an API request to retrieve board details using `getBoardThunk`.
 * 
 * @param {string} boardId - ID of the board to fetch.
 * @param {object} thunkAPI - Thunk API object for handling errors.
 * @returns {Promise<object>} - The board data.
 */
export const getBoard = createAsyncThunk(
  "board/getBoard",
  async (boardId, thunkAPI) => {
    return getBoardThunk(`/board/${boardId}`, thunkAPI);
  }
);

/**
 * Async thunk to edit an existing board.
 * Dispatches an API request to update board details using `editBoardThunk`.
 * 
 * @param {object} param - An object containing `boardId` and `formData`.
 * @param {string} param.boardId - ID of the board to edit.
 * @param {FormData} param.formData - Updated board details.
 * @param {object} thunkAPI - Thunk API object for dispatching actions.
 * @returns {Promise<object>} - The updated board data.
 */
export const editBoard = createAsyncThunk(
  "board/editBoard",
  async ({ boardId, formData }, thunkAPI) => {
    return editBoardThunk(`/board/${boardId}`, formData, thunkAPI);
  }
);

/**
 * Async thunk to delete a board.
 * Dispatches an API request to remove a board using `deleteBoardThunk`.
 * 
 * @param {string} boardId - ID of the board to delete.
 * @param {object} thunkAPI - Thunk API object for dispatching actions.
 * @returns {Promise<string>} - A success message upon successful deletion.
 */
export const deleteBoard = createAsyncThunk(
  "board/deleteBoard",
  async (boardId, thunkAPI) => {
    return deleteBoardThunk(`/board/${boardId}`, thunkAPI);
  }
);

/**
 * Slice for managing board-related state and actions.
 */
const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    /**
 * Reducer to update board input fields dynamically.
 * 
 * @param {object} state - Current board state.
 * @param {object} action - Redux action containing field name and value.
 * @param {string} action.payload.name - Name of the field to update.
 * @param {string} action.payload.value - New value for the field.
 */
    handleBoardChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    /**
 * Reducer to reset board values to their initial state.
 * 
 * @returns {object} - Resets state to `initialState`.
 */
    clearBoardValues: () => {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      // Handling addBoard actions
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
      // Handling getBoard actions
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
      // Handling editBoard actions
      .addCase(editBoard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editBoard.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success("Edit board sccessful!");
      })
      .addCase(editBoard.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      // Handling deleteBoard actions
      .addCase(deleteBoard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBoard.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success("Board deleted successfully");
      })
      .addCase(deleteBoard.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

// Exporting actions and reducer
export const { handleBoardChange, clearBoardValues } = boardSlice.actions;
export default boardSlice.reducer;
