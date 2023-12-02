import { axiosInstance } from './configUrl';

export const weatherService = {
  // Query params require keys: lat, lon, appid
  // For temperature in Fahrenheit use units=imperial
  // For temperature in Celsius use units=metric
  // Temperature in Kelvin is used by default, no need to use units parameter in API call
  getWeatherByLatLon: (query) => {
    return axiosInstance.get(
      `/data/2.5/weather?appid=${process.env.REACT_APP_API_KEY}`,
      { params: query },
    );
  },
  getFiveDaysForeCast: (query) => {
    return axiosInstance.get(
      `/data/2.5/forecast/daily?appid=${process.env.REACT_APP_API_KEY}`,
      { params: query },
    );
  },
  getCoordinatesByLocation: (query) => {
    return axiosInstance.get(
      `/geo/1.0/direct?appid=${process.env.REACT_APP_API_KEY}`,
      { params: query },
    );
  },
};
