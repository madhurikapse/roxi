const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  dateOfSale: Date,
  category: String,
  quantity: Number,
  status: { type: String, enum: ['sold', 'not sold'], default: 'not sold' },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
