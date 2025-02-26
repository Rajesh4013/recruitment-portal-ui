import React from 'react';
import { User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AppHeader = () => {
  const { user } = useAuth();
  return (
    <header className="h-16 bg-white border-b border-gray-200 fixed top-0 right-0 left-64 z-10">
      <div className="flex items-center justify-end h-full px-6">
        <div className="flex items-center space-x-3">
          <span className="text-gray-700">{user?.firstName} {user?.lastName}</span>
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <User size={20} className="text-gray-600" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader; 