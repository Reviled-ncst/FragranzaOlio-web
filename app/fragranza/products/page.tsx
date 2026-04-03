'use client';

import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getProductsByGender, filterProducts, type Product } from '@/app/lib/productData';
import { SearchIcon, FilterIcon } from '../components/Icons/SocialIcons';

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGender, setSelectedGender] = useState<'all' | 'men' | 'women'>('all');
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);

  // Get products based on filters
  const filteredProducts = useMemo(() => {
    const baseProducts = selectedGender === 'all'
      ? getProductsByGender('all')
      : getProductsByGender(selectedGender);

    const notesFiltered = filterProducts(baseProducts, {
      notes: selectedNotes.length > 0 ? selectedNotes : undefined,
    });

    return notesFiltered.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, selectedGender, selectedNotes]);

  // Extract unique notes for filter buttons
  const allNotes = useMemo(() => {
    const notes = new Set<string>();
    getProductsByGender('all').forEach(product => {
      product.notes.forEach(note => notes.add(note));
    });
    return Array.from(notes).sort();
  }, []);

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
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 font-serif">
            Our <span className="text-yellow-400">Collection</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Discover our {filteredProducts.length} exquisite premium artisanal perfumes
          </p>
        </motion.div>

        {/* Gender Filter */}
        <motion.div
          className="mb-8 flex gap-3 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.05 }}
        >
          {(['all', 'men', 'women'] as const).map(gender => (
            <motion.button
              key={gender}
              onClick={() => setSelectedGender(gender)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                selectedGender === gender
                  ? 'bg-yellow-500 text-black'
                  : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {gender === 'all' ? 'All Fragrances' : gender.charAt(0).toUpperCase() + gender.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        {/* Search & Notes Filter */}
        <motion.div
          className="mb-12 space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {/* Search */}
          <div className="relative">
            <SearchIcon size={20} color="#d4af37" className="absolute left-3 top-3.5 text-yellow-500" />
            <input
              type="text"
              placeholder="Search by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-yellow-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/60"
            />
          </div>

          {/* Notes Filter */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-2">Filter by fragrance notes</h3>
            <div className="flex gap-2 flex-wrap">
              {allNotes.map(note => (
                <motion.button
                  key={note}
                  onClick={() => toggleNote(note)}
                  className={`px-3 py-1 rounded-full text-sm transition-all ${
                    selectedNotes.includes(note)
                      ? 'bg-yellow-500/80 text-black font-semibold'
                      : 'bg-slate-800/50 text-gray-400 hover:bg-slate-700/50'
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
        {filteredProducts.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {filteredProducts.map((product, idx) => (
              <Link key={product.id} href={`/fragranza/products/${product.id}`}>
                <motion.div
                  className="group rounded-2xl bg-gradient-to-br from-slate-900/50 via-slate-800/50 to-black/50 border border-yellow-500/20 overflow-hidden hover:border-yellow-500/50 transition-all flex flex-col cursor-pointer h-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -10 }}
                >
                {/* Product Image */}
                <div className="relative w-full h-64 bg-slate-800 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Gender Badge */}
                  <div className="absolute top-4 right-4 bg-yellow-500/80 text-black px-3 py-1 rounded-lg text-sm font-semibold">
                    {product.gender === 'men' ? '♂ Men' : '♀ Women'}
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                    {product.name}
                  </h3>

                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">{product.description}</p>

                  {/* Notes */}
                  <div className="mb-3">
                    <p className="text-xs text-yellow-400 font-medium mb-2">Notes</p>
                    <div className="flex gap-2 flex-wrap">
                      {product.notes.map(note => (
                        <span key={note} className="text-xs bg-slate-700/50 text-gray-300 px-2 py-1 rounded">
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Intensity */}
                  <div className="mb-4">
                    <p className="text-xs text-yellow-400 font-medium mb-2">Intensity</p>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-2 flex-1 rounded-full ${
                            i < product.intensity ? 'bg-yellow-500' : 'bg-slate-700'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Price & Button */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-yellow-500/20">
                    <span className="text-2xl font-bold text-yellow-400">{product.basePrice}</span>
                    <motion.button
                      className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-lg transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Add to Cart
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </Link>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h3 className="text-lg font-semibold text-white mb-2">No products found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </motion.div>
        )}
      </div>
    </main>
  );
}
