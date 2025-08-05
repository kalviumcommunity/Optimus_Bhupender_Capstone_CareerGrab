const express = require('express');
const router = express.Router();

// GET /jobs - List all jobs with optional filtering
router.get('/', (req, res) => {
    const { search, location, type } = req.query;
    let response = 'List of all jobs';

    if (search) response += ` filtered by search: ${search}`;
    if (location) response += ` in location: ${location}`;
    if (type) response += ` of type: ${type}`;

    res.send(response);
});

// GET /jobs/:id - Get specific job details
router.get('/:id', (req, res) => {
    res.send(`Job details for job ID: ${req.params.id}`);
});

// GET /jobs/employer/:employerId - Get jobs by employer
router.get('/employer/:employerId', (req, res) => {
    res.send(`Jobs posted by employer ID: ${req.params.employerId}`);
});

// POST /jobs - Create a new job
router.post('/', (req, res) => {
    const { title, description, location, salary, type } = req.body;
    res.send(`New job created: ${title} - ${description} in ${location} with salary ${salary} (${type})`);
});
module.exports = router;