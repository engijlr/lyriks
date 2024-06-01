import { createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserLocation = createAsyncThunk(
  "location/fetchUserLocation", // Action type prefix
  async () => {
    try {
      const response = await axios.get(
        "https://geo.ipify.org/api/v2/country?apiKey=at_8lOSl404nKyzUDZSR1eYOyXjriALt"
      );
      return {
        data: response.data,
        error: null,
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        error: error as AxiosError,
      };
    }
  }
);

interface LocationStateType {
  country?: string | null;
  status: string;
  error?: string | null;
}

const initialState: LocationStateType = {
  country: null,
  status: "idle", // idle, loading, succeeded, failed
  error: null,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserLocation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserLocation.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.status = "succeeded";
          state.country = action.payload.data?.location?.country;
        }
        state.status = "error";
        state.error = action.payload.error?.message;
      })
      .addCase(fetchUserLocation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default locationSlice.reducer;
