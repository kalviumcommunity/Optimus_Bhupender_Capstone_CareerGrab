const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');

// GET /users/me - Get current user profile

router.get('/me', auth, async (req, res, next) => {
    try {
        // Now userId is available from the auth middleware
        const userId = req.userId;
        // Get the full userDetails object
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: `UserID is: ${userId}`,
            user: user
        });
    } catch (err) {
        next(err);
    }
});

// GET /users/:id - Get specific user details
router.get('/:id', (req, res) => {
    res.send(`User details for user ID: ${req.params.id}`);
});

// POST /auth/register - Register a new user
router.post('/auth/register', async (req, res, next) => {
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

        res.status(201).json({ message: `New user registered: ${name} (${email}) with role: ${role}` });
    } catch (err) {
        next(err);
    }
});

// POST /auth/login - Authenticate user and return token
router.post('/auth/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        res.json({
            message: "User Logged in successfully",
            userId: `${user.id}`
        });
    } catch (err) {
        next(err);
    }
});

// POST /auth/logout - Log out current user
router.post('/auth/logout', (req, res) => {
    res.send('User successfully logged out');
});

// PUT /users/me - Update current user profile
router.put('/me', (req, res) => {
    const { name, email, phone, location, bio } = req.body;
    res.send(`User profile updated: ${name} (${email}), Phone: ${phone}, Location: ${location}, Bio: ${bio}`);
});

// PUT /users/update_password - Update user password
router.put('/updatePassword', (req, res) => {
    const { currentPassword, newPassword } = req.body;
    res.send(`Password updated successfully for current user`);
});

module.exports = router;