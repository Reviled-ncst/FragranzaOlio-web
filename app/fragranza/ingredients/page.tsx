'use client';

import { motion } from 'framer-motion';

export default function IngredientsPage() {
  const ingredients = [
    {
      name: 'Rose Absolute',
      source: 'Bulgaria',
      description: 'The heart of romance, extracted from premium Bulgarian roses',
      benefits: 'Luxurious, floral, timeless',
    },
    {
      name: 'Oud Oil',
      source: 'Cambodia',
      description: 'Precious resin from ancient agarwood trees, the "liquid gold" of perfumery',
      benefits: 'Rich, woody, deeply luxurious',
    },
    {
      name: 'Bergamot',
      source: 'Calabria, Italy',
      description: 'Freshly extracted from Italian citrus fruits, providing bright top notes',
      benefits: 'Fresh, zesty, uplifting',
    },
    {
      name: 'Vanilla',
      source: 'Madagascar',
      description: 'Pure vanilla pods from sustainable plantations in Madagascar',
      benefits: 'Warm, creamy, comforting',
    },
    {
      name: 'Cedarwood',
      source: 'Atlas Mountains',
      description: 'Noble cedarwood from the Atlas Mountains of Morocco',
      benefits: 'Woody, grounding, sophisticated',
    },
    {
      name: 'Jasmine Sambac',
      source: 'Egypt',
      description: 'Hand-picked jasmine flowers, the "queen of flowers"',
      benefits: 'Intoxicating, floral, sensual',
    },
  ];

  const sustainability = [
    { stat: '100%', label: 'Cruelty-Free' },
    { stat: '95%', label: 'Natural Ingredients' },
    { stat: '50K+', label: 'Trees Planted' },
    { stat: '0%', label: 'Plastic Waste' },
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
            Premium <span className="text-yellow-400">Ingredients</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Sourced from the finest locations around the world to ensure uncompromising quality
          </p>
        </motion.div>

        {/* Ingredients Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {ingredients.map((ingredient, idx) => (
            <motion.div
              key={ingredient.name}
              className="p-6 rounded-2xl bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20 hover:border-yellow-500/50 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{ingredient.name}</h3>
                  <p className="text-sm text-yellow-400 font-medium">From {ingredient.source}</p>
                </div>
                <div className="text-4xl opacity-50">🌿</div>
              </div>

              <p className="text-gray-300 text-sm mb-4">{ingredient.description}</p>

              <div className="pt-4 border-t border-yellow-500/20">
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-2">Benefits</p>
                <p className="text-gray-300 text-sm">{ingredient.benefits}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Sustainability Section */}
        <motion.section
          className="mb-20 p-12 rounded-3xl bg-gradient-to-br from-yellow-500/10 via-amber-500/5 to-black/50 border border-yellow-500/30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">Our Commitment to Sustainability</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {sustainability.map((item, idx) => (
              <motion.div
                key={item.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <p className="text-4xl sm:text-5xl font-bold text-yellow-400 mb-2">{item.stat}</p>
                <p className="text-gray-300 font-medium">{item.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="p-6 rounded-xl bg-black/50 border border-yellow-500/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-bold text-white mb-3">♻️ Eco-Friendly Packaging</h3>
              <p className="text-gray-400 text-sm">100% recyclable and biodegradable materials used in all our packaging</p>
            </motion.div>

            <motion.div
              className="p-6 rounded-xl bg-black/50 border border-yellow-500/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-bold text-white mb-3">🌱 Ethical Sourcing</h3>
              <p className="text-gray-400 text-sm">Direct partnerships with farmers ensuring fair wages and sustainable practices</p>
            </motion.div>

            <motion.div
              className="p-6 rounded-xl bg-black/50 border border-yellow-500/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-bold text-white mb-3">🌍 Carbon Neutral</h3>
              <p className="text-gray-400 text-sm">All operations offset through verified environmental projects and tree planting</p>
            </motion.div>
          </div>
        </motion.section>

        {/* Natural vs Synthetic */}
        <motion.section
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="p-8 rounded-2xl bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">🌿 Natural Ingredients</h3>
            <ul className="space-y-3 text-gray-300">
              <li>✓ Sourced directly from nature</li>
              <li>✓ Complex, evolving scent profiles</li>
              <li>✓ Better skin compatibility</li>
              <li>✓ Sustainable and ethical</li>
            </ul>
          </motion.div>

          <motion.div
            className="p-8 rounded-2xl bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">🧪 Synthetic Ingredients</h3>
            <ul className="space-y-3 text-gray-300">
              <li>✓ Laboratory precision and consistency</li>
              <li>✓ Rarer aromatic compounds recreated</li>
              <li>✓ Improved longevity and stability</li>
              <li>✓ Innovative fragrance creation</li>
            </ul>
          </motion.div>
        </motion.section>
      </div>
    </main>
  );
}
