// src/components/Analytics.js
import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const Analytics = ({ expenses }) => {
  // A consistent color palette for both charts
  const chartColors = ['#4fc3f7', '#e57373', '#fff176', '#81c784', '#ffb74d', '#ba68c8'];
  
  // --- Process data ONCE for both charts ---
  // This aggregates total spending for each unique category.
  const categoryData = expenses.reduce((acc, expense) => {
    const category = expense.category || 'Uncategorized'; // Handle empty categories
    acc[category] = (acc[category] || 0) + expense.amount;
    return acc;
  }, {});
  
  const totalExpenses = Object.values(categoryData).reduce((sum, val) => sum + val, 0);
  const categoryLabels = Object.keys(categoryData);
  const categoryValues = Object.values(categoryData);

  // --- Data for the Bar Chart (NEW) ---
  const barChartData = {
    labels: categoryLabels, // The X-axis will now be the category names
    datasets: [{
      data: categoryValues, // The height of each bar is the total amount for that category
      backgroundColor: chartColors, // Apply multiple colors, one for each bar
      borderRadius: 5,
    }],
  };

  // --- Data for the Doughnut Chart (Unchanged) ---
  const doughnutChartData = {
    labels: categoryLabels,
    datasets: [{
      data: categoryValues,
      backgroundColor: chartColors,
      borderColor: document.body.classList.contains('dark') ? '#2d3748' : '#ffffff',
      borderWidth: 4,
    }],
  };
  
  // --- Common Options for both charts ---
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: { 
        display: true, 
        color: document.body.classList.contains('dark') ? '#edf2f7' : '#4a2c2a', 
        font: { size: 18, family: 'Fredoka One' } 
      },
    },
  };
  
  // --- Specific options for the Bar Chart ---
  const barOptions = {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
      legend: {
        display: false // Hide the legend since the x-axis already shows category names
      },
      title: {
        ...commonOptions.plugins.title,
        text: 'Spending by Category'
      }
    },
    scales: {
      y: { grid: { color: document.body.classList.contains('dark') ? '#4a5568' : '#e0e0e0' }, ticks: { color: document.body.classList.contains('dark') ? '#a0aec0' : '#4a2c2a' } },
      x: { grid: { display: false }, ticks: { color: document.body.classList.contains('dark') ? '#a0aec0' : '#4a2c2a' } }
    }
  };

  // --- Specific options for the Doughnut Chart ---
  const doughnutOptions = {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
      legend: { 
        position: 'bottom', 
        labels: { fontFamily: 'Nunito', color: document.body.classList.contains('dark') ? '#edf2f7' : '#4a2c2a' } 
      },
      title: {
        ...commonOptions.plugins.title,
        text: 'Category Breakdown'
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const percentage = totalExpenses > 0 ? ((value / totalExpenses) * 100).toFixed(1) : 0;
            return `${label}: $${value.toFixed(2)} (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <div className="bg-white dark:bg-dark-card p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 transition-colors">
      <h2 className="text-3xl font-heading text-coffee dark:text-dark-text mb-6 text-center">Expense Analytics</h2>
      
      {expenses.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-dark-subtext py-16">
          Add some expenses to see your analytics!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Bar Chart Container */}
          <div className="relative h-80">
            <Bar options={barOptions} data={barChartData} />
          </div>
          {/* Doughnut Chart Container */}
          <div className="relative h-80">
            <Doughnut options={doughnutOptions} data={doughnutChartData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;