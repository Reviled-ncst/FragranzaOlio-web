'use client';

import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export default function HeroSection() {
  const ref = useRef(null);
  const [particles, setParticles] = useState<Array<{ left: number; top: number; duration: number }>>([]);

  // Generate particles only on client to avoid hydration mismatch
  useEffect(() => {
    setParticles(
      [...Array(6)].map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 6 + Math.random() * 4,
      }))
    );
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1 },
    },
  };

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20"
      ref={ref}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-amber-950/5 to-black -z-10" />

      {/* Animated mist particles */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-600/10 rounded-full blur-3xl"
        animate={{
          y: [0, -50, 0],
          x: [0, 40, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-yellow-500/8 rounded-full blur-3xl"
        animate={{
          y: [0, 40, 0],
          x: [0, -40, 0],
          scale: [1, 0.95, 1],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* Floating particles */}
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-yellow-600/30 rounded-full"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <motion.div
            className="relative z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <span className="inline-block px-5 py-2 bg-yellow-600/15 border border-yellow-600/40 rounded-full text-yellow-100 text-sm font-medium tracking-wide">
                Luxury Fragrance Collection
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight text-white"
            >
              Experience
              <br />
              <span className="bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-200 bg-clip-text text-transparent">
                Timeless Elegance
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-gray-400 mb-10 leading-relaxed max-w-xl"
            >
              Discover the art of perfumery. Each fragrance is a masterpiece, crafted with the finest ingredients sourced from around the world.
            </motion.p>

            {/* Highlights */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-5 mb-10"
            >
              {[
                'Premium Artisanal Craftsmanship',
                'Sustainably Sourced Ingredients',
                '30-Day Satisfaction Guarantee',
              ].map((highlight, index) => (
                <motion.div
                  key={highlight}
                  className="flex items-center gap-4"
                  whileHover={{ x: 10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-600 to-yellow-500 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-black"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-200">{highlight}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-5"
            >
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-amber-600 hover:to-amber-500 text-white font-bold rounded-lg text-lg transition-all hover:shadow-2xl hover:shadow-amber-700/30"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Collection
              </motion.button>
              <motion.button
                className="px-8 py-4 border-2 border-yellow-600/60 hover:border-yellow-600 text-yellow-100 hover:text-yellow-50 font-semibold rounded-lg transition-all hover:bg-yellow-600/5"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                View Samples
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right: Visual Element */}
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto flex items-center justify-center">
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-yellow-600/20 via-transparent to-yellow-500/20 rounded-3xl blur-3xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Actual Logo Image */}
              <motion.img
                src="https://res.cloudinary.com/djnzwvb2t/image/upload/v1775029733/FRAGRANZAOLIO_LOGO_wyvcvz.png"
                alt="Fragranza Olio Perfume Bottle"
                className="relative w-64 h-64 sm:w-72 sm:h-72 object-contain filter drop-shadow-2xl"
                animate={{
                  y: [0, -20, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Floating particles around logo */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-yellow-600/50 rounded-full blur-sm"
                  style={{
                    left: `${50 + Math.cos((i / 6) * Math.PI * 2) * 120}px`,
                    top: `${50 + Math.sin((i / 6) * Math.PI * 2) * 120}px`,
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
