const express = require('express');

const { sendOTP, reset_password } = require('../controllers/reset.controller');

const reset_router = express.Router();

reset_router.post('/send_otp', sendOTP);
reset_router.post('/reset_password', reset_password);

module.exports = reset_router;
