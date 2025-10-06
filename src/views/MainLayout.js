import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { PlusIcon, SunIcon, MoonIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid';

import api from '../services/api';
import ThemeContext from '../context/ThemeContext';
import DashboardView from './DashboardView';
import ExpensesView from './ExpensesView';
import AnalyticsView from './AnalyticsView';
import AddExpenseModal from '../components/AddExpenseModal';

const MainLayout = ({ setAuth }) => {
  const [expenses, setExpenses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState(null);
  const { theme, toggleTheme } = useContext(ThemeContext);
//   const location = useLocation();

  const fetchExpenses = useCallback(async () => {
    try {
      const response = await api.getExpenses();
      setExpenses(response.data.sort((a, b) => new Date(b.date) - new Date(a.date)));
    } catch (error) {
      console.error("Failed to fetch expenses", error);
    }
  }, []);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const handleEdit = (expense) => {
    setExpenseToEdit(expense);
    setIsModalOpen(true);
  };
  
  const handleOpenAddModal = () => {
    setExpenseToEdit(null);
    setIsModalOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuth(false);
  };

  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
      isActive
        ? 'bg-primary-blue text-white'
        : 'text-light-subtext dark:text-dark-subtext hover:bg-gray-200 dark:hover:bg-gray-700'
    }`;
  
//   // Finds current page title
//   const getPageTitle = () => {
//       switch(location.pathname) {
//           case '/expenses': return 'Expenses';
//           case '/analytics': return 'Analytics';
//           default: return 'Dashboard';
//       }
//   }

  return (
    <div className="text-light-text dark:text-dark-text">
      <header className="px-8 py-4">
        {/* Header Content */}
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-2xl font-bold">ExpenseTracker</h1>
                <p className="text-sm text-light-subtext dark:text-dark-subtext">Manage your personal finances</p>
            </div>
            <div className="flex items-center space-x-4">
                <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                    {theme === 'light' ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
                </button>
                 <button onClick={handleLogout} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                    <ArrowLeftOnRectangleIcon className="h-6 w-6" />
                </button>
                <button onClick={handleOpenAddModal} className="flex items-center space-x-2 bg-primary-blue text-white px-4 py-2 rounded-lg font-bold hover:bg-opacity-90">
                    <PlusIcon className="h-5 w-5" />
                    <span>Add Expense</span>
                </button>
            </div>
        </div>

        {/* Tab Navigation */}
        <nav className="mt-6 bg-light-card dark:bg-dark-card p-2 rounded-lg inline-flex space-x-2">
            <NavLink to="/" className={navLinkClass}>Dashboard</NavLink>
            <NavLink to="/expenses" className={navLinkClass}>Expenses</NavLink>
            <NavLink to="/analytics" className={navLinkClass}>Analytics</NavLink>
        </nav>
      </header>

      <main className="p-8">
        <Routes>
          <Route path="/" element={<DashboardView expenses={expenses} />} />
          <Route path="/expenses" element={<ExpensesView expenses={expenses} onEdit={handleEdit} fetchExpenses={fetchExpenses} />} />
          <Route path="/analytics" element={<AnalyticsView expenses={expenses} />} />
        </Routes>
      </main>

      <AddExpenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        fetchExpenses={fetchExpenses}
        expenseToEdit={expenseToEdit}
      />
    </div>
  );
};

export default MainLayout;