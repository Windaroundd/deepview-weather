import React, { useEffect, useState } from 'react';
import Header from '../../component/Header/Header';
import { weatherService } from '../../services/weatherService';
import CurrentWeather from '../../component/CurrentWeather/CurrentWeather';
import { useDispatch } from 'react-redux';
import {
  setFiveDaysForecastInfo,
  setWeatherInfo,
} from '../../redux-toolkit/weatherSlice';
import FiveDaysForecast from '../../component/FiveDaysForecast/FiveDaysForecast';

const Home = () => {
  let dispatch = useDispatch();

  //fetch weather
  useEffect(() => {
    weatherService
      .getWeatherByLatLon({
        lat: 9.94719,
        lon: 106.34225,
        units: 'metric',
      })
      .then((res) => {
        console.log('res: ', res);
        dispatch(setWeatherInfo(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //fetch fiveDaysForecast
  useEffect(() => {
    weatherService
      .getFiveDaysForeCast({
        lat: 9.94719,
        lon: 106.34225,
        units: 'metric',
        cnt: 5,
      })
      .then((res) => {
        console.log(res);
        dispatch(setFiveDaysForecastInfo(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className='container'>
      <header>
        <Header />
      </header>
      <main>
        <CurrentWeather />
        <FiveDaysForecast />
      </main>
    </div>
  );
};

export default Home;
