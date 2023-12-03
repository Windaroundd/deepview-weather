import React, { useEffect, useState } from 'react';
import Header from '../../component/Header/Header';
import { weatherService } from '../../services/weatherService';
import CurrentWeather from '../../component/CurrentWeather/CurrentWeather';
import { useDispatch, useSelector } from 'react-redux';
import {
  setFiveDaysForecastInfo,
  setLocation,
  setWeatherInfo,
} from '../../redux-toolkit/weatherSlice';
import FiveDaysForecast from '../../component/FiveDaysForecast/FiveDaysForecast';
import { useLocation, useSearchParams } from 'react-router-dom';
import {
  getLocationError,
  getLocationSuccess,
  getUserLocation,
} from '../../lib/LocationUtils';
import { setLoading } from '../../redux-toolkit/loadingSlice';

const Home = () => {
  let dispatch = useDispatch();

  let [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');
  const { pathname } = useLocation();

  let isSearch = pathname.includes('/search');

  let { tempUnit, location } = useSelector((state) => {
    return state.weatherSlice;
  });

  const onGetLocationSuccess = (res) => {
    dispatch(
      setLocation({
        lon: res.coords.longitude,
        lat: res.coords.latitude,
      }),
    );
    dispatch(setLoading(false));
  };
  const onGetLocationErr = (err) => {
    alert(err);
    dispatch(setLoading(false));
  };

  //get location lat lon
  useEffect(() => {
    if (!isSearch) {
      dispatch(setLoading(true));
      getUserLocation(onGetLocationSuccess, onGetLocationErr);
    } else {
      dispatch(setLocation({ lat: lat, lon: lon }));
    }
  }, [isSearch, lat, lon]);

  //fetch weather
  useEffect(() => {
    if (location) {
      weatherService
        .getWeatherByLatLon({
          lat: location.lat,
          lon: location.lon,
          units: tempUnit,
        })
        .then((res) => {
          dispatch(setWeatherInfo(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [location, tempUnit, dispatch]);

  //fetch fiveDaysForecast
  useEffect(() => {
    if (location) {
      weatherService
        .getFiveDaysForeCast({
          lat: location.lat,
          lon: location.lon,
          units: tempUnit,
          cnt: 6,
        })
        .then((res) => {
          dispatch(setFiveDaysForecastInfo(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [location, tempUnit, dispatch]);

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
