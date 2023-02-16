const { model } = require('mongoose');

const productSchema = require('../schemas/product.schema');

const Product = model('Product', productSchema);

module.exports = Product;
