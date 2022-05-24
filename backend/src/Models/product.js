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
  isNegotiable: {
    type: Boolean,
  },
  isSold: {
    type: Boolean,
  },
  interest: {
    type: String,
  },
  views: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Product', ProductSchema);
