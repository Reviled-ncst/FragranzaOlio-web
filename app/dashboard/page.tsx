'use client';

import { useAuth } from '@/app/context/AuthContext';
import { ProtectRoute } from '@/app/components/ProtectedRoute';
import { motion } from 'framer-motion';
import Link from 'next/link';

function DashboardContent() {
  const { user, logout } = useAuth();

  const getDashboardLink = () => {
    switch (user?.role) {
      case 'SUPERADMIN':
        return '/dashboard/superadmin';
      case 'ADMIN':
        return '/dashboard/admin';
      case 'SUPERVISOR':
        return '/dashboard/supervisor';
      case 'INTERN':
        return '/dashboard/intern';
      default:
        return '/dashboard';
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-black pt-32 pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Welcome, <span className="text-yellow-400">{user?.first_name}</span>
              </h1>
              <p className="text-gray-400">
                Role: <span className="text-yellow-400 font-semibold">{user?.role}</span>
                {user?.department && ` • Department: ${user.department}`}
              </p>
            </div>
            <motion.button
              onClick={logout}
              className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 font-semibold rounded-lg transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Logout
            </motion.button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Total Users', value: '24', icon: '👥' },
              { label: 'Active Internships', value: '12', icon: '📋' },
              { label: 'Pending Applications', value: '8', icon: '📬' },
              { label: 'Completed Programs', value: '45', icon: '✅' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                className="p-6 rounded-2xl bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20 hover:border-yellow-500/50 transition-all"
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

        {/* Role-Specific Dashboard */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <motion.div
              className="p-8 rounded-2xl bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                {user?.role === 'SUPERADMIN' && (
                  <>
                    <Link href="/dashboard/superadmin/manage-users">
                      <motion.button className="w-full p-4 rounded-lg bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 font-medium transition-all">
                        Manage Users
                      </motion.button>
                    </Link>
                    <Link href="/dashboard/superadmin/system-settings">
                      <motion.button className="w-full p-4 rounded-lg bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 font-medium transition-all">
                        System Settings
                      </motion.button>
                    </Link>
                  </>
                )}
                {user?.role === 'ADMIN' && (
                  <>
                    <Link href="/dashboard/admin/internships">
                      <motion.button className="w-full p-4 rounded-lg bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 font-medium transition-all">
                        Manage Internships
                      </motion.button>
                    </Link>
                    <Link href="/dashboard/admin/applications">
                      <motion.button className="w-full p-4 rounded-lg bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 font-medium transition-all">
                        Review Applications
                      </motion.button>
                    </Link>
                  </>
                )}
                {user?.role === 'SUPERVISOR' && (
                  <>
                    <Link href="/dashboard/supervisor/interns">
                      <motion.button className="w-full p-4 rounded-lg bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 font-medium transition-all">
                        My Interns
                      </motion.button>
                    </Link>
                    <Link href="/dashboard/supervisor/evaluations">
                      <motion.button className="w-full p-4 rounded-lg bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 font-medium transition-all">
                        Evaluations
                      </motion.button>
                    </Link>
                  </>
                )}
                {user?.role === 'INTERN' && (
                  <>
                    <Link href="/dashboard/intern/applications">
                      <motion.button className="w-full p-4 rounded-lg bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 font-medium transition-all">
                        My Applications
                      </motion.button>
                    </Link>
                    <Link href="/dashboard/intern/reports">
                      <motion.button className="w-full p-4 rounded-lg bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 font-medium transition-all">
                        Submit Report
                      </motion.button>
                    </Link>
                  </>
                )}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              className="p-8 rounded-2xl bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {[
                  { action: 'New application received', time: '2 hours ago' },
                  { action: 'Intern submitted weekly report', time: '5 hours ago' },
                  { action: 'Evaluation completed', time: '1 day ago' },
                  { action: 'Position marked as filled', time: '2 days ago' },
                ].map((activity, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-yellow-500/10 hover:border-yellow-500/30 transition-all"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                    <div className="flex-1">
                      <p className="text-gray-300 text-sm">{activity.action}</p>
                      <p className="text-gray-500 text-xs">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* User Profile Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-amber-500/5 border border-yellow-500/30">
              <h3 className="text-lg font-bold text-white mb-4">Your Profile</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-500">Email</p>
                  <p className="text-gray-200">{user?.email}</p>
                </div>
                <div>
                  <p className="text-gray-500">Full Name</p>
                  <p className="text-gray-200">
                    {user?.first_name} {user?.last_name}
                  </p>
                </div>
                {user?.department && (
                  <div>
                    <p className="text-gray-500">Department</p>
                    <p className="text-gray-200">{user.department}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Help & Support */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20">
              <h3 className="text-lg font-bold text-white mb-4">Help & Support</h3>
              <div className="space-y-2">
                <button className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-yellow-500/10 text-gray-300 hover:text-yellow-400 text-sm transition-all">
                  📖 View Documentation
                </button>
                <button className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-yellow-500/10 text-gray-300 hover:text-yellow-400 text-sm transition-all">
                  ❓ FAQ
                </button>
                <button className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-yellow-500/10 text-gray-300 hover:text-yellow-400 text-sm transition-all">
                  📧 Contact Support
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectRoute>
      <DashboardContent />
    </ProtectRoute>
  );
}
