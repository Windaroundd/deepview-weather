export const getUserLocation = (success, error) => {
  navigator.geolocation.getCurrentPosition(success, error);
};
