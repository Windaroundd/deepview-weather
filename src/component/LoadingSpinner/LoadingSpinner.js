import React from 'react';
import { useSelector } from 'react-redux';

import BarLoader from 'react-spinners/BarLoader';

const style = {
  height: '100vh',
  width: '100vw',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  top: 0,
  backgroundColor: 'rgba(0,0,0,0.4)',
};

const LoadingSpinner = () => {
  let { isLoading } = useSelector((state) => {
    return state.loadingSlice;
  });

  return (
    <>
      {isLoading ? (
        <div style={style}>
          {' '}
          <BarLoader color='#36d7b7' />{' '}
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default LoadingSpinner;
