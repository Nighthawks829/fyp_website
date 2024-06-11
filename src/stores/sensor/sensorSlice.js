import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addSensorThunk,
  deleteSensorThunk,
  editSensorThunk,
  getSensorThunk,
} from "./sensorThunk";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  boardId: "",
  boardName: "",
  name: "",
  pin: "",
  type: "Digital Input",
  topic: "",
  image: "",
  value: "",
};

export const addSensor = createAsyncThunk(
  "sensor/addSensor",
  async (formData, thunkAPI) => {
    return addSensorThunk("/sensor/", formData, thunkAPI);
  }
);

export const getSensor = createAsyncThunk(
  "sensor/getSensor",
  async (sensorId, thunkAPI) => {
    return getSensorThunk(`/sensor/${sensorId}`, thunkAPI);
  }
);

export const editSensor = createAsyncThunk(
  "sensor/editSensor",
  async ({ sensorId, formData }, thunkAPI) => {
    return editSensorThunk(`/sensor/${sensorId}`, formData, thunkAPI);
  }
);

export const deleteSensor = createAsyncThunk(
  "sensor/deleteSensor",
  async (sensorId, thunkAPI) => {
    return deleteSensorThunk(`/sensor/${sensorId}`, thunkAPI);
  }
);

const sensorSlice = createSlice({
  name: "sensor",
  initialState,
  reducers: {
    handleSensorChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearSensorValues: () => {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addSensor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addSensor.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Add sensor successful!");
      })
      .addCase(addSensor.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(getSensor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSensor.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.boardId = payload.boardId;
        state.boardName = payload.boardName;
        state.name = payload.name;
        state.pin = payload.pin;
        state.type = payload.type;
        state.topic = payload.topic;
        state.image = payload.image;
        state.value = payload.value ? payload.value : "0";
      })
      .addCase(getSensor.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(editSensor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editSensor.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success("Edit sensor successful!");
      })
      .addCase(editSensor.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(deleteSensor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSensor.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success("Sensor deleted successfully");
      })
      .addCase(deleteSensor.rejected, (state, { payload }) => {
        state.isLoading = true;
        toast.error(payload);
      });
  },
});

export const { handleSensorChange, clearSensorValues } = sensorSlice.actions;
export default sensorSlice.reducer;
