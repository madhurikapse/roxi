const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const transactionRoutes = require('./routes/transactionRoutes');

dotenv.config();
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api', transactionRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
