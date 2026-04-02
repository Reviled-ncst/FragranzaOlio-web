'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/app/context/AuthContext';
import { ProtectRoute } from '@/app/components/ProtectedRoute';

function LeavesContent() {
  const { user } = useAuth();
  const [leaveRequests, setLeaveRequests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    leave_type: 'ANNUAL',
    start_date: new Date().toISOString().split('T')[0],
    end_date: new Date().toISOString().split('T')[0],
    reason: '',
  });

  // Leave types
  const leaveTypes = [
    { value: 'ANNUAL', label: 'Annual Leave', available: 12 },
    { value: 'SICK', label: 'Sick Leave', available: 10 },
    { value: 'CASUAL', label: 'Casual Leave', available: 5 },
    { value: 'MATERNITY', label: 'Maternity Leave', available: 90 },
    { value: 'PATERNITY', label: 'Paternity Leave', available: 7 },
    { value: 'PERSONAL', label: 'Personal Leave', available: 3 },
    { value: 'UNPAID', label: 'Unpaid Leave', available: 999 },
  ];

  // Mock data
  const mockLeaveRequests = [
    {
      id: 1,
      employee_name: 'You',
      leave_type: 'ANNUAL',
      start_date: '2026-04-15',
      end_date: '2026-04-20',
      days: 5,
      reason: 'Vacation',
      status: 'PENDING',
      is_intern: false,
      submitted_date: '2026-04-02',
    },
    {
      id: 2,
      employee_name: 'Emma Davis (Intern)',
      leave_type: 'PERSONAL',
      start_date: '2026-04-10',
      end_date: '2026-04-10',
      days: 1,
      reason: 'Personal appointment',
      status: 'APPROVED',
      is_intern: true,
      submitted_date: '2026-04-01',
    },
    {
      id: 3,
      employee_name: 'John Smith',
      leave_type: 'SICK',
      start_date: '2026-04-02',
      end_date: '2026-04-03',
      days: 2,
      reason: 'Medical appointment',
      status: 'APPROVED',
      is_intern: false,
      submitted_date: '2026-04-02',
    },
    {
      id: 4,
      employee_name: 'Grace Wilson (Intern)',
      leave_type: 'ANNUAL',
      start_date: '2026-04-25',
      end_date: '2026-04-30',
      days: 5,
      reason: 'Extended research project',
      status: 'PENDING',
      is_intern: true,
      submitted_date: '2026-04-02',
    },
    {
      id: 5,
      employee_name: 'Sarah Johnson',
      leave_type: 'CASUAL',
      start_date: '2026-04-05',
      end_date: '2026-04-05',
      days: 1,
      reason: 'Family event',
      status: 'REJECTED',
      is_intern: false,
      submitted_date: '2026-03-30',
      rejection_reason: 'Insufficient coverage',
    },
  ];

  useEffect(() => {
    const loadLeaveRequests = async () => {
      try {
        setIsLoading(true);
        const filtered =
          filter === 'all'
            ? mockLeaveRequests
            : mockLeaveRequests.filter((l) => l.status === filter.toUpperCase());
        setLeaveRequests(filtered);
      } catch (err) {
        console.error('Failed to load leave requests', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadLeaveRequests();
  }, [filter]);

  const handleSubmitLeaveRequest = async () => {
    try {
      const startDate = new Date(formData.start_date);
      const endDate = new Date(formData.end_date);
      const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

      alert(`Leave request submitted for ${days} days (${formData.leave_type})`);
      setShowForm(false);
      setFormData({
        leave_type: 'ANNUAL',
        start_date: new Date().toISOString().split('T')[0],
        end_date: new Date().toISOString().split('T')[0],
        reason: '',
      });
    } catch (err) {
      console.error('Failed to submit leave request', err);
    }
  };

  const handleApprove = (id: number, approve: boolean) => {
    alert(`Leave request ${approve ? 'approved' : 'rejected'}`);
    setLeaveRequests(leaveRequests.filter((l) => l.id !== id));
  };

  return (
    <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Header */}
      <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Leave Management</h1>
            <p className="text-gray-400">Request and approve leave for employees and interns</p>
          </div>
          <motion.button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-500/30 rounded-lg font-medium transition-all"
            whileHover={{ scale: 1.05 }}
          >
            {showForm ? '✕ Cancel' : '+ Request Leave'}
          </motion.button>
        </div>
      </motion.div>

      {/* Leave Balance */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {leaveTypes.map((type, idx) => (
          <motion.div
            key={type.value}
            className="bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20 rounded-lg p-3 text-center"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 + idx * 0.03 }}
          >
            <p className="text-xs text-gray-400 mb-1">{type.label}</p>
            <p className="text-lg font-bold text-yellow-400">{type.available}</p>
            <p className="text-xs text-gray-500">available</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Request Form */}
      {showForm && (
        <motion.div
          className="bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/30 rounded-2xl p-6"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h2 className="text-xl font-bold text-white mb-4">Submit Leave Request</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Leave Type</label>
              <select
                value={formData.leave_type}
                onChange={(e) => setFormData({ ...formData, leave_type: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-yellow-500/20 text-white focus:border-yellow-400 focus:outline-none transition"
              >
                {leaveTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label} ({type.available} available)
                  </option>
                ))}
              </select>
            </div>
            <div></div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Start Date</label>
              <input
                type="date"
                value={formData.start_date}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-yellow-500/20 text-white focus:border-yellow-400 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">End Date</label>
              <input
                type="date"
                value={formData.end_date}
                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-yellow-500/20 text-white focus:border-yellow-400 focus:outline-none transition"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-white mb-2">Reason</label>
              <textarea
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                placeholder="Why are you requesting this leave?"
                rows={3}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-yellow-500/20 text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none transition resize-none"
              />
            </div>
          </div>
          <motion.button
            onClick={handleSubmitLeaveRequest}
            className="w-full mt-4 px-4 py-3 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-500/30 rounded-lg font-medium transition-all"
            whileHover={{ scale: 1.01 }}
          >
            Submit Request
          </motion.button>
        </motion.div>
      )}

      {/* Filters */}
      <motion.div className="flex gap-3" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
        {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
          <motion.button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${
              filter === status
                ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                : 'bg-white/5 text-gray-400 border border-yellow-500/10 hover:border-yellow-500/30'
            }`}
            whileHover={{ scale: 1.05 }}
          >
            {status}
          </motion.button>
        ))}
      </motion.div>

      {/* Leave Requests */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-4 border-yellow-500/30 border-t-yellow-400 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-400">Loading leave requests...</p>
        </div>
      ) : (
        <motion.div className="space-y-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          {leaveRequests.map((leave, idx) => (
            <motion.div
              key={leave.id}
              className="bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20 rounded-xl p-4 hover:border-yellow-500/40 transition-all"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + idx * 0.05 }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-bold">{leave.employee_name}</h3>
                    {leave.is_intern && <span className="text-xs px-2 py-1 bg-indigo-500/20 text-indigo-400 rounded-full">Intern</span>}
                  </div>
                  <p className="text-gray-400 text-sm">
                    {leave.start_date} to {leave.end_date} ({leave.days} days)
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-sm text-gray-400 mb-1">
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">{leave.leave_type}</span>
                  </div>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium block ${
                      leave.status === 'APPROVED'
                        ? 'bg-green-500/20 text-green-400'
                        : leave.status === 'PENDING'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {leave.status}
                  </span>
                </div>
              </div>

              <p className="text-gray-400 text-xs mb-3">{leave.reason}</p>

              {leave.rejection_reason && (
                <p className="text-red-400 text-xs mb-3">Rejection Reason: {leave.rejection_reason}</p>
              )}

              {/* Actions for supervisors/admins */}
              {(user?.role === 'ADMIN' || user?.role === 'SUPERVISOR') && leave.status === 'PENDING' && (
                <div className="flex gap-2 mt-4 pt-4 border-t border-yellow-500/10">
                  <motion.button
                    onClick={() => handleApprove(leave.id, true)}
                    className="flex-1 px-3 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30 rounded text-xs font-medium transition-all"
                    whileHover={{ scale: 1.02 }}
                  >
                    ✓ Approve
                  </motion.button>
                  <motion.button
                    onClick={() => handleApprove(leave.id, false)}
                    className="flex-1 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 rounded text-xs font-medium transition-all"
                    whileHover={{ scale: 1.02 }}
                  >
                    ✕ Reject
                  </motion.button>
                </div>
              )}
            </motion.div>
          ))}

          {leaveRequests.length === 0 && (
            <div className="text-center py-12 bg-white/5 rounded-lg border border-yellow-500/10">
              <p className="text-gray-400">No leave requests found</p>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

export default function LeavesPage() {
  return (
    <ProtectRoute requiredRoles={['ADMIN', 'SUPERVISOR', 'INTERN']}>
      <LeavesContent />
    </ProtectRoute>
  );
}
