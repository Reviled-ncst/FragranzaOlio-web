'use client';

import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { getProductsByGender, filterProducts, type Product } from '@/app/lib/productData';
import { useState, useMemo } from 'react';

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const category = params.category as string;

  const categoryData: Record<string, { title: string; description: string; color: string; icon: string }> = {
    perfumes: {
      title: 'Perfumes Collection',
      description: 'Premium fragrances for men and women with exquisite blends and lasting elegance',
      color: 'from-pink-500/20 to-purple-500/10',
      icon: '💜',
    },
    cologne: {
      title: 'Cologne Collection',
      description: 'Fresh and crisp colognes perfect for everyday elegance and confidence',
      color: 'from-blue-500/20 to-cyan-500/10',
      icon: '🧴',
    },
    soap: {
      title: 'Soap Collection',
      description: 'Luxurious aromatic soaps crafted for a premium bathing experience',
      color: 'from-amber-500/20 to-orange-500/10',
      icon: '🧼',
    },
    'helmet-spray': {
      title: 'Helmet Spray Collection',
      description: 'Refreshing spray designed for helmet care and effective odor control',
      color: 'from-gray-500/20 to-slate-500/10',
      icon: '🏍️',
    },
    'liquid-hand-soap': {
      title: 'Liquid Hand Soap Collection',
      description: 'Gentle and effective hand soap with natural ingredients',
      color: 'from-green-500/20 to-emerald-500/10',
      icon: '🚰',
    },
    alcohol: {
      title: 'Alcohol Collection',
      description: 'Premium ethyl and isopropyl alcohol for effective sanitization',
      color: 'from-indigo-500/20 to-blue-500/10',
      icon: '🧪',
    },
    'car-diffuser': {
      title: 'Car Diffuser Collection',
      description: 'Long-lasting car fragrances for a fresh and pleasant driving experience',
      color: 'from-red-500/20 to-orange-500/10',
      icon: '🚗',
    },
    'dishwashing-liquid': {
      title: 'Dishwashing Liquid Collection',
      description: 'Powerful yet gentle dishwashing liquid with pleasant fragrance',
      color: 'from-yellow-500/20 to-amber-500/10',
      icon: '🍽️',
    },
  };

  const data = categoryData[category] || categoryData.perfumes;

  // For Perfumes collection, show actual products
  const [selectedGender, setSelectedGender] = useState<'all' | 'men' | 'women'>('all');
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);

  const products = useMemo(() => {
    if (category === 'perfumes') {
      const baseProducts = selectedGender === 'all'
        ? getProductsByGender('all')
        : getProductsByGender(selectedGender);

      return filterProducts(baseProducts, {
        notes: selectedNotes.length > 0 ? selectedNotes : undefined,
      }).slice(0, 20);
    }
    return [];
  }, [selectedGender, selectedNotes, category]);

  const allNotes = useMemo(() => {
    if (category === 'perfumes') {
      const notes = new Set<string>();
      getProductsByGender('all').forEach(product => {
        product.notes.forEach(note => notes.add(note));
      });
      return Array.from(notes).sort();
    }
    return [];
  }, [category]);

  const toggleNote = (note: string) => {
    setSelectedNotes(prev =>
      prev.includes(note)
        ? prev.filter(n => n !== note)
        : [...prev, note]
    );
  };

  return (
    <main className="min-h-screen bg-black pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-6xl mb-4">{data.icon}</div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 font-serif">
            {data.title}
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">{data.description}</p>
          <motion.button
            onClick={() => router.back()}
            className="mt-6 text-yellow-400 hover:text-yellow-300 transition-colors text-sm font-medium"
          >
            ← Back to Collections
          </motion.button>
        </motion.div>

        {/* Perfumes Collection - Show actual products */}
        {category === 'perfumes' && (
          <>
            {/* Gender & Notes Filters */}
            <motion.div
              className="mb-10 p-6 rounded-2xl border border-yellow-500/20 bg-white/2 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Gender Filter */}
              <div className="mb-6">
                <h3 className="text-yellow-300 font-semibold mb-3 text-sm tracking-wide">GENDER</h3>
                <div className="flex gap-3">
                  {(['all', 'men', 'women'] as const).map(gender => (
                    <motion.button
                      key={gender}
                      onClick={() => setSelectedGender(gender)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                        selectedGender === gender
                          ? 'bg-yellow-400/20 border-yellow-400 text-yellow-300'
                          : 'bg-transparent border-yellow-500/30 text-gray-400 hover:border-yellow-500/50'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {gender.charAt(0).toUpperCase() + gender.slice(1)}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Notes Filter */}
              <div>
                <h3 className="text-yellow-300 font-semibold mb-3 text-sm tracking-wide">FRAGRANCE NOTES</h3>
                <div className="flex flex-wrap gap-2">
                  {allNotes.map(note => (
                    <motion.button
                      key={note}
                      onClick={() => toggleNote(note)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
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
            </motion.div>

            {/* Products Grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {products.map((product, idx) => (
                <motion.div
                  key={product.id}
                  className="rounded-2xl bg-gradient-to-br from-pink-500/10 to-purple-500/5 border border-yellow-500/20 p-5 group hover:border-yellow-500/50 transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  {/* Product Image */}
                  <div className="w-full aspect-square bg-slate-800 rounded-xl mb-4 overflow-hidden relative">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                  </div>

                  <h3 className="text-sm font-bold text-white mb-2 line-clamp-2">{product.name}</h3>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {product.notes.slice(0, 2).map(note => (
                      <span key={note} className="px-2 py-0.5 text-xs bg-yellow-500/15 text-yellow-300 rounded-full border border-yellow-500/30">
                        {note}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-yellow-500/10">
                    <span className="text-lg font-bold text-yellow-300">${product.basePrice}</span>
                    <motion.button
                      className="px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-amber-300 hover:from-yellow-300 hover:to-yellow-200 text-black font-semibold text-xs rounded-lg transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Add
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {products.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <p className="text-gray-400 text-lg">No fragrances match your selection. Try adjusting filters.</p>
              </motion.div>
            )}
          </>
        )}

        {/* Other Collections - Coming Soon */}
        {category !== 'perfumes' && (
          <motion.div
            className="flex items-center justify-center py-32"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="text-center">
              <div className="text-8xl mb-6 opacity-50">{data.icon}</div>
              <h2 className="text-3xl font-bold text-white mb-4">Coming Soon</h2>
              <p className="text-gray-400 text-lg mb-8">
                Our {data.title.toLowerCase()} collection is being prepared for you.
              </p>
              <motion.button
                onClick={() => router.push('/fragranza/collections')}
                className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-amber-300 hover:from-yellow-300 hover:to-yellow-200 text-black font-semibold rounded-lg transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Collections
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
