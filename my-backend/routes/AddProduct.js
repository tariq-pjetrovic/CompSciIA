const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const authMiddleware = require('../middleware/authMiddleware');
const roleCheck = require('../middleware/roleCheck');

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get product details
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add new product (admin-only)
router.post('/add', authMiddleware, roleCheck(['admin']), async (req, res) => {
  try {
    const { name, description, price, image } = req.body;
    const newProduct = new Product({ name, description, price, image });
    await newProduct.save();
    res.json({ message: 'Product added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
