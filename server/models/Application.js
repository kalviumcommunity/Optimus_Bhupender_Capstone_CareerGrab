const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  // Application details
  resume: { type: String, required: true },
  coverLetter: { type: String },

  // Additional fields
  expectedSalary: { type: Number },
  availability: { type: String },
  portfolio: { type: String },

  // Status tracking
  status: { type: String, enum: ['pending', 'reviewed', 'shortlisted', 'interviewed', 'accepted', 'rejected'], default: 'pending' },

  // Timestamps
  appliedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', applicationSchema);