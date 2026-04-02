'use client';

import { motion } from 'framer-motion';
import { useAuth } from '@/app/context/AuthContext';
import { ProtectRoute } from '@/app/components/ProtectedRoute';

function SuperAdminDashboardContent() {
  const { user, logout } = useAuth();

  const stats = [
    { label: 'Total Users', value: '247', icon: '👥', change: '+12 this month' },
    { label: 'Active Internships', value: '56', icon: '📋', change: '+8 this month' },
    { label: 'Applications', value: '143', icon: '📬', change: '28 pending' },
    { label: 'Completed Programs', value: '89', icon: '✅', change: '+15 this month' },
  ];

  const systemStats = [
    { label: 'System Uptime', value: '99.8%', icon: '⚡' },
    { label: 'API Response Time', value: '145ms', icon: '⚙️' },
    { label: 'Database Size', value: '2.4 GB', icon: '💾' },
    { label: 'Active Sessions', value: '34', icon: '🔐' },
  ];

  return (
    <motion.div className="min-h-screen bg-black pt-32 pb-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div className="mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Super Admin <span className="text-yellow-400">Dashboard</span>
              </h1>
              <p className="text-gray-400">Full system control & monitoring</p>
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

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
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
                <div className="text-3xl font-bold text-yellow-400 mb-2">{stat.value}</div>
                <div className="text-xs text-gray-500">{stat.change}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Management Sections */}
        <motion.div className="grid grid-cols-1 lg:grid-cols-3 gap-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          {/* User Management */}
          <motion.div
            className="lg:col-span-2 p-8 rounded-2xl bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">User Management</h2>
            <div className="space-y-3">
              {[
                { role: 'ADMIN', count: 4, status: 'Active' },
                { role: 'SUPERVISOR', count: 12, status: 'Active' },
                { role: 'INTERN', count: 231, status: 'Active' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="p-4 rounded-lg bg-white/5 border border-yellow-500/10 hover:border-yellow-500/30 transition-all flex items-center justify-between"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  viewport={{ once: true }}
                >
                  <div>
                    <p className="text-white font-semibold">{item.role}</p>
                    <p className="text-gray-400 text-sm">{item.count} users • {item.status}</p>
                  </div>
                  <motion.button
                    className="px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 text-sm rounded-lg transition-all"
                    whileHover={{ scale: 1.05 }}
                  >
                    Manage
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* System Monitoring */}
          <motion.div
            className="p-8 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-amber-500/5 border border-yellow-500/30"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">System Status</h2>
            <div className="space-y-4">
              {systemStats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  className="p-4 rounded-lg bg-white/5 border border-yellow-500/20"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{stat.icon}</span>
                    <div className="text-right">
                      <p className="text-gray-400 text-xs">{stat.label}</p>
                      <p className="text-white font-bold">{stat.value}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="mt-8 p-8 rounded-2xl bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">System Controls</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'View Logs', icon: '📊' },
              { label: 'Database Backup', icon: '💾' },
              { label: 'User Reports', icon: '📈' },
              { label: 'Settings', icon: '⚙️' },
            ].map((action, idx) => (
              <motion.button
                key={idx}
                className="p-4 rounded-lg bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 text-white font-medium transition-all flex flex-col items-center gap-2"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                viewport={{ once: true }}
              >
                <span className="text-2xl">{action.icon}</span>
                {action.label}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function SuperAdminDashboardPage() {
  return (
    <ProtectRoute requiredRoles={['SUPERADMIN']}>
      <SuperAdminDashboardContent />
    </ProtectRoute>
  );
}
