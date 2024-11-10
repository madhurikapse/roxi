import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getBarChartData } from '../api/transactionApi';
import "./barchart.css"
const BarChart = ({ month }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchBarChartData = async () => {
      try {
        const data = await getBarChartData(month);
        setChartData(data);
      } catch (error) {
        console.error('Error fetching bar chart data:', error);
      }
    };

    fetchBarChartData();
  }, [month]);

  return (
    <div>
      <h3>Price Range vs Number of Items</h3>
      {chartData ? (
        <Bar
          data={{
            labels: chartData.priceRanges,
            datasets: [{
              label: 'Number of Items',
              data: chartData.itemCounts,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
            }],
          }}
          options={{
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

export default BarChart;
