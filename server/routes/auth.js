const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');

// Register a new user
router.post('/register', async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({
            name,
            email,
            password: hashedPassword,
            role: role || 'user'
        });
        await user.save();

        res.status(201).json({ message: `User registered successfully for: ${email}` });
    } catch (err) {
        next(err);
    }
});

// Login user
router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        res.json({
            message: `User logged in successfully for: ${email}`,
            userId: user.id
        });
    } catch (err) {
        next(err);
    }
});

// Get current authenticated user's info
router.get('/me', auth, async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        next(err);
    }
});

// Logout (client-side only, just remove token from client)
router.post('/logout', (req, res) => {
    res.json({ message: 'Logout successful (remove token on client)' });
});

module.exports = router;