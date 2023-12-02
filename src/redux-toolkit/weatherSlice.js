import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  weather: undefined,
};

const weatherSlice = createSlice({
  name: 'weatherSlice',
  initialState,
  reducers: {
    setWeatherInfo: (state, action) => {
      state.weather = action.payload;
    },
  },
});

export const { setWeatherInfo } = weatherSlice.actions;

export default weatherSlice.reducer;
