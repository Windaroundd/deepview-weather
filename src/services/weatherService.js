import { axiosInstance } from './configUrl';

export const weatherService = {
  getWeatherByLatLon: (query) => {
    // Search params require keys: lat, lon, appid
    // For temperature in Fahrenheit use units=imperial
    // For temperature in Celsius use units=metric
    // Temperature in Kelvin is used by default, no need to use units parameter in API call
    return axiosInstance.get(`/data/2.5/weather`, { params: query });
  },
};
