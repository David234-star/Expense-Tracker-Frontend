import React, { useState, useContext} from 'react';
import ThemeContext from '../context/ThemeContext';
import { SunIcon, MoonIcon} from '@heroicons/react/24/solid';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../services/api';

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [email, setEmail] = useState(location.state?.email || '');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  // Display the success message passed from the previous page, if it exists
  const [message, setMessage] = useState(location.state?.message || '');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    console.log("Submitting password reset request with:");
    console.log("Email:", email);
    console.log("OTP:", otp);
    console.log("New Password:", newPassword);

    try {
      // This is the API call we need to check
      const response = await api.resetPassword(email, otp, newPassword);

      console.log("API call successful:", response.data); // Log success

      setMessage(response.data.message + " Redirecting to login...");
      setTimeout(() => navigate('/login'), 3000);

    } catch (err) {
      // --- THIS IS THE MOST IMPORTANT PART ---
      // Log the actual JavaScript error object to the browser console
      console.error("API call failed! The error object is:", err);

      // Check if the error is from the backend (Axios error) or a different JS error
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Backend responded with an error:", err.response.data);
        setError(err.response.data.detail || 'Failed to reset password. The email or OTP may be incorrect, or the OTP has expired.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up the request:", err.message);
        setError('A client-side error occurred. Please check the console.');
      }
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
          Reset Your Password
        </h2>
        
        {message && <p className="text-green-500 text-center mb-4">{message}</p>}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-blue text-coffee dark:text-dark-text" required />
          <input type="text" placeholder="Enter OTP from email" value={otp} onChange={(e) => setOtp(e.target.value)} disabled={loading} className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-blue text-coffee dark:text-dark-text" required />
          <input type="password" placeholder="Enter new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} disabled={loading} className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-blue text-coffee dark:text-dark-text" required />
          <button type="submit" disabled={loading} className="w-full py-3 bg-primary-blue text-white font-bold text-lg rounded-lg hover:bg-opacity-90 transition-all shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed">
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;