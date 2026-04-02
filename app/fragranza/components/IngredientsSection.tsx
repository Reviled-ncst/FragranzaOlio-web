'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

export default function IngredientsSection() {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const ingredients = [
    {
      icon: '🌹',
      title: 'Premium Rose',
      description: 'Hand-harvested Bulgarian roses, distilled fresh to capture the delicate essence.',
    },
    {
      icon: '🌿',
      title: 'Pure Oud',
      description: 'Ethically sourced oud from sustainable farms, aged to perfection for depth and character.',
    },
    {
      icon: '🍋',
      title: 'Citrus Extract',
      description: 'Cold-pressed essential oils from Mediterranean citrus groves for bright, zesty notes.',
    },
    {
      icon: '🌾',
      title: 'Sandalwood',
      description: 'Sustainable Indian sandalwood, providing warm and creamy base notes to all our fragrances.',
    },
  ];

  return (
    <section className="relative w-full py-24 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-950/5 via-black to-black -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-white">
            Premium <span className="bg-gradient-to-r from-yellow-300 to-amber-300 bg-clip-text text-transparent">Ingredients</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Sourced from the world's finest gardens, crafted with care
          </p>
        </motion.div>

        {/* Ingredients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {ingredients.map((ingredient, index) => (
            <motion.div
              key={ingredient.title}
              className="group relative"
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="relative rounded-2xl border border-yellow-500/20 bg-gradient-to-br from-white/3 to-yellow-500/5 p-8 transition-all duration-300 hover:border-yellow-500/50 hover:from-white/5 hover:to-yellow-500/10">
                <div className="flex items-start gap-6">
                  {/* Icon */}
                  <motion.div
                    className="flex-shrink-0 text-5xl"
                    whileHover={{ scale: 1.15, rotate: -5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {ingredient.icon}
                  </motion.div>

                  {/* Content */}
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-yellow-300 mb-2">
                      {ingredient.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {ingredient.description}
                    </p>
                  </div>
                </div>

                {/* Accent line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-yellow-400 via-amber-400 to-transparent opacity-0 group-hover:opacity-100"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sustainability Statement */}
        <motion.div
          className="rounded-3xl border border-yellow-500/30 bg-gradient-to-br from-yellow-500/5 to-amber-500/5 p-12 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.div
            className="inline-block mb-6 text-5xl"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🌍
          </motion.div>
          <h3 className="text-3xl font-bold text-white mb-4">
            Committed to Sustainability
          </h3>
          <p className="text-gray-400 max-w-3xl mx-auto mb-6 leading-relaxed">
            Every bottle of Fragranza Olio represents our commitment to environmental responsibility. We partner with ethical suppliers, use recyclable packaging, and plant one tree for every fragrance sold.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-yellow-500/20">
            {[
              { number: '100%', label: 'Cruelty-Free' },
              { number: '80%', label: 'Recycled Packaging' },
              { number: '50K+', label: 'Trees Planted' },
              { number: '25+', label: 'Partner Farms' },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-yellow-300 mb-1">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
