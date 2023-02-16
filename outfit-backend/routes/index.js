const express = require('express');
const auth_router = require('./auth.routes');
const product_router = require('./product.routes');

const index_router = express.Router();

index_router.get('/auth', auth_router);
index_router.use('/product', product_router);

module.exports = index_router;
