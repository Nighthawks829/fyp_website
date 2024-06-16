import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import { clearDashboardValues } from "./dashboardSlice";

export const addDashboardThunk = async (url, dashboard, thunkAPI) => {
  try {
    const response = await customFetch.post(url, dashboard);
    thunkAPI.dispatch(clearDashboardValues());
    return response.data.dashboard
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const getDashboardThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.get(url);
    return response.data.dashboard;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const editDashboardThunk = async (url, dashboard, thunkAPI) => {
  try {
    const response = await customFetch.patch(url, dashboard);
    thunkAPI.dispatch(clearDashboardValues());
    return response.data.dashboard;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const deleteDashboardThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.delete(url);
    thunkAPI.dispatch(clearDashboardValues());
    return response.data.msg;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
