const express = require('express');
const {
  get_all_products,
  add_product,
  update_product,
  delete_product,
  get_product,
} = require('../controllers/product.controller');
const { verify_token } = require('../controllers/authorization.controller');

const product_router = express.Router();

// product_router.use(verify_token);

product_router.route('/').get(get_all_products).post(add_product);

product_router
  .route('/:id')
  .get(get_product)
  .delete(delete_product)
  .patch(update_product);

module.exports = product_router;
