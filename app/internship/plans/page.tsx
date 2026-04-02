'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/app/context/AuthContext';
import { ProtectRoute } from '@/app/components/ProtectedRoute';
import { PlanCard } from '@/app/components/PlanCard';
import { planService, Plan } from '@/app/lib/planService';

function PlansContent() {
  const { user } = useAuth();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('ACTIVE');

  // Mock data for demo
  const mockPlans: Plan[] = [
    {
      id: '1',
      title: 'Full-Stack Web Development',
      description: 'Comprehensive program for learning modern web development with React and Node.js. Build real-world applications and deploy to production.',
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
    },
    {
      id: '2',
      title: 'Digital Marketing Strategy',
      description: 'Learn to plan, execute, and analyze digital marketing campaigns. Master SEO, social media, and analytics.',
      department_id: 2,
      duration_weeks: 10,
      status: 'ACTIVE',
      learning_objectives: 'Master marketing fundamentals; Run campaigns; Analyze metrics',
      skills_to_develop: 'Marketing strategy, SEO, Social media, Analytics, Content creation',
      tools_technologies: 'Google Analytics, Mailchimp, Canva, Buffer, Meta Business Suite',
      expected_outcomes: 'Execute 2 campaigns; Increase engagement by 25%; Create marketing plan',
      assessment_criteria: 'Campaign performance; Engagement metrics; Presentation skills',
      created_at: '2026-01-20',
      updated_at: '2026-01-20',
    },
    {
      id: '3',
      title: 'HR Operations & Recruitment',
      description: 'Support HR operations and learn recruitment best practices. Contribute to hiring process and employee management.',
      department_id: 3,
      duration_weeks: 8,
      status: 'ACTIVE',
      learning_objectives: 'Understand HR processes; Learn recruitment; Support team operations',
      skills_to_develop: 'Recruitment, HR systems, Communication, Problem-solving, Data management',
      tools_technologies: 'ATS software, HRIS, Excel, Slack, Zoom',
      expected_outcomes: 'Successfully recruited 5 candidates; Streamlined processes; Support 2 events',
      assessment_criteria: 'Candidate feedback; Process improvements; Communication',
      created_at: '2026-02-01',
      updated_at: '2026-02-01',
    },
    {
      id: '4',
      title: 'Administrative Excellence',
      description: 'Master administrative operations and office management. Support company operations and coordinate events.',
      department_id: 4,
      duration_weeks: 6,
      status: 'ACTIVE',
      learning_objectives: 'Learn office management; Improve procedures; Develop admin skills',
      skills_to_develop: 'Organization, Communication, Technology, Problem-solving, File management',
      tools_technologies: 'Office 365, Google Workspace, Asana, Slack, MS Teams',
      expected_outcomes: 'Organized 3 company events; Reduced admin time by 20%; Trained team',
      assessment_criteria: 'Event feedback; Process metrics; Team feedback',
      created_at: '2026-02-10',
      updated_at: '2026-02-10',
    },
    {
      id: '5',
      title: 'Data Science & Analytics',
      description: 'Learn data analysis, visualization, and machine learning fundamentals. Work with real datasets.',
      department_id: 1,
      duration_weeks: 14,
      status: 'DRAFT',
      learning_objectives: 'Master Python, pandas, visualization; Build predictive models',
      skills_to_develop: 'Python, Data analysis, Machine learning, Statistics, Visualization',
      tools_technologies: 'Python, Jupyter, Pandas, Matplotlib, Scikit-learn, SQL, Tableau',
      expected_outcomes: 'Complete 2 data projects; Present findings; Deploy model',
      assessment_criteria: 'Project quality; Analysis depth; Visualization clarity',
      created_at: '2026-02-15',
      updated_at: '2026-02-15',
    },
    {
      id: '6',
      title: 'UI/UX Design Principles',
      description: 'Learn design fundamentals, user research, and prototyping. Create user-centered design solutions.',
      department_id: 1,
      duration_weeks: 10,
      status: 'COMPLETED',
      learning_objectives: 'Master design thinking; Create prototypes; Conduct user testing',
      skills_to_develop: 'UI/UX design, User research, Wireframing, Prototyping, Design thinking',
      tools_technologies: 'Figma, Adobe XD, InVision, Sketch, User testing tools',
      expected_outcomes: 'Complete 3 design projects; User test prototypes; Design system',
      assessment_criteria: 'Design quality; User satisfaction; Documentation',
      created_at: '2025-11-01',
      updated_at: '2025-11-01',
    },
  ];

  useEffect(() => {
    const loadPlans = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // For demo, use mock data instead of API
        // In production: const result = await planService.listPlans({ status: statusFilter });
        const filtered = mockPlans.filter((p) => statusFilter === '' || p.status === statusFilter);
        setPlans(filtered);
      } catch (err) {
        setError('Failed to load plans');
      } finally {
        setIsLoading(false);
      }
    };

    loadPlans();
  }, [statusFilter]);

  return (
    <motion.div className="min-h-screen bg-black pt-32 pb-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div className="mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Internship <span className="text-yellow-400">Plans</span>
              </h1>
              <p className="text-gray-400">Structured learning programs with clear objectives and milestones</p>
            </div>
            {user?.role === 'ADMIN' || user?.role === 'SUPERADMIN' ? (
              <motion.button
                className="px-6 py-3 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-500/30 rounded-lg font-semibold transition-all"
                whileHover={{ scale: 1.05 }}
              >
                + Create Plan
              </motion.button>
            ) : null}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Total Plans', value: mockPlans.length, icon: '📋' },
              { label: 'Active', value: mockPlans.filter((p) => p.status === 'ACTIVE').length, icon: '✓' },
              { label: 'Avg Duration', value: '10 weeks', icon: '⏱️' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                className="p-4 rounded-lg bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <div className="text-2xl mb-2">{stat.icon}</div>
                <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-yellow-400">{stat.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Filter */}
        <motion.div className="mb-8" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="flex gap-3 flex-wrap">
            {['ACTIVE', 'DRAFT', 'COMPLETED', 'ARCHIVED', ''].map((status) => (
              <motion.button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  statusFilter === status
                    ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                    : 'bg-white/5 text-gray-400 border border-yellow-500/10 hover:border-yellow-500/20'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                {status || 'All Plans'}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Error */}
        {error && (
          <motion.div className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {error}
          </motion.div>
        )}

        {/* Plans Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full border-4 border-yellow-500/30 border-t-yellow-400 animate-spin"></div>
              <p className="text-gray-400">Loading plans...</p>
            </div>
          </div>
        ) : plans.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, staggerChildren: 0.05 }}
          >
            {plans.map((plan, idx) => (
              <PlanCard key={plan.id} plan={plan} index={idx} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-gray-400 text-lg mb-4">No plans found</p>
            {statusFilter && statusFilter !== '' && (
              <motion.button
                onClick={() => setStatusFilter('')}
                className="px-4 py-2 bg-yellow-500/20 text-yellow-400 rounded-lg text-sm"
                whileHover={{ scale: 1.05 }}
              >
                View All Plans
              </motion.button>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default function PlansPage() {
  return (
    <ProtectRoute requiredRoles={['SUPERADMIN', 'ADMIN', 'SUPERVISOR', 'INTERN']}>
      <PlansContent />
    </ProtectRoute>
  );
}
