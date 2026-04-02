'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function BlogPage() {
  const articles = [
    {
      id: 1,
      title: 'The Art of Fragrance Layering',
      excerpt: 'Master the technique of layering fragrances to create a unique, personalized scent profile',
      category: 'Care Guide',
      date: 'March 15, 2024',
      readTime: '5 min read',
      link: '/fragranza/blog/care-guide',
    },
    {
      id: 2,
      title: 'Spring Collection: Floral & Fresh',
      excerpt: 'Discover our latest spring fragrances inspired by blooming gardens and fresh citrus',
      category: 'Fragrance Stories',
      date: 'March 10, 2024',
      readTime: '4 min read',
      link: '/fragranza/blog/fragrance-stories',
    },
    {
      id: 3,
      title: 'The Ultimate Oud Guide',
      excerpt: 'Everything you need to know about oud fragrances: origin, benefits, and top selections',
      category: 'Tips & Tricks',
      date: 'March 5, 2024',
      readTime: '8 min read',
      link: '/fragranza/blog/tips-tricks',
    },
    {
      id: 4,
      title: 'How to Store Your Fragrances',
      excerpt: 'Protect your precious perfumes with these essential storage and preservation tips',
      category: 'Care Guide',
      date: 'February 28, 2024',
      readTime: '3 min read',
      link: '/fragranza/blog/care-guide',
    },
    {
      id: 5,
      title: 'Fragrance Psychology: Scent & Emotion',
      excerpt: 'How fragrances influence your mood, memory, and personal confidence',
      category: 'Fragrance Stories',
      date: 'February 20, 2024',
      readTime: '6 min read',
      link: '/fragranza/blog/fragrance-stories',
    },
    {
      id: 6,
      title: 'Building Your Fragrance Wardrobe',
      excerpt: 'Create a versatile collection of fragrances for every mood and season',
      category: 'Tips & Tricks',
      date: 'February 15, 2024',
      readTime: '7 min read',
      link: '/fragranza/blog/tips-tricks',
    },
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
            We call it <span className="text-yellow-400">Scent Stories</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore guides, fragrance tips, and stories from our community
          </p>
        </motion.div>

        {/* Articles Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {articles.map((article, idx) => (
            <motion.div
              key={article.id}
              className="group rounded-2xl bg-gradient-to-br from-slate-900/50 via-slate-800/50 to-black/50 border border-yellow-500/20 hover:border-yellow-500/50 transition-all overflow-hidden h-full flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              {/* Image Placeholder */}
              <div className="w-full h-40 bg-gradient-to-br from-yellow-500/20 to-amber-500/10 group-hover:from-yellow-500/30 group-hover:to-amber-500/20 transition-all flex items-center justify-center">
                <span className="text-5xl">📖</span>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold text-yellow-400 uppercase tracking-wider">{article.category}</span>
                  <span className="text-xs text-gray-500">/{article.readTime}</span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-gray-400 text-sm mb-6 flex-1 line-clamp-2">{article.excerpt}</p>

                <div className="flex items-center justify-between mt-auto pt-6 border-t border-yellow-500/20">
                  <span className="text-xs text-gray-500">{article.date}</span>
                  <Link href={article.link}>
                    <motion.button
                      className="text-yellow-400 font-medium text-sm hover:text-yellow-300 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      Read →
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Newsletter Section */}
        <motion.section
          className="mt-20 p-12 rounded-3xl bg-gradient-to-br from-yellow-500/10 via-amber-500/5 to-black/50 border border-yellow-500/30 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">Get exclusive tips, new fragrance launches, and special offers delivered to your inbox</p>

          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-white/10 border border-yellow-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/60"
            />
            <motion.button
              className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-bold rounded-lg whitespace-nowrap"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </motion.button>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
