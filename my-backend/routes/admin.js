const express = require('express');
const router = express.Router();
const roleCheck = require('../middleware/roleCheck');

// This route is only for admin or dev
router.get('/admin-dashboard', roleCheck(['admin', 'dev']), (req, res) => {
  res.json({ data: 'Super secret admin/dev data!' });
});

module.exports = router;
