'use client';

import { motion } from 'framer-motion';
import { useAuth } from '@/app/context/AuthContext';

export default function TasksPage() {
  const { user } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Task Management</h2>
        <p className="text-gray-400">Manage and track internship tasks</p>
      </div>

      <motion.div
        className="p-8 rounded-lg bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="text-lg font-semibold text-white mb-4">Coming Soon</h3>
        <p className="text-gray-400 mb-4">Task management interface with:</p>
        <ul className="space-y-2 text-gray-400">
          <li>✓ Task creation and assignment</li>
          <li>✓ Status tracking (Pending, In Progress, Completed)</li>
          <li>✓ Priority levels and deadlines</li>
          <li>✓ Comments and attachments</li>
          <li>✓ Team collaboration features</li>
        </ul>
      </motion.div>
    </motion.div>
  );
}
