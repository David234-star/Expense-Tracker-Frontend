import React, { useMemo } from 'react';
import StatCard from '../components/StatCard';
import { BanknotesIcon, CalendarDaysIcon, ChartBarIcon, TagIcon } from '@heroicons/react/24/outline';

const DashboardView = ({ expenses }) => {
  const stats = useMemo(() => {
    const total = expenses.reduce((sum, ex) => sum + ex.amount, 0);
    
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const thisMonthExpenses = expenses.filter(ex => {
        const exDate = new Date(ex.date);
        return exDate.getMonth() === currentMonth && exDate.getFullYear() === currentYear;
    });
    const thisMonthCount = thisMonthExpenses.length;
    
    const average = expenses.length > 0 ? total / expenses.length : 0;
    const categories = new Set(expenses.map(ex => ex.category)).size;

    return { total, thisMonthCount, average, categories };
  }, [expenses]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Expenses"
        value={`₹${stats.total.toFixed(2)}`}
        icon={<BanknotesIcon className="h-8 w-8 text-green-500" />}
      />
      <StatCard
        title="This Month"
        value={stats.thisMonthCount}
        icon={<CalendarDaysIcon className="h-8 w-8 text-blue-500" />}
      />
      <StatCard
        title="Average"
        value={`₹${stats.average.toFixed(2)}`}
        icon={<ChartBarIcon className="h-8 w-8 text-yellow-500" />}
      />
      <StatCard
        title="Categories"
        value={stats.categories}
        icon={<TagIcon className="h-8 w-8 text-purple-500" />}
      />
    </div>
  );
};

export default DashboardView;