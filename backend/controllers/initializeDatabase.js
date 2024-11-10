const axios = require('axios');
const Transaction = require('../models/Transaction');

async function fetchAndSeedData() {
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const transactions = response.data;

    // Insert transactions into the database
    await Transaction.insertMany(transactions);
    console.log('Database seeded with transaction data.');
  } catch (error) {
    console.error('Error fetching and seeding data:', error);
  }
}

module.exports = fetchAndSeedData;
