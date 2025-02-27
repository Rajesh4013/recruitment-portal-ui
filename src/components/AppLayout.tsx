import React from 'react';
import AppSideBar from './AppSideBar';
import AppHeader from './AppHeader';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const AppLayout = () => {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-slate-50/50 to-indigo-50/30">
      <AppSideBar />
      <div className="flex-1 flex flex-col ml-64">
        <AppHeader />
        <main className="flex-1 overflow-y-auto pt-16 bg-transparent backdrop-blur-sm">
          <div className="p-6 max-w-[1400px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default AppLayout;