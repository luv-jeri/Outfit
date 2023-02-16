const User = require('../database/models/user.model');
const jwt = require('jsonwebtoken');

module.exports.verify_token = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return next(new Error('You are not logged in'));
    }

    const decoded = jwt.verify(authorization, process.env.JWT_SECRET);

    if (!decoded) {
      return next(new Error('Invalid token'));
    }

    const user = await User.findById(decoded._id);

    if (!user) {
      return next(new Error('User does not exist'));
    }

    req.user = user;

    next();
  } catch (e) {
    next(e);
  }
};

module.exports.who_am_i = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return next(new Error('You are not logged in'));
    }

    const decoded = jwt.verify(authorization, process.env.JWT_SECRET);

    if (!decoded) {
      return next(new Error('Invalid token'));
    }

    const user = await User.findById(decoded._id);

    if (!user) {
      return next(new Error('User does not exist'));
    }

    res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (e) {
    next(e);
  }
};
