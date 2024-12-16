const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/authMiddleware');
const roleCheck = require('./middleware/roleCheck');
const adminRoutes = require('./routes/admin');

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
  .catch(err => console.error(err));


  // Routes
app.use('/auth', authRoutes);   // All auth endpoints at /auth/*
app.use('/admin', authMiddleware, roleCheck(['admin']), adminRoutes);


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
