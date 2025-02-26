import React from 'react';

const Home = () => {
  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-900">Welcome Back</h1>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900">Recent Requests</h2>
          {/* Add content */}
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900">Resources</h2>
          {/* Add content */}
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900">Statistics</h2>
          {/* Add content */}
        </div>
      </div>
    </>
  );
};

export default Home; 