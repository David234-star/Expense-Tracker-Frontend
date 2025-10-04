// src/components/Navbar.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import ThemeContext from '../context/ThemeContext'; // Import context
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'; // For nice icons

const Navbar = ({ setAuth }) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);


  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuth(false);
    navigate('/login');
  };

  const handleExport = async () => {
    try {
      const response = await api.exportToCSV();
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      const contentDisposition = response.headers['content-disposition'];
      let fileName = 'expenses.csv';
      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
        if (fileNameMatch && fileNameMatch.length === 2) fileName = fileNameMatch[1];
      }
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Failed to export CSV", error);
    }
  };

  return (
    <nav className="bg-parchment dark:bg-dark-card shadow-md transition-colors">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-4xl font-heading text-coffee dark:text-dark-text">ExpenseTracker</h1>
        <div className="flex items-center space-x-4">
          <button onClick={handleExport} className="...">Export CSV</button>
          <button onClick={handleLogout} className="...">Logout</button>
          
          {/* Theme Toggler Button */}
          <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-200 dark:bg-gray-600">
            {theme === 'light' ? (
              <MoonIcon className="h-6 w-6 text-coffee" />
            ) : (
              <SunIcon className="h-6 w-6 text-yellow-300" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;