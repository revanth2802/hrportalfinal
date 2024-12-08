import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const DepartmentDistributionChart = ({ distributionData }) => {
  // Check if data is available and valid
  if (!distributionData || !Array.isArray(distributionData.data)) {
    return <div>Data is currently unavailable</div>;
  }

  // Prepare chart data by transforming the input structure
  const chartData = distributionData.data.map(department => ({
    name: department.dept_name, // Reflects department names
    count: department.employee_count, // Reflects the employee count per department
  }));

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DepartmentDistributionChart;
