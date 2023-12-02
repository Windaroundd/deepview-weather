import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  weather: undefined,
  fiveDaysForecast: undefined,
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
  },
});

export const { setWeatherInfo, setFiveDaysForecastInfo } = weatherSlice.actions;

export default weatherSlice.reducer;
