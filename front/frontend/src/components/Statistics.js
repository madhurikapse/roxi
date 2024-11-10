import React, { useEffect, useState } from 'react';
import { getStatistics } from '../api/transactionApi';

const Statistics = ({ month }) => {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStatistics = async () => {
      setLoading(true);
      try {
        const data = await getStatistics(month);
        setStatistics(data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, [month]);

  return (
    <div>
      <h3>Statistics for {month}</h3>
      {loading ? (
        <p>Loading...</p>
      ) : statistics ? (
        <div>
          <p>Total Sale Amount: ${statistics.totalAmount}</p>
          <p>Total Sold Items: {statistics.soldItems}</p>
          <p>Total Not Sold Items: {statistics.notSoldItems}</p>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default Statistics;
