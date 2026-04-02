'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CollectionsPage() {
  const collections = [
    {
      name: 'Floral',
      description: 'Delicate and romantic fragrances with floral notes',
      image: '🌸',
      count: 12,
      link: '/fragranza/collections/floral',
    },
    {
      name: 'Woody',
      description: 'Rich and warm fragrances with woody base notes',
      image: '🌲',
      count: 8,
      link: '/fragranza/collections/woody',
    },
    {
      name: 'Oriental',
      description: 'Luxurious and sensual oriental fragrances',
      image: '✨',
      count: 10,
      link: '/fragranza/collections/oriental',
    },
    {
      name: 'Fresh',
      description: 'Crisp and invigorating fresh fragrances',
      image: '🍋',
      count: 6,
      link: '/fragranza/collections/fresh',
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
            Our <span className="text-yellow-400">Collections</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore carefully curated fragrance collections, each telling its own unique story
          </p>
        </motion.div>

        {/* Collections Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {collections.map((collection, idx) => (
            <motion.div
              key={collection.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link href={collection.link}>
                <motion.div
                  className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer bg-gradient-to-br from-yellow-500/20 via-amber-500/10 to-black/50 border border-yellow-500/30 hover:border-yellow-500/60 transition-all"
                  whileHover={{ y: -10 }}
                >
                  {/* Overlay background */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                    <span className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                      {collection.image}
                    </span>

                    <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                      {collection.name}
                    </h3>

                    <p className="text-gray-300 text-sm mb-4 max-w-xs">{collection.description}</p>

                    <div className="text-yellow-400 font-medium">{collection.count} Fragrances</div>

                    <motion.div
                      className="mt-6 px-6 py-2 bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ scale: 1.05 }}
                    >
                      Explore →
                    </motion.div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
