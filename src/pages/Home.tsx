import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  CheckCircle, 
  Clock, 
  XCircle, 
  Plus,
  TrendingUp,
  UserCheck,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock data - replace with actual data from your API
const recentRequests = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    status: 'pending',
    date: '2024-03-15'
  },
  {
    id: 2,
    title: 'Backend Engineer',
    status: 'approved',
    date: '2024-03-14'
  },
  {
    id: 3,
    title: 'UI/UX Designer',
    status: 'rejected',
    date: '2024-03-13'
  }
];

const statistics = {
  totalRequests: 125,
  approved: 82,
  pending: 28,
  rejected: 15,
  avgTimeToHire: '45 days',
  activeInterviews: 12
};

const statusColors = {
  pending: 'text-yellow-600',
  approved: 'text-emerald-600',
  rejected: 'text-red-600'
};

const statusIcons = {
  pending: Clock,
  approved: CheckCircle,
  rejected: XCircle
};

const Home = () => {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold bg-gradient-to-r from-indigo-600 via-blue-600 to-sky-600 bg-clip-text text-transparent">
          Welcome Back
        </h1>
        <p className="mt-2 text-slate-600">
          Manage your recruitment requests and resources
        </p>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <div className="flex gap-4">
          <Link to="/resources">
            <Button className="bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-600 text-white shadow-sm">
              <Plus size={20} className="mr-2" />
              New Request
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Recent Requests Card */}
        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 hover:border-blue-200 group">
          <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2 mb-4">
            <span className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors duration-300">
              <Users size={20} />
            </span>
            Recent Requests
          </h2>
          <div className="space-y-4">
            {recentRequests.map(request => {
              const StatusIcon = statusIcons[request.status];
              return (
                <div key={request.id} className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-slate-700">{request.title}</h3>
                    <p className="text-xs text-slate-500">{request.date}</p>
                  </div>
                  <StatusIcon size={18} className={statusColors[request.status]} />
                </div>
              );
            })}
            <Link 
              to="/requests"
              className="inline-block text-sm text-blue-600 hover:text-blue-700 font-medium mt-2"
            >
              View all requests →
            </Link>
          </div>
        </div>

        {/* Resources Card */}
        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 hover:border-indigo-200 group">
          <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2 mb-4">
            <span className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-100 group-hover:text-indigo-700 transition-colors duration-300">
              <TrendingUp size={20} />
            </span>
            Hiring Overview
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50/50 p-3 rounded-lg">
                <p className="text-sm text-slate-600">Total Requests</p>
                <p className="text-2xl font-semibold text-slate-800">{statistics.totalRequests}</p>
              </div>
              <div className="bg-slate-50/50 p-3 rounded-lg">
                <p className="text-sm text-slate-600">Approved</p>
                <p className="text-2xl font-semibold text-emerald-600">{statistics.approved}</p>
              </div>
              <div className="bg-slate-50/50 p-3 rounded-lg">
                <p className="text-sm text-slate-600">Pending</p>
                <p className="text-2xl font-semibold text-yellow-600">{statistics.pending}</p>
              </div>
              <div className="bg-slate-50/50 p-3 rounded-lg">
                <p className="text-sm text-slate-600">Rejected</p>
                <p className="text-2xl font-semibold text-red-600">{statistics.rejected}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Card */}
        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 hover:border-sky-200 group">
          <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2 mb-4">
            <span className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 group-hover:bg-sky-100 group-hover:text-sky-700 transition-colors duration-300">
              <UserCheck size={20} />
            </span>
            Recruitment Stats
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-50/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Calendar size={20} className="text-sky-600" />
                <div>
                  <p className="text-sm text-slate-600">Average Time to Hire</p>
                  <p className="text-lg font-semibold text-slate-800">{statistics.avgTimeToHire}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Users size={20} className="text-sky-600" />
                <div>
                  <p className="text-sm text-slate-600">Active Interviews</p>
                  <p className="text-lg font-semibold text-slate-800">{statistics.activeInterviews}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home; 