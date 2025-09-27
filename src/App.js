import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Dashboard from './Dashboard'; // 原本的 App.js
import Dashboard1 from './Dashboard1'; 
import Analysis from './Analysis';
import Analysis1 from './Analysis1';
import ProfileForm from './components/ProfileForm';

function App() {
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard1" element={<Dashboard1 />} />
        <Route 
          path="/dashboard" 
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" replace />} 
        />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/analysis1" element={<Analysis1 />} />
      </Routes>
    </Router>
  );
}

export default App;
