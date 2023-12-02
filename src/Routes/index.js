import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './allRoutes';

const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map((router, index) => {
          const Page = router.component;
          return <Route key={index} path={router.path} element={<Page />} />;
        })}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
