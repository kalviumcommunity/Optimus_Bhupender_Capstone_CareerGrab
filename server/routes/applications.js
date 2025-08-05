const express = require('express');
const router = express.Router();

// GET /applications - List all applications
router.get('/', (req, res) => {
    res.send('List of all job applications');
});

// GET /applications/:id - Get specific application details
router.get('/:id', (req, res) => {
    res.send(`Application details for application ID: ${req.params.id}`);
});

module.exports = router;