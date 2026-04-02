'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/app/context/AuthContext';
import { ProtectRoute } from '@/app/components/ProtectedRoute';
import { hrService } from '@/app/lib/enterpriseService';

function TimesheetsContent() {
  const { user } = useAuth();
  const [timesheets, setTimesheets] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('all');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    check_in_time: '09:00',
    check_out_time: '17:00',
    notes: '',
  });

  // Sample data
  const mockTimesheets = [
    {
      id: 1,
      employee_name: 'You',
      date: '2026-04-02',
      check_in_time: '09:15',
      check_out_time: '17:30',
      hours_worked: 8.25,
      status: 'PENDING',
      notes: 'Regular work day',
      is_intern: false,
    },
    {
      id: 2,
      employee_name: 'Emma Davis (Intern)',
      date: '2026-04-02',
      check_in_time: '09:00',
      check_out_time: '17:00',
      hours_worked: 8,
      status: 'APPROVED',
      notes: 'Completed onboarding tasks',
      is_intern: true,
    },
    {
      id: 3,
      employee_name: 'John Smith',
      date: '2026-04-01',
      check_in_time: '08:45',
      check_out_time: '17:15',
      hours_worked: 8.5,
      status: 'APPROVED',
      notes: 'Database migration work',
      is_intern: false,
    },
    {
      id: 4,
      employee_name: 'Grace Wilson (Intern)',
      date: '2026-04-01',
      check_in_time: '09:30',
      check_out_time: '17:00',
      hours_worked: 7.5,
      status: 'PENDING',
      notes: 'Morning mentor meeting, afternoon projects',
      is_intern: true,
    },
  ];

  useEffect(() => {
    const loadTimesheets = async () => {
      try {
        setIsLoading(true);
        // In production, use: const result = await hrService.getTimesheets({ status: filter === 'all' ? undefined : filter.toUpperCase() });
        const filtered =
          filter === 'all'
            ? mockTimesheets
            : mockTimesheets.filter((t) => t.status === filter.toUpperCase());
        setTimesheets(filtered);
      } catch (err) {
        console.error('Failed to load timesheets', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadTimesheets();
  }, [filter]);

  const handleSubmitTimesheet = async () => {
    try {
      // Calculate hours
      const [inHour, inMin] = formData.check_in_time.split(':').map(Number);
      const [outHour, outMin] = formData.check_out_time.split(':').map(Number);
      const hours = (outHour + outMin / 60) - (inHour + inMin / 60);

      // In production: await hrService.submitTimesheet({...})
      alert(`Timesheet submitted: ${hours.toFixed(2)} hours`);
      setShowForm(false);
      setFormData({
        date: new Date().toISOString().split('T')[0],
        check_in_time: '09:00',
        check_out_time: '17:00',
        notes: '',
      });
    } catch (err) {
      console.error('Failed to submit timesheet', err);
    }
  };

  const handleApprove = (id: number, approve: boolean) => {
    // In production: await hrService.approveTimesheet(id.toString(), approve);
    alert(`Timesheet ${approve ? 'approved' : 'rejected'}`);
    setTimesheets(timesheets.filter((t) => t.id !== id));
  };

  return (
    <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Header */}
      <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Timesheet Management</h1>
            <p className="text-gray-400">Track work hours for employees and interns</p>
          </div>
          <motion.button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-500/30 rounded-lg font-medium transition-all"
            whileHover={{ scale: 1.05 }}
          >
            {showForm ? '✕ Cancel' : '+ Submit Timesheet'}
          </motion.button>
        </div>
      </motion.div>

      {/* Submit Form */}
      {showForm && (
        <motion.div
          className="bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/30 rounded-2xl p-6"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h2 className="text-xl font-bold text-white mb-4">Submit Timesheet</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-yellow-500/20 text-white focus:border-yellow-400 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Check-in Time</label>
              <input
                type="time"
                value={formData.check_in_time}
                onChange={(e) => setFormData({ ...formData, check_in_time: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-yellow-500/20 text-white focus:border-yellow-400 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Check-out Time</label>
              <input
                type="time"
                value={formData.check_out_time}
                onChange={(e) => setFormData({ ...formData, check_out_time: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-yellow-500/20 text-white focus:border-yellow-400 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Notes (Optional)</label>
              <input
                type="text"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="What did you work on?"
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-yellow-500/20 text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none transition"
              />
            </div>
          </div>
          <motion.button
            onClick={handleSubmitTimesheet}
            className="w-full mt-4 px-4 py-3 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-500/30 rounded-lg font-medium transition-all"
            whileHover={{ scale: 1.01 }}
          >
            Submit Timesheet
          </motion.button>
        </motion.div>
      )}

      {/* Filters */}
      <motion.div className="flex gap-3" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
        {(['all', 'pending', 'approved'] as const).map((status) => (
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

      {/* Timesheets List */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-4 border-yellow-500/30 border-t-yellow-400 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-400">Loading timesheets...</p>
        </div>
      ) : (
        <motion.div className="space-y-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          {timesheets.map((ts, idx) => (
            <motion.div
              key={ts.id}
              className="bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20 rounded-xl p-4 hover:border-yellow-500/40 transition-all"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + idx * 0.05 }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-bold">{ts.employee_name}</h3>
                    {ts.is_intern && <span className="text-xs px-2 py-1 bg-indigo-500/20 text-indigo-400 rounded-full">Intern</span>}
                  </div>
                  <p className="text-gray-400 text-sm">{ts.date}</p>
                </div>

                <div className="text-right">
                  <div className="text-sm text-gray-400 mb-1">
                    <span className="font-semibold text-yellow-400">{ts.hours_worked}</span> hours
                  </div>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${
                      ts.status === 'APPROVED'
                        ? 'bg-green-500/20 text-green-400'
                        : ts.status === 'PENDING'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {ts.status}
                  </span>
                </div>
              </div>

              <p className="text-gray-400 text-xs mb-3">
                {ts.check_in_time} → {ts.check_out_time} {ts.notes && `• ${ts.notes}`}
              </p>

              {/* Actions for supervisors/admins */}
              {(user?.role === 'ADMIN' || user?.role === 'SUPERVISOR') && ts.status === 'PENDING' && (
                <div className="flex gap-2 mt-4 pt-4 border-t border-yellow-500/10">
                  <motion.button
                    onClick={() => handleApprove(ts.id, true)}
                    className="flex-1 px-3 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30 rounded text-xs font-medium transition-all"
                    whileHover={{ scale: 1.02 }}
                  >
                    ✓ Approve
                  </motion.button>
                  <motion.button
                    onClick={() => handleApprove(ts.id, false)}
                    className="flex-1 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 rounded text-xs font-medium transition-all"
                    whileHover={{ scale: 1.02 }}
                  >
                    ✕ Reject
                  </motion.button>
                </div>
              )}
            </motion.div>
          ))}

          {timesheets.length === 0 && (
            <div className="text-center py-12 bg-white/5 rounded-lg border border-yellow-500/10">
              <p className="text-gray-400">No timesheets found</p>
            </div>
          )}
        </motion.div>
      )}

      {/* Summary Section */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {[
          { label: 'This Week Hours', value: '40', icon: '⏱️' },
          { label: 'Av Overtime', value: '3.5h', icon: '⚡' },
          { label: 'Pending Approval', value: mockTimesheets.filter((t) => t.status === 'PENDING').length, icon: '⏳' },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            className="bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20 rounded-xl p-4"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 + idx * 0.05 }}
          >
            <div className="text-2xl mb-2">{stat.icon}</div>
            <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-yellow-400">{stat.value}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default function TimesheetsPage() {
  return (
    <ProtectRoute requiredRoles={['ADMIN', 'SUPERVISOR', 'INTERN']}>
      <TimesheetsContent />
    </ProtectRoute>
  );
}
