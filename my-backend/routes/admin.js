const express = require('express');
const router = express.Router();
const roleCheck = require('../middleware/roleCheck');

// Dummy Sales Analytics Endpoint
router.get('/analytics/sales', roleCheck(['admin', 'dev']), (req, res) => {
  // For now, we return dummy data.
  const dummyAnalytics = {
    totalSales: 5000,
    ordersToday: 12,
    topSellingProduct: "Widget A",
    monthlySales: [
      { month: "January", sales: 4000 },
      { month: "February", sales: 4500 },
      { month: "March", sales: 5000 },
    ],
    salesByCategory: {
      electronics: 2000,
      apparel: 1500,
      home: 1500,
    },
  };
  res.json(dummyAnalytics);
});

// Dummy Orders Endpoint
router.get('/orders', roleCheck(['admin', 'dev']), (req, res) => {
  const dummyOrders = [
    { orderId: 1, product: "Widget A", amount: 29.99, date: "2025-02-19" },
    { orderId: 2, product: "Widget B", amount: 39.99, date: "2025-02-19" },
  ];
  res.json(dummyOrders);
});

module.exports = router;