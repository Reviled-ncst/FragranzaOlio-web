'use client';

import { motion } from 'framer-motion';

export default function CTASection() {
  return (
    <section className="relative w-full py-24 overflow-hidden">
      {/* Advanced gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-cyan-900/20 to-black" />
        <motion.div
          className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-cyan-500/20 to-transparent blur-3xl"
          animate={{
            y: [0, -50, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-blue-500/20 to-transparent blur-3xl"
          animate={{
            y: [0, 50, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="group relative rounded-3xl overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          {/* Glassmorphism card */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-blue-500/10 border border-cyan-500/20 rounded-3xl" />

          {/* Animated border glow */}
          <motion.div
            className="absolute inset-0 rounded-3xl"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/0 to-transparent rounded-3xl group-hover:via-cyan-500/20" />
          </motion.div>

          {/* Content */}
          <div className="relative p-12 sm:p-16 lg:p-20 backdrop-blur-xl rounded-3xl">
            <div className="text-center max-w-3xl mx-auto">
              {/* Badge */}
              <motion.div
                className="mb-8 inline-block"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <span className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-400 text-sm font-semibold">
                  Ready to Transform Your Business?
                </span>
              </motion.div>

              {/* Main Headline */}
              <motion.h2
                className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Start Your{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Journey Today
                </span>
              </motion.h2>

              {/* Sub-headline */}
              <motion.p
                className="text-lg sm:text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Join thousands of companies already leveraging our platform to
                unlock unprecedented growth and insights.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <motion.button
                  className="group/btn relative px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-bold rounded-xl text-lg hover:shadow-2xl hover:shadow-cyan-500/40 transition-all overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover/btn:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative flex items-center justify-center gap-2">
                    Get Started Free
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </span>
                </motion.button>

                <motion.button
                  className="px-8 sm:px-10 py-4 sm:py-5 border-2 border-cyan-500/50 text-cyan-400 font-bold rounded-xl text-lg hover:bg-cyan-500/10 transition-all"
                  whileHover={{ scale: 1.05, borderColor: 'rgba(0, 217, 255, 1)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Schedule Demo
                </motion.button>
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-400"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400 text-xl">✓</span>
                  No credit card required
                </div>
                <div className="h-1 w-1 bg-gray-600 rounded-full hidden sm:block" />
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400 text-xl">✓</span>
                  14-day free trial
                </div>
                <div className="h-1 w-1 bg-gray-600 rounded-full hidden sm:block" />
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400 text-xl">✓</span>
                  Cancel anytime
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
