import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Briefcase, Users, Eye, TrendingUp, Calendar, MapPin, DollarSign, Clock } from 'lucide-react';

const EmployerDashboard = () => {
  const jobPostings = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      location: 'San Francisco, CA',
      salary: '$120,000 - $150,000',
      type: 'Full-time',
      applications: 24,
      views: 156,
      posted: '2024-01-15',
      status: 'Active',
      statusColor: 'bg-green-100 text-green-800',
    },
    {
      id: 2,
      title: 'Product Manager',
      location: 'New York, NY',
      salary: '$100,000 - $130,000',
      type: 'Full-time',
      applications: 18,
      views: 89,
      posted: '2024-01-12',
      status: 'Active',
      statusColor: 'bg-green-100 text-green-800',
    },
    {
      id: 3,
      title: 'UX Designer',
      location: 'Remote',
      salary: '$80,000 - $100,000',
      type: 'Contract',
      applications: 31,
      views: 203,
      posted: '2024-01-10',
      status: 'Paused',
      statusColor: 'bg-yellow-100 text-yellow-800',
    },
  ];

  const recentApplications = [
    {
      id: 1,
      candidateName: 'Sarah Johnson',
      position: 'Senior Frontend Developer',
      appliedDate: '2024-01-16',
      status: 'New',
      statusColor: 'bg-blue-100 text-blue-800',
      avatar: 'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    },
    {
      id: 2,
      candidateName: 'Michael Chen',
      position: 'Product Manager',
      appliedDate: '2024-01-16',
      status: 'Reviewed',
      statusColor: 'bg-green-100 text-green-800',
      avatar: 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    },
    {
      id: 3,
      candidateName: 'Emily Rodriguez',
      position: 'UX Designer',
      appliedDate: '2024-01-15',
      status: 'Interview',
      statusColor: 'bg-purple-100 text-purple-800',
      avatar: 'https://images.pexels.com/photos/3783725/pexels-photo-3783725.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Employer Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage your job postings and applications</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <Briefcase className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Jobs</p>
              <p className="text-2xl font-semibold text-gray-900">8</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Applications</p>
              <p className="text-2xl font-semibold text-gray-900">73</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <Eye className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Profile Views</p>
              <p className="text-2xl font-semibold text-gray-900">448</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Interviews</p>
              <p className="text-2xl font-semibold text-gray-900">12</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Job Postings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Your Job Postings</h2>
            <Link to="/manage-jobs" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Manage All
            </Link>
          </div>
          <div className="space-y-4">
            {jobPostings.map((job) => (
              <div key={job.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location}
                      </span>
                      <span className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {job.salary}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {job.type}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                      <span>{job.applications} applications</span>
                      <span>{job.views} views</span>
                      <span>Posted {job.posted}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${job.statusColor}`}>
                      {job.status}
                    </span>
                    <div className="flex space-x-2 mt-2">
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                        Pause
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Applications */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Applications</h2>
            <Link to="/applications" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {recentApplications.map((app) => (
              <div key={app.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <img
                    src={app.avatar}
                    alt={app.candidateName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">{app.candidateName}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${app.statusColor}`}>
                        {app.status}
                      </span>
                    </div>
                    <p className="text-gray-600">{app.position}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Applied on {app.appliedDate}
                    </p>
                    <div className="flex space-x-2 mt-2">
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        View Profile
                      </button>
                      <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                        Accept
                      </button>
                      <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;