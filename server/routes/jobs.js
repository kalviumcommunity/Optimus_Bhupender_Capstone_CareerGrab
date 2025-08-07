const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

// List all jobs (with optional filters)
router.get('/', async (req, res, next) => {
    try {
        const {
            title,
            location,
            company,
            type,
            category,
            experience,
            remote,
            status
        } = req.query;

        const filter = {};
        if (title) filter.title = new RegExp(title, 'i');
        if (location) filter.location = new RegExp(location, 'i');
        if (company) filter.company = new RegExp(company, 'i');
        if (type) filter.type = type;
        if (category) filter.category = new RegExp(category, 'i');
        if (experience) filter.experience = experience;
        if (remote !== undefined) filter.remote = remote === 'true';
        if (status) filter.status = status;

        const jobs = await Job.find(filter).populate('postedBy', 'name email');
        res.json(jobs);
    } catch (err) {
        next(err);
    }
});

// Get job details by ID
router.get('/:id', async (req, res, next) => {
    try {
        const job = await Job.findById(req.params.id).populate('postedBy', 'name email');
        if (!job) return res.status(404).json({ message: 'Job not found' });
        res.json(job);
    } catch (err) {
        next(err);
    }
});

// Create a new job (employer only)
router.post('/', auth, role('employer'), async (req, res, next) => {
    try {
        const {
            title,
            description,
            company,
            location,
            type,
            category,
            experience,
            salary,
            salaryType,
            requirements,
            benefits,
            remote,
            companyLogo,
            companySize,
            companyIndustry,
            companyWebsite,
            status
        } = req.body;

        const job = new Job({
            title,
            description,
            company,
            location,
            type,
            category,
            experience,
            salary,
            salaryType,
            requirements,
            benefits,
            remote,
            companyLogo,
            companySize,
            companyIndustry,
            companyWebsite,
            status,
            postedBy: req.user.id
        });
        await job.save();
        res.status(201).json(job);
    } catch (err) {
        next(err);
    }
});

// Get job statistics for employer
router.get('/stats/employer', auth, role('employer'), async (req, res, next) => {
    try {
        const jobs = await Job.find({ postedBy: req.user.id });
        const Application = require('../models/Application');

        const stats = {
            totalJobs: jobs.length,
            activeJobs: jobs.filter(job => job.status === 'active').length,
            closedJobs: jobs.filter(job => job.status === 'closed').length,
            draftJobs: jobs.filter(job => job.status === 'draft').length
        };

        // Get application counts for each job
        const jobIds = jobs.map(job => job._id);
        const applications = await Application.find({ job: { $in: jobIds } });

        stats.totalApplications = applications.length;
        stats.applicationsByStatus = {
            pending: applications.filter(app => app.status === 'pending').length,
            reviewed: applications.filter(app => app.status === 'reviewed').length,
            shortlisted: applications.filter(app => app.status === 'shortlisted').length,
            interviewed: applications.filter(app => app.status === 'interviewed').length,
            accepted: applications.filter(app => app.status === 'accepted').length,
            rejected: applications.filter(app => app.status === 'rejected').length
        };

        res.json(stats);
    } catch (err) {
        next(err);
    }
});

// Get jobs posted by a specific employer
router.get('/employer/:employerId', async (req, res, next) => {
    try {
        const jobs = await Job.find({ postedBy: req.params.employerId });
        res.json(jobs);
    } catch (err) {
        next(err);
    }
});

module.exports = router;