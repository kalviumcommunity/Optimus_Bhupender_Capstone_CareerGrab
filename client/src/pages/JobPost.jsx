import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building, MapPin, DollarSign, Clock, FileText } from 'lucide-react';

const JobPost = () => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    salary: '',
    salaryType: 'range',
    description: '',
    requirements: '',
    benefits: '',
    category: 'Technology',
    experience: 'Mid Level',
    remote: false,
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Job posted:', formData);
    navigate('/dashboard');
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: e.target.checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Post a New Job</h1>
            <p className="mt-1 text-sm text-gray-600">
              Fill out the form below to post your job listing
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Job Title *
                </label>
                <div className="mt-1 relative">
                  <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 py-3"
                    placeholder="e.g. Senior Frontend Developer"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                  Company Name *
                </label>
                <div className="mt-1 relative">
                  <Building className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 py-3"
                    placeholder="Your company name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location *
                </label>
                <div className="mt-1 relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    id="location"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 py-3"
                    placeholder="e.g. San Francisco, CA"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                  Job Type *
                </label>
                <div className="mt-1 relative">
                  <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 py-3"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Job Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 py-3"
                >
                  <option value="Technology">Technology</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="Design">Design</option>
                  <option value="Finance">Finance</option>
                  <option value="Human Resources">Human Resources</option>
                  <option value="Operations">Operations</option>
                  <option value="Customer Service">Customer Service</option>
                </select>
              </div>

              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                  Experience Level *
                </label>
                <select
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 py-3"
                >
                  <option value="Entry Level">Entry Level</option>
                  <option value="Mid Level">Mid Level</option>
                  <option value="Senior Level">Senior Level</option>
                  <option value="Executive">Executive</option>
                </select>
              </div>
            </div>

            {/* Salary */}
            <div>
              <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
                Salary *
              </label>
              <div className="mt-1 relative">
                <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="salary"
                  name="salary"
                  required
                  value={formData.salary}
                  onChange={handleChange}
                  className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 py-3"
                  placeholder="e.g. $80,000 - $120,000"
                />
              </div>
            </div>

            {/* Remote Work */}
            <div className="flex items-center">
              <input
                id="remote"
                name="remote"
                type="checkbox"
                checked={formData.remote}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remote" className="ml-2 block text-sm text-gray-900">
                This is a remote position
              </label>
            </div>

            {/* Job Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Job Description *
              </label>
              <textarea
                id="description"
                name="description"
                rows={6}
                required
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe the role, responsibilities, and what you're looking for..."
              />
            </div>

            {/* Requirements */}
            <div>
              <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">
                Requirements *
              </label>
              <textarea
                id="requirements"
                name="requirements"
                rows={4}
                required
                value={formData.requirements}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="List the required skills, experience, and qualifications..."
              />
            </div>

            {/* Benefits */}
            <div>
              <label htmlFor="benefits" className="block text-sm font-medium text-gray-700">
                Benefits & Perks
              </label>
              <textarea
                id="benefits"
                name="benefits"
                rows={3}
                value={formData.benefits}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Health insurance, flexible hours, remote work, etc."
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="px-6 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Post Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobPost;