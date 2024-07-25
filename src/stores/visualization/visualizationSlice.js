import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  sensorId: "",
  data: [],
};

const visualizationSlice = createSlice({
  name: "visualization",
  initialState,
  reducers: {
    handleSensorIdChange: (state, payload) => {
      state.sensorId = payload.sensorId;
    },
  },
  extraReducers: (builder) => {},
});

export const { handleSensorIdChange } = visualizationSlice.actions;
export default visualizationSlice.reducer;
