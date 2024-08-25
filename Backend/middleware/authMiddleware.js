const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');

const protect = async (req, res, next) => {
    
  
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
        const token = req.body.token;
        console.log(token)

    
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(decoded)
        // req.user = await UserModel.findById(decoded.id);
        next();
      } catch (error) {
        console.log(error)
        res.status(401).json({ message: 'Not authorized, token failed' });
      }
    } else {
      res.status(401).json({ message: 'Not authorized, no token' });
    }
  };

module.exports = { protect };
