'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import { ProtectRoute } from '@/app/components/ProtectedRoute';

function EnterpriseContent() {
  const { user } = useAuth();

  const modules = [
    {
      title: 'HR Management',
      description: 'Manage employees, timesheets, attendance, leave requests, and overtime',
      href: '/enterprise/hr',
      icon: '👥',
      color: 'from-blue-500/10 to-blue-600/5',
      borderColor: 'border-blue-500/30',
      stats: [
        { label: 'Active Employees', value: '156' },
        { label: 'Pending Timesheets', value: '23' },
        { label: 'Leave Requests', value: '5' },
      ],
    },
    {
      title: 'Task Management',
      description: 'Assign, track, and manage tasks for employees and interns',
      href: '/enterprise/tasks',
      icon: '✓',
      color: 'from-green-500/10 to-green-600/5',
      borderColor: 'border-green-500/30',
      stats: [
        { label: 'Active Tasks', value: '42' },
        { label: 'In Progress', value: '18' },
        { label: 'Completed This Week', value: '15' },
      ],
    },
    {
      title: 'Products & Inventory',
      description: 'Manage products, stock levels, inventory movements, and adjustments',
      href: '/enterprise/inventory',
      icon: '📦',
      color: 'from-purple-500/10 to-purple-600/5',
      borderColor: 'border-purple-500/30',
      stats: [
        { label: 'Total Products', value: '342' },
        { label: 'Low Stock Items', value: '8' },
        { label: 'Pending Adjustments', value: '3' },
      ],
    },
    {
      title: 'Sales Management',
      description: 'Create quotations, manage orders, track payments, and commissions',
      href: '/enterprise/sales',
      icon: '💼',
      color: 'from-orange-500/10 to-orange-600/5',
      borderColor: 'border-orange-500/30',
      stats: [
        { label: 'Pending Orders', value: '12' },
        { label: 'Total Sales (Month)', value: '$45,230' },
        { label: 'Active Customers', value: '87' },
      ],
    },
    {
      title: 'POS System',
      description: 'Process transactions, manage refunds, and daily settlements',
      href: '/enterprise/pos',
      icon: '💳',
      color: 'from-red-500/10 to-red-600/5',
      borderColor: 'border-red-500/30',
      stats: [
        { label: 'Today Sales', value: '$8,420' },
        { label: 'Transactions', value: '156' },
        { label: 'Open Sessions', value: '2' },
      ],
    },
    {
      title: 'Intern Dashboard',
      description: 'Track intern progress, timesheets, tasks, and evaluations',
      href: '/enterprise/interns',
      icon: '🎓',
      color: 'from-indigo-500/10 to-indigo-600/5',
      borderColor: 'border-indigo-500/30',
      stats: [
        { label: 'Active Interns', value: '24' },
        { label: 'Reports Due', value: '6' },
        { label: 'Evaluations Pending', value: '4' },
      ],
    },
    {
      title: 'Reports & Analytics',
      description: 'View comprehensive reports and analytics across all modules',
      href: '/enterprise/reports',
      icon: '📊',
      color: 'from-cyan-500/10 to-cyan-600/5',
      borderColor: 'border-cyan-500/30',
      stats: [
        { label: 'Reports Generated', value: '127' },
        { label: 'Custom Reports', value: '8' },
        { label: 'Scheduled Reports', value: '12' },
      ],
    },
  ];

  return (
    <motion.div className="space-y-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Welcome Section */}
      <motion.div
        className="bg-gradient-to-r from-yellow-500/10 to-amber-500/5 border border-yellow-500/30 rounded-2xl p-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">Welcome, {user?.first_name}!</h1>
        <p className="text-gray-400 mb-4">
          Manage all business operations from a unified dashboard. Select a module below to get started.
        </p>
        <div className="flex gap-3">
          <motion.button
            className="px-6 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-500/30 rounded-lg font-medium transition-all"
            whileHover={{ scale: 1.05 }}
          >
            💼 View Dashboard
          </motion.button>
          <motion.button
            className="px-6 py-2 bg-white/5 hover:bg-white/10 text-gray-400 border border-yellow-500/10 rounded-lg font-medium transition-all"
            whileHover={{ scale: 1.05 }}
          >
            📋 Quick Reports
          </motion.button>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {[
          { label: 'Total Active Users', value: '247', icon: '👥' },
          { label: 'Tasks In Progress', value: '89', icon: '✓' },
          { label: 'Monthly Revenue', value: '$124.5K', icon: '💰' },
          { label: 'Stock Items', value: '342', icon: '📦' },
        ].map((metric, idx) => (
          <motion.div
            key={idx}
            className="bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20 rounded-xl p-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 + idx * 0.05 }}
          >
            <div className="text-2xl mb-2">{metric.icon}</div>
            <p className="text-gray-400 text-sm mb-1">{metric.label}</p>
            <p className="text-2xl font-bold text-yellow-400">{metric.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Modules Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {modules.map((module, idx) => (
          <Link key={idx} href={module.href}>
            <motion.div
              className={`h-full bg-gradient-to-br ${module.color} border ${module.borderColor} rounded-2xl p-6 cursor-pointer transition-all hover:border-yellow-400`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 + idx * 0.05 }}
              whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(169, 153, 104, 0.15)' }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{module.icon}</div>
                <motion.div className="text-yellow-400/50 group-hover:text-yellow-400 transition">→</motion.div>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-white mb-2">{module.title}</h3>
              <p className="text-gray-400 text-sm mb-6">{module.description}</p>

              {/* Stats */}
              <div className="space-y-2 MB-4">
                {module.stats.map((stat, sidx) => (
                  <div key={sidx} className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{stat.label}</span>
                    <span className="text-sm font-bold text-yellow-400">{stat.value}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <motion.button
                className="w-full mt-4 px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-500/30 rounded-lg text-sm font-medium transition-all"
                whileHover={{ scale: 1.02 }}
              >
                Access Module →
              </motion.button>
            </motion.div>
          </Link>
        ))}
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        className="bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20 rounded-2xl p-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {[
            { action: 'New order created', detail: 'Order #ORD-2024-1234', time: '2 minutes ago', icon: '💼' },
            { action: 'Timesheet approved', detail: 'Emma Davis submitted 40 hours', time: '15 minutes ago', icon: '✓' },
            { action: 'Inventory adjusted', detail: 'Laptop inventory updated', time: '1 hour ago', icon: '📦' },
            { action: 'Task completed', detail: 'John completed "Database Migration"', time: '2 hours ago', icon: '🎯' },
          ].map((activity, idx) => (
            <motion.div
              key={idx}
              className="flex items-center gap-4 p-3 rounded-lg bg-white/5 border border-yellow-500/10 hover:border-yellow-500/30 transition-all"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + idx * 0.05 }}
            >
              <div className="text-2xl">{activity.icon}</div>
              <div className="flex-1">
                <p className="text-white font-medium">{activity.action}</p>
                <p className="text-xs text-gray-500">{activity.detail}</p>
              </div>
              <div className="text-xs text-gray-600">{activity.time}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function EnterpriseDashboard() {
  return (
    <ProtectRoute requiredRoles={['ADMIN', 'SUPERADMIN', 'SUPERVISOR']}>
      <EnterpriseContent />
    </ProtectRoute>
  );
}
