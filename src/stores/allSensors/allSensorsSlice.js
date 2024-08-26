import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllSensorsThunk } from "./allSensorsThunk";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  sensors: [],
  totalSensors: 0
};

export const getAllSensors = createAsyncThunk(
  "sensor/getSensors",
  async (_, thunkAPI) => {
    return getAllSensorsThunk("/sensor", thunkAPI);
  }
);

const allSensorsSlice = createSlice({
  name: "allSensors",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    clearAllSensorValue: () => {
      return { ...initialState };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSensors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllSensors.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.sensors = payload.sensors;
        state.totalSensors = payload.count;
      })
      .addCase(getAllSensors.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  }
});

export const { showLoading, hideLoading, clearAllSensorValue } =
  allSensorsSlice.actions;
export default allSensorsSlice.reducer;
