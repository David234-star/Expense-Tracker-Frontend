// src/components/Dashboard.js
import React, { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import Analytics from './Analytics';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [expenseToEdit, setExpenseToEdit] = useState(null);

  const fetchExpenses = useCallback(async () => {
    try {
      const response = await api.getExpenses();
      const sortedExpenses = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setExpenses(sortedExpenses);
    } catch (error) {
      console.error("Failed to fetch expenses", error);
    }
  }, []);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  return (
    <div className="container mx-auto p-4 sm:p-8">
      <div className="flex flex-col gap-8">
        {/* Top Section: Form and List */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <ExpenseForm 
              fetchExpenses={fetchExpenses} 
              expenseToEdit={expenseToEdit} 
              setExpenseToEdit={setExpenseToEdit} 
            />
          </div>
          <div className="lg:col-span-3">
            <ExpenseList 
              expenses={expenses} 
              fetchExpenses={fetchExpenses}
              setExpenseToEdit={setExpenseToEdit}
            />
          </div>
        </div>

        {/* Bottom Section: Analytics */}
        {/*
          CHANGE THIS: We now render Analytics unconditionally.
          It will handle its own empty state internally.
          This stops the layout shift/flicker.
        */}
        <div>
          <Analytics expenses={expenses} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;