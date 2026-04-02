'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CollectionsPage() {
  const collections = [
    {
      name: 'Perfumes',
      description: 'Premium fragrances for men and women with exquisite blends',
      image: '💜',
      link: '/fragranza/collections/perfumes',
    },
    {
      name: 'Cologne',
      description: 'Fresh and crisp colognes for everyday elegance',
      image: '🧴',
      link: '/fragranza/collections/cologne',
    },
    {
      name: 'Soap',
      description: 'Luxurious aromatic soaps for a premium bathing experience',
      image: '🧼',
      link: '/fragranza/collections/soap',
    },
    {
      name: 'Helmet Spray',
      description: 'Refreshing spray designed for helmet care and odor control',
      image: '🏍️',
      link: '/fragranza/collections/helmet-spray',
    },
    {
      name: 'Liquid Hand Soap',
      description: 'Gentle and effective hand soap with natural ingredients',
      image: '🚰',
      link: '/fragranza/collections/liquid-hand-soap',
    },
    {
      name: 'Alcohol',
      description: 'Premium ethyl and isopropyl alcohol for sanitization',
      image: '🧪',
      link: '/fragranza/collections/alcohol',
    },
    {
      name: 'Car Diffuser',
      description: 'Long-lasting car fragrances for a fresh driving experience',
      image: '🚗',
      link: '/fragranza/collections/car-diffuser',
    },
    {
      name: 'Dishwashing Liquid',
      description: 'Powerful yet gentle dishwashing liquid with pleasant fragrance',
      image: '🍽️',
      link: '/fragranza/collections/dishwashing-liquid',
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
            Explore our premium product collections, each crafted with quality and care
          </p>
        </motion.div>

        {/* Collections Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {collections.map((collection, idx) => (
            <motion.div
              key={collection.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
            >
              <Link href={collection.link}>
                <motion.div
                  className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer bg-gradient-to-br from-yellow-500/20 via-amber-500/10 to-black/50 border border-yellow-500/30 hover:border-yellow-500/60 transition-all"
                  whileHover={{ y: -8 }}
                >
                  {/* Overlay background */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <span className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {collection.image}
                    </span>

                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                      {collection.name}
                    </h3>

                    <p className="text-gray-300 text-sm max-w-xs">{collection.description}</p>

                    <motion.div
                      className="mt-4 px-5 py-1.5 bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-bold text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
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
