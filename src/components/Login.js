import React, { useState } from 'react';
import api from '../services/api';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ setAuth }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await api.login({ username, password });
      localStorage.setItem('token', response.data.access_token);
      setAuth(true);
      navigate('/dashboard');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-parchment dark:bg-dark-bg transition-colors">
      <div className="p-10 bg-white dark:bg-dark-card rounded-2xl shadow-xl w-full max-w-md border border-gray-200 dark:border-gray-700">
        <h1 className="text-4xl text-center font-heading text-coffee dark:text-dark-text">EXPENSE TRACKER</h1>
        <h2 className="text-xl text-center mt-2 mb-8 font-body text-gray-600 dark:text-dark-subtext">User Login</h2>
        
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        
        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-blue text-coffee dark:text-dark-text"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-blue text-coffee dark:text-dark-text"
            required
          />
          <button type="submit" className="w-full py-3 bg-ocean-blue text-blue font-bold text-lg rounded-lg hover:bg-opacity-90 transition-all shadow-md">
            Login
          </button>
        </form>
        <p className="mt-8 text-center text-gray-600 dark:text-dark-subtext">
          New user? <Link to="/signup" className="font-bold text-terracotta hover:underline">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;