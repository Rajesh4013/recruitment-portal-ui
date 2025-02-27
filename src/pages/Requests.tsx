import React from 'react';
import RequestsTable from '@/components/RequestsTable';

const Requests = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent">
          Resource Requests
        </h1>
        <p className="mt-2 text-slate-600">
          View and manage all resource requests
        </p>
      </div>

      <RequestsTable />
    </div>
  );
};

export default Requests; 