import { atom } from 'recoil';

const weatherState = atom({
  key: 'weatherState',
  default: undefined,
});
const fiveDaysForecastState = atom({
  key: 'fiveDaysForecastState',
  default: undefined,
});
const tempUnitState = atom({
  key: 'tempUnitState',
  default: 'metric',
});
const locationState = atom({
  key: 'locationState',
  default: undefined,
});
const isLoadingState = atom({
  key: 'isLoadingState',
  default: false,
});

export {
  weatherState,
  fiveDaysForecastState,
  tempUnitState,
  locationState,
  isLoadingState,
};
