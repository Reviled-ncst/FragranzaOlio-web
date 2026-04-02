'use client';

import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;

  const categoryData: Record<string, { title: string; description: string; color: string }> = {
    floral: {
      title: 'Floral Collection',
      description: 'Delicate, romantic, and enchanting fragrances featuring beautiful floral notes',
      color: 'from-pink-500/20 to-rose-500/10',
    },
    woody: {
      title: 'Woody Collection',
      description: 'Rich, warm, and sophisticated fragrances with woody base notes',
      color: 'from-amber-500/20 to-yellow-500/10',
    },
    oriental: {
      title: 'Oriental Collection',
      description: 'Luxurious, sensual, and mysterious fragrances with oriental character',
      color: 'from-purple-500/20 to-pink-500/10',
    },
    fresh: {
      title: 'Fresh Collection',
      description: 'Crisp, invigorating, and uplifting fragrances for everyday elegance',
      color: 'from-blue-500/20 to-cyan-500/10',
    },
  };

  const data = categoryData[category] || categoryData.floral;

  const products = [
    { name: 'Fragment 1', price: '$75' },
    { name: 'Fragment 2', price: '$85' },
    { name: 'Fragment 3', price: '$95' },
    { name: 'Fragment 4', price: '$105' },
    { name: 'Fragment 5', price: '$115' },
    { name: 'Fragment 6', price: '$125' },
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
            {data.title}
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">{data.description}</p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {products.map((product, idx) => (
            <motion.div
              key={idx}
              className={`rounded-2xl bg-gradient-to-br ${data.color} border border-yellow-500/30 p-8 group hover:border-yellow-500/60 transition-all`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              {/* Product Placeholder */}
              <div className="w-full h-48 bg-gradient-to-br from-yellow-500/20 to-amber-500/10 rounded-xl mb-6 flex items-center justify-center">
                <svg className="w-20 h-20 text-yellow-500/50" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                </svg>
              </div>

              <h3 className="text-xl font-bold text-white mb-4">{product.name}</h3>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-yellow-400">{product.price}</span>
                <motion.button
                  className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-bold rounded-lg text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Add to Cart
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
