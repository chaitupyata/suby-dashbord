import NotFound from './vendorDashboard/components/NotFound.jsx';
import { LandingPage } from './vendorDashboard/pages/LandingPage';

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
