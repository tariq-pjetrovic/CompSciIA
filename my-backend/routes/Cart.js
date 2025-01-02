const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');
const { addToCart } = require('../controllers/cartController');

// Get cart for logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add item to cart
router.post('/', authMiddleware, async (req, res) => {
  const { product, quantity } = req.body; // Expect full product details from frontend
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const existingItem = user.cart.find((item) => item.product.productId.toString() === product.productId);

    if (existingItem) {
      // Update quantity if the product already exists in the cart
      existingItem.quantity += quantity;
    } else {
      // Add new item with full product details
      user.cart.push({ product, quantity });
    }

    await user.save();
    res.status(200).json(user.cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Remove item from cart
router.delete('/:productId', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    console.log('prodid: ', req.params.productId)
    const productId = req.params.productId; // Get productId from URL
    user.cart = user.cart.filter((item) => item.product.toString() !== productId); // Match by `product` field
    await user.save();

    res.json(user.cart); // Respond with updated cart
  } catch (error) {
    console.error('Error in DELETE /api/cart/:productId:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;