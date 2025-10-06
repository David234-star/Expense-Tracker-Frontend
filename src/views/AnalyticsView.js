import React, { useMemo } from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Title, Tooltip, Legend);

const AnalyticsView = ({ expenses }) => {
  const chartData = useMemo(() => {
    const categoryTotals = expenses.reduce((acc, ex) => {
        acc[ex.category] = (acc[ex.category] || 0) + ex.amount;
        return acc;
    }, {});
    
    const spendingTrend = expenses
        .sort((a,b) => new Date(a.date) - new Date(b.date))
        .map(ex => ({ x: ex.date, y: ex.amount }));

    const categoryLabels = Object.keys(categoryTotals);
    const categoryValues = Object.values(categoryTotals);

    const colors = ['#ef4444', '#3b82f6', '#f97316', '#22c55e', '#eab308', '#8b5cf6'];
    
    return {
        pieBarData: {
            labels: categoryLabels,
            datasets: [{
                data: categoryValues,
                backgroundColor: colors,
                borderColor: '#1f2937',
                borderWidth: 2,
            }]
        },
        lineData: {
            datasets: [{
                label: 'Spending',
                data: spendingTrend,
                borderColor: '#3b82f6',
                tension: 0.1
            }]
        },
        detailedBreakdown: categoryLabels.map(label => ({
            category: label,
            amount: categoryTotals[label],
            count: expenses.filter(ex => ex.category === label).length
        })).sort((a,b) => b.amount - a.amount)
    };
  }, [expenses]);
  
  const totalExpenses = expenses.reduce((sum, ex) => sum + ex.amount, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Pie & Bar Charts */}
      <div className="bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-md">
        <h3 className="font-bold mb-4">Spending by Category</h3>
        <div className="h-64"><Doughnut data={chartData.pieBarData} options={{ maintainAspectRatio: false }}/></div>
      </div>
      <div className="bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-md">
        <h3 className="font-bold mb-4">Category Totals</h3>
        <div className="h-64"><Bar data={chartData.pieBarData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }}/></div>
      </div>
      
      {/* Spending Trend */}
      <div className="lg:col-span-2 bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-md">
        <h3 className="font-bold mb-4">Spending Trend</h3>
        <div className="h-80"><Line data={chartData.lineData} options={{ maintainAspectRatio: false }}/></div>
      </div>

      {/* Detailed Breakdown */}
      <div className="lg:col-span-2 bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-md">
        <h3 className="font-bold mb-4">Detailed Breakdown</h3>
        <div className="space-y-4">
            {chartData.detailedBreakdown.map(item => (
                <div key={item.category} className="flex justify-between items-center">
                    <div>
                        <p className="font-bold">{item.category}</p>
                        <p className="text-sm text-light-subtext dark:text-dark-subtext">{item.count} transactions</p>
                    </div>
                    <div className="text-right">
                        <p className="font-bold">${item.amount.toFixed(2)}</p>
                        <p className="text-sm text-light-subtext dark:text-dark-subtext">
                            {((item.amount / totalExpenses) * 100).toFixed(1)}%
                        </p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;