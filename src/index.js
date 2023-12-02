import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { configureStore } from '@reduxjs/toolkit';
import userSlice from './redux-toolkit/userSlice';
import { Provider } from 'react-redux';
import weatherSlice from './redux-toolkit/weatherSlice';

const store_toolkit = configureStore({
  reducer: {
    userSlice: userSlice,
    weatherSlice: weatherSlice,
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store_toolkit}>
    <App />
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
