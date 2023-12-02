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
  let [location, setLocation] = useState();
  let isSearch = false;
  let [loading, setLoading] = useState(false);

  //get user's location
  useEffect(() => {
    if (!isSearch) {
      setLoading(true);
      navigator.geolocation &&
        navigator.geolocation.getCurrentPosition(
          (res) => {
            setLoading(false);
            setLocation({
              lon: res.coords.longitude,
              lat: res.coords.latitude,
            });
          },
          (err) => {
            setLoading(false);
          },
        );
    }
  }, [isSearch]);

  //fetch weather
  useEffect(() => {
    location &&
      weatherService
        .getWeatherByLatLon({
          lat: location.lat,
          lon: location.lon,
          units: 'metric',
        })
        .then((res) => {
          console.log('res: ', res);
          dispatch(setWeatherInfo(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
  }, [location]);

  //fetch fiveDaysForecast
  useEffect(() => {
    location &&
      weatherService
        .getFiveDaysForeCast({
          lat: location.lat,
          lon: location.lon,
          units: 'metric',
          cnt: 6,
        })
        .then((res) => {
          console.log(res);
          dispatch(setFiveDaysForecastInfo(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
  }, [location]);
  if (loading) {
    return <h2>Loading....</h2>;
  }

  return (
    <div className='container'>
      <header>
        <Header />
      </header>
      {location ? (
        <main>
          <CurrentWeather />
          <FiveDaysForecast />
        </main>
      ) : (
        <h2>ENABLE YOUR GPS OR SEARCHING CITY</h2>
      )}
    </div>
  );
};

export default Home;
