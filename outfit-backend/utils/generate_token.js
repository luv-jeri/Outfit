const jwt = require("jsonwebtoken");

const generate_token = (user) => {
  const token = jwt.sign({ ...user }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};

module.exports = generate_token;
