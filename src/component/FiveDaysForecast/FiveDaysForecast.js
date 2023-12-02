import React from 'react';
import '../../css/fiveDaysForecast.css';
import ForecastComponent from './ForecastComponent';
import { useSelector } from 'react-redux';

const FiveDaysForecast = () => {
  const { fiveDaysForecast } = useSelector((state) => {
    return state.weatherSlice;
  });
  return (
    <div className='fiveday-forecast rounded-xl p-4'>
      {fiveDaysForecast?.list?.slice(1).map((item, index) => {
        return (
          <ForecastComponent
            key={index}
            forecast={item}
            timezone={fiveDaysForecast.city.timezone}
          />
        );
      })}
    </div>
  );
};

export default FiveDaysForecast;
