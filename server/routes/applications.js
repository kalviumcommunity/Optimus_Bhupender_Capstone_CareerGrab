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

// POST /applications - Create a new job application
router.post('/', (req, res) => {
    const { jobId, userId, coverLetter, resume } = req.body;
    res.send(`New application created for job ID: ${jobId} by user ID: ${userId} with cover letter: ${coverLetter}`);
});


module.exports = router;