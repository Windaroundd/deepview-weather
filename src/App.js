import './App.css';

import AppRoute from './routes';

import LoadingSpinner from './component/LoadingSpinner/LoadingSpinner';

function App() {
  return (
    <>
      <div className='App'>
        <AppRoute />
        <LoadingSpinner />
      </div>
    </>
  );
}

export default App;
