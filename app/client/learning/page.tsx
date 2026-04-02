'use client';

import { motion } from 'framer-motion';

export default function LearningMaterialsPage() {
  const materials = [
    {
      id: 1,
      title: 'Fragrance Basics 101',
      description: 'Learn the fundamentals of fragrance composition',
      type: 'Document',
      icon: '📄',
      instructor: 'Alice IT Manager',
      date: '2024-12-15',
    },
    {
      id: 2,
      title: 'Product Knowledge Video',
      description: 'Our signature fragrances explained',
      type: 'Video',
      icon: '🎥',
      instructor: 'Robert Sales Manager',
      date: '2024-12-10',
      duration: '15 min',
    },
    {
      id: 3,
      title: 'Quality Control Guide',
      description: 'Best practices in production',
      type: 'Document',
      icon: '📋',
      instructor: 'Alice IT Manager',
      date: '2024-12-01',
    },
    {
      id: 4,
      title: 'Customer Service Excellence',
      description: 'How to assist customers professionally',
      type: 'Video',
      icon: '🎬',
      instructor: 'Robert Sales Manager',
      date: '2024-11-28',
      duration: '22 min',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Learning Materials</h2>
        <p className="text-gray-400">Documents and videos shared by your supervisor</p>
      </div>

      {/* Materials List */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
      >
        {materials.map((material, idx) => (
          <motion.div
            key={material.id}
            className="p-6 rounded-lg bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20 hover:border-yellow-500/60 transition-all hover:shadow-lg hover:shadow-yellow-500/10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ x: 4 }}
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="text-4xl">{material.icon}</div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white">{material.title}</h3>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                    {material.type}
                  </span>
                </div>

                <p className="text-gray-400 text-sm mb-3">{material.description}</p>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div>
                    <p>
                      <span className="text-gray-400">By:</span> {material.instructor}
                    </p>
                    <p>
                      <span className="text-gray-400">Shared:</span> {material.date}
                    </p>
                  </div>
                  {material.duration && (
                    <div className="text-right">
                      <p className="text-gray-400">Duration: {material.duration}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <motion.button
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded text-sm transition-all whitespace-nowrap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {material.type === 'Video' ? 'Watch' : 'Download'}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State Info */}
      <motion.div
        className="p-8 rounded-lg bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-gray-400 text-sm">New materials are added regularly by your supervisor</p>
      </motion.div>
    </motion.div>
  );
}
