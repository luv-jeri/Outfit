const User = require('../database/models/user.model');
const bcrypt = require('bcryptjs');
const generate_token = require('../utils/generate_token');

module.exports.sign_up = async (req, res, next) => {
  try {
    const { email, password, confirmPassword, name, role, details, photo } = req.body;

    if (password !== confirmPassword) {
      return next(new Error('Password and confirm password do not match'));
    }

    const en_password = await bcrypt.hash(password, 12);

    const new_user = await User.create({
      email,
      password: en_password,
      name,
      role,
      photo,
      details,
    });

    const token = generate_token(new_user._doc);

    res.status(201).json({
      status: 'success',
      token,
      mesaage: 'User created successfully',
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

module.exports.sign_in = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(new Error('User does not exist'));
    }

    const is_correct = await bcrypt.compare(password, user.password);

    if (!is_correct) {
      return next(new Error('Password is incorrect'));
    }

    const token = generate_token(user);

    res.status(201).json({
      status: 'success',
      token,
      mesaage: 'User logged in successfully',
    });
  } catch (e) {
    next(e);
  }
};
