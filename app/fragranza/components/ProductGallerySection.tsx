'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

interface Fragrance {
  id: string;
  name: string;
  description: string;
  notes: string[];
  intensity: 1 | 2 | 3 | 4 | 5;
  price: number;
  image: string;
  collection: string;
}

const fragrancesData: Fragrance[] = [
  {
    id: '1',
    name: 'Notte Stellata',
    description: 'A mysterious blend of vanilla and amber',
    notes: ['Floral', 'Woody'],
    intensity: 4,
    price: 89,
    image: 'rose',
    collection: 'Luxury',
  },
  {
    id: '2',
    name: 'Giardino Segreto',
    description: 'Fresh florals with citrus undertones',
    notes: ['Floral', 'Fresh'],
    intensity: 3,
    price: 75,
    image: 'flower',
    collection: 'Classic',
  },
  {
    id: '3',
    name: 'Oud Magnifico',
    description: 'Rich oud with oriental spices',
    notes: ['Woody', 'Oriental'],
    intensity: 5,
    price: 129,
    image: 'wood',
    collection: 'Luxury',
  },
  {
    id: '4',
    name: 'Citrus Dolce',
    description: 'Vibrant citrus with sweet notes',
    notes: ['Fruity', 'Fresh'],
    intensity: 2,
    price: 65,
    image: 'citrus',
    collection: 'Classic',
  },
  {
    id: '5',
    name: 'Rosa Eterna',
    description: 'Classic rose with subtle spice',
    notes: ['Floral', 'Oriental'],
    intensity: 3,
    price: 79,
    image: 'rose',
    collection: 'Romance',
  },
  {
    id: '6',
    name: 'Bosco Profondo',
    description: 'Deep forest scent with cedar',
    notes: ['Woody', 'Fresh'],
    intensity: 4,
    price: 95,
    image: 'forest',
    collection: 'Nature',
  },
  {
    id: '7',
    name: 'Ambra Dolce',
    description: 'Sweet amber with vanilla warmth',
    notes: ['Oriental', 'Fruity'],
    intensity: 3,
    price: 82,
    image: 'amber',
    collection: 'Luxury',
  },
  {
    id: '8',
    name: 'Oceano Blu',
    description: 'Fresh aquatic with sea salt',
    notes: ['Fresh', 'Fruity'],
    intensity: 2,
    price: 68,
    image: 'ocean',
    collection: 'Classic',
  },
];

const NOTES = ['Floral', 'Woody', 'Fresh', 'Oriental', 'Fruity'];

const getImagePlaceholder = (imageType: string) => {
  const colors = {
    rose: 'from-pink-500 to-rose-600',
    flower: 'from-purple-500 to-pink-600',
    wood: 'from-amber-700 to-amber-900',
    citrus: 'from-yellow-400 to-orange-500',
    forest: 'from-green-600 to-emerald-700',
    amber: 'from-amber-500 to-yellow-600',
    ocean: 'from-blue-500 to-cyan-600',
  };
  return colors[imageType as keyof typeof colors] || 'from-yellow-400 to-amber-500';
};

