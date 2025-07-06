import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, MapPin, Upload, Download, Edit2, Save, X } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    location: '',
    bio: '',
    skills: '',
    experience: '',
    education: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    // Here you would typically send the data to your backend
    console.log('Profile updated:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: '',
      location: '',
      bio: '',
      skills: '',
      experience: '',
      education: '',
    });
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view your profile</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-white rounded-full p-1">
                  <img
                    src={user.avatar || `https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop`}
                    alt={user.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                </div>
                <div className="text-white">
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <p className="text-blue-100">{user.role === 'job_seeker' ? 'Job Seeker' : 'Employer'}</p>
                  <p className="text-blue-100 flex items-center mt-1">
                    <Mail className="h-4 w-4 mr-1" />
                    {user.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors flex items-center space-x-1"
                  >
                    <Edit2 className="h-4 w-4" />
                    <span>Edit Profile</span>
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSave}
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center space-x-1"
                    >
                      <Save className="h-4 w-4" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors flex items-center space-x-1"
                    >
                      <X className="h-4 w-4" />
                      <span>Cancel</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Basic Information */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <p className="text-gray-900">{formData.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <p className="text-gray-900">{formData.email}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter your phone number"
                        />
                      ) : (
                        <p className="text-gray-900">{formData.phone || 'Not provided'}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter your location"
                        />
                      ) : (
                        <p className="text-gray-900">{formData.location || 'Not provided'}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">About Me</h2>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={4}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <p className="text-gray-900">{formData.bio || 'No bio provided'}</p>
                  )}
                </div>

                {user.role === 'job_seeker' && (
                  <>
                    {/* Skills */}
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h2 className="text-lg font-semibold text-gray-900 mb-4">Skills</h2>
                      {isEditing ? (
                        <textarea
                          name="skills"
                          value={formData.skills}
                          onChange={handleChange}
                          rows={3}
                          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          placeholder="List your skills (comma-separated)"
                        />
                      ) : (
                        <p className="text-gray-900">{formData.skills || 'No skills listed'}</p>
                      )}
                    </div>

                    {/* Experience */}
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h2 className="text-lg font-semibold text-gray-900 mb-4">Experience</h2>
                      {isEditing ? (
                        <textarea
                          name="experience"
                          value={formData.experience}
                          onChange={handleChange}
                          rows={4}
                          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Describe your work experience..."
                        />
                      ) : (
                        <p className="text-gray-900">{formData.experience || 'No experience provided'}</p>
                      )}
                    </div>

                    {/* Education */}
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h2 className="text-lg font-semibold text-gray-900 mb-4">Education</h2>
                      {isEditing ? (
                        <textarea
                          name="education"
                          value={formData.education}
                          onChange={handleChange}
                          rows={3}
                          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          placeholder="List your educational background..."
                        />
                      ) : (
                        <p className="text-gray-900">{formData.education || 'No education provided'}</p>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {user.role === 'job_seeker' && (
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Resume</h2>
                    <div className="space-y-3">
                      <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                        <Upload className="h-4 w-4" />
                        <span>Upload Resume</span>
                      </button>
                      <button className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors flex items-center justify-center space-x-2">
                        <Download className="h-4 w-4" />
                        <span>Download Resume</span>
                      </button>
                    </div>
                  </div>
                )}

                <div className="bg-gray-50 rounded-lg p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h2>
                  <div className="space-y-3">
                    <button className="w-full text-left text-gray-700 hover:text-blue-600 transition-colors">
                      Change Password
                    </button>
                    <button className="w-full text-left text-gray-700 hover:text-blue-600 transition-colors">
                      Notification Settings
                    </button>
                    <button className="w-full text-left text-gray-700 hover:text-blue-600 transition-colors">
                      Privacy Settings
                    </button>
                    <button className="w-full text-left text-red-600 hover:text-red-700 transition-colors">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;