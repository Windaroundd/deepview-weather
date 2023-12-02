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

const Home = () => {
  let dispatch = useDispatch();

  let [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');
  const { pathname } = useLocation();

  let isSearch = pathname.includes('/search');

  let [loading, setLoading] = useState(false);
  let { tempUnit, location } = useSelector((state) => {
    return state.weatherSlice;
  });

  //get location lat lon
  useEffect(() => {
    if (!isSearch) {
      setLoading(true);
      navigator.geolocation &&
        navigator.geolocation.getCurrentPosition(
          (res) => {
            setLoading(false);
            dispatch(
              setLocation({
                lon: res.coords.longitude,
                lat: res.coords.latitude,
              }),
            );
          },
          (err) => {
            setLoading(false);
          },
        );
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
          console.log('res: ', res);
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
          console.log(res);
          dispatch(setFiveDaysForecastInfo(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [location, tempUnit, dispatch]);
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
