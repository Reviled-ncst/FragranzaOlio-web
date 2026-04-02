'use client';

import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';

export default function BlogCategoryPage() {
  const params = useParams();
  const category = params.category as string;

  const categoryData: Record<string, { title: string; description: string; icon: string }> = {
    'care-guide': {
      title: 'Care Guide',
      description: 'Learn how to properly store, apply, and care for your precious fragrances',
      icon: '✨',
    },
    'fragrance-stories': {
      title: 'Fragrance Stories',
      description: 'Discover the inspiration and heritage behind each of our collections',
      icon: '📖',
    },
    'tips-tricks': {
      title: 'Tips & Tricks',
      description: 'Expert advice on fragrance layering, selection, and personalization',
      icon: '💡',
    },
  };

  const data = categoryData[category] || categoryData['care-guide'];

  const articles = [
    {
      title: 'Article 1: Getting Started',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      date: 'March 15, 2024',
      readTime: '5 min',
    },
    {
      title: 'Article 2: Advanced Techniques',
      excerpt: 'Discover advanced methods to enhance your fragrance experience.',
      date: 'March 10, 2024',
      readTime: '7 min',
    },
    {
      title: 'Article 3: Expert Tips',
      excerpt: 'Learn from industry experts about the best practices.',
      date: 'March 5, 2024',
      readTime: '6 min',
    },
  ];

  return (
    <main className="min-h-screen bg-black pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-6xl mb-4">{data.icon}</div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 font-serif">
            {data.title}
          </h1>
          <p className="text-gray-400 text-lg">{data.description}</p>
        </motion.div>

        {/* Articles */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {articles.map((article, idx) => (
            <motion.article
              key={idx}
              className="p-8 rounded-2xl bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20 hover:border-yellow-500/50 transition-all group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <h2 className="text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                  {article.title}
                </h2>
                <span className="text-sm text-gray-500 whitespace-nowrap">{article.readTime} read</span>
              </div>

              <p className="text-gray-400 mb-4">{article.excerpt}</p>

              <div className="flex items-center justify-between pt-4 border-t border-yellow-500/20">
                <span className="text-xs text-gray-500">{article.date}</span>
                <motion.button className="text-yellow-400 font-medium text-sm hover:text-yellow-300" whileHover={{ x: 5 }}>
                  Read Full Article →
                </motion.button>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
