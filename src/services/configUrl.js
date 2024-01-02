import axios from 'axios';
import setLoading from '../lib/recoilOutsideUtils';

export const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
  headers: {},
});

axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent

    setLoading(true);
    return config;
  },
  function (error) {
    setLoading(false);

    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    setLoading(false);
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    setLoading(false);
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);
