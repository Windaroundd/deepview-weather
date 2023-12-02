import { createSlice } from '@reduxjs/toolkit';
import { temperatureUnitLocal } from '../services/localService';

const initialState = {
  weather: undefined,
  fiveDaysForecast: undefined,
  tempUnit: 'metric',
  location: undefined,
};

const weatherSlice = createSlice({
  name: 'weatherSlice',
  initialState,
  reducers: {
    setWeatherInfo: (state, action) => {
      state.weather = action.payload;
    },
    setFiveDaysForecastInfo: (state, action) => {
      state.fiveDaysForecast = action.payload;
    },
    setTempUnit: (state, action) => {
      state.tempUnit = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
  },
});

export const {
  setWeatherInfo,
  setFiveDaysForecastInfo,
  setTempUnit,
  setLocation,
} = weatherSlice.actions;

export default weatherSlice.reducer;
