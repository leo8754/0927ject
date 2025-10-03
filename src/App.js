import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Visitors from './Visitors'; 
import Analysis from './Analysis';
import Analysis1 from './Analysis1';
import First from './First';
import FormPage from './FormPage';
import FormPage1 from './FormPage1';
import Upload from './Upload';
import Analyze from './Analyze';
import About from './About';
import Table3 from './Table3';
import Table4 from './Table4';
import Dashboard from './dashboard';
import ProfileForm from './components/ProfileForm';

function App() {
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Visitors" element={<Visitors />} />
        <Route path="/First" element={<First />} />
        <Route path="/FormPage" element={<FormPage />} />
        <Route path="/FormPage1" element={<FormPage1 />} />
        <Route path="/Upload" element={<Upload />} />
        <Route path="/Analyze" element={<Analyze />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/analysis1" element={<Analysis1 />} />
        <Route path="/table3" element={<Table3 />} />
        <Route path="/table4" element={<Table4 />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
