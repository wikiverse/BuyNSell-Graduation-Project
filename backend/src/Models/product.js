const mongoose = require('mongoose');
const User = require('./user');

const ProductSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  imageUrl: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
  },
  price: {
    type: Number,
  },
  date: {
    type: Date,
  },
  isNegotiable: {
    type: Boolean,
  },
});

module.exports = mongoose.model('Product', ProductSchema);