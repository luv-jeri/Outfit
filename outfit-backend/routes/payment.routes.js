const express = require('express');
const {
  create_razor_pay_order,
  verify_razor_pay_payment,
} = require('../controllers/payment.controller');

const { verify_token } = require('../controllers/authorization.controller');

const payment_router = express.Router();

// payment_router.use(verify_token);

payment_router.route('/').post(create_razor_pay_order);
payment_router.route('/verify').post(verify_razor_pay_payment);

module.exports = payment_router;
