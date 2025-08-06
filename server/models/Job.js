const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },

  // Job details
  type: { type: String, enum: ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'], default: 'Full-time' },
  category: { type: String, required: true },
  experience: { type: String, enum: ['Entry Level', 'Mid Level', 'Senior Level', 'Executive'], default: 'Mid Level' },

  // Salary
  salary: { type: String }, // Store as string for ranges like "$80,000 - $120,000"
  salaryType: { type: String, enum: ['range', 'fixed', 'negotiable'], default: 'range' },

  // Additional details
  requirements: { type: String },
  benefits: { type: String },
  remote: { type: Boolean, default: false },

  // Company info
  companyLogo: { type: String },
  companySize: { type: String },
  companyIndustry: { type: String },
  companyWebsite: { type: String },

  // Job status
  status: { type: String, enum: ['active', 'closed', 'draft'], default: 'active' },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', jobSchema);