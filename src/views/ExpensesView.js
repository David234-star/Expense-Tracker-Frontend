import React, { useState, useMemo } from 'react';
import ExpenseItem from '../components/ExpenseItem';

const ExpensesView = ({ expenses, onEdit, fetchExpenses }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => ['All', ...new Set(expenses.map(ex => ex.category))], [expenses]);

  const filteredExpenses = useMemo(() => {
    return expenses.filter(expense => {
      const matchesCategory = selectedCategory === 'All' || expense.category === selectedCategory;
      const matchesSearch = expense.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [expenses, searchTerm, selectedCategory]);

  return (
    <div>
      {/* Filters */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search expenses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 p-2 rounded-lg bg-light-card dark:bg-dark-card border border-gray-300 dark:border-gray-600"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 rounded-lg bg-light-card dark:bg-dark-card border border-gray-300 dark:border-gray-600"
        >
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>

      {/* Expense List */}
      <div className="space-y-4">
        {filteredExpenses.map(expense => (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            onEdit={onEdit}
            fetchExpenses={fetchExpenses}
          />
        ))}
        {filteredExpenses.length === 0 && <p className="text-center text-light-subtext dark:text-dark-subtext">No expenses found.</p>}
      </div>
    </div>
  );
};

export default ExpensesView;