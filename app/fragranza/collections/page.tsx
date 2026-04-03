'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

export default function CollectionsPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const collections = [
    {
      name: 'Perfumes',
      description: 'Premium fragrances for men and women with exquisite blends',
      image: '💜',
      link: '/fragranza/collections/perfumes',
      subcategories: [
        { name: 'Perfumes - Men', link: '/fragranza/collections/perfumes/men' },
        { name: 'Perfumes - Women', link: '/fragranza/collections/perfumes/women' },
      ],
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
      subcategories: [
        { name: 'Alcohol - Ethyl', link: '/fragranza/collections/alcohol/ethyl' },
        { name: 'Alcohol - Isopropyl', link: '/fragranza/collections/alcohol/isopropyl' },
      ],
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
        {/* Header with Dropdown */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 font-serif">
            Our <span className="text-yellow-400">Collections</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            Explore our premium product collections, each crafted with quality and care
          </p>

          {/* Collection Dropdown */}
          <div className="flex justify-center mb-12">
            <div className="relative inline-block w-full max-w-xs">
              <motion.button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-semibold rounded-lg text-base transition-all flex items-center justify-between"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Select Collection</span>
                <motion.svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </motion.svg>
              </motion.button>

              {/* Dropdown Menu */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={
                  isDropdownOpen
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: -10, pointerEvents: 'none' }
                }
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-yellow-500/30 rounded-lg shadow-xl overflow-hidden z-50 max-h-96 overflow-y-auto"
              >
                {collections.map((collection, idx) => (
                  <div key={collection.name}>
                    {/* Main Category */}
                    <Link href={collection.link}>
                      <motion.div
                        onClick={() => setIsDropdownOpen(false)}
                        className="px-6 py-4 hover:bg-yellow-500/10 transition-colors border-b border-yellow-500/10 cursor-pointer group"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        whileHover={{ paddingLeft: 24 }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{collection.image}</span>
                          <div className="text-left">
                            <h3 className="text-white font-semibold group-hover:text-yellow-400 transition-colors">
                              {collection.name}
                            </h3>
                            <p className="text-gray-400 text-xs">{collection.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    </Link>

                    {/* Subcategories */}
                    {collection.subcategories && (
                      <div className="bg-black/30 border-b border-yellow-500/10">
                        {collection.subcategories.map((sub, subIdx) => (
                          <Link key={sub.name} href={sub.link}>
                            <motion.div
                              onClick={() => setIsDropdownOpen(false)}
                              className="px-12 py-3 hover:bg-yellow-500/5 transition-colors text-gray-300 hover:text-yellow-400 text-sm cursor-pointer"
                              initial={{ opacity: 0, x: -5 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 + subIdx * 0.03 }}
                              whileHover={{ paddingLeft: 48 }}
                            >
                              → {sub.name}
                            </motion.div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Grid View Below */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-center text-gray-400 text-sm mb-8">Or browse all collections:</p>
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
        </motion.div>
      </div>
    </main>
  );
}
