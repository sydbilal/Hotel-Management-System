const jwt = require('jsonwebtoken');
require('dotenv').config();


const generateToken = (userId) => {
  // Ensure this key is set in environment variables
  const secretKey = process.env.JWT_SECRET_KEY;

  if (!secretKey) {
    throw new Error('JWT_SECRET_KEY is not set');
  }

  return jwt.sign({ id: userId }, secretKey, {
    expiresIn: '30d', // Example expiration time
  });
};

module.exports = generateToken;
