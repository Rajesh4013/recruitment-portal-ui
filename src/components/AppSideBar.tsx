import React from 'react';
import { Home, FileText, Send } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const AppSideBar = () => {
  return (
    <div className="w-64 h-screen bg-gradient-to-b from-slate-900 to-slate-800 fixed left-0 top-0 border-r border-slate-700/50">
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-slate-700/50">
          <h1 className="text-xl font-bold bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
            Dashboard
          </h1>
        </div>
        
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  `flex items-center space-x-3 p-2 rounded-lg text-slate-300 hover:bg-slate-700/50 transition-all duration-200 ${
                    isActive ? 'bg-slate-700/50 text-sky-400 font-medium' : ''
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
                  `flex items-center space-x-3 p-2 rounded-lg text-slate-300 hover:bg-slate-700/50 transition-all duration-200 ${
                    isActive ? 'bg-slate-700/50 text-sky-400 font-medium' : ''
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
                  `flex items-center space-x-3 p-2 rounded-lg text-slate-300 hover:bg-slate-700/50 transition-all duration-200 ${
                    isActive ? 'bg-slate-700/50 text-sky-400 font-medium' : ''
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