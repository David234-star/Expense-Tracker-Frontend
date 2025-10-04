// src/components/ExpenseList.js
import React from 'react';
import api from '../services/api';

const ExpenseList = ({ expenses, fetchExpenses, setExpenseToEdit }) => {
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      try {
        await api.deleteExpense(id);
        fetchExpenses();
      } catch (error) {
        console.error("Failed to delete expense", error);
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-dotted border-coffee">
      <h2 className="text-3xl font-heading text-coffee mb-6">Transaction Log</h2>
      <div className="overflow-auto max-h-[30rem]">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b-2 border-coffee">
              <th className="p-3 font-bold">Title</th>
              <th className="p-3 font-bold">Amount</th>
              <th className="p-3 font-bold">Category</th>
              <th className="p-3 font-bold">Date</th>
              <th className="p-3 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={expense.id} className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-stone-50' : 'bg-white'}`}>
                <td className="p-3">{expense.title}</td>
                <td className="p-3">${expense.amount.toFixed(2)}</td>
                <td className="p-3">{expense.category}</td>
                <td className="p-3">{expense.date}</td>
                <td className="p-3 text-right space-x-3">
                  <button onClick={() => setExpenseToEdit(expense)} className="font-bold text-blue-500 hover:underline">Edit</button>
                  <button onClick={() => handleDelete(expense.id)} className="font-bold text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {expenses.length === 0 && <p className="text-center text-gray-500 py-8">No transactions yet. Add one to get started!</p>}
      </div>
    </div>
  );
};

export default ExpenseList;