'use client';

import { motion } from 'framer-motion';

export default function AboutPage() {
  const timeline = [
    {
      year: '2010',
      title: 'The Beginning',
      description: 'Fragranza Olio was founded with a vision to create premium, artisanal fragrances for the modern luxury market.',
    },
    {
      year: '2015',
      title: 'Global Expansion',
      description: 'Expanded to 25 countries and launched signature collections that became bestsellers worldwide.',
    },
    {
      year: '2020',
      title: 'Sustainability Initiative',
      description: 'Committed to environmental responsibility with 100% sustainable packaging and cruelty-free practices.',
    },
    {
      year: '2024',
      title: 'Innovation Era',
      description: 'Launched AI-powered fragrance personalization and became carbon-neutral in all operations.',
    },
  ];

  const values = [
    { title: 'Craftsmanship', description: 'Every fragrance is meticulously crafted by master perfumers' },
    { title: 'Quality', description: 'Only the finest natural and synthetic ingredients are used' },
    { title: 'Innovation', description: 'Continuously pushing boundaries in fragrance creation' },
    { title: 'Sustainability', description: 'Committed to environmental and ethical practices' },
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
            About <span className="text-yellow-400">Fragranza Olio</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A journey of passion, craftsmanship, and dedication to creating extraordinary fragrances
          </p>
        </motion.div>

        {/* Story Section */}
        <motion.section
          className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="h-96 bg-gradient-to-br from-yellow-500/20 to-amber-500/10 rounded-2xl border border-yellow-500/30"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          />

          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Our Story</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Fragranza Olio began with a simple belief: that everyone deserves to experience the transformative power of
              exceptional fragrances. Founded in 2010, we've grown from a small atelier to a global luxury brand.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              Each fragrance is a masterpiece, blending traditional perfumery techniques with modern innovation. We source
              the finest ingredients from around the world and work with renowned master perfumers.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Today, our fragrances are enjoyed by over 500,000 customers worldwide, and we continue our mission to create
              scents that inspire, captivate, and transform.
            </p>
          </motion.div>
        </motion.section>

        {/* Values */}
        <motion.section className="mb-20" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => (
              <motion.div
                key={value.title}
                className="p-6 rounded-xl bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20 hover:border-yellow-500/50 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <h3 className="text-xl font-bold text-yellow-400 mb-3">{value.title}</h3>
                <p className="text-gray-300 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Timeline */}
        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">Our Journey</h2>
          <div className="space-y-8">
            {timeline.map((item, idx) => (
              <motion.div
                key={item.year}
                className="flex gap-8"
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center">
                    <span className="font-bold text-black text-sm">{item.year}</span>
                  </div>
                  {idx < timeline.length - 1 && <div className="w-0.5 h-24 bg-gradient-to-b from-yellow-500 to-transparent mt-4" />}
                </div>
                <div className="pt-3 pb-8 flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </main>
  );
}
