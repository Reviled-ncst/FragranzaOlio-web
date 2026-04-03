'use client';

import { motion } from 'framer-motion';
import { useAuth } from '@/app/context/AuthContext';
import { ProtectRoute } from '@/app/components/ProtectedRoute';
import { AccountLayout } from '@/app/components/AccountLayout';

function InternDashboardContent() {
  const { user } = useAuth();

  // Mock assigned plans
  const assignedPlans = [
    {
      id: 1,
      name: 'Full-Stack Web Development',
      supervisor: 'Alice Johnson',
      progress: 65,
      duration: '12 weeks',
      startDate: '2024-03-01',
      endDate: '2024-05-24',
    },
  ];

  // Mock milestones
  const milestones = [
    { id: 1, week: 1, title: 'Setup & Onboarding', completed: true, dueDate: '2024-03-08' },
    { id: 2, week: 2, title: 'Frontend Basics', completed: true, dueDate: '2024-03-15' },
    { id: 3, week: 3, title: 'React Introduction', completed: true, dueDate: '2024-03-22' },
    { id: 4, week: 4, title: 'State Management', completed: false, dueDate: '2024-03-29' },
    { id: 5, week: 5, title: 'Backend Integration', completed: false, dueDate: '2024-04-05' },
  ];

  // Mock skills
  const skills = [
    { name: 'HTML/CSS', level: 4, maxLevel: 5 },
    { name: 'JavaScript', level: 3, maxLevel: 5 },
    { name: 'React', level: 3, maxLevel: 5 },
    { name: 'Node.js', level: 2, maxLevel: 5 },
    { name: 'Database Design', level: 2, maxLevel: 5 },
  ];

  // Mock feedback
  const feedback = [
    {
      id: 1,
      supervisor: 'Alice Johnson',
      date: '2024-03-25',
      text: 'Great progress on React components! Keep up the good work.',
      rating: 5,
    },
    {
      id: 2,
      supervisor: 'Alice Johnson',
      date: '2024-03-18',
      text: 'Good understanding of state management. Practice more with context API.',
      rating: 4,
    },
  ];

  // Mock learning materials accessed
  const materialsAccessed = [
    {
      id: 1,
      title: 'React Hooks Guide',
      type: 'Document',
      accessedDate: '2024-03-23',
      duration: '15 mins',
    },
    {
      id: 2,
      title: 'Component Patterns Tutorial',
      type: 'Video',
      accessedDate: '2024-03-20',
      duration: '45 mins',
    },
    {
      id: 3,
      title: 'CSS Flexbox Basics',
      type: 'Document',
      accessedDate: '2024-03-15',
      duration: '10 mins',
    },
  ];

  // Mock available learning materials
  const availableMaterials = [
    {
      id: 1,
      topic: 'Frontend Development',
      materials: [
        { id: 'mat-1', title: 'React Hooks Guide', type: 'Document', duration: '15 mins', completed: true },
        { id: 'mat-2', title: 'Component Patterns Tutorial', type: 'Video', duration: '45 mins', completed: true },
        { id: 'mat-3', title: 'Advanced React Patterns', type: 'Document', duration: '30 mins', completed: false },
      ],
    },
    {
      id: 2,
      topic: 'Backend Development',
      materials: [
        { id: 'mat-4', title: 'Node.js Fundamentals', type: 'Video', duration: '60 mins', completed: false },
        { id: 'mat-5', title: 'Express.js REST APIs', type: 'Document', duration: '20 mins', completed: false },
      ],
    },
    {
      id: 3,
      topic: 'Database & SQL',
      materials: [
        { id: 'mat-6', title: 'SQL Basics', type: 'Document', duration: '25 mins', completed: false },
        { id: 'mat-7', title: 'Database Design Principles', type: 'Video', duration: '50 mins', completed: false },
      ],
    },
  ];

  return (
    <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Internship Dashboard</h2>
        <p className="text-gray-400">Track your progress, skills, and learning journey</p>
      </div>

      {/* Stats Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {[
          { label: 'Overall Progress', value: '65%', icon: '📈' },
          { label: 'Skills Mastered', value: '2/5', icon: '⭐' },
          { label: 'Materials Accessed', value: '8', icon: '📚' },
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

      {/* Assigned Plans */}
      <motion.div
        className="p-8 rounded-lg bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-xl font-bold text-white mb-6">Assigned Internship Plan</h3>
        {assignedPlans.map((plan) => (
          <motion.div key={plan.id} className="space-y-4">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-lg font-semibold text-white">{plan.name}</h4>
                <p className="text-sm text-gray-400">
                  Supervisor: <span className="text-yellow-400">{plan.supervisor}</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">{plan.duration}</p>
                <p className="text-xs text-gray-500">
                  {plan.startDate} to {plan.endDate}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Progress</span>
                <span className="text-sm font-semibold text-yellow-400">{plan.progress}%</span>
              </div>
              <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden border border-yellow-500/20">
                <motion.div
                  className="h-full bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${plan.progress}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Milestones */}
      <motion.div
        className="p-8 rounded-lg bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-xl font-bold text-white mb-6">Weekly Milestones</h3>
        <div className="space-y-3">
          {milestones.map((milestone, idx) => (
            <motion.div
              key={milestone.id}
              className={`p-4 rounded-lg border transition-all ${
                milestone.completed
                  ? 'bg-green-500/10 border-green-500/30'
                  : 'bg-white/5 border-yellow-500/20'
              }`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + idx * 0.05 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                      milestone.completed
                        ? 'bg-green-500 text-white'
                        : 'bg-yellow-500/30 text-yellow-400'
                    }`}
                  >
                    {milestone.completed ? '✓' : milestone.week}
                  </div>
                  <div>
                    <p className="text-white font-semibold">Week {milestone.week}: {milestone.title}</p>
                    <p className="text-xs text-gray-500">Due: {milestone.dueDate}</p>
                  </div>
                </div>
                <span className={`text-xs font-medium ${milestone.completed ? 'text-green-400' : 'text-gray-400'}`}>
                  {milestone.completed ? 'COMPLETED' : 'IN PROGRESS'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Skills Progress */}
      <motion.div
        className="p-8 rounded-lg bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-xl font-bold text-white mb-6">Skills Development</h3>
        <div className="space-y-4">
          {skills.map((skill, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + idx * 0.05 }}
            >
              <div className="flex items-center justify-between mb-2">
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

      {/* Supervisor Feedback */}
      <motion.div
        className="p-8 rounded-lg bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-xl font-bold text-white mb-6">Supervisor Feedback</h3>
        <div className="space-y-4">
          {feedback.map((item, idx) => (
            <motion.div
              key={item.id}
              className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + idx * 0.05 }}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold text-white">{item.supervisor}</p>
                  <p className="text-xs text-gray-400">{item.date}</p>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <span key={i} className="text-yellow-400">⭐</span>
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-300">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Available Learning Library */}
      <motion.div
        className="p-8 rounded-lg bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <h3 className="text-xl font-bold text-white mb-6">📚 Learning Library</h3>
        <div className="space-y-6">
          {availableMaterials.map((topicGroup, topicIdx) => (
            <motion.div
              key={topicGroup.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + topicIdx * 0.05 }}
            >
              <h4 className="text-lg font-semibold text-yellow-400 mb-3">{topicGroup.topic}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {topicGroup.materials.map((material) => (
                  <motion.div
                    key={material.id}
                    className={`p-4 rounded-lg border transition-all cursor-pointer hover:border-yellow-500/50 ${
                      material.completed
                        ? 'bg-green-500/10 border-green-500/30'
                        : 'bg-blue-500/10 border-blue-500/30'
                    }`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{material.type === 'Document' ? '📄' : '🎥'}</span>
                        <div>
                          <p className="font-semibold text-white text-sm">{material.title}</p>
                          <p className="text-xs text-gray-400">{material.type} • {material.duration}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${
                          material.completed
                            ? 'bg-green-500/20 text-green-300'
                            : 'bg-yellow-500/20 text-yellow-300'
                        }`}
                      >
                        {material.completed ? '✓ Completed' : 'Available'}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function InternDashboardPage() {
  return (
    <ProtectRoute requiredRoles={['INTERN']}>
      <AccountLayout>
        <InternDashboardContent />
      </AccountLayout>
    </ProtectRoute>
  );
}
