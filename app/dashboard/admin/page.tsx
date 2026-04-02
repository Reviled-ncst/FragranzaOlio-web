'use client';

import { motion } from 'framer-motion';
import { useAuth } from '@/app/context/AuthContext';
import { ProtectRoute } from '@/app/components/ProtectedRoute';

function AdminDashboardContent() {
  const { user, logout } = useAuth();

  const stats = [
    { label: 'Total Internships', value: '32', icon: '📋', color: 'from-blue-500/20 to-blue-600/10' },
    { label: 'Pending Applications', value: '18', icon: '📬', color: 'from-orange-500/20 to-orange-600/10' },
    { label: 'Active Interns', value: '45', icon: '👥', color: 'from-green-500/20 to-green-600/10' },
    { label: 'Completed', value: '67', icon: '✅', color: 'from-purple-500/20 to-purple-600/10' },
  ];

  const recentApplications = [
    { intern: 'Emma Davis', position: 'Software Dev Intern', status: 'PENDING', date: '2 hours ago' },
    { intern: 'Frank Miller', position: 'Marketing Intern', status: 'APPROVED', date: '1 day ago' },
    { intern: 'Grace Wilson', position: 'HR Coordinator', status: 'ONGOING', date: '5 days ago' },
    { intern: 'James Chen', position: 'Data Analytics', status: 'PENDING', date: '3 hours ago' },
  ];

  return (
    <motion.div className="min-h-screen bg-black pt-32 pb-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div className="mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Admin <span className="text-yellow-400">Dashboard</span>
              </h1>
              <p className="text-gray-400">Manage internships and applications</p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                className={`p-6 rounded-2xl bg-gradient-to-br ${stat.color} border border-yellow-500/20`}
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
          {/* Recent Applications */}
          <motion.div
            className="lg:col-span-2 p-8 rounded-2xl bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Recent Applications</h2>
            <div className="space-y-3">
              {recentApplications.map((app, idx) => (
                <motion.div
                  key={idx}
                  className="p-4 rounded-lg bg-white/5 border border-yellow-500/10 hover:border-yellow-500/30 transition-all"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-semibold">{app.intern}</p>
                      <p className="text-gray-400 text-sm">{app.position}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          app.status === 'PENDING'
                            ? 'bg-orange-500/20 text-orange-400'
                            : app.status === 'APPROVED'
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-blue-500/20 text-blue-400'
                        }`}
                      >
                        {app.status}
                      </span>
                      <motion.button
                        className="px-3 py-1 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 text-xs rounded transition-all"
                        whileHover={{ scale: 1.05 }}
                      >
                        Review
                      </motion.button>
                    </div>
                  </div>
                  <p className="text-gray-500 text-xs mt-2">{app.date}</p>
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
                { label: 'Create Position', icon: '➕' },
                { label: 'Review Applications', icon: '📋' },
                { label: 'Manage Interns', icon: '👥' },
                { label: 'Generate Reports', icon: '📊' },
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

        {/* Internship Positions */}
        <motion.div
          className="mt-8 p-8 rounded-2xl bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">Active Positions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Software Dev Intern', dept: 'IT', applicants: 12, status: 'Open' },
              { title: 'Data Analytics Intern', dept: 'IT', applicants: 8, status: 'Open' },
              { title: 'Marketing Intern', dept: 'Marketing', applicants: 15, status: 'Open' },
              { title: 'HR Coordinator Intern', dept: 'HR', applicants: 6, status: 'Open' },
              { title: 'Content Writer Intern', dept: 'Marketing', applicants: 10, status: 'Filled' },
              { title: 'Admin Assistant Intern', dept: 'Admin', applicants: 5, status: 'Open' },
            ].map((pos, idx) => (
              <motion.div
                key={idx}
                className="p-6 rounded-xl bg-white/5 border border-yellow-500/20 hover:border-yellow-500/40 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                viewport={{ once: true }}
              >
                <h3 className="text-white font-bold mb-2">{pos.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{pos.dept}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{pos.applicants} applicants</span>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded ${
                      pos.status === 'Open'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}
                  >
                    {pos.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function AdminDashboardPage() {
  return (
    <ProtectRoute requiredRoles={['ADMIN']}>
      <AdminDashboardContent />
    </ProtectRoute>
  );
}
