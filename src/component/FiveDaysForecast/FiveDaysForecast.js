import React from 'react';
import '../../css/fiveDaysForecast.css';
import ForecastComponent from './ForecastComponent';

import { useRecoilValue } from 'recoil';
import { fiveDaysForecastState } from '../../recoil/atom';

const FiveDaysForecast = () => {
  let fiveDaysForecast = useRecoilValue(fiveDaysForecastState);

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
