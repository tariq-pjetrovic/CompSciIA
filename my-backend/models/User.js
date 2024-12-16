const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'dev', 'customer'],
    default: 'customer' 
  }

});

module.exports = mongoose.model('User', UserSchema);
