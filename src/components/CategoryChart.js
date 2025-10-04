
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryChart = ({ expenses }) => {
  // Process data for the chart
  const categoryData = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        label: 'Expenses by Category',
        data: Object.values(categoryData),
        backgroundColor: [
          '#f0f', // neon-pink
          '#0ff', // neon-cyan
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
        borderColor: '#0d0c1d', // dark-blue
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#d1d5db' // light-gray
        }
      },
      title: {
        display: true,
        text: 'Spending by Category',
        color: '#d1d5db',
        font: {
          size: 18,
          family: '"Roboto Mono", monospace'
        }
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default CategoryChart;