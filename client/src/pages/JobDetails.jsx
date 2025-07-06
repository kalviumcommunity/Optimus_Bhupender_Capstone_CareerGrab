import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, DollarSign, Clock, Briefcase, Users, Calendar, Building, Globe, Star, BookMarked as BookMark, Share2, ArrowLeft, CheckCircle } from 'lucide-react';

const JobDetails = () => {
  const { id } = useParams();
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Mock job data - in a real app, this would be fetched based on the ID
  const job = {
    id: id,
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$120,000 - $150,000',
    posted: '2 days ago',
    logo: 'https://images.pexels.com/photos/4439901/pexels-photo-4439901.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    description: `We are looking for a skilled Frontend Developer to join our team and work on cutting-edge web applications. You will be responsible for developing user-facing features, ensuring the technical feasibility of UI/UX designs, and optimizing applications for maximum speed and scalability.

As a Senior Frontend Developer, you will collaborate with our design and backend teams to create seamless user experiences. You'll have the opportunity to work with the latest technologies and frameworks while mentoring junior developers.`,
    
    highlights: [
      'Work with cutting-edge technologies',
      'Flexible remote work options',
      'Comprehensive health benefits',
      'Professional development budget',
      'Stock options available',
      'Collaborative team environment'
    ],
    
    requirements: [
      '5+ years of experience in frontend development',
      'Expert knowledge of React and TypeScript',
      'Experience with modern build tools (Webpack, Vite)',
      'Strong understanding of responsive design',
      'Experience with state management (Redux, Zustand)',
      'Knowledge of testing frameworks (Jest, Cypress)',
      'Excellent communication skills',
      'Bachelor\'s degree in Computer Science or equivalent'
    ],
    
    responsibilities: [
      'Develop and maintain user-facing features using React',
      'Collaborate with designers to implement pixel-perfect UIs',
      'Optimize applications for maximum speed and scalability',
      'Write clean, maintainable, and well-documented code',
      'Participate in code reviews and mentor junior developers',
      'Stay up-to-date with emerging technologies and best practices',
      'Work closely with backend developers to integrate APIs',
      'Contribute to technical architecture decisions'
    ],
    
    skills: ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Node.js', 'Git', 'Agile'],
    
    companyInfo: {
      name: 'TechCorp Inc.',
      size: '500-1000 employees',
      industry: 'Technology',
      founded: '2015',
      website: 'https://techcorp.com',
      description: 'TechCorp Inc. is a leading technology company specializing in innovative software solutions. We pride ourselves on creating products that make a real difference in people\'s lives. Our team is passionate about technology and committed to excellence.',
      benefits: [
        'Health, dental, and vision insurance',
        'Flexible PTO policy',
        'Remote work options',
        '401(k) with company matching',
        'Professional development budget',
        'Free lunch and snacks',
        'Gym membership reimbursement',
        'Stock options'
      ]
    }
  };

  const handleApply = () => {
    // Handle job application logic
    console.log('Applying for job:', job.id);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = () => {
    // Handle sharing logic
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link 
            to="/jobs" 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Jobs
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start space-x-4">
                <img
                  src={job.logo}
                  alt={job.company}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h1>
                  <p className="text-lg text-gray-700 font-medium mb-3">{job.company}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                    <span className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {job.location}
                    </span>
                    <span className="flex items-center">
                      <Briefcase className="h-4 w-4 mr-1" />
                      {job.type}
                    </span>
                    <span className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {job.salary}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      Posted {job.posted}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={handleApply}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Apply Now
                    </button>
                    <button
                      onClick={handleBookmark}
                      className={`p-3 rounded-lg border transition-colors ${
                        isBookmarked 
                          ? 'bg-blue-50 border-blue-200 text-blue-600' 
                          : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <BookMark className="h-5 w-5" />
                    </button>
                    <button
                      onClick={handleShare}
                      className="p-3 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Job Highlights */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {job.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Job Description */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{job.description}</p>
              </div>
            </div>

            {/* Key Responsibilities */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Responsibilities</h2>
              <ul className="space-y-2">
                {job.responsibilities.map((responsibility, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h2>
              <ul className="space-y-2">
                {job.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Skills */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Skills</h2>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-50 text-blue-700 px-3 py-2 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Company Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">About {job.companyInfo.name}</h3>
              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Building className="h-4 w-4" />
                  <span>{job.companyInfo.industry}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>{job.companyInfo.size}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Founded {job.companyInfo.founded}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Globe className="h-4 w-4" />
                  <a href={job.companyInfo.website} className="text-blue-600 hover:text-blue-700">
                    Visit Website
                  </a>
                </div>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{job.companyInfo.description}</p>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Benefits & Perks</h3>
              <ul className="space-y-2">
                {job.companyInfo.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Similar Jobs */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Similar Jobs</h3>
              <div className="space-y-3">
                <div className="border border-gray-200 rounded-lg p-3">
                  <h4 className="font-medium text-gray-900 text-sm">Frontend Developer</h4>
                  <p className="text-gray-600 text-xs">StartupXYZ</p>
                  <p className="text-gray-500 text-xs">$90k - $120k</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-3">
                  <h4 className="font-medium text-gray-900 text-sm">React Developer</h4>
                  <p className="text-gray-600 text-xs">WebTech Solutions</p>
                  <p className="text-gray-500 text-xs">$100k - $130k</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-3">
                  <h4 className="font-medium text-gray-900 text-sm">UI Developer</h4>
                  <p className="text-gray-600 text-xs">Design Studio</p>
                  <p className="text-gray-500 text-xs">$85k - $110k</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;