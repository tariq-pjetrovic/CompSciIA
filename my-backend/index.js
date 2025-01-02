require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const cartRoutes = require('./routes/Cart');//maybe need this later
const wishlistRoutes = require('./routes/Wishlist');
const authMiddleware = require('./middleware/authMiddleware'); 
const roleCheck = require('./middleware/roleCheck'); 
const addProductRoutes = require('./routes/AddProduct');
const paymentRoutes = require('./routes/payment');
const stripe = require('stripe')('sk_test_51Qb3ZsLLIhJNNpeLUlTVOuhhdpfu42YizSAawf3x2V7LnhHWnp4KOgXaA34X2SMCWprkhB4gPQF6VrWaaJ4gySQi00JdVWI943');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

mongoose
  .connect('mongodb+srv://TCompSciIAUserinfo:Tariq2007!@userinfo.4rzyn.mongodb.net/?retryWrites=true&w=majority&appName=UserInfo')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

  // Routes
  app.use('/auth', authRoutes);
  console.log(app._router.stack.filter(r => r.route).map(r => r.route.path));
  app.use('/admin', authMiddleware, roleCheck(['admin']), adminRoutes);
  app.get('/test', (req, res) => {
    res.send('Root route works!');
  });
  app.use('/api/products', addProductRoutes);
  app.use('/api/cart', require('./routes/Cart'));
  app.use('/api/wishlist', require('./routes/Wishlist'));
  app.use('/api/payment', paymentRoutes);

  console.log(app._router.stack.map(r => r.route && r.route.path));
  console.log(app._router.stack.filter(r => r.route).map(r => r.route.path));
  console.log(app._router.stack.filter(r => r.route).map(r => r.route.path));



const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});