const Transaction = require("../models/Transaction.js");


// List transactions with pagination and search
async function listTransactions(req, res) {
  const { page = 1, perPage = 10, search = '', month } = req.query;
  const query = {
    $and: [
      {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { price: { $regex: search, $options: 'i' } },
        ],
      },
      {
        $expr: { $eq: [{ $month: "$dateOfSale" }, parseInt(month)] },
      },
    ],
  };

  try {
    const transactions = await Transaction.find(query)
      .skip((page - 1) * perPage)
      .limit(parseInt(perPage));
    res.json(transactions);
  } catch (error) {
    res.status(500).send('Error fetching transactions');
  }
}

// Statistics for the selected month
async function getStatistics(req, res) {
  const { month } = req.query;

  // Total sale amount
  const totalSaleAmount = await Transaction.aggregate([
    { $match: { $expr: { $eq: [{ $month: "$dateOfSale" }, parseInt(month)] } } },
    { $group: { _id: null, total: { $sum: { $multiply: ["$price", "$quantity"] } } } },
  ]);

  // Total sold items
  const totalSoldItems = await Transaction.aggregate([
    { $match: { $expr: { $eq: [{ $month: "$dateOfSale" }, parseInt(month)] } }, status: 'sold' },
    { $group: { _id: null, total: { $sum: "$quantity" } } },
  ]);

  // Total not sold items
  const totalNotSoldItems = await Transaction.aggregate([
    { $match: { $expr: { $eq: [{ $month: "$dateOfSale" }, parseInt(month)] } }, status: 'not sold' },
    { $group: { _id: null, total: { $sum: "$quantity" } } },
  ]);

  res.json({
    totalSaleAmount: totalSaleAmount[0]?.total || 0,
    totalSoldItems: totalSoldItems[0]?.total || 0,
    totalNotSoldItems: totalNotSoldItems[0]?.total || 0,
  });
}

// Bar chart data for price ranges
async function getBarChartData(req, res) {
  const { month } = req.query;

  const priceRanges = [
    { min: 0, max: 100 },
    { min: 101, max: 200 },
    { min: 201, max: 300 },
    { min: 301, max: 400 },
    { min: 401, max: 500 },
    { min: 501, max: 600 },
    { min: 601, max: 700 },
    { min: 701, max: 800 },
    { min: 801, max: 900 },
    { min: 901, max: Infinity },
  ];

  try {
    const rangesData = await Promise.all(
      priceRanges.map(async (range) => {
        const count = await Transaction.countDocuments({
          $expr: { $eq: [{ $month: "$dateOfSale" }, parseInt(month)] },
          price: { $gte: range.min, $lte: range.max },
        });
        return { range: `${range.min} - ${range.max}`, count };
      })
    );

    res.json(rangesData);
  } catch (error) {
    res.status(500).send('Error fetching bar chart data');
  }
}

// Pie chart data for category count
async function getPieChartData(req, res) {
  const { month } = req.query;

  try {
    const categoryData = await Transaction.aggregate([
      { $match: { $expr: { $eq: [{ $month: "$dateOfSale" }, parseInt(month)] } } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);

    res.json(categoryData);
  } catch (error) {
    res.status(500).send('Error fetching pie chart data');
  }
}

// Combined data for statistics, bar chart, and pie chart
async function getCombinedData(req, res) {
  const { month } = req.query;

  try {
    const [statistics, barChartData, pieChartData] = await Promise.all([
      getStatistics(req, res),
      getBarChartData(req, res),
      getPieChartData(req, res),
    ]);

    res.json({ statistics, barChartData, pieChartData });
  } catch (error) {
    res.status(500).send('Error fetching combined data');
  }
}

module.exports = {
  listTransactions,
  getStatistics,
  getBarChartData,
  getPieChartData,
  getCombinedData,
};
