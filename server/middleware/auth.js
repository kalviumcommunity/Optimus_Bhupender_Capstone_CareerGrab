const User = require('../models/User');
const auth = async (req, res, next) => {
    try {
        // Get token from header
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ message: 'No token found, authorization denied' });
        }

        // For now, let's assume the token is the user ID (you might want to use JWT later)
        const userId = token;

        // Find user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({ message: 'Token is not valid' });
        }

        // Add user info to request object
        req.userId = userId;

        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = auth;