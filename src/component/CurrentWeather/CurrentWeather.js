import React, { useEffect } from 'react';
import '../../css/currentWeather.css';
import { useSelector } from 'react-redux';

const CurrentWeather = () => {
  const { weather } = useSelector((state) => {
    return state.weatherSlice;
  });
  let convertDate = (timezone, dt) => {
    // Extract timestamp and timezone offset from the data object
    const timestamp = dt;
    const timeZoneOffsetInSeconds = timezone;

    // Convert UTC timestamp to milliseconds
    const utcMilliseconds = timestamp * 1000;

    // Create a Date object with the UTC time
    const utcDate = new Date(utcMilliseconds);

    // Apply the time zone offset
    const userFriendlyDate = new Date(
      utcDate.getTime() + timeZoneOffsetInSeconds * 1000,
    );

    // Format the date as a string in a user-friendly way (date only, no time)
    const options = {
      timeZone: 'UTC',
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const userFriendlyDateString = userFriendlyDate.toLocaleString(
      'en-US',
      options,
    );

    return userFriendlyDateString;
  };

  return (
    <>
      {weather ? (
        <div className='current-weather rounded-xl p-4'>
          <h1 className='current-weather__location'>{weather.name}</h1>
          <div className='current-weather__date-time'>
            <p className='current-weather__date'>
              {convertDate(weather.timezone, weather.dt)}
            </p>
          </div>
          <div className='current-weather__weather'>
            <div>
              <img
                style={{ width: '80px' }}
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt=''
              />
              <h3>{weather.weather[0].main}</h3>
            </div>
            <div className='current-weather__temp'>
              {Math.round(weather.main.temp)}&deg;
              <div className='current-weather__temp-minmax'>
                <span> Min: {Math.round(weather.main.temp_min)}&deg;</span>
                <span> Max: {Math.round(weather.main.temp_max)}&deg;</span>
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
