import React, { useState } from 'react';
import { User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AppHeader = () => {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSignOut = () => {
    logout();
  };

  return (
    <header className="h-16 bg-gradient-to-r from-slate-900 to-slate-800 backdrop-blur-md border-b border-slate-700/50 fixed top-0 right-0 left-64 z-10 shadow-sm">
      <div className="flex items-center justify-end h-full px-6">
        <div className="flex items-center space-x-4">
          <span className="text-slate-300 font-medium">
            {user?.firstName} {user?.lastName}
          </span>
          <div className="relative group">
            <div className="w-9 h-9 bg-gradient-to-br from-slate-800 to-slate-700 rounded-full flex items-center justify-center shadow-sm border border-slate-600/50 cursor-pointer hover:from-slate-700 hover:to-slate-600 transition-all duration-200">
              <User size={20} className="text-slate-300" />
            </div>
            
            {/* Dropdown Menu */}
            <div className="absolute right-0 top-full mt-1 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg shadow-lg border border-slate-700/50 overflow-hidden">
                <div className="p-3 border-b border-slate-700/50">
                  <p className="text-slate-300 text-sm font-medium">{user?.email}</p>
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-slate-300 hover:bg-slate-700/50 transition-colors duration-200"
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader; 