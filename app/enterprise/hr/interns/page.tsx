'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/app/context/AuthContext';
import { ProtectRoute } from '@/app/components/ProtectedRoute';

function InternsContent() {
  const { user } = useAuth();
  const [interns, setInterns] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [selectedIntern, setSelectedIntern] = useState<any>(null);

  // Mock data
  const mockInterns = [
    {
      id: 1,
      first_name: 'Emma',
      last_name: 'Davis',
      email: 'emma.davis@university.edu',
      university: 'State University',
      program: 'Full-Stack Web Development',
      start_date: '2026-01-15',
      end_date: '2026-03-15',
      status: 'ACTIVE',
      mentor_name: 'John Smith',
      progress_percentage: 75,
      timesheet_hours: 240,
      tasks_completed: 18,
      skills_developed: ['React', 'Node.js', 'MongoDB', 'RESTful APIs'],
      attendance_percentage: 96,
      evaluation_rating: 4.5,
      learning_objectives: [
        { text: 'Master React hooks and state management', completed: true },
        { text: 'Build full-stack applications', completed: true },
        { text: 'Implement database designs', completed: false },
      ],
      recent_feedback: 'Excellent progress. Shows strong understanding of frontend concepts.',
    },
    {
      id: 2,
      first_name: 'Grace',
      last_name: 'Wilson',
      email: 'grace.wilson@university.edu',
      university: 'Tech Institute',
      program: 'Digital Marketing Strategy',
      start_date: '2026-02-01',
      end_date: '2026-04-01',
      status: 'ACTIVE',
      mentor_name: 'Sarah Johnson',
      progress_percentage: 50,
      timesheet_hours: 160,
      tasks_completed: 12,
      skills_developed: ['Social Media Strategy', 'Analytics', 'Content Creation', 'SEO basics'],
      attendance_percentage: 92,
      evaluation_rating: 4.0,
      learning_objectives: [
        { text: 'Understand marketing funnels', completed: true },
        { text: 'Execute social media campaigns', completed: true },
        { text: 'Analyze campaign performance', completed: false },
      ],
      recent_feedback: 'Good initiative. Continue to develop analytical skills.',
    },
    {
      id: 3,
      first_name: 'Michael',
      last_name: 'Chen',
      email: 'michael.chen@university.edu',
      university: 'Engineering College',
      program: 'Full-Stack Web Development',
      start_date: '2025-11-01',
      end_date: '2026-01-31',
      status: 'COMPLETED',
      mentor_name: 'John Smith',
      progress_percentage: 100,
      timesheet_hours: 320,
      tasks_completed: 32,
      skills_developed: ['React', 'Node.js', 'MongoDB', 'RESTful APIs', 'Docker', 'CI/CD'],
      attendance_percentage: 98,
      evaluation_rating: 4.8,
      learning_objectives: [
        { text: 'Master React hooks and state management', completed: true },
        { text: 'Build full-stack applications', completed: true },
        { text: 'Implement database designs', completed: true },
      ],
      recent_feedback: 'Outstanding performance. Ready for junior developer position.',
    },
  ];

  useEffect(() => {
    const loadInterns = async () => {
      try {
        setIsLoading(true);
        const filtered =
          filter === 'all'
            ? mockInterns
            : mockInterns.filter((i) => i.status.toLowerCase() === filter);
        setInterns(filtered);
      } catch (err) {
        console.error('Failed to load interns', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadInterns();
  }, [filter]);

  return (
    <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Header */}
      <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <h1 className="text-3xl font-bold text-white mb-2">Intern Management</h1>
        <p className="text-gray-400">Track intern progress, evaluations, and learning objectives across all modules</p>
      </motion.div>

      {/* Key Stats */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {[
          { label: 'Active Interns', value: interns.filter((i) => i.status === 'ACTIVE').length, icon: '🎓' },
          { label: 'Completed', value: interns.filter((i) => i.status === 'COMPLETED').length, icon: '✓' },
          { label: 'Avg Progress', value: Math.round(interns.reduce((sum, i) => sum + i.progress_percentage, 0) / interns.length) + '%', icon: '📊' },
          { label: 'Avg Rating', value: (interns.reduce((sum, i) => sum + i.evaluation_rating, 0) / interns.length).toFixed(1), icon: '⭐' },
        ].map((stat: {label: string; value: string|number; icon: string}, idx: number) => (
          <motion.div
            key={idx}
            className="bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20 rounded-xl p-4"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 + idx * 0.05 }}
          >
            <div className="text-2xl mb-2">{stat.icon}</div>
            <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-yellow-400">{stat.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Filters */}
      <motion.div className="flex gap-3" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
        {(['all', 'active', 'completed'] as const).map((status: 'all' | 'active' | 'completed') => (
          <motion.button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${
              filter === status
                ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                : 'bg-white/5 text-gray-400 border border-yellow-500/10 hover:border-yellow-500/30'
            }`}
            whileHover={{ scale: 1.05 }}
          >
            {status}
          </motion.button>
        ))}
      </motion.div>

      {/* Interns List */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-4 border-yellow-500/30 border-t-yellow-400 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-400">Loading interns...</p>
        </div>
      ) : (
        <motion.div className="space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          {interns.map((intern: any, idx: number) => (
            <motion.div
              key={intern.id}
              className="bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20 rounded-xl p-6 hover:border-yellow-500/40 transition-all"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + idx * 0.05 }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-indigo-500/20 border border-indigo-500/30 rounded-lg flex items-center justify-center text-lg">🎓</div>
                    <div>
                      <h3 className="text-white font-bold text-lg">
                        {intern.first_name} {intern.last_name}
                      </h3>
                      <p className="text-gray-400 text-sm">{intern.university}</p>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${
                      intern.status === 'ACTIVE'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-blue-500/20 text-blue-400'
                    }`}
                  >
                    {intern.status}
                  </span>
                </div>
              </div>

              {/* Program & Mentor */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-gray-500 text-xs">Program</p>
                  <p className="text-yellow-400 font-semibold text-sm">{intern.program}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Mentor</p>
                  <p className="text-yellow-400 font-semibold text-sm">{intern.mentor_name}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Rating</p>
                  <p className="text-yellow-400 font-semibold text-sm">⭐ {intern.evaluation_rating}/5</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-400 text-sm">Overall Progress</p>
                  <p className="text-yellow-400 font-bold">{intern.progress_percentage}%</p>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="bg-yellow-500 h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${intern.progress_percentage}%` }}
                    transition={{ delay: 0.2 + idx * 0.05 + 0.3, duration: 1 }}
                  />
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <div className="bg-white/5 rounded-lg p-3 text-center border border-yellow-500/10">
                  <p className="text-gray-400 text-xs mb-1">Hours</p>
                  <p className="text-lg font-bold text-yellow-400">{intern.timesheet_hours}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center border border-yellow-500/10">
                  <p className="text-gray-400 text-xs mb-1">Tasks Done</p>
                  <p className="text-lg font-bold text-yellow-400">{intern.tasks_completed}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center border border-yellow-500/10">
                  <p className="text-gray-400 text-xs mb-1">Attendance</p>
                  <p className="text-lg font-bold text-yellow-400">{intern.attendance_percentage}%</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center border border-yellow-500/10">
                  <p className="text-gray-400 text-xs mb-1">Skills</p>
                  <p className="text-lg font-bold text-yellow-400">{intern.skills_developed.length}</p>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-4">
                <p className="text-gray-400 text-sm mb-2">Skills Developed</p>
                <div className="flex flex-wrap gap-2">
                  {intern.skills_developed.map((skill: string, sidx: number) => (
                    <span key={sidx} className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recent Feedback */}
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 mb-4">
                <p className="text-gray-400 text-xs mb-1">Latest Feedback</p>
                <p className="text-gray-200 text-sm">{intern.recent_feedback}</p>
              </div>

              {/* Learning Objectives */}
              <div className="mb-4">
                <p className="text-gray-400 text-sm mb-2">Learning Objectives</p>
                <div className="space-y-2">
                  {intern.learning_objectives.map((obj: any, oidx: number) => (
                    <div key={oidx} className="flex items-start gap-2">
                      <span className={`text-lg ${obj.completed ? 'text-green-400' : 'text-gray-500'}`}>
                        {obj.completed ? '✓' : '○'}
                      </span>
                      <p className={obj.completed ? 'text-gray-300 line-through' : 'text-gray-300'}>{obj.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dates */}
              <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-yellow-500/10">
                <p>
                  Started: <span className="text-gray-300">{intern.start_date}</span>
                </p>
                <p>
                  Ends: <span className="text-gray-300">{intern.end_date}</span>
                </p>
                <p>
                  Duration: <span className="text-gray-300">12 weeks</span>
                </p>
              </div>

              {/* Actions */}
              {user?.role === 'ADMIN' || user?.role === 'SUPERVISOR' ? (
                <div className="flex gap-2 mt-4 pt-4 border-t border-yellow-500/10">
                  <motion.button
                    onClick={() => setSelectedIntern(intern)}
                    className="flex-1 px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30 rounded text-xs font-medium transition-all"
                    whileHover={{ scale: 1.02 }}
                  >
                    👁 View Details
                  </motion.button>
                  <motion.button
                    className="flex-1 px-3 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-500/30 rounded text-xs font-medium transition-all"
                    whileHover={{ scale: 1.02 }}
                  >
                    ✎ Add Feedback
                  </motion.button>
                </div>
              ) : null}
            </motion.div>
          ))}

          {interns.length === 0 && (
            <div className="text-center py-12 bg-white/5 rounded-lg border border-yellow-500/10">
              <p className="text-gray-400">No interns found</p>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

export default function InternsPage() {
  return (
    <ProtectRoute requiredRoles={['ADMIN', 'SUPERVISOR', 'INTERN']}>
      <InternsContent />
    </ProtectRoute>
  );
}
