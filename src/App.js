import './App.css';
import ClipLoader from 'react-spinners/ClipLoader';
import AppRoute from '..';
import { useState } from 'react';
import LoadingSpinner from './component/LoadingSpinner/LoadingSpinner';

function App() {
  return (
    <>
      <div className='App'>
        <AppRoute />;
        <LoadingSpinner />
      </div>
    </>
  );
}

export default App;
