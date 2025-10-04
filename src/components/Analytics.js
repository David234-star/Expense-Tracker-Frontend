// src/components/Analytics.js
import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const Analytics = ({ expenses }) => {
  const chartColors = ['#4fc3f7', '#e57373', '#fff176', '#81c784', '#ffb74d', '#ba68c8'];

  // --- Data for Doughnut Chart ---
  const categoryData = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});
  const totalExpenses = Object.values(categoryData).reduce((sum, val) => sum + val, 0);

  const doughnutChartData = {
    labels: Object.keys(categoryData),
    datasets: [{
      data: Object.values(categoryData),
      backgroundColor: chartColors,
      borderColor: document.body.classList.contains('dark') ? '#2d3748' : '#ffffff', // Dynamic border for themes
      borderWidth: 4,
    }],
  };
  
  // --- Data for Bar Chart ---
  const monthlyData = expenses.reduce((acc, expense) => {
    const month = new Date(expense.date).toLocaleString('default', { month: 'short', year: '2-digit' });
    acc[month] = (acc[month] || 0) + expense.amount;
    return acc;
  }, {});

  const barChartData = {
    labels: Object.keys(monthlyData).sort((a,b) => new Date(a) - new Date(b)),
    datasets: [{
      label: 'Total Spent',
      data: Object.values(monthlyData),
      backgroundColor: chartColors, // Use multiple colors for bars
      borderRadius: 5,
    }],
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { fontFamily: 'Nunito', color: document.body.classList.contains('dark') ? '#edf2f7' : '#4a2c2a' } },
      title: { display: true, color: document.body.classList.contains('dark') ? '#edf2f7' : '#4a2c2a', font: { size: 18, family: 'Fredoka One' } },
    },
  };

  // --- Specific options for Doughnut chart ---
  const doughnutOptions = {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
      tooltip: { // Interactive popup customization
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const percentage = ((value / totalExpenses) * 100).toFixed(1);
            return `${label}: $${value.toFixed(2)} (${percentage}%)`;
          }
        }
      }
    }
  };

  // --- Specific options for Bar chart ---
  const barOptions = {
    ...commonOptions,
    scales: { // Styles for the axes on the bar chart
        y: { grid: { color: document.body.classList.contains('dark') ? '#4a5568' : '#e0e0e0' }, ticks: { color: document.body.classList.contains('dark') ? '#a0aec0' : '#4a2c2a' } },
        x: { grid: { display: false }, ticks: { color: document.body.classList.contains('dark') ? '#a0aec0' : '#4a2c2a' } }
    }
  };

  return (
    <div className="bg-white dark:bg-dark-card p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 transition-colors">
      <h2 className="text-3xl font-heading text-coffee dark:text-dark-text mb-6 text-center">Your Spending Analytics</h2>
      
      {expenses.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-dark-subtext py-16">
          Add some expenses to see your analytics!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative h-80">
            <Bar options={barOptions} data={barChartData} />
          </div>
          <div className="relative h-80">
            <Doughnut options={doughnutOptions} data={doughnutChartData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;