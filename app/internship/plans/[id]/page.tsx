'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/app/context/AuthContext';
import { ProtectRoute } from '@/app/components/ProtectedRoute';
import { planService, Plan, PlanMilestone } from '@/app/lib/planService';

interface PlanDetail extends Plan {
  milestones: PlanMilestone[];
}

// Mock milestone data
const mockMilestones: PlanMilestone[] = [
  {
    id: '1',
    plan_id: '1',
    week_number: 1,
    phase_name: 'Onboarding & Setup',
    description: 'Get familiar with tools and team',
    objectives: 'Setup development environment, meet team, understand project structure',
    tasks: 'Install Node.js, Git, VS Code; Clone repo; Read documentation; Intro meeting',
    deliverables: 'Dev environment ready; Repo access; Team intro complete',
    due_date: '2026-04-09',
  },
  {
    id: '2',
    plan_id: '1',
    week_number: 2,
    phase_name: 'React Basics',
    description: 'Learn React fundamentals',
    objectives: 'Master components, state, props, and hooks',
    tasks: 'Complete React tutorial; Build 2 simple components; Write tests',
    deliverables: '2 component repos; Tutorial completion certificate',
    due_date: '2026-04-16',
  },
  {
    id: '3',
    plan_id: '1',
    week_number: 3,
    phase_name: 'Node.js & APIs',
    description: 'Build backend APIs',
    objectives: 'Create REST APIs with Node.js and Express',
    tasks: 'Build user auth API; Implement CRUD operations; API documentation',
    deliverables: 'Working API; Documentation; Postman tests',
    due_date: '2026-04-23',
  },
  {
    id: '4',
    plan_id: '1',
    week_number: 4,
    phase_name: 'Database Design',
    description: 'Learn MongoDB and database modeling',
    objectives: 'Design efficient databases and write queries',
    tasks: 'Model 3 databases; Write complex queries; Optimize indexes',
    deliverables: 'Database schemas; Query documentation',
    due_date: '2026-04-30',
  },
  {
    id: '5',
    plan_id: '1',
    week_number: 5,
    phase_name: 'Integration Project',
    description: 'Build integrated app',
    objectives: 'Combine React frontend with Node backend',
    tasks: 'Build full-stack todo app; Implement features; Write tests',
    deliverables: 'Working application; GitHub repo; Test suite',
    due_date: '2026-05-07',
  },
  {
    id: '6',
    plan_id: '1',
    week_number: 6,
    phase_name: 'Deployment',
    description: 'Deploy to production',
    objectives: 'Learn deployment and DevOps basics',
    tasks: 'Deploy to Heroku/AWS; Setup CI/CD; Monitor app',
    deliverables: 'Live application; Deployment guide; Monitoring setup',
    due_date: '2026-05-14',
  },
];

const mockPlanDetail: PlanDetail = {
  id: '1',
  title: 'Full-Stack Web Development',
  description:
    'Comprehensive program for learning modern web development with React and Node.js. Build real-world applications and deploy to production.',
  department_id: 1,
  duration_weeks: 12,
  status: 'ACTIVE',
  learning_objectives: 'Learn React, Node.js, and MongoDB; Build real-world applications; Understand deployment',
  skills_to_develop: 'JavaScript, React, Node.js, MongoDB, Git, REST APIs, Problem-solving',
  tools_technologies: 'React, Node.js, MongoDB, Docker, GitHub, VS Code',
  expected_outcomes: 'Completed 3 projects; Deployed to production; Working knowledge of full-stack development',
  assessment_criteria: 'Project completion; Code quality; Attendance; Final evaluation',
  created_at: '2026-01-15',
  updated_at: '2026-01-15',
  milestones: mockMilestones,
};

