import React, { useEffect } from 'react';
import Header from '../../component/Header/Header';
import { weatherService } from '../../services/weatherService';
import CurrentWeather from '../../component/CurrentWeather/CurrentWeather';
import { useDispatch } from 'react-redux';
import { setWeatherInfo } from '../../redux-toolkit/weatherSlice';

const Home = () => {
  let dispatch = useDispatch();

  //fetch weather
  useEffect(() => {
    weatherService
      .getWeatherByLatLon()
      .then((res) => {
        console.log(res);
        dispatch(setWeatherInfo(res.data));
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
      </main>
    </div>
  );
};

export default Home;
