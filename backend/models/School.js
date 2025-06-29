const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter school name'],
    unique: true,
  },
  address: {
    type: String,
    required: [true, 'Please enter school address'],
  },
  phone: {
    type: String,
    required: [true, 'Please enter school phone number'],
  },
  admin: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('School', schoolSchema);