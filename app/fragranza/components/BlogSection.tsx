'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

export default function BlogSection() {
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

  const articles = [
    {
      id: '1',
      title: 'The Art of Fragrance Layering',
      excerpt: 'Discover how to combine fragrances to create your unique signature scent.',
      category: 'Guide',
      date: 'Mar 15, 2024',
      icon: '🎨',
    },
    {
      id: '2',
      title: 'Spring Collection: Fresh & Floral',
      excerpt: 'Explore our newest arrivals perfect for the spring season.',
      category: 'Collection',
      date: 'Mar 10, 2024',
      icon: '🌸',
    },
    {
      id: '3',
      title: 'Oud: The Liquid Gold of Perfumery',
      excerpt: 'Learn about the luxurious oud ingredient and its significance in fragrance.',
      category: 'Education',
      date: 'Mar 1, 2024',
      icon: '✨',
    },
    {
      id: '4',
      title: 'How to Store Your Perfume',
      excerpt: 'Pro tips to maintain the longevity and quality of your favorite fragrances.',
      category: 'Tips',
      date: 'Feb 25, 2024',
      icon: '🏺',
    },
    {
      id: '5',
      title: 'Seasonal Scent Transitions',
      excerpt: 'Navigate perfume choices through different seasons with our expert advice.',
      category: 'Guide',
      date: 'Feb 15, 2024',
      icon: '🍂',
    },
    {
      id: '6',
      title: 'Behind the Scenes in Our Lab',
      excerpt: 'Visit our perfume creation studio and meet the master blenders.',
      category: 'Story',
      date: 'Feb 1, 2024',
      icon: '🔬',
    },
  ];

  return (
    <section className="relative w-full py-24 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-amber-950/5 to-black -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-white">
            The Fragrance <span className="bg-gradient-to-r from-yellow-300 to-amber-300 bg-clip-text text-transparent">Journal</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Inspiring stories, expert tips, and fragrance insights
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              whileHover={{ y: -10 }}
            >
              {/* Card */}
              <div className="relative h-full rounded-2xl border border-yellow-500/20 bg-gradient-to-br from-white/3 to-yellow-500/5 overflow-hidden transition-all duration-300 hover:border-yellow-500/50 hover:from-white/5 hover:to-yellow-500/10">
                {/* Icon/Image Area */}
                <motion.div
                  className="relative h-48 bg-gradient-to-br from-yellow-400/10 to-amber-400/5 flex items-center justify-center text-6xl overflow-hidden border-b border-yellow-500/10 group-hover:border-yellow-500/30"
                  whileHover={{
                    background:
                      'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 215, 0, 0.1))',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.span
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {article.icon}
                  </motion.span>
                </motion.div>

                {/* Content */}
                <div className="p-6">
                  {/* Category & Date */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold text-yellow-300 bg-yellow-500/15 border border-yellow-500/30">
                      {article.category}
                    </span>
                    <span className="text-xs text-gray-500">{article.date}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-yellow-300 transition-colors">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                    {article.excerpt}
                  </p>

                  {/* Read More Link */}
                  <motion.div
                    className="inline-flex items-center gap-2 text-yellow-300 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    Read Article
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </motion.div>
                </div>

                {/* Bottom accent line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-yellow-400 to-amber-400 opacity-0 group-hover:opacity-100"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.button
            className="px-10 py-4 bg-gradient-to-r from-yellow-400 to-amber-300 hover:from-yellow-300 hover:to-yellow-200 text-black font-bold rounded-lg transition-all text-lg"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore All Articles
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
