'use client';

import { motion } from 'framer-motion';

export default function InternshipAboutPage() {
  const benefits = [
    { icon: '💼', title: 'Real Experience', description: 'Work on real projects that impact the business' },
    { icon: '🎓', title: 'Mentorship', description: 'Learn from industry professionals and experts' },
    { icon: '💰', title: 'Competitive Stipend', description: 'Earn $1,500 - $2,500 per month' },
    { icon: '🏢', title: 'Flexible Locations', description: 'Choose remote, hybrid, or office work' },
    { icon: '🎯', title: 'Career Development', description: 'Build skills in your field of interest' },
    { icon: '🤝', title: 'Network', description: 'Connect with professionals in your industry' },
  ];

  const timeline = [
    { phase: 'Week 1-2', title: 'Onboarding', description: 'Meet your team, learn company culture, understand projects' },
    { phase: 'Week 3-8', title: 'Core Work', description: 'Contribute to your assigned projects and learning goals' },
    { phase: 'Week 9-12', title: 'Advancement', description: 'Take on leadership roles and more complex projects' },
    { phase: 'Week 13-16', title: 'Wrap-up', description: 'Document work, prepare presentations, feedback sessions' },
  ];

  const eligibility = [
    'Currently enrolled in a college/university (any year)',
    'Available for 3-4 month commitment',
    'Passion for learning and growth',
    'Basic technical or soft skills relevant to role',
    'Ability to work independently and as part of a team',
  ];

  return (
    <main className="min-h-screen bg-black pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 font-serif">
            Internship <span className="text-yellow-400">Program</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover everything you need to know about our comprehensive internship program
          </p>
        </motion.div>

        {/* Program Overview */}
        <motion.section
          className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="h-96 bg-gradient-to-br from-yellow-500/20 to-amber-500/10 rounded-2xl border border-yellow-500/30"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          />

          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Program Overview</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Our internship program is designed to provide students with practical experience in their chosen field. Whether you're interested in technology, marketing, human resources, or administration, we have opportunities that match your career goals.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              Over 3-4 months, you'll collaborate with experienced professionals, contribute to meaningful projects, and develop skills that will set you apart in your career. We believe in learning by doing and creating a supportive environment for growth.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Our interns have gone on to become full-time employees, industry leaders, and valued partners. Join us and be part of something bigger.
            </p>
          </motion.div>
        </motion.section>

        {/* Benefits */}
        <motion.section className="mb-20" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">Why Join Our Program?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={benefit.title}
                className="p-6 rounded-2xl bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20 hover:border-yellow-500/50 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-400 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Timeline */}
        <motion.section
          className="mb-20 p-12 rounded-3xl bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">Your Internship Journey</h2>
          <div className="space-y-8">
            {timeline.map((item, idx) => (
              <motion.div
                key={item.phase}
                className="flex gap-6"
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center font-bold text-white text-sm">
                    {idx + 1}
                  </div>
                  {idx < timeline.length - 1 && <div className="w-0.5 h-20 bg-gradient-to-b from-yellow-500 to-transparent mt-4" />}
                </div>
                <div className="pt-2 pb-8 flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">{item.phase} - {item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Eligibility */}
        <motion.section className="mb-20" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">Eligibility Requirements</h2>
          <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20">
            <ul className="space-y-4">
              {eligibility.map((item, idx) => (
                <motion.li
                  key={item}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  viewport={{ once: true }}
                >
                  <span className="text-yellow-400 font-bold text-lg flex-shrink-0">✓</span>
                  <span className="text-gray-300">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* FAQ */}
        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                q: 'When do internships start?',
                a: 'Internships start throughout the year with flexible start dates based on your availability. Common start times are May, June, and January.',
              },
              {
                q: 'Is this a paid internship?',
                a: 'Yes! All our internships are paid. Stipends range from $1,500 to $2,500 per month depending on the role and experience level.',
              },
              {
                q: 'Can I do this remotely?',
                a: 'Many of our internship positions offer remote or hybrid work options. Check the individual job listings to see what\'s available.',
              },
              {
                q: 'What if I have no prior experience?',
                a: 'No problem! We welcome students from all backgrounds. We\'re looking for passion to learn, not just experience.',
              },
              {
                q: 'Can this lead to a full-time position?',
                a: 'Absolutely! Many of our interns receive full-time job offers. Performance and fit are evaluated throughout the internship.',
              },
              {
                q: 'What if I\'m not in a specific major?',
                a: 'We value diverse perspectives. As long as you\'re interested in the role and can contribute, your major matters less than your enthusiasm.',
              },
            ].map((faq, idx) => (
              <motion.div
                key={faq.q}
                className="p-6 rounded-xl bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-bold text-yellow-400 mb-3">{faq.q}</h3>
                <p className="text-gray-400 text-sm">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </main>
  );
}
