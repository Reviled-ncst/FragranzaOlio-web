'use client';

import { motion } from 'framer-motion';
import { useAuth } from '@/app/context/AuthContext';
import { ProtectRoute } from '@/app/components/ProtectedRoute';

function InternDashboardContent() {
  const { user, logout } = useAuth();

  const myApplications = [
    { position: 'Software Dev Intern', company: 'Tech Corp', status: 'APPROVED', appliedDate: '2 weeks ago' },
    { position: 'Data Analytics Intern', company: 'Analytics Co', status: 'PENDING', appliedDate: '1 week ago' },
    { position: 'Frontend Developer', company: 'Web Studios', status: 'REJECTED', appliedDate: '3 weeks ago' },
  ];

  const programInfo = {
    startDate: 'June 1, 2024',
    endDate: 'August 31, 2024',
    weekNumber: 8,
    totalWeeks: 12,
    mentor: 'Alice Johnson',
    department: 'IT Department',
  };

  return (
    <motion.div className="min-h-screen bg-black pt-32 pb-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div className="mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Intern <span className="text-yellow-400">Dashboard</span>
              </h1>
              <p className="text-gray-400">Currently interning at {programInfo.department}</p>
            </div>
            <motion.button
              onClick={logout}
              className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 font-semibold rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Logout
            </motion.button>
          </div>

          {/* Current Program Progress */}
          <motion.div
            className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-yellow-500/30"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Program Progress</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Timeline */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Timeline</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Start Date:</span>
                    <span className="text-yellow-400">{programInfo.startDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">End Date:</span>
                    <span className="text-yellow-400">{programInfo.endDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Duration:</span>
                    <span className="text-yellow-400">{programInfo.totalWeeks} weeks</span>
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Current Progress</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">Week {programInfo.weekNumber} of {programInfo.totalWeeks}</span>
                    <span className="text-yellow-400 font-bold">
                      {Math.round((programInfo.weekNumber / programInfo.totalWeeks) * 100)}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-yellow-500 to-amber-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(programInfo.weekNumber / programInfo.totalWeeks) * 100}%` }}
                      transition={{ delay: 0.2, duration: 1 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-400 mt-4">Mentor: {programInfo.mentor}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <motion.div className="grid grid-cols-1 lg:grid-cols-3 gap-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          {/* My Applications */}
          <motion.div
            className="lg:col-span-2 p-8 rounded-2xl bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">My Applications</h2>
            <div className="space-y-4">
              {myApplications.map((app, idx) => (
                <motion.div
                  key={idx}
                  className="p-6 rounded-lg bg-white/5 border border-yellow-500/10 hover:border-yellow-500/30 transition-all"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-white font-bold text-lg">{app.position}</p>
                      <p className="text-gray-400 text-sm">{app.company}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        app.status === 'APPROVED'
                          ? 'bg-green-500/20 text-green-400'
                          : app.status === 'PENDING'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs">Applied {app.appliedDate}</p>
                  {app.status === 'APPROVED' && (
                    <motion.button
                      className="mt-4 w-full px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 text-sm rounded-lg transition-all"
                      whileHover={{ scale: 1.02 }}
                    >
                      View Details
                    </motion.button>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            className="p-8 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-amber-500/5 border border-yellow-500/30"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
            <div className="space-y-3">
              {[
                { label: 'Browse Opportunities', icon: '🔍' },
                { label: 'Submit Report', icon: '📝' },
                { label: 'View Evaluation', icon: '⭐' },
                { label: 'Contact Mentor', icon: '💬' },
              ].map((action, idx) => (
                <motion.button
                  key={idx}
                  className="w-full p-4 rounded-lg bg-white/5 hover:bg-yellow-500/10 border border-yellow-500/20 text-white font-medium transition-all flex items-center gap-3"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  viewport={{ once: true }}
                >
                  <span className="text-xl">{action.icon}</span>
                  {action.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Reports Section */}
        <motion.div
          className="mt-8 p-8 rounded-2xl bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">Weekly Reports</h2>
          <div className="space-y-3">
            {[
              { week: 'Week 7', status: 'Reviewed', date: '2 days ago' },
              { week: 'Week 6', status: 'Reviewed', date: '1 week ago' },
              { week: 'Week 5', status: 'Reviewed', date: '2 weeks ago' },
              { week: 'Week 4', status: 'Reviewed', date: '3 weeks ago' },
            ].map((report, idx) => (
              <motion.div
                key={idx}
                className="p-4 rounded-lg bg-white/5 border border-yellow-500/10 hover:border-yellow-500/30 transition-all flex items-center justify-between"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                viewport={{ once: true }}
              >
                <div>
                  <p className="text-white font-semibold">{report.week}</p>
                  <p className="text-gray-400 text-sm">Submitted {report.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">{report.status}</span>
                  <motion.button
                    className="px-3 py-1 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 text-xs rounded transition-all"
                    whileHover={{ scale: 1.05 }}
                  >
                    View
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.button
            className="w-full mt-6 px-4 py-3 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded-lg font-medium transition-all"
            whileHover={{ scale: 1.02 }}
          >
            Submit New Report for Week 8
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function InternDashboardPage() {
  return (
    <ProtectRoute requiredRoles={['INTERN']}>
      <InternDashboardContent />
    </ProtectRoute>
  );
}
