import React from 'react';
import NotFound from './vendorDashboard/components/NotFound.jsx';
import { LandingPage } from './vendorDashboard/pages/LandingPage';

import "./App.css"

import { Route, Routes } from 'react-router-dom';

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/*' element={<NotFound />} />
      
    </Routes>
      
    </>
  )
}

export default App
