import React from 'react';

const IconComponent = ({ icon, alt }) => {
  return (
    <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt={alt} />
  );
};

export default IconComponent;
