import React, { useState } from 'react';
import { Eye, Edit2, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Request {
  id: number;
  title: string;
  sentBy: {
    name: string;
    email: string;
  };
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

const statusColors = {
  pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  approved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  rejected: 'bg-red-50 text-red-700 border-red-200'
};

const statusLabels = {
  pending: 'Pending',
  approved: 'Approved',
  rejected: 'Rejected'
};

// Mock data - replace with actual data from your API
const mockRequests: Request[] = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    sentBy: {
      name: 'John Doe',
      email: 'john.doe@example.com'
    },
    status: 'pending',
    createdAt: '2024-03-15'
  },
  {
    id: 2,
    title: 'Backend Engineer',
    sentBy: {
      name: 'Jane Smith',
      email: 'jane.smith@example.com'
    },
    status: 'approved',
    createdAt: '2024-03-14'
  },
  {
    id: 3,
    title: 'UI/UX Designer',
    sentBy: {
      name: 'Mike Johnson',
      email: 'mike.j@example.com'
    },
    status: 'rejected',
    createdAt: '2024-03-13'
  }
];

const RequestsTable = () => {
  const [requests] = useState<Request[]>(mockRequests);
  const [sortField, setSortField] = useState<keyof Request>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: keyof Request) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleView = (id: number) => {
    console.log('View request:', id);
  };

  const handleEdit = (id: number) => {
    console.log('Edit request:', id);
  };

  const handleDelete = (id: number) => {
    console.log('Delete request:', id);
  };

  const sortedRequests = [...requests].sort((a, b) => {
    if (sortField === 'sentBy') {
      return sortDirection === 'asc'
        ? a.sentBy.name.localeCompare(b.sentBy.name)
        : b.sentBy.name.localeCompare(a.sentBy.name);
    }
    
    if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/50">
              <th 
                className="px-6 py-4 text-left text-sm font-semibold text-slate-700 cursor-pointer hover:bg-slate-50"
                onClick={() => handleSort('id')}
              >
                <div className="flex items-center gap-2">
                  S.No
                  {sortField === 'id' && (
                    sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-4 text-left text-sm font-semibold text-slate-700 cursor-pointer hover:bg-slate-50"
                onClick={() => handleSort('title')}
              >
                <div className="flex items-center gap-2">
                  Request Title
                  {sortField === 'title' && (
                    sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-4 text-left text-sm font-semibold text-slate-700 cursor-pointer hover:bg-slate-50"
                onClick={() => handleSort('sentBy')}
              >
                <div className="flex items-center gap-2">
                  Sent By
                  {sortField === 'sentBy' && (
                    sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-4 text-left text-sm font-semibold text-slate-700 cursor-pointer hover:bg-slate-50"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center gap-2">
                  Status
                  {sortField === 'status' && (
                    sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                  )}
                </div>
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {sortedRequests.map((request) => (
              <tr 
                key={request.id}
                className="hover:bg-slate-50/50 transition-colors duration-200"
              >
                <td className="px-6 py-4 text-sm text-slate-600">
                  {request.id}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-slate-700">
                    {request.title}
                  </div>
                  <div className="text-xs text-slate-500">
                    Created on {new Date(request.createdAt).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-slate-700">
                    {request.sentBy.name}
                  </div>
                  <div className="text-xs text-slate-500">
                    {request.sentBy.email}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[request.status]}`}>
                    {statusLabels[request.status]}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-700 hover:text-sky-600 hover:bg-sky-50"
                    onClick={() => handleView(request.id)}
                  >
                    <Eye size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-700 hover:text-indigo-600 hover:bg-indigo-50"
                    onClick={() => handleEdit(request.id)}
                  >
                    <Edit2 size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-700 hover:text-red-600 hover:bg-red-50"
                    onClick={() => handleDelete(request.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestsTable; 