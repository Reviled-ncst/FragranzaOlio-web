'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function InternshipPage() {
  const opportunities = [
    {
      id: 1,
      title: 'Software Development Intern',
      department: 'Computer Science & Engineering',
      location: 'San Francisco, CA',
      duration: '3-4 months',
      stipend: '$2,500/month',
      description: 'Join our engineering team and work on full-stack web applications',
      link: '/internship/opportunity/software-dev',
    },
    {
      id: 2,
      title: 'Data Analytics Intern',
      department: 'Computer Science & Engineering',
      location: 'Austin, TX',
      duration: '3 months',
      stipend: '$2,200/month',
      description: 'Analyze business data and create insightful reports using Python & Tableau',
      link: '/internship/opportunity/data-analytics',
    },
    {
      id: 3,
      title: 'UI/UX Designer Intern',
      department: 'Computer Science & Engineering',
      location: 'Remote',
      duration: '3-4 months',
      stipend: '$2,000/month',
      description: 'Design beautiful user interfaces and conduct user research',
      link: '/internship/opportunity/ui-ux',
    },
    {
      id: 4,
      title: 'Digital Marketing Intern',
      department: 'Marketing',
      location: 'New York, NY',
      duration: '4 months',
      stipend: '$1,800/month',
      description: 'Create and manage digital marketing campaigns across social media platforms',
      link: '/internship/opportunity/digital-marketing',
    },
    {
      id: 5,
      title: 'Content Marketing Intern',
      department: 'Marketing',
      location: 'Remote',
      duration: '3 months',
      stipend: '$1,700/month',
      description: 'Create engaging content for blogs, social media, and marketing materials',
      link: '/internship/opportunity/content-marketing',
    },
    {
      id: 6,
      title: 'HR Coordinator Intern',
      department: 'Human Resources',
      location: 'Chicago, IL',
      duration: '4 months',
      stipend: '$1,600/month',
      description: 'Support HR operations including recruitment, onboarding, and employee engagement',
      link: '/internship/opportunity/hr-coordinator',
    },
    {
      id: 7,
      title: 'Administrative Assistant Intern',
      department: 'Administration',
      location: 'Remote',
      duration: '3 months',
      stipend: '$1,500/month',
      description: 'Provide administrative support and help organize company operations',
      link: '/internship/opportunity/admin-assistant',
    },
    {
      id: 8,
      title: 'Project Management Intern',
      department: 'Administration',
      location: 'Boston, MA',
      duration: '4 months',
      stipend: '$1,900/month',
      description: 'Assist in managing projects and coordinating between teams',
      link: '/internship/opportunity/project-management',
    },
  ];

  const departments = ['All Departments', 'Computer Science', 'Marketing', 'Human Resources', 'Administration'];

  return (
    <main className="min-h-screen bg-black pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 font-serif">
            Launch Your <span className="text-yellow-400">Career</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            Gain real-world experience through our comprehensive internship program. Open opportunities across technology, marketing, HR, and administration.
          </p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/internship/apply">
              <motion.button
                className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-bold rounded-lg transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Apply Now
              </motion.button>
            </Link>
            <Link href="/internship/about">
              <motion.button
                className="px-8 py-3 border-2 border-yellow-500 text-yellow-400 hover:bg-yellow-500/10 font-bold rounded-lg transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Filter Section */}
        <motion.div
          className="mb-12 flex flex-wrap gap-3 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {departments.map((dept) => (
            <motion.button
              key={dept}
              className="px-4 py-2 rounded-full border border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 hover:border-yellow-500/60 transition-all text-sm font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {dept}
            </motion.button>
          ))}
        </motion.div>

        {/* Opportunities Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {opportunities.map((opp, idx) => (
            <Link key={opp.id} href={opp.link}>
              <motion.div
                className="group p-6 rounded-2xl bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20 hover:border-yellow-500/50 transition-all cursor-pointer h-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                {/* Department Badge */}
                <motion.div className="inline-block mb-4">
                  <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 text-xs font-medium">
                    {opp.department}
                  </span>
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                  {opp.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{opp.description}</p>

                {/* Details */}
                <div className="space-y-2 mb-6 pb-6 border-b border-yellow-500/20">
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="text-yellow-400">📍</span>
                    {opp.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="text-yellow-400">⏱️</span>
                    {opp.duration}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="text-yellow-400">💰</span>
                    {opp.stipend}
                  </div>
                </div>

                {/* Learn More */}
                <motion.button
                  className="text-yellow-400 font-medium text-sm hover:text-yellow-300 transition-colors flex items-center gap-2"
                  whileHover={{ x: 5 }}
                >
                  View Opportunity →
                </motion.button>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.section
          className="mt-20 p-12 rounded-3xl bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/30 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Don't see the right opportunity? Apply anyway and we'll consider you for similar positions!
          </p>
          <Link href="/internship/apply">
            <motion.button
              className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-bold rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Apply Now
            </motion.button>
          </Link>
        </motion.section>
      </div>
    </main>
  );
}
