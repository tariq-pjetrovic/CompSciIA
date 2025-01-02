const User = require('../models/User');

const toggleWishlist = async (req, res) => {
    const { productId } = req.body;
    const userId = req.user._id;
  
    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      const isInWishlist = user.wishlist.some((item) => item.toString() === productId);
  
      if (isInWishlist) {
        user.wishlist = user.wishlist.filter((item) => item.toString() !== productId);
      } else {
        user.wishlist.push(productId);
      }
  
      await user.save();
      res.status(200).json({ message: 'Wishlist updated successfully', wishlist: user.wishlist });
    } catch (error) {
      console.error('Error updating wishlist:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { toggleWishlist };