import React from 'react';
import { Home, FileText, Send } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const AppSideBar = () => {
  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 fixed left-0 top-0">
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
        </div>
        
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  `flex items-center space-x-3 p-2 rounded-lg text-gray-700 hover:bg-gray-100 ${
                    isActive ? 'bg-gray-100 text-blue-600' : ''
                  }`
                }
              >
                <Home size={20} />
                <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/resources"
                className={({ isActive }) =>
                  `flex items-center space-x-3 p-2 rounded-lg text-gray-700 hover:bg-gray-100 ${
                    isActive ? 'bg-gray-100 text-blue-600' : ''
                  }`
                }
              >
                <FileText size={20} />
                <span>Resource Form</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/requests"
                className={({ isActive }) =>
                  `flex items-center space-x-3 p-2 rounded-lg text-gray-700 hover:bg-gray-100 ${
                    isActive ? 'bg-gray-100 text-blue-600' : ''
                  }`
                }
              >
                <Send size={20} />
                <span>Requests</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default AppSideBar;