import React, { useState, useContext } from 'react';
import api from '../services/api';
import ThemeContext from '../context/ThemeContext';
import { SunIcon, MoonIcon} from '@heroicons/react/24/solid';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await api.signup({ username, email, password });
      setSuccess('Account created! Redirecting to login...');
      // Wait 2 seconds before redirecting to give the user time to read the message
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      // Provide a more specific error if possible, otherwise a generic one
      if (err.response && err.response.data && err.response.data.detail) {
          setError(err.response.data.detail);
      } else {
          setError('Signup failed. Please try again.');
      }
      console.error("Signup error", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-parchment dark:bg-dark-bg transition-colors">
      <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                          {theme === 'light' ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
      </button>
      <div className="p-10 bg-white dark:bg-dark-card rounded-2xl shadow-xl w-full max-w-md border border-gray-200 dark:border-gray-700">
        <h1 className="text-4xl text-center font-heading text-coffee dark:text-dark-text">Join ExpenseTracker</h1>
        <h2 className="text-xl text-center mt-2 mb-8 font-body text-gray-600 dark:text-dark-subtext">Create a New Account</h2>
        
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}
        
        <form onSubmit={handleSignup} className="space-y-6">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta text-coffee dark:text-dark-text"
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta text-coffee dark:text-dark-text"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta text-coffee dark:text-dark-text"
            required
          />
          <button type="submit" className="w-full py-3 bg-primary-blue text-white font-bold text-lg rounded-lg hover:bg-opacity-90 transition-all shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed">
            Create Account
          </button>
        </form>
        <p className="mt-8 text-center text-gray-600 dark:text-dark-subtext">
          Already have an account? <Link to="/login" className="font-bold text-ocean-blue hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;