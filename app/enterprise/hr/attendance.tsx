'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/app/context/AuthContext';
import { ProtectRoute } from '@/app/components/ProtectedRoute';

function AttendanceContent() {
  const { user } = useAuth();
  const [attendanceRecords, setAttendanceRecords] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'present' | 'absent' | 'late'>('all');
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Mock data
  const mockAttendance = [
    {
      id: 1,
      employee_name: 'You',
      date: '2026-04-02',
      check_in_time: '09:15',
      check_out_time: '17:30',
      status: 'PRESENT',
      is_late: true,
      latitude: 12.9716,
      longitude: 77.5946,
      notes: 'Traffic delays',
      is_intern: false,
    },
    {
      id: 2,
      employee_name: 'Emma Davis (Intern)',
      date: '2026-04-02',
      check_in_time: '09:00',
      check_out_time: '17:00',
      status: 'PRESENT',
      is_late: false,
      latitude: 12.9716,
      longitude: 77.5946,
      notes: 'On time, training session',
      is_intern: true,
    },
    {
      id: 3,
      employee_name: 'John Smith',
      date: '2026-04-02',
      check_in_time: null,
      check_out_time: null,
      status: 'ABSENT',
      is_late: false,
      latitude: null,
      longitude: null,
      notes: 'Sick leave approved',
      is_intern: false,
    },
    {
      id: 4,
      employee_name: 'Grace Wilson (Intern)',
      date: '2026-04-02',
      check_in_time: '09:45',
      check_out_time: '17:00',
      status: 'LATE',
      is_late: true,
      latitude: 12.9716,
      longitude: 77.5946,
      notes: 'Mentor meeting delayed start',
      is_intern: true,
    },
    {
      id: 5,
      employee_name: 'Sarah Johnson',
      date: '2026-04-01',
      check_in_time: '09:05',
      check_out_time: '17:15',
      status: 'PRESENT',
      is_late: false,
      latitude: 12.9716,
      longitude: 77.5946,
      notes: 'Regular day',
      is_intern: false,
    },
  ];

  useEffect(() => {
    const loadAttendance = async () => {
      try {
        setIsLoading(true);
        const filtered =
          filter === 'all'
            ? mockAttendance
            : mockAttendance.filter((a) => a.status === filter.toUpperCase() || (filter === 'late' && a.is_late));
        setAttendanceRecords(filtered);
      } catch (err) {
        console.error('Failed to load attendance', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadAttendance();
  }, [filter]);

  const handleCheckIn = async () => {
    try {
      const now = new Date();
      const checkInTime = now.toTimeString().slice(0, 5);
      alert(`Check-in recorded at ${checkInTime}`);
      setShowCheckIn(false);
    } catch (err) {
      console.error('Failed to check in', err);
    }
  };

  const handleCheckOut = async () => {
    try {
      const now = new Date();
      const checkOutTime = now.toTimeString().slice(0, 5);
      alert(`Check-out recorded at ${checkOutTime}`);
    } catch (err) {
      console.error('Failed to check out', err);
    }
  };

  return (
    <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Header */}
      <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Attendance Tracking</h1>
            <p className="text-gray-400">Track employee and intern check-in/out with GPS location</p>
          </div>
          <motion.button
            onClick={() => setShowCheckIn(!showCheckIn)}
            className="px-6 py-3 bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30 rounded-lg font-medium transition-all"
            whileHover={{ scale: 1.05 }}
          >
            {showCheckIn ? '✕ Cancel' : '+ Check In'}
          </motion.button>
        </div>
      </motion.div>

      {/* Quick Check-In/Out */}
      {showCheckIn && (
        <motion.div
          className="bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/30 rounded-2xl p-6"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h2 className="text-xl font-bold text-white mb-4">Quick Check-In</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-yellow-500/20 text-white focus:border-yellow-400 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Current Time</label>
              <input
                type="text"
                value={new Date().toTimeString().slice(0, 5)}
                disabled
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-yellow-500/20 text-gray-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <motion.button
              onClick={handleCheckIn}
              className="flex-1 px-4 py-3 bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30 rounded-lg font-medium transition-all"
              whileHover={{ scale: 1.02 }}
            >
              ✓ Check In
            </motion.button>
            <motion.button
              onClick={handleCheckOut}
              className="flex-1 px-4 py-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30 rounded-lg font-medium transition-all"
              whileHover={{ scale: 1.02 }}
            >
              ✓ Check Out
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Filters */}
      <motion.div className="flex gap-3" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
        {(['all', 'present', 'absent', 'late'] as const).map((status) => (
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

      {/* Attendance Records */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-4 border-yellow-500/30 border-t-yellow-400 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-400">Loading attendance records...</p>
        </div>
      ) : (
        <motion.div className="space-y-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          {attendanceRecords.map((record, idx) => (
            <motion.div
              key={record.id}
              className="bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20 rounded-xl p-4 hover:border-yellow-500/40 transition-all"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + idx * 0.05 }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-bold">{record.employee_name}</h3>
                    {record.is_intern && <span className="text-xs px-2 py-1 bg-indigo-500/20 text-indigo-400 rounded-full">Intern</span>}
                  </div>
                  <p className="text-gray-400 text-sm">{record.date}</p>
                </div>

                <div className="text-right">
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${
                      record.status === 'PRESENT'
                        ? 'bg-green-500/20 text-green-400'
                        : record.status === 'ABSENT'
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                    }`}
                  >
                    {record.status} {record.is_late && '(Late)'}
                  </span>
                </div>
              </div>

              {record.check_in_time && (
                <p className="text-gray-400 text-xs mb-3">
                  {record.check_in_time} → {record.check_out_time || 'Not checked out'} {record.notes && `• ${record.notes}`}
                </p>
              )}

              {record.status === 'ABSENT' && (
                <p className="text-gray-400 text-xs mb-3">
                  Reason: {record.notes || 'No reason provided'}
                </p>
              )}

              {record.latitude && record.longitude && (
                <p className="text-gray-500 text-xs">
                  📍 Location: {record.latitude.toFixed(4)}, {record.longitude.toFixed(4)}
                </p>
              )}
            </motion.div>
          ))}

          {attendanceRecords.length === 0 && (
            <div className="text-center py-12 bg-white/5 rounded-lg border border-yellow-500/10">
              <p className="text-gray-400">No attendance records found</p>
            </div>
          )}
        </motion.div>
      )}

      {/* Monthly Summary */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {[
          { label: 'Present Days', value: '18', icon: '✓' },
          { label: 'Absent Days', value: '2', icon: '✕' },
          { label: 'Late Arrivals', value: '3', icon: '⏳' },
          { label: 'Attendance Rate', value: '92%', icon: '📊' },
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

export default function AttendancePage() {
  return (
    <ProtectRoute requiredRoles={['ADMIN', 'SUPERVISOR', 'INTERN']}>
      <AttendanceContent />
    </ProtectRoute>
  );
}
