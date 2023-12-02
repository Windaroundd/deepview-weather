import { axiosInstance } from './configUrl';

export const weatherService = {
  getWeatherByLatLon: (lat = 10.762622, lon = 106.660172) => {
    // For temperature in Fahrenheit use units=imperial
    // For temperature in Celsius use units=metric
    // Temperature in Kelvin is used by default, no need to use units parameter in API call
    return axiosInstance.get(
      `/data/2.5/weather?lat=${lat}&lon=${lon}&appid=4d8fb5b93d4af21d66a2948710284366&units=metric`,
    );
  },
};
