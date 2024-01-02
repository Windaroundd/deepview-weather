import React from 'react';
import BarLoader from 'react-spinners/BarLoader';
import { useRecoilValue } from 'recoil';
import { isLoadingState } from '../../recoil/atom';

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
  let isLoading = useRecoilValue(isLoadingState);

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
