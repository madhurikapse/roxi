const express = require('express');
const { listTransactions, getStatistics, getBarChartData, getPieChartData, getCombinedData } = require('../controllers/transactionController');
const fetchAndSeedData = require('../controllers/initializeDatabase');

const router = express.Router();

// Initialize the database
router.get('/initialize', fetchAndSeedData);

// API to list transactions
router.get('/transactions', listTransactions);

// API for statistics
router.get('/statistics', getStatistics);

// API for bar chart
router.get('/bar-chart', getBarChartData);

// API for pie chart
router.get('/pie-chart', getPieChartData);

// API for combined data
router.get('/combined-data', getCombinedData);

module.exports = router;
