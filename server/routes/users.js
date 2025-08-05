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

// POST /auth/register - Register a new user
router.post('/auth/register', (req, res) => {
    const { name, email, password, role } = req.body;
    res.send(`New user registered: ${name} (${email}) with role: ${role}`);
});

// POST /auth/login - Authenticate user and return token
router.post('/auth/login', (req, res) => {
    const { email, password } = req.body;
    res.send(`User logged in: ${email} - Token: demo-jwt-token-12345`);
});

// POST /auth/logout - Log out current user
router.post('/auth/logout', (req, res) => {
    res.send('User successfully logged out');
}); 

module.exports = router;