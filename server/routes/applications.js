const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const Job = require('../models/Job');
const auth = require('../middleware/auth');

// List all applications (role-based)
router.get('/', auth, async (req, res, next) => {
    try {
        const { status } = req.query;
        let filter = {};

        if (status) {
            filter.status = status;
        }

        let applications;
        if (req.user.role === 'employer') {
            // Employer: get applications for jobs they posted
            const jobs = await Job.find({ postedBy: req.user.id }).select('_id');
            const jobIds = jobs.map(job => job._id);
            filter.job = { $in: jobIds };
            applications = await Application.find(filter)
                .populate('job')
                .populate('user', 'name email');
        } else {
            // Job seeker: get their own applications
            filter.user = req.user.id;
            applications = await Application.find(filter)
                .populate('job')
                .populate('user', 'name email');
        }
        res.json(applications);
    } catch (err) {
        next(err);
    }
});

// Get application details by ID
router.get('/:id', auth, async (req, res, next) => {
    try {
        const application = await Application.findById(req.params.id)
            .populate('job')
            .populate('user', 'name email');
        if (!application) return res.status(404).json({ message: 'Application not found' });
        // Only allow job seeker who submitted or employer who posted the job
        if (
            application.user._id.toString() !== req.user.id &&
            application.job.postedBy.toString() !== req.user.id
        ) {
            return res.status(403).json({ message: 'Access denied' });
        }
        res.json(application);
    } catch (err) {
        next(err);
    }
});

// Create a new job application (job seeker only)
router.post('/', auth, async (req, res, next) => {
    try {
        if (req.user.role !== 'user') {
            return res.status(403).json({ message: 'Only job seekers can apply' });
        }
        const {
            job,
            resume,
            coverLetter,
            expectedSalary,
            availability,
            portfolio
        } = req.body;

        const application = new Application({
            job,
            user: req.user.id,
            resume,
            coverLetter,
            expectedSalary,
            availability,
            portfolio
        });
        await application.save();
        res.status(201).json(application);
    } catch (err) {
        next(err);
    }
});

// Update an application by ID (job seeker only)
router.put('/:id', auth, async (req, res, next) => {
    try {
        const {
            resume,
            coverLetter,
            expectedSalary,
            availability,
            portfolio
        } = req.body;

        const updateData = {
            resume,
            coverLetter,
            expectedSalary,
            availability,
            portfolio,
            updatedAt: Date.now()
        };

        // Remove undefined fields
        Object.keys(updateData).forEach(key =>
            updateData[key] === undefined && delete updateData[key]
        );

        const application = await Application.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            updateData,
            { new: true, runValidators: true }
        );
        if (!application) return res.status(404).json({ message: 'Application not found or not authorized' });
        res.json(application);
    } catch (err) {
        next(err);
    }
});

// Delete an application by ID (job seeker only)
router.delete('/:id', auth, async (req, res, next) => {
    try {
        const application = await Application.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });
        if (!application) return res.status(404).json({ message: 'Application not found or not authorized' });
        res.json({ message: 'Application deleted successfully' });
    } catch (err) {
        next(err);
    }
});

// Update application status (employer only)
router.patch('/:id/status', auth, async (req, res, next) => {
    try {
        if (req.user.role !== 'employer') {
            return res.status(403).json({ message: 'Only employers can update application status' });
        }

        const { status } = req.body;
        const application = await Application.findById(req.params.id).populate('job');

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        // Check if the employer posted the job
        if (application.job.postedBy.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to update this application' });
        }

        application.status = status;
        application.updatedAt = Date.now();
        await application.save();

        res.json(application);
    } catch (err) {
        next(err);
    }
});

// Get application statistics for job seeker
router.get('/stats/user', auth, async (req, res, next) => {
    try {
        if (req.user.role !== 'user') {
            return res.status(403).json({ message: 'Only job seekers can access this endpoint' });
        }

        const applications = await Application.find({ user: req.user.id });

        const stats = {
            totalApplications: applications.length,
            applicationsByStatus: {
                pending: applications.filter(app => app.status === 'pending').length,
                reviewed: applications.filter(app => app.status === 'reviewed').length,
                shortlisted: applications.filter(app => app.status === 'shortlisted').length,
                interviewed: applications.filter(app => app.status === 'interviewed').length,
                accepted: applications.filter(app => app.status === 'accepted').length,
                rejected: applications.filter(app => app.status === 'rejected').length
            }
        };

        res.json(stats);
    } catch (err) {
        next(err);
    }
});

module.exports = router;