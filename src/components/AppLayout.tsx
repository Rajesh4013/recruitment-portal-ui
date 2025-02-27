import React from 'react';
import AppSideBar from './AppSideBar';
import AppHeader from './AppHeader';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50/50 to-indigo-50/30">
      <AppSideBar />
      <AppHeader />
      
      <main className="ml-64 pt-16 h-[calc(100vh-4rem)] overflow-y-auto bg-transparent backdrop-blur-sm">
        <div className="p-6 max-w-[1400px] mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout; 