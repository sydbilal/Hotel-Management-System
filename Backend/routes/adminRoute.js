// // adminRoute.js (Example of protected admin route)
// const express = require('express');
// const { protect } = require('../middleware/authMiddleware');

// const router = express.Router();

// router.use(protect); // Apply the protect middleware to all routes

// router.get('/adminroute', (req, res) => {
//   if (req.user.role !== 'admin' && req.user.role !== 'superadmin') {
//     return res.status(403).json({ message: 'Forbidden' });
//   }
  
//   res.json({ message: 'Welcome to the admin route' });
// });

// // Admin login route
// router.post('/adminlogin', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//       if (!email || !password) {
//           return res.status(400).json({ message: 'Email and password are required' });
//       }

//       const user = await UserModel.findOne({ email }).select('+password');
//       if (!user || (user.role !== 'admin' && user.role !== 'superadmin')) {
//           return res.status(401).json({ message: 'Not authorized' });
//       }

//       const isPasswordMatched = await bcrypt.compare(password, user.password);
//       if (!isPasswordMatched) {
//           return res.status(401).json({ message: 'Invalid email or password' });
//       }

//       res.json({
//           _id: user._id,
//           name: user.name,
//           email: user.email,
//           role: user.role,
//           token: generateToken(user._id),
//       });
//   } catch (error) {
//       console.error('Error during admin login:', error);
//       res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;