function PlanDetailContent({ params }: { params: { id: string } }) {
  const { user } = useAuth();
  const [plan, setPlan] = useState<PlanDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedMilestone, setExpandedMilestone] = useState<string | null>(null);
  const [showAssignModal, setShowAssignModal] = useState(false);

  useEffect(() => {
    const loadPlan = async () => {
      try {
        setIsLoading(true);
        // For demo, use mock data
        // In production: const result = await planService.getPlan(params.id);
        setPlan(mockPlanDetail);
      } catch (err) {
        console.error('Failed to load plan');
      } finally {
        setIsLoading(false);
      }
    };

    loadPlan();
  }, []);

  if (isLoading) {
    return (
      <motion.div className="min-h-screen bg-black pt-32 pb-20 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full border-4 border-yellow-500/30 border-t-yellow-400 animate-spin"></div>
          <p className="text-gray-400">Loading plan...</p>
        </div>
      </motion.div>
    );
  }

  if (!plan) {
    return (
      <motion.div className="min-h-screen bg-black pt-32 pb-20 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="text-center">
          <p className="text-gray-400 text-lg">Plan not found</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div className="min-h-screen bg-black pt-32 pb-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div className="mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">{plan.title}</h1>
              <p className="text-gray-400 mb-4">{plan.description}</p>
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium border border-green-500/30">
                  {plan.status}
                </span>
                <span className="text-sm text-gray-400">Duration: {plan.duration_weeks} weeks</span>
              </div>
            </div>
            {user?.role === 'ADMIN' || user?.role === 'SUPERADMIN' ? (
              <motion.button
                onClick={() => setShowAssignModal(true)}
                className="px-6 py-3 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-500/30 rounded-lg font-semibold transition-all"
                whileHover={{ scale: 1.05 }}
              >
                Assign Intern
              </motion.button>
            ) : (
              <motion.button
                className="px-6 py-3 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-500/30 rounded-lg font-semibold transition-all"
                whileHover={{ scale: 1.05 }}
              >
                Join Program
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Content Grid */}
        <motion.div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          {/* Overview Cards */}
          <motion.div
            className="lg:col-span-1 p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-yellow-500/30"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h3 className="text-lg font-bold text-white mb-4">Learning Objectives</h3>
            <p className="text-gray-400 text-sm mb-6">{plan.learning_objectives}</p>

            <h4 className="text-sm font-semibold text-white mb-2">Skills to Develop</h4>
            <div className="flex flex-wrap gap-2 mb-6">
              {plan.skills_to_develop.split(',').map((skill, idx) => (
                <span key={idx} className="text-xs px-2 py-1 rounded bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                  {skill.trim()}
                </span>
              ))}
            </div>

            <h4 className="text-sm font-semibold text-white mb-2">Tools & Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {plan.tools_technologies.split(',').map((tool, idx) => (
                <span key={idx} className="text-xs px-2 py-1 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  {tool.trim()}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Outcomes & Assessment */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 }}
          >
            <div className="p-6 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-yellow-500/30">
              <h3 className="text-lg font-bold text-white mb-3">Expected Outcomes</h3>
              <p className="text-gray-400 text-sm">{plan.expected_outcomes}</p>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-orange-500/10 to-amber-500/5 border border-yellow-500/30">
              <h3 className="text-lg font-bold text-white mb-3">Assessment Criteria</h3>
              <p className="text-gray-400 text-sm">{plan.assessment_criteria}</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Milestones */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h2 className="text-3xl font-bold text-white mb-6">Program Milestones</h2>
          <div className="space-y-3">
            {plan.milestones.map((milestone, idx) => (
              <motion.div key={milestone.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + idx * 0.05 }}>
                <motion.button
                  onClick={() => setExpandedMilestone(expandedMilestone === milestone.id ? null : milestone.id)}
                  className="w-full p-4 rounded-lg bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20 hover:border-yellow-500/40 transition-all text-left"
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-white font-bold mb-1">
                        Week {milestone.week_number}: {milestone.phase_name}
                      </h3>
                      <p className="text-gray-400 text-sm">{milestone.description}</p>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedMilestone === milestone.id ? 0 : -90 }}
                      transition={{ duration: 0.2 }}
                      className="text-yellow-400 text-lg flex-shrink-0"
                    >
                      ▼
                    </motion.div>
                  </div>

                  {/* Expanded Details */}
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: expandedMilestone === milestone.id ? 'auto' : 0,
                      opacity: expandedMilestone === milestone.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 mt-4 border-t border-yellow-500/10 space-y-3">
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">Objectives</label>
                        <p className="text-gray-400 text-sm mt-1">{milestone.objectives}</p>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">Tasks</label>
                        <p className="text-gray-400 text-sm mt-1">{milestone.tasks}</p>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">Deliverables</label>
                        <p className="text-gray-400 text-sm mt-1">{milestone.deliverables}</p>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-yellow-500/10">
                        <span className="text-xs text-gray-500">Due: {milestone.due_date}</span>
                        <motion.button
                          className="px-3 py-1 text-xs bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded transition-all"
                          whileHover={{ scale: 1.05 }}
                        >
                          Mark Complete
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Assign Modal */}
        {showAssignModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="bg-slate-900 border border-yellow-500/30 rounded-2xl p-8 max-w-md w-full mx-4"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <h3 className="text-xl font-bold text-white mb-4">Assign Intern to Plan</h3>
              <p className="text-gray-400 mb-6">Select an intern to assign to this program</p>

              <div className="space-y-3 mb-6">
                {['intern1@student.com', 'intern2@student.com', 'intern3@student.com'].map((email, idx) => (
                  <motion.button
                    key={idx}
                    className="w-full p-3 rounded-lg bg-white/5 border border-yellow-500/10 hover:border-yellow-500/30 text-white text-left text-sm font-medium transition-all"
                    whileHover={{ x: 4, backgroundColor: 'rgba(255, 215, 0, 0.1)' }}
                  >
                    {email}
                  </motion.button>
                ))}
              </div>

              <div className="flex gap-3">
                <motion.button
                  onClick={() => setShowAssignModal(false)}
                  className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg font-medium"
                  whileHover={{ scale: 1.02 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  className="flex-1 px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded-lg font-medium"
                  whileHover={{ scale: 1.02 }}
                >
                  Assign
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default function PlanDetailPage({ params }: { params: { id: string } }) {
  return (
    <ProtectRoute requiredRoles={['SUPERADMIN', 'ADMIN', 'SUPERVISOR', 'INTERN']}>
      <PlanDetailContent params={params} />
    </ProtectRoute>
  );
}
