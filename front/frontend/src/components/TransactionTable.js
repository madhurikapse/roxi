import React, { useState, useEffect } from 'react';
import { getTransactions } from '../api/transactionApi';

const TransactionTable = ({ month }) => {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch transactions when the component mounts or when page, search, or month changes
  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const data = await getTransactions(month, page, perPage, search);
        setTransactions(data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [month, page, search, perPage]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to page 1 on search change
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div>
      <h2>Transactions for {month}</h2>
      
      {/* Search Box */}
      <input 
        type="text" 
        placeholder="Search by title, description, or price"
        value={search}
        onChange={handleSearchChange}
      />

      {/* Transaction Table */}
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Status</th>
            <th>Date of Sale</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan="6">Loading...</td></tr>
          ) : transactions.length === 0 ? (
            <tr><td colSpan="6">No transactions found</td></tr>
          ) : (
            transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.title}</td>
                <td>{transaction.description}</td>
                <td>${transaction.price}</td>
                <td>{transaction.category}</td>
                <td>{transaction.status}</td>
                <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div>
        <button onClick={handlePrevPage} disabled={page === 1}>
          Previous
        </button>
        <button onClick={handleNextPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionTable;
