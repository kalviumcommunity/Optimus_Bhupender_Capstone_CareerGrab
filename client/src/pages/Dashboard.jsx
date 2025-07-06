import React from 'react';
import { useAuth } from '../context/AuthContext';
import JobSeekerDashboard from '../components/JobSeekerDashboard';
import EmployerDashboard from '../components/EmployerDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view your dashboard</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {user.role === 'job_seeker' ? <JobSeekerDashboard /> : <EmployerDashboard />}
    </div>
  );
};

export default Dashboard;