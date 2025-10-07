import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import MainLayout from './views/MainLayout'; // Import the new main layout
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword'; 

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  return (
    <Router>
      <div className="bg-light-bg dark:bg-dark-bg min-h-screen transition-colors">
        <Routes>
          <Route path="/login" element={!isAuthenticated ? <Login setAuth={setAuth} /> : <Navigate to="/" />} />
          <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate to="/" />} />
           <Route 
            path="/forgot-password" 
            element={!isAuthenticated ? <ForgotPassword /> : <Navigate to="/" />} 
          />
          <Route 
            path="/reset-password" 
            element={!isAuthenticated ? <ResetPassword /> : <Navigate to="/" />} 
          />
          <Route path="/*" element={isAuthenticated ? <MainLayout setAuth={setAuth} /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;