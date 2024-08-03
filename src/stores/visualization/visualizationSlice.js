import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSensorDataThunk } from "./visualizationThunk";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  sensorId: "",
  data: {},
  count: 0
};

export const getSensorData = createAsyncThunk(
  "sensorData/getSensorData",
  async (sensorId, thunkAPI) => {
    return getSensorDataThunk(`/sensorData/${sensorId}`, thunkAPI);
  }
);

const visualizationSlice = createSlice({
  name: "visualization",
  initialState,
  reducers: {
    handleSensorIdChange: (state, payload) => {
      state.sensorId = payload.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSensorData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSensorData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = payload.sensorData;
        state.count=payload.count
      })
      .addCase(getSensorData.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  }
});

export const { handleSensorIdChange } = visualizationSlice.actions;
export default visualizationSlice.reducer;
