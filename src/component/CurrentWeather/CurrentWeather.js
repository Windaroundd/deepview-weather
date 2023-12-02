import React, { useEffect, useState } from 'react';
import '../../css/currentWeather.css';
import { useSelector } from 'react-redux';
import { convertDate } from '../../lib/dateUtils';
import IconComponent from '../UI/IconComponent';

const CurrentWeather = () => {
  const { weather } = useSelector((state) => {
    return state.weatherSlice;
  });

  return (
    <>
      {weather ? (
        <div className='current-weather rounded-xl p-4'>
          <h1 className='current-weather__location'>{weather.name}</h1>
          <div className='current-weather__date-time'>
            <p className='current-weather__date'>
              {convertDate(weather.timezone, weather.dt, 'long')}
            </p>
          </div>
          <div className='current-weather__weather'>
            <div>
              <IconComponent
                icon={weather.weather[0].icon}
                alt={weather.weather[0].description}
              />
              <h3>{weather.weather[0].main}</h3>
            </div>
            <div className='current-weather__temp'>
              {Math.round(weather.main.temp)}&deg;
              <div className='current-weather__temp-minmax'>
                <span> Low: {Math.round(weather.main.temp_min)}&deg;</span>
                <span> High: {Math.round(weather.main.temp_max)}&deg;</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default CurrentWeather;
