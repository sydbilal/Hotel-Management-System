const express = require('express');
const bcrypt = require('bcryptjs');
// const generateToken = require('../utils/generateToken');
const UserModel = require('../models/user');
const generateToken = require('./Utils/generateToken');

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

// Delete a user
router.delete('/users/:id', async (req, res) => {
    try {
        await UserModel.findByIdAndDelete(req.params.id);
        res.status(204).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all users
router.get('/users', async (req, res) => {
    try {
        const users = await UserModel.find({});
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update user role
router.put('/users/:id/role', async (req, res) => {
    const { role } = req.body;

    if (!['admin', 'user', 'staff', 'superadmin'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role' });
    }

    try {
        const user = await UserModel.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.role = role;
        await user.save();

        res.json({ message: 'User role updated successfully' });
    } catch (error) {
        console.error('Error updating user role:', error);
        res.status(500).json({ message: 'Server error' });
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
