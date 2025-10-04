// src/components/ExpenseForm.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';

const ExpenseForm = ({ fetchExpenses, expenseToEdit, setExpenseToEdit }) => {
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
      setIsRecurring(expenseToEdit.is_recurring);
    }
  }, [expenseToEdit]);

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
      handleClear();
    } catch (error) {
      console.error("Failed to save expense", error);
    }
  };

  const handleClear = () => {
    setTitle(''); setAmount(''); setCategory('');
    setDate(new Date().toISOString().slice(0, 10));
    setIsRecurring(false); setExpenseToEdit(null);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-dotted border-coffee">
      <h2 className="text-3xl font-heading text-coffee mb-6">{expenseToEdit ? 'Edit Expense' : 'Add an Expense'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-coffee mb-1">Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-blue" required />
        </div>
        <div>
          <label className="block text-sm font-bold text-coffee mb-1">Amount</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-blue" required />
        </div>
        <div>
          <label className="block text-sm font-bold text-coffee mb-1">Category</label>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-blue" required />
        </div>
        <div>
          <label className="block text-sm font-bold text-coffee mb-1">Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-blue" required />
        </div>
        <div className="flex items-center">
          <input type="checkbox" id="recurring" checked={isRecurring} onChange={(e) => setIsRecurring(e.target.checked)} className="h-4 w-4 rounded text-terracotta focus:ring-terracotta" />
          <label htmlFor="recurring" className="ml-2 font-bold text-coffee">Recurring?</label>
        </div>
        <div className="flex space-x-4 pt-2">
          <button type="submit" className="flex-1 py-2 bg-green-500 text-white font-bold text-lg rounded-full hover:bg-green-600 transition-all shadow-md">
            {expenseToEdit ? 'Update' : 'Add'}
          </button>
          <button type="button" onClick={handleClear} className="flex-1 py-2 bg-slate-500 text-white font-bold text-lg rounded-full hover:bg-slate-600 transition-all shadow-md">
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;