import React from 'react';
import { PieChart, Pie, Tooltip } from 'recharts';
import { ResponsiveContainer } from 'recharts';

const GenderDistributionChart = ({ genderData }) => {
  if (!genderData || !genderData.data) {
    return <div>No data available</div>;
  }

  const chartData = Object.keys(genderData.data).map(key => ({
    name: key,
    value: genderData.data[key],
  }));

  return (
    <ResponsiveContainer width="100%" height={280}>
        <PieChart>
            <Pie
                dataKey="value"
                isAnimationActive={false}
                data={chartData}
                cx="50%"  // Center the pie in the container
                cy="50%"  // Center the pie in the container
                outerRadius={80}
                fill="#82ca9d"
                label
            />
            <Tooltip />
        </PieChart>
    </ResponsiveContainer>
);
};

export default GenderDistributionChart;
