import React, { useState } from 'react';
import api from '../services/api';
import { Link, useNavigate } from 'react-router-dom';

// NO MORE IMPORTS FOR THEME CONTEXT NEEDED HERE

const Login = ({ setAuth }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // NO MORE 'useContext' HOOK NEEDED HERE

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await api.login({ username, password });
      localStorage.setItem('token', response.data.access_token);
      setAuth(true);
      navigate('/'); // Navigate to the root, which will be handled by the protected route
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      setLoading(false);
    }
  };

  // The JSX and Tailwind dark: prefixes will handle the styling automatically
  return (
    <div className="flex items-center justify-center min-h-screen bg-light-bg dark:bg-dark-bg transition-colors">
      <div className="p-10 bg-white dark:bg-dark-card rounded-2xl shadow-xl w-full max-w-md border border-gray-200 dark:border-gray-700">
        <h1 className="text-4xl text-center font-heading text-light-text dark:text-dark-text">
          EXPENSE TRACKER
        </h1>
        <h2 className="text-xl text-center mt-2 mb-8 font-body text-light-subtext dark:text-dark-subtext">
          User Login
        </h2>
        
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        
        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
            className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-light-text dark:text-dark-text disabled:opacity-50"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-light-text dark:text-dark-text disabled:opacity-50"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary-blue text-white font-bold text-lg rounded-lg hover:bg-opacity-90 transition-all shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="mt-8 text-center text-light-subtext dark:text-dark-subtext">
          New user? <Link to="/signup" className="font-bold text-red-500 hover:underline">Create an account</Link>
        </p>
        <p className="mt-2 text-center text-sm">
          <Link to="/forgot-password" className="font-medium text-primary-blue hover:underline">
            Forgot your password?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;