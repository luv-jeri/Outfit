const express = require('express');
const { sign_up, sign_in } = require('../controllers/authentication.controller');
const { who_am_i } = require('../controllers/authorization.controller');
const auth_router = express.Router();

auth_router.post('/sign_up', sign_up);
auth_router.post('/sign_in', sign_in);
auth_router.get('/who_am_i', who_am_i);
auth_router.post('/forget_password');
auth_router.post('/reset_password');

module.exports = auth_router;
