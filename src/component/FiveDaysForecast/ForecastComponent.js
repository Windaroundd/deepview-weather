import React from 'react';
import IconComponent from '../UI/IconComponent';
import { convertDate } from '../../lib/dateUtils';

const ForecastComponent = ({ forecast, timezone }) => {
  return (
    <div className='fiveday-forecast__info'>
      <div className='grid-item'>{convertDate(forecast.dt, timezone)}</div>
      <div className='grid-item'>
        <IconComponent icon={forecast.weather[0].icon} />
      </div>
      <div className='grid-item'>{forecast.weather[0].main}</div>
      <div className='grid-item'>{forecast.temp.day}&deg;</div>
      <div className='grid-item'>
        L/H: {forecast.temp.min}&deg;/{forecast.temp.max}&deg;
      </div>
    </div>
  );
};

export default ForecastComponent;
