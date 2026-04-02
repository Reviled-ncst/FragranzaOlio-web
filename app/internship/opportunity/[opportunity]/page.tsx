'use client';

import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function OpportunityPage() {
  const params = useParams();
  const opportunityId = params.opportunity as string;

  const opportunities: Record<string, any> = {
    'software-dev': {
      title: 'Software Development Intern',
      company: 'Tech Company',
      location: 'San Francisco, CA',
      type: 'Hybrid',
      duration: '3-4 months',
      stipend: '$2,500/month',
      posted: 'March 2026',
      description: 'Join our engineering team and work on full-stack web applications using React, Node.js, and modern web technologies.',
      responsibilities: [
        'Develop and maintain web applications using React and Node.js',
        'Collaborate with senior engineers on feature development',
        'Write clean, maintainable code following company standards',
        'Participate in code reviews and technical discussions',
        'Debug and optimize application performance',
      ],
      requirements: [
        'Currently enrolled in a Computer Science or related field',
        'Strong foundation in JavaScript/TypeScript',
        'Understanding of RESTful APIs and databases',
        'Familiarity with Git and version control',
        'Excellent problem-solving skills',
      ],
      benefits: [
        'Competitive monthly stipend',
        'Flexible work schedule',
        'Mentorship from experienced engineers',
        'Access to company equipment',
        'Professional development opportunities',
      ],
    },
    'data-analytics': {
      title: 'Data Analytics Intern',
      company: 'Data Corp',
      location: 'Austin, TX',
      type: 'On-site',
      duration: '3 months',
      stipend: '$2,200/month',
      posted: 'March 2026',
      description: 'Analyze business data and create insightful reports using Python, SQL, and Tableau to drive strategic decisions.',
      responsibilities: [
        'Analyze large datasets using SQL and Python',
        'Create visualizations and dashboards in Tableau',
        'Prepare weekly and monthly business reports',
        'Identify trends and patterns in business data',
        'Collaborate with business teams on analytics projects',
      ],
      requirements: [
        'Pursuing a degree in Data Science, Statistics, or related field',
        'Proficiency in Python or R',
        'Knowledge of SQL and databases',
        'Understanding of data visualization principles',
        'Strong analytical and communication skills',
      ],
      benefits: [
        'Monthly stipend',
        'Real-world analytics experience',
        'Learning from data science professionals',
        'State-of-the-art tools and technologies',
        'Networking opportunities',
      ],
    },
    'ui-ux': {
      title: 'UI/UX Designer Intern',
      company: 'Design Studio',
      location: 'Remote',
      type: 'Remote',
      duration: '3-4 months',
      stipend: '$2,000/month',
      posted: 'March 2026',
      description: 'Design beautiful user interfaces and conduct user research to create exceptional digital experiences.',
      responsibilities: [
        'Create wireframes and mockups for web and mobile applications',
        'Conduct user research and usability testing',
        'Collaborate with developers to implement designs',
        'Develop and maintain design systems',
        'Participate in design critiques and feedback sessions',
      ],
      requirements: [
        'Currently studying Design, HCI, or related field',
        'Proficiency in design tools (Figma, Adobe XD, Sketch)',
        'Understanding of UX principles and design thinking',
        'Portfolio demonstrating design work',
        'Strong communication and collaboration skills',
      ],
      benefits: [
        'Competitive stipend',
        'Remote work flexibility',
        'Mentorship from senior designers',
        'Professional design tools access',
        'Portfolio-building opportunities',
      ],
    },
  };

  const opp = opportunities[opportunityId] || opportunities['software-dev'];

  return (
    <main className="min-h-screen bg-black pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link href="/internship">
          <motion.button className="text-yellow-400 hover:text-yellow-300 mb-8 flex items-center gap-2">
            ← Back to Opportunities
          </motion.button>
        </Link>

        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 font-serif">{opp.title}</h1>
          <p className="text-gray-400 text-lg mb-6">{opp.company}</p>

          {/* Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="p-4 rounded-lg bg-white/5 border border-yellow-500/20">
              <p className="text-gray-400 text-sm">Location</p>
              <p className="text-white font-semibold">{opp.location}</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-yellow-500/20">
              <p className="text-gray-400 text-sm">Type</p>
              <p className="text-white font-semibold">{opp.type}</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-yellow-500/20">
              <p className="text-gray-400 text-sm">Duration</p>
              <p className="text-white font-semibold">{opp.duration}</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-yellow-500/20">
              <p className="text-gray-400 text-sm">Stipend</p>
              <p className="text-yellow-400 font-semibold">{opp.stipend}</p>
            </div>
          </div>

          {/* Apply Button */}
          <Link href="/internship/apply">
            <motion.button
              className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-bold rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Apply Now
            </motion.button>
          </Link>
        </motion.div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Description */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-white mb-4">About the Role</h2>
              <p className="text-gray-300 leading-relaxed">{opp.description}</p>
            </motion.section>

            {/* Responsibilities */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-white mb-4">Responsibilities</h2>
              <ul className="space-y-3">
                {opp.responsibilities.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-yellow-400 mt-1">✓</span>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.section>

            {/* Requirements */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-white mb-4">Requirements</h2>
              <ul className="space-y-3">
                {opp.requirements.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.section>
          </div>

          {/* Sidebar */}
          <div>
            {/* Benefits */}
            <motion.div
              className="sticky top-32 p-6 rounded-2xl bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold text-yellow-400 mb-4">What We Offer</h3>
              <ul className="space-y-3">
                {opp.benefits.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">★</span>
                    <span className="text-gray-300 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Share Section */}
            <motion.div
              className="mt-6 p-6 rounded-2xl bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-lg font-bold text-white mb-4">Share This Job</h3>
              <div className="flex gap-3">
                <button className="flex-1 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm font-medium transition-all">
                  Share
                </button>
                <button className="flex-1 px-3 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 rounded-lg text-yellow-400 text-sm font-medium transition-all">
                  Save
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Related Opportunities */}
        <motion.section
          className="mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-white mb-8">Similar Opportunities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {['data-analytics', 'ui-ux'].map((id) => (
              <Link key={id} href={`/internship/opportunity/${id}`}>
                <motion.div
                  className="p-6 rounded-2xl bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20 hover:border-yellow-500/50 transition-all cursor-pointer h-full"
                  whileHover={{ y: -5 }}
                >
                  <h3 className="text-lg font-bold text-white mb-2 hover:text-yellow-400 transition-colors">
                    {opportunities[id].title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">{opportunities[id].company}</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 text-xs">
                      {opportunities[id].location}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 text-xs">
                      {opportunities[id].stipend}
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.section>
      </div>
    </main>
  );
}
