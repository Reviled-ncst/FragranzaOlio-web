'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function InternsPage() {
  // Mock interns data
  const interns = [
    {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      email: 'intern.general@example.com',
      department: 'IT',
      progress: 65,
      supervisor: 'Alice Johnson',
      startDate: '2024-03-01',
    },
    {
      id: 2,
      first_name: 'Sarah',
      last_name: 'Smith',
      email: 'intern2@example.com',
      department: 'HR',
      progress: 45,
      supervisor: 'Bob Manager',
      startDate: '2024-03-15',
    },
    {
      id: 3,
      first_name: 'Michael',
      last_name: 'Johnson',
      email: 'intern3@example.com',
      department: 'IT',
      progress: 80,
      supervisor: 'Alice Johnson',
      startDate: '2024-02-20',
    },
    {
      id: 4,
      first_name: 'Emily',
      last_name: 'Davis',
      email: 'intern4@example.com',
      department: 'Sales',
      progress: 55,
      supervisor: 'Robert Sales Manager',
      startDate: '2024-03-08',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Intern Dashboard</h2>
        <p className="text-gray-400">Manage and monitor intern programs</p>
      </div>

      {/* Stats */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {[
          { label: 'Total Interns', value: interns.length, icon: '👥' },
          { label: 'Active Programs', value: interns.length, icon: '📚' },
          { label: 'Avg Progress', value: '61%', icon: '📈' },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            className="p-4 rounded-lg bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + idx * 0.05 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
              </div>
              <div className="text-4xl">{stat.icon}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Interns Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {interns.map((intern, idx) => (
          <Link key={intern.id} href={`/enterprise/interns/${intern.id}`}>
            <motion.div
              className="p-6 rounded-lg bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20 hover:border-yellow-500/50 hover:bg-yellow-500/5 cursor-pointer transition-all h-full"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.05 }}
              whileHover={{ y: -4 }}
            >
              {/* Avatar */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white font-bold text-lg">
                  {intern.first_name[0]}{intern.last_name[0]}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white">
                    {intern.first_name} {intern.last_name}
                  </h3>
                  <p className="text-xs text-gray-500">{intern.email}</p>
                </div>
              </div>

              {/* Info */}
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-center justify-between text-gray-400">
                  <span>Department:</span>
                  <span className="text-yellow-400 font-medium">{intern.department}</span>
                </div>
                <div className="flex items-center justify-between text-gray-400">
                  <span>Supervisor:</span>
                  <span className="text-yellow-400 font-medium text-xs">{intern.supervisor}</span>
                </div>
                <div className="flex items-center justify-between text-gray-400">
                  <span>Started:</span>
                  <span className="text-yellow-400 font-medium text-xs">{intern.startDate}</span>
                </div>
              </div>

              {/* Progress */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400">Progress</span>
                  <span className="text-sm font-bold text-yellow-400">{intern.progress}%</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden border border-yellow-500/20">
                  <motion.div
                    className="h-full bg-gradient-to-r from-yellow-500 to-amber-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${intern.progress}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  />
                </div>
              </div>

              {/* View Button */}
              <motion.button
                className="w-full mt-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-500/30 rounded-lg text-sm font-medium transition-all"
                whileHover={{ scale: 1.02 }}
              >
                View Profile →
              </motion.button>
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </motion.div>
  );
}
