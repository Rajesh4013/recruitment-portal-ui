import React from 'react';
import AppSideBar from './AppSideBar';
import AppHeader from './AppHeader';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AppSideBar />
      <AppHeader />
      
      <main className="ml-64 pt-16 h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout; 