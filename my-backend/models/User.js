const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  role: { type: String, enum: ['admin', 'dev', 'customer'], default: 'customer' },
  cart: [
    {
      product: {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductInfo', required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true },
      },
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProductInfo' }],
});

module.exports = mongoose.model('User', UserSchema);
