const express = require('express');
const order_router = express.Router();
const { get_order } = require('../controllers/orders.controller');

const { verify_token } = require('../controllers/authorization.controller');

order_router.use(verify_token);

order_router.route('/').get(get_order);

order_router.route('/:id').get().patch().delete();

module.exports = order_router;