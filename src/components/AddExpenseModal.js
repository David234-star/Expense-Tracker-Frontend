import React, { useState, useEffect } from 'react';
import api from '../services/api';

const AddExpenseModal = ({ isOpen, onClose, fetchExpenses, expenseToEdit }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [isRecurring, setIsRecurring] = useState(false);

  useEffect(() => {
    if (expenseToEdit) {
      setTitle(expenseToEdit.title);
      setAmount(expenseToEdit.amount);
      setCategory(expenseToEdit.category);
      setDate(expenseToEdit.date);
      setIsRecurring(expenseToEdit.is_recurring || false);
    } else {
      // Reset form when adding new
      setTitle(''); setAmount(''); setCategory(''); setDate(new Date().toISOString().slice(0, 10)); setIsRecurring(false);
    }
  }, [expenseToEdit, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const expenseData = { title, amount: parseFloat(amount), category, date, is_recurring: isRecurring };
    try {
      if (expenseToEdit) {
        await api.updateExpense(expenseToEdit.id, expenseData);
      } else {
        await api.addExpense(expenseData);
      }
      fetchExpenses();
      onClose();
    } catch (error) {
      console.error("Failed to save expense", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-light-card dark:bg-dark-card p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">{expenseToEdit ? 'Edit Expense' : 'Add New Expense'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 bg-gray-100 dark:bg-gray-700 rounded" required />
          <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full p-2 bg-gray-100 dark:bg-gray-700 rounded" required />
          <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 bg-gray-100 dark:bg-gray-700 rounded" required />
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-2 bg-gray-100 dark:bg-gray-700 rounded" required />
          <div className="flex items-center space-x-3">
            <input 
              type="checkbox" 
              id="recurring" 
              checked={isRecurring} 
              onChange={(e) => setIsRecurring(e.target.checked)}
              className="h-4 w-4 rounded text-primary-blue focus:ring-primary-blue"
            />
            <label htmlFor="recurring" className="font-medium">Recurring Expense</label>
          </div>
          <div className="flex justify-end space-x-4 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-lg">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-primary-blue text-white rounded-lg">{expenseToEdit ? 'Save Changes' : 'Add Expense'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseModal;