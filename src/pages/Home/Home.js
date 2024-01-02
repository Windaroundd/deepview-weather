import React, { useEffect } from 'react';
import Header from '../../component/Header/Header';
import { weatherService } from '../../services/weatherService';
import CurrentWeather from '../../component/CurrentWeather/CurrentWeather';

import FiveDaysForecast from '../../component/FiveDaysForecast/FiveDaysForecast';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getUserLocation } from '../../lib/LocationUtils';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  fiveDaysForecastState,
  isLoadingState,
  locationState,
  tempUnitState,
  weatherState,
} from '../../recoil/atom';

const Home = () => {
  let setLoading = useSetRecoilState(isLoadingState);
  let [location, setLocation] = useRecoilState(locationState);
  let setWeatherInfo = useSetRecoilState(weatherState);
  let tempUnit = useRecoilValue(tempUnitState);
  let setFiveDaysForecastInfo = useSetRecoilState(fiveDaysForecastState);

  let [searchParams] = useSearchParams();
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');
  const { pathname } = useLocation();

  let isSearch = pathname.includes('/search');

  const onGetLocationSuccess = (res) => {
    setLocation({
      lon: res.coords.longitude,
      lat: res.coords.latitude,
    });
    setLoading(false);
  };
  const onGetLocationErr = (err) => {
    alert(err);
    setLoading(false);
  };

  //get location lat lon
  useEffect(() => {
    if (!isSearch) {
      setLoading(true);
      getUserLocation(onGetLocationSuccess, onGetLocationErr);
    } else {
      setLocation({ lat: lat, lon: lon });
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
          setWeatherInfo(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [location, tempUnit]);

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
          setFiveDaysForecastInfo(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [location, tempUnit]);

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
