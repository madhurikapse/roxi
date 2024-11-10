import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { getPieChartData } from '../api/transactionApi';

const PieChart = ({ month }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchPieChartData = async () => {
      try {
        const data = await getPieChartData(month);
        setChartData(data);
      } catch (error) {
        console.error('Error fetching pie chart data:', error);
      }
    };

    fetchPieChartData();
  }, [month]);

  return (
    <div>
      <h3>Category Distribution</h3>
      {chartData ? (
        <Pie
          data={{
            labels: chartData.categories,
            datasets: [{
              data: chartData.itemCounts,
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF5733'],
            }],
          }}
        />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

export default PieChart;
