'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const testimonials = [
    {
      quote:
        'The Notte Stellata is absolutely divine. It\'s become my signature scent. The longevity is exceptional and the blend is so sophisticated.',
      author: 'Maria Rossi',
      fragrance: 'Notte Stellata',
      avatar: '👩',
      rating: 5,
    },
    {
      quote:
        'I\'ve been using Fragranza Olio for 3 years now. The quality is unmatched and the customer service is exceptional. Worth every penny.',
      author: 'Giovanni Russo',
      fragrance: 'Oud Magnifico',
      avatar: '👨',
      rating: 5,
    },
    {
      quote:
        'The Giardino Segreto brings back memories of Italy. Fresh, elegant, and long-lasting. This brand truly understands luxury.',
      author: 'Sophie Laurent',
      fragrance: 'Giardino Segreto',
      avatar: '👩‍🦱',
      rating: 5,
    },
    {
      quote:
        'Every fragrance I\'ve tried from their collection is extraordinary. The sustainability commitment is refreshing in the luxury market.',
      author: 'Alessandro Moretti',
      fragrance: 'Rosa Eterna',
      avatar: '👨‍🦱',
      rating: 5,
    },
  ];

  useEffect(() => {
    if (!isAutoPlay) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlay, testimonials.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlay(false);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
    setIsAutoPlay(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlay(false);
  };

  return (
    <section className="relative w-full py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-amber-950/5 -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-white">
            Loved by <span className="bg-gradient-to-r from-yellow-300 to-amber-300 bg-clip-text text-transparent">Fragrance Enthusiasts</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Hear from our delighted customers
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}
        >
          {/* Testimonials */}
          <div className="relative h-80 overflow-hidden">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: index === currentIndex ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="h-full p-10 sm:p-14 rounded-3xl border border-yellow-500/20 bg-gradient-to-br from-white/3 to-yellow-500/5 backdrop-blur-sm">
                  {/* Rating */}
                  <div className="flex gap-1 mb-8">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-300 text-2xl">
                        ★
                      </span>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-xl sm:text-2xl text-gray-100 mb-10 leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-yellow-500/20 to-transparent mb-8" />

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 to-amber-400 flex items-center justify-center text-2xl flex-shrink-0">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-bold text-white text-lg">
                        {testimonial.author}
                      </p>
                      <p className="text-sm text-yellow-300">
                        {testimonial.fragrance}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <motion.button
            onClick={goToPrev}
            className="absolute -left-6 sm:-left-14 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-yellow-500/20 border border-yellow-500/50 flex items-center justify-center group hover:bg-yellow-500/40 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className="w-6 h-6 text-yellow-300 group-hover:text-yellow-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </motion.button>

          <motion.button
            onClick={goToNext}
            className="absolute -right-6 sm:-right-14 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-yellow-500/20 border border-yellow-500/50 flex items-center justify-center group hover:bg-yellow-500/40 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className="w-6 h-6 text-yellow-300 group-hover:text-yellow-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-10">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all ${
                  index === currentIndex
                    ? 'bg-yellow-400 w-8 h-3 rounded-full'
                    : 'bg-yellow-500/30 w-3 h-3 rounded-full hover:bg-yellow-500/50'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
