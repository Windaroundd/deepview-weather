import axios from 'axios';
import { store_toolkit } from '..';
import { setLoading } from '../redux-toolkit/loadingSlice';
const setAuthorization = (token) => {
  axios.defaults.headers.common['appid'] = token;
};
export const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
  headers: {},
});
setAuthorization('');

axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    store_toolkit.dispatch(setLoading(true));
    return config;
  },
  function (error) {
    store_toolkit.dispatch(setLoading(false));
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    store_toolkit.dispatch(setLoading(false));
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    store_toolkit.dispatch(setLoading(false));
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);
