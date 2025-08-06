const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'employer'], default: 'user' },

    // Profile fields
    phone: { type: String },
    location: { type: String },
    bio: { type: String },
    skills: [{ type: String }],
    experience: { type: String },
    education: { type: String },
    avatar: { type: String },

    // Social/Professional links
    website: { type: String },
    linkedin: { type: String },
    github: { type: String },

    // Timestamps
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Unique index on email
userSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model('User', userSchema);