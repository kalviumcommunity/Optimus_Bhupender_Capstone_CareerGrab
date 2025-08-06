const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Job = require('../models/Job');

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
router.post('/', auth, async (req, res, next) => {
    const postedBy = req.userId;
    const { title, description, location, salary, type, category, company, companyLogo, companySize, companyIndustry, companyWebsite } = req.body;
    job = new Job({
        title,
        description,
        type,
        salary,
        type,
        category,
        company,
        location,
        companySize,
        companyIndustry,
        companyWebsite,
        postedBy
    });
    await job.save();
    res.send(`New job created: ${title} - ${description} in ${location} with salary ${salary} (${type})`);
});
module.exports = router;