const express = require('express');
const {
  get_all_products,
  add_product,
  update_product,
  delete_product,
  get_product,
  dummy,
  look_up,
} = require('../controllers/product.controller');
const { verify_token } = require('../controllers/authorization.controller');

const product_router = express.Router();

product_router
  .route('/')
  .get(get_all_products)
  .post(
    verify_token,
    (req, res, next) => {
      if (req.user.role === 'merchant') {
        next();
      } else {
        return next(new Error('You are not authorized to perform this action'));
      }
    },
    add_product
  );

product_router.route('/set').post(dummy);
product_router.route('/look_up/:search').get(look_up);

product_router
  .route('/:id')
  .get(get_product)
  .delete(
    verify_token,
    (req, res, next) => {
      if (req.user.role === 'merchant') {
        next();
      } else {
        return next(new Error('You are not authorized to perform this action'));
      }
    },
    delete_product
  )
  .patch(
    verify_token,
    (req, res, next) => {
      if (req.user.role === 'merchant') {
        next();
      } else {
        return next(new Error('You are not authorized to perform this action'));
      }
    },
    update_product
  );

module.exports = product_router;
