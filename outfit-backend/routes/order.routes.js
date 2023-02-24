const express = require('express');
const order_router = express.Router();

const { verify_token } = require('../controllers/authorization.controller');

order_router.use(verify_token);

order_router
  .route('/')
  .get()
  .post((req, res, next) => {});

order_router.route('/:id').get().patch().delete();
