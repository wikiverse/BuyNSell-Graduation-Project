const mongoose = require('mongoose');
const Product = require('./product');

const ProductListSchema = new mongoose.Schema({
  products: [Product],
});

module.exports = mongoose.model('ProductList', ProductListSchema);