export default function ProductGallerySection() {
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);
  const [selectedIntensity, setSelectedIntensity] = useState<number | null>(null);
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const filteredFragrances = fragrancesData.filter((fragrance) => {
    const notesMatch =
      selectedNotes.length === 0 ||
      selectedNotes.some((note) => fragrance.notes.includes(note));
    const intensityMatch =
      selectedIntensity === null || fragrance.intensity === selectedIntensity;
    return notesMatch && intensityMatch;
  });

  const toggleNote = (note: string) => {
    setSelectedNotes((prev) =>
      prev.includes(note) ? prev.filter((n) => n !== note) : [...prev, note]
    );
  };

  return (
    <section
      className="relative w-full py-24 overflow-hidden bg-gradient-to-b from-black to-amber-950/5"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-white">
            Our{' '}
            <span className="bg-gradient-to-r from-yellow-300 to-amber-300 bg-clip-text text-transparent">
              Signature Collection
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover fragrances crafted to perfection. Find your scent by notes and intensity.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="mb-12 p-6 rounded-2xl border border-yellow-500/20 bg-white/2 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Notes Filter */}
          <div className="mb-6">
            <h3 className="text-yellow-300 font-semibold mb-4 text-sm tracking-wide">
              FRAGRANCE NOTES
            </h3>
            <div className="flex flex-wrap gap-3">
              {NOTES.map((note) => (
                <motion.button
                  key={note}
                  onClick={() => toggleNote(note)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                    selectedNotes.includes(note)
                      ? 'bg-yellow-400/20 border-yellow-400 text-yellow-300'
                      : 'bg-transparent border-yellow-500/30 text-gray-400 hover:border-yellow-500/50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {note}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Intensity Filter */}
          <div>
            <h3 className="text-yellow-300 font-semibold mb-4 text-sm tracking-wide">
              INTENSITY
            </h3>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((level) => (
                <motion.button
                  key={level}
                  onClick={() =>
                    setSelectedIntensity(
                      selectedIntensity === level ? null : level
                    )
                  }
                  className={`w-10 h-10 rounded-full text-xs font-bold transition-all border ${
                    selectedIntensity === level
                      ? 'bg-yellow-400/30 border-yellow-400 text-yellow-300'
                      : 'bg-transparent border-yellow-500/30 text-gray-500 hover:border-yellow-500/50'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {level}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Results Counter */}
        <motion.p
          className="text-gray-400 text-sm mb-8 px-2"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        >
          Showing {filteredFragrances.length} of {fragrancesData.length} fragrances
        </motion.p>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredFragrances.map((fragrance, index) => (
              <motion.div
                key={fragrance.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="group relative"
              >
                <div className="relative h-full rounded-2xl border border-yellow-500/20 bg-gradient-to-br from-white/3 to-yellow-500/5 p-6 overflow-hidden transition-all duration-300 hover:border-yellow-500/50 hover:from-white/5 hover:to-yellow-500/10">
                  {/* Card Background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-yellow-500/0 to-amber-500/0"
                    whileHover={{
                      background:
                        'linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(184, 134, 11, 0.05))',
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Image/Icon - Bottle Placeholder */}
                    <motion.div
                      className={`w-full aspect-square bg-gradient-to-br ${getImagePlaceholder(fragrance.image)} rounded-xl mb-4 flex items-center justify-center text-white relative overflow-hidden`}
                      whileHover={{
                        scale: 1.08,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Bottle SVG Shape */}
                      <svg width="80" height="120" viewBox="0 0 80 120" fill="none">
                        <path d="M30 20 L35 15 L45 15 L50 20 L50 40 Q50 50 45 55 L45 100 Q45 110 40 115 L40 115 Q35 110 35 100 L35 55 Q30 50 30 40 Z" fill="rgba(255,255,255,0.3)" strokeWidth="1.5" stroke="rgba(255,255,255,0.6)" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors">
                      {fragrance.name}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 text-sm mb-4 flex-grow">
                      {fragrance.description}
                    </p>

                    {/* Notes Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {fragrance.notes.map((note) => (
                        <span
                          key={note}
                          className="px-2.5 py-1 rounded-full text-xs bg-yellow-500/15 text-yellow-300 border border-yellow-500/30"
                        >
                          {note}
                        </span>
                      ))}
                    </div>

                    {/* Intensity Bar */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xs text-gray-500">Intensity</span>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`h-2 w-2 rounded-full ${
                              i < fragrance.intensity
                                ? 'bg-gradient-to-r from-yellow-400 to-amber-400'
                                : 'bg-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Price & Button */}
                    <div className="flex items-center justify-between pt-4 border-t border-yellow-500/10">
                      <span className="text-2xl font-bold text-yellow-300">
                        ${fragrance.price}
                      </span>
                      <motion.button
                        className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-amber-300 hover:from-yellow-300 hover:to-yellow-200 text-black font-semibold rounded-lg text-sm transition-all"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Add
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* No Results */}
        <AnimatePresence>
          {filteredFragrances.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="text-center py-12"
            >
              <p className="text-gray-400 text-lg">
                No fragrances match your selection. Try adjusting your filters.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
