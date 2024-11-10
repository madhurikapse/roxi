import React, { useState } from 'react';
import TransactionTable from './components/TransactionTable';
import Statistics from './components/Statistics';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';
import MonthSelector from './components/MonthSelector';

const App = () => {
  const [selectedMonth, setSelectedMonth] = useState('March');

  return (
    <div>
      <h1>Transaction Dashboard</h1>
      <MonthSelector selectedMonth={selectedMonth} onMonthChange={setSelectedMonth} />
      
      <TransactionTable month={selectedMonth} />
      <Statistics month={selectedMonth} />
      <BarChart month={selectedMonth} />
      <PieChart month={selectedMonth} />
    </div>
  );
};

export default App;
