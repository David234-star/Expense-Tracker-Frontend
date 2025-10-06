import React from 'react';

const StatCard = ({ title, value, icon }) => {
  return (
    <div className="bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-md flex items-center justify-between">
      <div>
        <p className="text-sm text-light-subtext dark:text-dark-subtext">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className="bg-gray-200 dark:bg-gray-700 p-3 rounded-full">
        {icon}
      </div>
    </div>
  );
};

export default StatCard;