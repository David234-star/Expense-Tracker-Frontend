import React from 'react';
import api from '../services/api';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

const categoryStyles = {
    'Food & Dining': 'bg-red-500',
    'Transportation': 'bg-blue-500',
    'Healthcare': 'bg-orange-500',
    'Bills & Utilities': 'bg-green-500',
    // Add more categories and colors
    'Default': 'bg-gray-500'
};

const ExpenseItem = ({ expense, onEdit, fetchExpenses }) => {
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      try {
        await api.deleteExpense(expense.id);
        fetchExpenses();
      } catch (error) {
        console.error("Failed to delete expense", error);
      }
    }
  };
  
  const color = categoryStyles[expense.category] || categoryStyles['Default'];

  return (
    <div className="bg-light-card dark:bg-dark-card p-4 rounded-xl shadow-md flex items-center space-x-4">
      <div className={`w-1.5 h-16 rounded-full ${color}`}></div>
      <div className="flex-grow">
        <p className="font-bold">{expense.title}</p>
        <p className="text-sm text-light-subtext dark:text-dark-subtext">{expense.category} · {expense.date}</p>
      </div>
      <div className="text-right">
        <p className="font-bold text-lg">₹{expense.amount.toFixed(2)}</p>
      </div>
      <div className="flex space-x-2">
        <button onClick={() => onEdit(expense)} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full">
            <PencilIcon className="h-5 w-5"/>
        </button>
        <button onClick={handleDelete} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full text-red-500">
            <TrashIcon className="h-5 w-5"/>
        </button>
      </div>
    </div>
  );
};

export default ExpenseItem;