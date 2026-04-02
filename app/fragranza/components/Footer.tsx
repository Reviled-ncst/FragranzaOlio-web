'use client';

import { motion } from 'framer-motion';
import { useState, FormEvent } from 'react';
import { InstagramIcon, PinterestIcon, TikTokIcon, CheckmarkIcon } from './Icons/SocialIcons';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const footerLinks = {
    Shop: ['All Fragrances', 'Collections', 'Bestsellers', 'New Arrivals'],
    Company: ['About Us', 'Our Story', 'Sustainability', 'Careers'],
    Resources: ['Care Guide', 'Blog', 'FAQs', 'Contact'],
    Legal: ['Privacy', 'Terms', 'Returns', 'Shipping'],
  };

  const socialLinks = [
    { icon: InstagramIcon, name: 'Instagram', url: '#' },
    { icon: PinterestIcon, name: 'Pinterest', url: '#' },
    { icon: TikTokIcon, name: 'TikTok', url: '#' },
  ];

  return (
    <footer className="relative w-full bg-black border-t border-yellow-500/10 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-900/5 via-transparent to-transparent pointer-events-none" />

      {/* Newsletter Section */}
      <motion.div
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-yellow-500/10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-2xl">
          <h3 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
            Get <span className="bg-gradient-to-r from-yellow-300 to-amber-300 bg-clip-text text-transparent">Exclusive Offers</span>
          </h3>
          <p className="text-gray-400 mb-6">
            Subscribe to receive early access to new collections and special discounts.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-5 py-3 rounded-lg bg-white/5 border border-yellow-500/20 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all"
              required
            />
            <motion.button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-amber-300 hover:from-yellow-300 hover:to-yellow-200 text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-yellow-500/30 transition-all whitespace-nowrap text-sm flex items-center gap-2 justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {subscribed ? (
                <>
                  <CheckmarkIcon size={18} color="#000" /> Subscribed!
                </>
              ) : (
                'Subscribe'
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.1 }}
          viewport={{ once: true }}
        >
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <motion.div
              className="flex items-center gap-2 mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <img
                src="https://res.cloudinary.com/djnzwvb2t/image/upload/v1775029733/FRAGRANZAOLIO_LOGO_wyvcvz.png"
                alt="Fragranza Olio Logo"
                className="w-10 h-10 object-contain"
              />
              <img
                src="https://res.cloudinary.com/djnzwvb2t/image/upload/v1775029733/Untitled_design_rzts79.png"
                alt="Fragranza Olio"
                className="h-9 object-contain"
              />
            </motion.div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Crafting exceptional fragrances with premium ingredients and a commitment to sustainability.
            </p>
          </motion.div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold text-white mb-4 text-sm tracking-wide">
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <motion.a
                      href="#"
                      className="text-gray-500 hover:text-yellow-300 transition-colors text-sm"
                      whileHover={{ x: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent mb-8" />

        {/* Bottom Section */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {/* Copyright */}
          <p className="text-gray-500 text-sm">
            © 2024 Fragranza Olio. All rights reserved. Made with passion for luxury.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <motion.a
                  key={social.name}
                  href={social.url}
                  title={social.name}
                  className="w-10 h-10 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-300 hover:bg-yellow-500/20 hover:border-yellow-500/40 transition-all"
                  whileHover={{
                    scale: 1.15,
                    background: 'rgba(255, 215, 0, 0.2)',
                    borderColor: 'rgba(255, 215, 0, 0.4)',
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconComponent size={20} color="#d4af37" />
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
