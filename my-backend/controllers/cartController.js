const User = require('../models/User');

const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user._id;
  
    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      const existingItem = user.cart.find((item) => item.productId.toString() === productId);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        user.cart.push({ productId, quantity });
      }
  
      await user.save();
      res.status(200).json({ message: 'Cart updated successfully', cart: user.cart });
    } catch (error) {
      console.error('Error updating cart:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
};


module.exports = { addToCart };
