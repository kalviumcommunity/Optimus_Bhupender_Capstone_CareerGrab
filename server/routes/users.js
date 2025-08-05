const express = require('express');
const router = express.Router();

// GET /users/me - Get current user profile
router.get('/me', (req, res) => {
    res.send('Current authenticated user profile');
});

// GET /users/:id - Get specific user details
router.get('/:id', (req, res) => {
    res.send(`User details for user ID: ${req.params.id}`);
});

module.exports = router;