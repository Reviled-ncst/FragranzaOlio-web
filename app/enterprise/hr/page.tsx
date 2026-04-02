'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import { ProtectRoute } from '@/app/components/ProtectedRoute';
import { useState } from 'react';

function HRContent() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'employees' | 'timesheets' | 'attendance' | 'leaves'>('overview');

  const stats = [
    { label: 'Total Employees', value: '156', change: '+5 this month' },
    { label: 'Active Interns', value: '24', change: '+2 new interns' },
    { label: 'Avg Attendance', value: '96.5%', change: '-0.5% from last month' },
    { label: 'On Leave Today', value: '8', change: '3 planned, 5 sick' },
  ];

  const hrModules = [
    {
      title: 'Timesheets',
      description: 'Submit, review, and approve work hours',
      icon: '⏱️',
      href: '/enterprise/hr/timesheets',
      stats: [
        { label: 'Pending', value: '12' },
        { label: 'Approved This Week', value: '89' },
        { label: 'Overtime Hours', value: '24h' },
      ],
    },
    {
      title: 'Attendance',
      description: 'Track check-in/out and attendance reports',
      icon: '✓',
      href: '/enterprise/hr/attendance',
      stats: [
        { label: 'Present Today', value: '148' },
        { label: 'Absent', value: '8' },
        { label: 'Late Arrivals', value: '3' },
      ],
    },
    {
      title: 'Leave Management',
      description: 'Request and approve leave requests',
      icon: '🏖️',
      href: '/enterprise/hr/leaves',
      stats: [
        { label: 'Pending Requests', value: '5' },
        { label: 'Approved (Month)', value: '34' },
        { label: 'Available Balance', value: '12 days' },
      ],
    },
    {
      title: 'Overtime',
      description: 'Request and track overtime hours',
      icon: '⚡',
      href: '/enterprise/hr/overtime',
      stats: [
        { label: 'Pending Approvals', value: '3' },
        { label: 'This Month', value: '64 hours' },
        { label: 'Avg Per Employee', value: '4.2 hours' },
      ],
    },
    {
      title: 'Employees',
      description: 'Manage employee information and profiles',
      icon: '👥',
      href: '/enterprise/hr/employees',
      stats: [
        { label: 'Active', value: '156' },
        { label: 'Inactive', value: '12' },
        { label: 'New Hires (30d)', value: '5' },
      ],
    },
    {
      title: 'Intern Management',
      description: 'Track intern progress & evaluations',
      icon: '🎓',
      href: '/enterprise/hr/interns',
      stats: [
        { label: 'Active Interns', value: '24' },
        { label: 'Pending Evaluations', value: '4' },
        { label: 'Reports Due', value: '6' },
      ],
    },
  ];

  return (
    <motion.div className="space-y-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Header */}
      <motion.div initial={{ y: -10 }} animate={{ y: 0 }}>
        <h1 className="text-4xl font-bold text-white mb-2">HR Management System</h1>
        <p className="text-gray-400">Manage employees, interns, timesheets, attendance, and leave requests</p>
      </motion.div>

      {/* Key Stats */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/30 rounded-xl p-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 + idx * 0.05 }}
          >
            <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-blue-400 mb-2">{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.change}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* HR Modules Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {hrModules.map((module, idx) => (
          <Link key={idx} href={module.href}>
            <motion.div
              className="h-full bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20 hover:border-yellow-500/40 rounded-xl p-6 cursor-pointer transition-all"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 + idx * 0.05 }}
              whileHover={{ y: -4 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{module.icon}</div>
                <motion.div className="text-yellow-400/50 group-hover:text-yellow-400">→</motion.div>
              </div>

              <h3 className="text-lg font-bold text-white mb-2">{module.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{module.description}</p>

              {/* Module Stats */}
              <div className="space-y-2 pt-4 border-t border-yellow-500/10">
                {module.stats.map((stat, sidx) => (
                  <div key={sidx} className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{stat.label}</span>
                    <span className="text-sm font-bold text-yellow-400">{stat.value}</span>
                  </div>
                ))}
              </div>

              <motion.button
                className="w-full mt-4 px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-500/30 rounded-lg text-sm font-medium transition-all"
                whileHover={{ scale: 1.02 }}
              >
                Access Module
              </motion.button>
            </motion.div>
          </Link>
        ))}
      </motion.div>

      {/* Recent Activity & Quick Actions */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {/* Recent Activity */}
        <motion.div
          className="bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20 rounded-xl p-6"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <h3 className="text-lg font-bold text-white mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { action: 'Emma Davis (Intern) submitted timesheet', time: '2 hours ago', type: 'timesheet' },
              { action: 'Leave request approved for John Smith', time: '4 hours ago', type: 'approval' },
              { action: 'Grace Wilson marked overtime request', time: '6 hours ago', type: 'overtime' },
              { action: 'New intern onboarded: Alex Johnson', time: '1 day ago', type: 'onboard' },
            ].map((activity, idx) => (
              <motion.div
                key={idx}
                className="flex items-start gap-3 text-sm"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.05 }}
              >
                <div className="flex-shrink-0 text-lg">
                  {activity.type === 'timesheet' && '⏱️'}
                  {activity.type === 'approval' && '✓'}
                  {activity.type === 'overtime' && '⚡'}
                  {activity.type === 'onboard' && '🎓'}
                </div>
                <div className="flex-1">
                  <p className="text-white">{activity.action}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="bg-gradient-to-br from-yellow-500/10 to-amber-500/5 border border-yellow-500/30 rounded-xl p-6"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            {[
              { action: 'Submit Timesheet', icon: '⏱️', href: '/enterprise/hr/timesheets' },
              { action: 'Check In', icon: '✓', href: '/enterprise/hr/attendance' },
              { action: 'Request Leave', icon: '🏖️', href: '/enterprise/hr/leaves' },
              { action: 'Request Overtime', icon: '⚡', href: '/enterprise/hr/overtime' },
            ].map((btn, idx) => (
              <Link key={idx} href={btn.href}>
                <motion.button
                  className="w-full px-4 py-3 bg-white/5 hover:bg-yellow-500/10 text-white border border-yellow-500/20 hover:border-yellow-500/40 rounded-lg text-sm font-medium transition-all flex items-center gap-3"
                  whileHover={{ scale: 1.02, x: 4 }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.05 }}
                >
                  <span className="text-lg">{btn.icon}</span>
                  {btn.action}
                </motion.button>
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* HR Reports Summary */}
      <motion.div
        className="bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20 rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-lg font-bold text-white mb-4">Monthly Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Work Hours', value: '12,480h' },
            { label: 'Average Per Employee', value: '160h' },
            { label: 'Overtime Paid', value: '$3,240' },
            { label: 'Attendance Rate', value: '96.5%' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className="bg-white/5 border border-yellow-500/10 rounded-lg p-4 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + idx * 0.05 }}
            >
              <p className="text-gray-400 text-sm mb-2">{item.label}</p>
              <p className="text-2xl font-bold text-yellow-400">{item.value}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function HRPage() {
  return (
    <ProtectRoute requiredRoles={['ADMIN', 'SUPERADMIN', 'SUPERVISOR']}>
      <HRContent />
    </ProtectRoute>
  );
}
