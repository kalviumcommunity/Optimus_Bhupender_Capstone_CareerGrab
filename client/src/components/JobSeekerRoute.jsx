import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from './ProtectedRoute';

const JobSeekerRoute = ({ children }) => {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      {user?.role === 'job_seeker' ? (
        children
      ) : (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
            <p className="text-gray-600 mb-6">This page is only available to job seekers.</p>
            <Navigate to="/dashboard" replace />
          </div>
        </div>
      )}
    </ProtectedRoute>
  );
};

export default JobSeekerRoute;