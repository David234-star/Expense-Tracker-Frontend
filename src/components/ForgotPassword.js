import React, { useState,useContext } from 'react';
import api from '../services/api';
import ThemeContext from '../context/ThemeContext';
import { SunIcon, MoonIcon} from '@heroicons/react/24/solid';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // The API call is the same
      await api.forgotPassword(email);

      // --- THIS IS THE FIX ---
      // Navigate IMMEDIATELY on success.
      // Pass both the email and a success message in the navigation state.
      navigate('/reset-password', { 
        state: { 
          email: email,
          message: "If an account with that email exists, an OTP has been sent. Please check your inbox." 
        } 
      });

    } catch (err) {
      setError('An error occurred. Please check the email and try again.');
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-light-bg dark:bg-dark-bg">
        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                            {theme === 'light' ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
        </button>
      <div className="p-10 bg-white dark:bg-dark-card rounded-2xl shadow-xl w-full max-w-md border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-center mb-6 text-light-text dark:text-dark-text">
          Forgot Password
        </h2>
        
        {/* The error message is still shown here if the API call fails */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-light-subtext dark:text-dark-subtext mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-light-text dark:text-dark-text disabled:opacity-50"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary-blue text-white font-bold text-lg rounded-lg hover:bg-opacity-90 transition-all shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        
        <p className="mt-6 text-center text-light-subtext dark:text-dark-subtext">
          Remembered your password? <Link to="/login" className="font-bold text-primary-blue hover:underline">Back to Login</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;