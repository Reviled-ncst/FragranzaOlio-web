'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/app/context/AuthContext';
import { ProtectRoute } from '@/app/components/ProtectedRoute';

function OvertimeContent() {
  const { user } = useAuth();
  const [overtimeRequests, setOvertimeRequests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    overtime_date: new Date().toISOString().split('T')[0],
    hours: 2,
    reason: '',
    overtime_type: 'WORK',
  });

  // Mock data
  const mockOvertimeRequests = [
    {
      id: 1,
      employee_name: 'You',
      overtime_date: '2026-04-02',
      hours: 2.5,
      overtime_type: 'WORK',
      reason: 'Project deadline',
      status: 'PENDING',
      is_intern: false,
      submitted_date: '2026-04-02',
    },
    {
      id: 2,
      employee_name: 'Emma Davis (Intern)',
      overtime_date: '2026-04-01',
      hours: 1.5,
      overtime_type: 'LEARNING',
      reason: 'Extended training session',
      status: 'APPROVED',
      is_intern: true,
      submitted_date: '2026-04-01',
    },
    {
      id: 3,
      employee_name: 'John Smith',
      overtime_date: '2026-03-31',
      hours: 3,
      overtime_type: 'WORK',
      reason: 'Client presentation preparation',
      status: 'APPROVED',
      is_intern: false,
      submitted_date: '2026-03-31',
    },
    {
      id: 4,
      employee_name: 'Grace Wilson (Intern)',
      overtime_date: '2026-04-02',
      hours: 2,
      overtime_type: 'PROJECT',
      reason: 'Mentor-guided project work',
      status: 'PENDING',
      is_intern: true,
      submitted_date: '2026-04-02',
    },
    {
      id: 5,
      employee_name: 'Sarah Johnson',
      overtime_date: '2026-03-30',
      hours: 1,
      overtime_type: 'WORK',
      reason: 'System maintenance',
      status: 'REJECTED',
      is_intern: false,
      submitted_date: '2026-03-30',
    },
  ];

  useEffect(() => {
    const loadOvertimeRequests = async () => {
      try {
        setIsLoading(true);
        const filtered =
          filter === 'all'
            ? mockOvertimeRequests
            : mockOvertimeRequests.filter((o) => o.status === filter.toUpperCase());
        setOvertimeRequests(filtered);
      } catch (err) {
        console.error('Failed to load overtime requests', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadOvertimeRequests();
  }, [filter]);

  const handleSubmitOvertimeRequest = async () => {
    try {
      alert(`Overtime request submitted: ${formData.hours} hours on ${formData.overtime_date}`);
      setShowForm(false);
      setFormData({
        overtime_date: new Date().toISOString().split('T')[0],
        hours: 2,
        reason: '',
        overtime_type: 'WORK',
      });
    } catch (err) {
      console.error('Failed to submit overtime request', err);
    }
  };

  const handleApprove = (id: number, approve: boolean) => {
    alert(`Overtime request ${approve ? 'approved' : 'rejected'}`);
    setOvertimeRequests(overtimeRequests.filter((o) => o.id !== id));
  };

  const totalOvertimeThisMonth = mockOvertimeRequests
    .filter((o) => o.status === 'APPROVED')
    .reduce((sum, o) => sum + o.hours, 0);

  return (
    <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Header */}
      <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Overtime Management</h1>
            <p className="text-gray-400">Request and approve overtime work and extended learning projects</p>
          </div>
          <motion.button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 border border-orange-500/30 rounded-lg font-medium transition-all"
            whileHover={{ scale: 1.05 }}
          >
            {showForm ? '✕ Cancel' : '+ Request Overtime'}
          </motion.button>
        </div>
      </motion.div>

      {/* Key Stats */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {[
          { label: 'Total This Month', value: `${totalOvertimeThisMonth.toFixed(1)}h`, icon: '⚡' },
          { label: 'Pending Approvals', value: mockOvertimeRequests.filter((o) => o.status === 'PENDING').length, icon: '⏳' },
          { label: 'Avg Per Employee', value: '4.2h', icon: '📊' },
          { label: 'Overtime Rate', value: '$25/h', icon: '💰' },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            className="bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20 rounded-xl p-4"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 + idx * 0.05 }}
          >
            <div className="text-2xl mb-2">{stat.icon}</div>
            <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-yellow-400">{stat.value}</p>
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
          <h2 className="text-xl font-bold text-white mb-4">Submit Overtime Request</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Overtime Type</label>
              <select
                value={formData.overtime_type}
                onChange={(e) => setFormData({ ...formData, overtime_type: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-yellow-500/20 text-white focus:border-yellow-400 focus:outline-none transition"
              >
                <option value="WORK">Regular Work</option>
                <option value="PROJECT">Project Work</option>
                <option value="LEARNING">Learning/Training</option>
                <option value="MAINTENANCE">System Maintenance</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Overtime Date</label>
              <input
                type="date"
                value={formData.overtime_date}
                onChange={(e) => setFormData({ ...formData, overtime_date: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-yellow-500/20 text-white focus:border-yellow-400 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Hours Worked</label>
              <input
                type="number"
                min="0.5"
                step="0.5"
                max="8"
                value={formData.hours}
                onChange={(e) => setFormData({ ...formData, hours: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-yellow-500/20 text-white focus:border-yellow-400 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Overtime Cost</label>
              <input
                type="text"
                value={`$${(formData.hours * 25).toFixed(2)}`}
                disabled
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-yellow-500/20 text-gray-500 focus:outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-white mb-2">Reason for Overtime</label>
              <textarea
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                placeholder="What was the reason for this overtime work?"
                rows={3}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-yellow-500/20 text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none transition resize-none"
              />
            </div>
          </div>
          <motion.button
            onClick={handleSubmitOvertimeRequest}
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

      {/* Overtime Requests */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-4 border-yellow-500/30 border-t-yellow-400 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-400">Loading overtime requests...</p>
        </div>
      ) : (
        <motion.div className="space-y-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          {overtimeRequests.map((overtime, idx) => (
            <motion.div
              key={overtime.id}
              className="bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20 rounded-xl p-4 hover:border-yellow-500/40 transition-all"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + idx * 0.05 }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-bold">{overtime.employee_name}</h3>
                    {overtime.is_intern && <span className="text-xs px-2 py-1 bg-indigo-500/20 text-indigo-400 rounded-full">Intern</span>}
                  </div>
                  <p className="text-gray-400 text-sm">{overtime.overtime_date}</p>
                </div>

                <div className="text-right">
                  <div className="text-sm text-gray-400 mb-1">
                    <span className="font-semibold text-orange-400">{overtime.hours}h</span> • {overtime.overtime_type}
                  </div>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium block ${
                      overtime.status === 'APPROVED'
                        ? 'bg-green-500/20 text-green-400'
                        : overtime.status === 'PENDING'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {overtime.status}
                  </span>
                </div>
              </div>

              <p className="text-gray-400 text-xs mb-3">{overtime.reason}</p>
              <p className="text-gray-500 text-xs">Estimated Cost: ${(overtime.hours * 25).toFixed(2)}</p>

              {/* Actions for supervisors/admins */}
              {(user?.role === 'ADMIN' || user?.role === 'SUPERVISOR') && overtime.status === 'PENDING' && (
                <div className="flex gap-2 mt-4 pt-4 border-t border-yellow-500/10">
                  <motion.button
                    onClick={() => handleApprove(overtime.id, true)}
                    className="flex-1 px-3 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30 rounded text-xs font-medium transition-all"
                    whileHover={{ scale: 1.02 }}
                  >
                    ✓ Approve
                  </motion.button>
                  <motion.button
                    onClick={() => handleApprove(overtime.id, false)}
                    className="flex-1 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 rounded text-xs font-medium transition-all"
                    whileHover={{ scale: 1.02 }}
                  >
                    ✕ Reject
                  </motion.button>
                </div>
              )}
            </motion.div>
          ))}

          {overtimeRequests.length === 0 && (
            <div className="text-center py-12 bg-white/5 rounded-lg border border-yellow-500/10">
              <p className="text-gray-400">No overtime requests found</p>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

export default function OvertimePage() {
  return (
    <ProtectRoute requiredRoles={['ADMIN', 'SUPERVISOR', 'INTERN']}>
      <OvertimeContent />
    </ProtectRoute>
  );
}
