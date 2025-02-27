const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');
const ProductInfo = require('../models/ProductInfo');

// Get wishlist for logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('wishlist');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.wishlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add item to wishlist
router.post('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { productId } = req.body;
    const product = await ProductInfo.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (!user.wishlist.includes(productId)) {
      user.wishlist.push(productId);
    }

    await user.save();
    await user.populate('wishlist');
    res.json(user.wishlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove item from wishlist
router.delete('/:productId', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.wishlist = user.wishlist.filter(
      (item) => item.toString() !== req.params.productId
    );
    await user.save();
    await user.populate('wishlist');
    res.json(user.wishlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;