'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ProtectRoute } from '@/app/components/ProtectedRoute';

interface InternProfilePageProps {
  params: {
    id: string;
  };
}

export default function InternProfilePage({ params }: InternProfilePageProps) {
  const router = useRouter();

  // Mock intern data - in production, fetch based on params.id
  const intern = {
    id: params.id,
    first_name: 'John',
    last_name: 'Doe',
    email: 'intern.general@example.com',
    phone: '+1 (555) 123-4567',
    department: 'IT',
    startDate: '2024-03-01',
    assignedPlan: {
      name: 'Full-Stack Web Development',
      progress: 65,
      endDate: '2024-05-24',
    },
    skills: [
      { name: 'HTML/CSS', level: 4, maxLevel: 5 },
      { name: 'JavaScript', level: 3, maxLevel: 5 },
      { name: 'React', level: 3, maxLevel: 5 },
      { name: 'Node.js', level: 2, maxLevel: 5 },
    ],
    milestones: [
      { week: 1, title: 'Setup & Onboarding', completed: true },
      { week: 2, title: 'Frontend Basics', completed: true },
      { week: 3, title: 'React Introduction', completed: true },
      { week: 4, title: 'State Management', completed: false },
    ],
    feedback: [
      {
        date: '2024-03-25',
        text: 'Great progress on React components! Keep up the good work.',
        rating: 5,
      },
      {
        date: '2024-03-18',
        text: 'Good understanding of state management. Practice more with context API.',
        rating: 4,
      },
    ],
  };

  const overallProgress = intern.assignedPlan.progress;
  const skillsMastered = intern.skills.filter((s) => s.level >= 4).length;

  return (
    <ProtectRoute requiredRoles={['SUPERADMIN', 'ADMIN', 'SUPERVISOR']}>
      <motion.div className="min-h-screen bg-black pt-20 pb-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div className="mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-4 mb-6">
              <motion.button
                onClick={() => router.back()}
                className="px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-500/30 rounded-lg text-sm font-medium"
                whileHover={{ scale: 1.05 }}
              >
                ← Back
              </motion.button>
            </div>
            <div className="flex items-start gap-6 mb-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-3xl font-bold text-black">
                {intern.first_name[0]}{intern.last_name[0]}
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-white mb-2">
                  {intern.first_name} {intern.last_name}
                </h1>
                <p className="text-gray-400 mb-2">{intern.email}</p>
                <div className="flex gap-4 text-sm text-gray-400">
                  <span>📱 {intern.phone}</span>
                  <span>🏢 {intern.department}</span>
                  <span>📅 Started {intern.startDate}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {[
              { label: 'Overall Progress', value: `${overallProgress}%`, icon: '📈' },
              { label: 'Skills Mastered', value: `${skillsMastered}/4`, icon: '⭐' },
              { label: 'Milestones Completed', value: '3/4', icon: '✓' },
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

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Assigned Plan */}
              <motion.div
                className="p-6 rounded-lg bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-xl font-bold text-white mb-4">Assigned Plan</h3>
                <div className="mb-4">
                  <p className="font-semibold text-white mb-1">{intern.assignedPlan.name}</p>
                  <p className="text-sm text-gray-400">Ends: {intern.assignedPlan.endDate}</p>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-gray-400">Progress</span>
                  <span className="text-sm font-semibold text-yellow-400">{overallProgress}%</span>
                </div>
                <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden border border-yellow-500/20">
                  <motion.div
                    className="h-full bg-gradient-to-r from-yellow-500 to-amber-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${overallProgress}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  />
                </div>
              </motion.div>

              {/* Skills */}
              <motion.div
                className="p-6 rounded-lg bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-xl font-bold text-white mb-4">Skills Development</h3>
                <div className="space-y-3">
                  {intern.skills.map((skill, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + idx * 0.05 }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-white">{skill.name}</span>
                        <span className="text-xs text-gray-400">{skill.level}/{skill.maxLevel}</span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden border border-yellow-500/20">
                        <motion.div
                          className="h-full bg-gradient-to-r from-yellow-500 to-amber-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${(skill.level / skill.maxLevel) * 100}%` }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Milestones */}
              <motion.div
                className="p-6 rounded-lg bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-xl font-bold text-white mb-4">Milestones</h3>
                <div className="space-y-2">
                  {intern.milestones.map((milestone, idx) => (
                    <motion.div
                      key={idx}
                      className={`p-3 rounded-lg flex items-center gap-3 ${
                        milestone.completed ? 'bg-green-500/10 border border-green-500/30' : 'bg-white/5 border border-yellow-500/20'
                      }`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + idx * 0.05 }}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                        milestone.completed ? 'bg-green-500 text-white' : 'bg-yellow-500/30 text-yellow-400'
                      }`}>
                        {milestone.completed ? '✓' : milestone.week}
                      </div>
                      <span className={milestone.completed ? 'text-green-400 text-sm' : 'text-white text-sm'}>
                        Week {milestone.week}: {milestone.title}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* Feedback */}
              <div className="p-6 rounded-lg bg-gradient-to-br from-blue-900/30 to-black/50 border border-blue-500/20">
                <h3 className="text-lg font-bold text-white mb-4">Your Feedback</h3>
                <div className="space-y-4">
                  {intern.feedback.map((item, idx) => (
                    <motion.div
                      key={idx}
                      className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + idx * 0.05 }}
                    >
                      <div className="flex gap-1 mb-2">
                        {Array.from({ length: item.rating }).map((_, i) => (
                          <span key={i} className="text-sm text-yellow-400">⭐</span>
                        ))}
                      </div>
                      <p className="text-xs text-gray-300">{item.text}</p>
                      <p className="text-xs text-gray-500 mt-2">{item.date}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 rounded-lg bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20 space-y-3">
                <h3 className="text-lg font-bold text-white mb-4">Actions</h3>
                <motion.button
                  className="w-full px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-500/30 rounded-lg text-sm font-medium transition-all"
                  whileHover={{ scale: 1.02 }}
                >
                  📝 Add Feedback
                </motion.button>
                <motion.button
                  className="w-full px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30 rounded-lg text-sm font-medium transition-all"
                  whileHover={{ scale: 1.02 }}
                >
                  📚 Assign Plan
                </motion.button>
                <motion.button
                  className="w-full px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border border-purple-500/30 rounded-lg text-sm font-medium transition-all"
                  whileHover={{ scale: 1.02 }}
                >
                  📊 View Report
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </ProtectRoute>
  );
}
