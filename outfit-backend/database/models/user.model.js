const userSchema = require('../schemas/user.schema');
const { model } = require('mongoose');

const User = model('User', userSchema);

module.exports = User;
