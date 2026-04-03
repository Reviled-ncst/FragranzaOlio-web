'use client';

import { motion } from 'framer-motion';

export default function CertificationsPage() {
  const certifications = [
    {
      name: 'ISO 9001:2015',
      category: 'Quality Management',
      description: 'International Organization for Standardization certification for quality management systems',
      icon: '✓',
      year: '2021',
    },
    {
      name: 'ISO 14001:2015',
      category: 'Environmental Management',
      description: 'Environmental management systems certification demonstrating our commitment to sustainability',
      icon: '🌱',
      year: '2022',
    },
    {
      name: 'GMP Certified',
      category: 'Manufacturing',
      description: 'Good Manufacturing Practice certification ensuring highest standards in production',
      icon: '🏭',
      year: '2021',
    },
    {
      name: 'Cruelty-Free',
      category: 'Ethics',
      description: 'PETA certified cruelty-free - no animal testing in any products',
      icon: '🐰',
      year: '2020',
    },
  ];

  const awards = [
    {
      name: 'Best Fragrance Brand',
      category: 'Excellence',
      description: 'Award for innovation and excellence in fragrance development',
      icon: '🏆',
      year: '2023',
    },
    {
      name: 'Sustainability Leader',
      category: 'Environment',
      description: 'Recognition for eco-friendly practices and sustainable sourcing',
      icon: '🌍',
      year: '2023',
    },
    {
      name: 'Customer Choice Award',
      category: 'Customer Service',
      description: 'Awarded for outstanding customer satisfaction and service excellence',
      icon: '⭐',
      year: '2022',
    },
    {
      name: 'Innovation Award',
      category: 'Technology',
      description: 'Recognition for innovative fragrance blend technology and development',
      icon: '💡',
      year: '2023',
    },
  ];

  return (
    <main className="min-h-screen bg-black pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 font-serif">
            Certifications & <span className="text-yellow-400">Awards</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Our commitment to excellence, quality, and sustainability recognized by industry leaders
          </p>
        </motion.div>

        {/* Certifications Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            <span className="text-yellow-400">Quality</span> Certifications
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {certifications.map((cert, idx) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative"
              >
                <div className="h-full rounded-2xl border border-yellow-500/20 bg-gradient-to-br from-white/3 to-yellow-500/5 p-8 hover:border-yellow-500/50 transition-all duration-300 hover:from-white/5 hover:to-yellow-500/10">
                  {/* Card Background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-yellow-500/0 to-amber-500/0 rounded-2xl"
                    whileHover={{
                      background:
                        'linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(184, 134, 11, 0.05))',
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-start gap-4 mb-4">
                      <motion.div
                        className="text-4xl"
                        whileHover={{ scale: 1.2 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        {cert.icon}
                      </motion.div>
                      <div>
                        <span className="text-yellow-400 text-sm font-semibold uppercase tracking-wider">
                          {cert.category}
                        </span>
                        <h3 className="text-xl font-bold text-white mt-1 group-hover:text-yellow-300 transition-colors">
                          {cert.name}
                        </h3>
                      </div>
                    </div>

                    <p className="text-gray-400 text-sm mb-4">{cert.description}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-yellow-400 font-semibold">{cert.year}</span>
                      <motion.div
                        className="px-3 py-1 bg-yellow-500/10 text-yellow-300 text-xs rounded-full border border-yellow-500/30"
                        whileHover={{ scale: 1.05 }}
                      >
                        Certified
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Awards Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Industry <span className="text-yellow-400">Awards</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {awards.map((award, idx) => (
              <motion.div
                key={award.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className="group relative"
              >
                <div className="h-full rounded-2xl border border-yellow-500/20 bg-gradient-to-br from-amber-500/5 to-yellow-500/5 p-8 hover:border-yellow-500/50 transition-all duration-300 hover:from-amber-500/10 hover:to-yellow-500/10">
                  {/* Card Background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-yellow-500/0 rounded-2xl"
                    whileHover={{
                      background:
                        'linear-gradient(135deg, rgba(217, 119, 6, 0.1), rgba(234, 179, 8, 0.05))',
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-start gap-4 mb-4">
                      <motion.div
                        className="text-4xl"
                        whileHover={{ rotate: 12, scale: 1.2 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        {award.icon}
                      </motion.div>
                      <div>
                        <span className="text-amber-300 text-sm font-semibold uppercase tracking-wider">
                          {award.category}
                        </span>
                        <h3 className="text-xl font-bold text-white mt-1 group-hover:text-yellow-300 transition-colors">
                          {award.name}
                        </h3>
                      </div>
                    </div>

                    <p className="text-gray-400 text-sm mb-4">{award.description}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-amber-400 font-semibold">{award.year}</span>
                      <motion.div
                        className="px-3 py-1 bg-amber-500/10 text-amber-300 text-xs rounded-full border border-amber-500/30"
                        whileHover={{ scale: 1.05 }}
                      >
                        Awarded
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-gray-400 text-lg mb-8">
            Our certifications and awards represent our dedication to excellence and sustainability
          </p>
          <motion.a
            href="/fragranza/contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-semibold rounded-lg transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More About Our Standards
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </main>
  );
}
