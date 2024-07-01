const express = require('express');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');
const UserModel = require('../models/user');

const router = express.Router();

// Middleware to parse JSON bodies
router.use(express.json()); // Ensure this is in place

// Register a new user
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const userExists = await UserModel.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new UserModel({
            name,
            email,
            password,
        });

        // Hash the password before saving
        // const salt = await bcrypt.genSalt(10);
        // user.password = await bcrypt.hash(password, salt);

        await user.save();

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } catch (error) {
        console.error('Error during registration:', error); // Improved logging
        res.status(500).json({ message: 'Server error' }); // Changed to 500
    }
});

// Authenticate user and get token
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await UserModel.findOne({ email }).select('+password');
        const isPasswordMatched = await user.comparePassword(password);        
        if (!isPasswordMatched) {
            res.status(401).json({ message: 'Invalid email or password' });
        } else {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        }



    } catch (error) {
        console.error('Error during login:', error); // Improved logging
        res.status(500).json({ message: 'Server error' }); // Changed to 500
    }
});

module.exports = router;
