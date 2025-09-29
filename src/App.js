import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';

import Visitors from './Visitors'; 
import Analysis from './Analysis';
import Analysis1 from './Analysis1';
import First from './First';
import FormPage from './FormPage';
import FormPage1 from './FormPage1';
import Upload from './Upload';

import ProfileForm from './components/ProfileForm';

function App() {
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/Visitors" element={<Visitors />} />
        
        <Route path="/First" element={<First />} />
        <Route path="/FormPage" element={<FormPage />} />
        <Route path="/FormPage1" element={<FormPage1 />} />
        <Route path="/Upload" element={<Upload />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/analysis1" element={<Analysis1 />} />
      </Routes>
    </Router>
  );
}

export default App;
