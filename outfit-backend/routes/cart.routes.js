const express = require('express');
const {
  add_to_cart,
  get_cart,
  remove_from_cart,
  clear_cart,
} = require('../controllers/cart.controller');

const { verify_token } = require('../controllers/authorization.controller');

const cart_router = express.Router();

cart_router.use(verify_token);

cart_router.route('/:id').post(add_to_cart).delete(remove_from_cart);
cart_router.route('/').get(get_cart).delete(clear_cart);

module.exports = cart_router;
