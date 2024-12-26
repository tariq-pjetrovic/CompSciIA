require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const authMiddleware = require('./middleware/authMiddleware'); 
const roleCheck = require('./middleware/roleCheck'); 
const addProductRoutes = require('./routes/AddProduct');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

mongoose
  .connect('mongodb+srv://TCompSciIAUserinfo:Tariq2007!@userinfo.4rzyn.mongodb.net/?retryWrites=true&w=majority&appName=UserInfo', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));


  // Routes
  app.use('/auth', authRoutes);   // All auth endpoints at /auth/*
  console.log(app._router.stack.filter(r => r.route).map(r => r.route.path));
  app.use('/admin', authMiddleware, roleCheck(['admin']), adminRoutes);
  app.get('/test', (req, res) => {
    res.send('Root route works!');
  });
  app.use('/api/products', addProductRoutes);

  console.log(app._router.stack.map(r => r.route && r.route.path));
  console.log(app._router.stack.filter(r => r.route).map(r => r.route.path));
  console.log(app._router.stack.filter(r => r.route).map(r => r.route.path));



const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
