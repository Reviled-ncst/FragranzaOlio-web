'use client';

import { motion } from 'framer-motion';
import { useAuth } from '@/app/context/AuthContext';
import { ProtectRoute } from '@/app/components/ProtectedRoute';

function SupervisorDashboardContent() {
  const { user, logout } = useAuth();

  const myInterns = [
    { name: 'Emma Davis', position: 'Software Dev Intern', status: 'ONGOING', progress: 75 },
    { name: 'John Smith', position: 'Software Dev Intern', status: 'ONGOING', progress: 60 },
    { name: 'Sarah Lee', position: 'Software Dev Intern', status: 'ONGOING', progress: 85 },
  ];

  const pendingEvaluations = [
    { intern: 'Emma Davis', week: 'Month 2', dueDate: 'In 3 days' },
    { intern: 'John Smith', week: 'Month 1', dueDate: 'Overdue (2 days)' },
  ];

  return (
    <motion.div className="min-h-screen bg-black pt-32 pb-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div className="mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Supervisor <span className="text-yellow-400">Dashboard</span>
              </h1>
              <p className="text-gray-400">Manage interns in {user?.department}</p>
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

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'My Interns', value: '3', icon: '👥' },
              { label: 'Active Programs', value: '3', icon: '📋' },
              { label: 'Pending Evaluations', value: '2', icon: '✍️' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                className="p-6 rounded-2xl bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-gray-400 text-sm mb-1">{stat.label}</div>
                <div className="text-3xl font-bold text-yellow-400">{stat.value}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div className="grid grid-cols-1 lg:grid-cols-3 gap-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          {/* My Interns */}
          <motion.div
            className="lg:col-span-2 p-8 rounded-2xl bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">My Interns</h2>
            <div className="space-y-4">
              {myInterns.map((intern, idx) => (
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
                      <p className="text-white font-bold">{intern.name}</p>
                      <p className="text-gray-400 text-sm">{intern.position}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-medium">{intern.status}</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400 text-xs">Progress</span>
                      <span className="text-yellow-400 text-xs font-bold">{intern.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-yellow-500 to-amber-500"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${intern.progress}%` }}
                        transition={{ delay: idx * 0.1, duration: 0.8 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>

                  <motion.button
                    className="mt-3 w-full px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 text-sm rounded-lg transition-all"
                    whileHover={{ scale: 1.02 }}
                  >
                    View Details
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Pending Tasks */}
          <motion.div
            className="p-8 rounded-2xl bg-gradient-to-br from-orange-500/10 to-red-500/5 border border-yellow-500/30"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Pending Tasks</h2>
            <div className="space-y-3">
              {pendingEvaluations.map((task, idx) => (
                <motion.div
                  key={idx}
                  className="p-4 rounded-lg bg-white/5 border border-orange-500/20 hover:border-orange-500/40 transition-all"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  viewport={{ once: true }}
                >
                  <p className="text-white font-semibold text-sm">{task.intern}</p>
                  <p className="text-gray-400 text-xs mt-1">{task.week}</p>
                  <p
                    className={`text-xs font-medium mt-2 ${
                      task.dueDate.includes('Overdue') ? 'text-red-400' : 'text-orange-400'
                    }`}
                  >
                    {task.dueDate}
                  </p>
                  <motion.button
                    className="w-full mt-3 px-3 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 text-xs rounded transition-all"
                    whileHover={{ scale: 1.02 }}
                  >
                    Complete Evaluation
                  </motion.button>
                </motion.div>
              ))}
            </div>

            {/* Additional Actions */}
            <hr className="border-yellow-500/20 my-6" />
            <motion.button
              className="w-full px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded-lg text-sm font-medium transition-all"
              whileHover={{ scale: 1.02 }}
            >
              View All Tasks
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Recent Reports */}
        <motion.div
          className="mt-8 p-8 rounded-2xl bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">Recent Reports</h2>
          <div className="space-y-3">
            {[
              { intern: 'Emma Davis', week: 'Week 8', submitted: '1 day ago', status: 'Reviewed' },
              { intern: 'Sarah Lee', week: 'Week 8', submitted: '2 days ago', status: 'Pending' },
              { intern: 'John Smith', week: 'Week 7', submitted: '1 week ago', status: 'Reviewed' },
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
                  <p className="text-white font-semibold">{report.intern}</p>
                  <p className="text-gray-400 text-sm">{report.week} • Submitted {report.submitted}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    report.status === 'Reviewed'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}
                >
                  {report.status}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function SupervisorDashboardPage() {
  return (
    <ProtectRoute requiredRoles={['SUPERVISOR']}>
      <SupervisorDashboardContent />
    </ProtectRoute>
  );
}
