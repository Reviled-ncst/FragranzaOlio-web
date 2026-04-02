'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

export default function StorySection() {
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

  const storyPoints = [
    {
      icon: '🌍',
      title: 'Our Heritage',
      description: 'Founded in 2015, Fragranza Olio emerged from a passion for artisanal perfumery and a commitment to quality that transcends generations.',
    },
    {
      icon: '✋',
      title: 'Handcrafted',
      description: 'Every fragrance is meticulously blended by master perfumers using traditional techniques passed down through decades of expertise.',
    },
    {
      icon: '🌿',
      title: 'Sustainable',
      description: 'We source premium ingredients ethically, supporting local farmers and sustainable harvesting practices worldwide.',
    },
    {
      icon: '💎',
      title: 'Luxury Quality',
      description: 'Our fragrances are composed of high-concentration essential oils, ensuring longevity and a refined olfactory experience.',
    },
  ];

  return (
    <section className="relative w-full py-24 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-amber-950/5 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-white">
            The <span className="bg-gradient-to-r from-yellow-300 to-amber-300 bg-clip-text text-transparent">Fragranza Olio</span> Story
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Crafted with passion, perfected through time
          </p>
        </motion.div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {storyPoints.map((point, index) => (
            <motion.div
              key={point.title}
              className="group relative"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="relative h-full rounded-2xl border border-yellow-500/20 bg-gradient-to-br from-white/3 to-yellow-500/5 p-8 text-center transition-all duration-300 hover:border-yellow-500/50">
                <motion.div
                  className="text-5xl mb-4"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {point.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-yellow-300 mb-3">
                  {point.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {point.description}
                </p>

                {/* Bottom accent line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-yellow-400 to-amber-400 opacity-0 group-hover:opacity-100"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Story Section */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {/* Left: Image/Visual */}
          <motion.div
            className="relative h-96 rounded-3xl border border-yellow-500/20 bg-gradient-to-br from-yellow-400/10 to-amber-400/5 flex items-center justify-center overflow-hidden"
            whileHover={{ borderColor: 'rgba(255, 215, 0, 0.5)' }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-amber-500/10"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <div className="relative text-8xl">🏺</div>
          </motion.div>

          {/* Right: Text */}
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Perfumery as an Art Form
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              For over a century, the art of perfumery has been our family's legacy. Fragranza Olio continues this tradition by combining
              classical techniques with modern sensibilities, creating fragrances that transcend time and trends.
            </p>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Each scent is a journey—from the sun-drenched fields where we source our ingredients to the moment the fragrance touches your skin.
              We believe that luxury is not just about the product, but about the experience and the story behind it.
            </p>

            {/* Key Values */}
            <div className="space-y-4">
              {['100% Natural Essences', '30+ Years of Expertise', 'Eco-Conscious'].map(
                (value) => (
                  <motion.div
                    key={value}
                    className="flex items-center gap-3"
                    whileHover={{ x: 10 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-400 to-amber-300" />
                    <span className="text-gray-300">{value}</span>
                  </motion.div>
                )
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
