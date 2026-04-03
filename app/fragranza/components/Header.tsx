'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShopIcon,
  CollectionsIcon,
  AboutIcon,
  IngredientsIcon,
  BlogIcon,
  ContactIcon,
  BagIcon,
  InternshipIcon,
} from './Icons/NavigationIcons';
import AuthModal from './AuthModal';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);
  const [activeNestedDropdown, setActiveNestedDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    {
      label: 'Home',
      icon: ShopIcon,
      href: '/',
      submenu: null,
    },
    {
      label: 'Collections',
      icon: CollectionsIcon,
      href: '/fragranza/collections',
      submenu: [
        {
          label: '✨ Fragrances',
          href: '#',
          isGroup: true,
          nested: [
            { label: 'Perfumes - Men', href: '/fragranza/collections/perfumes/men' },
            { label: 'Perfumes - Women', href: '/fragranza/collections/perfumes/women' },
            { label: 'Cologne', href: '/fragranza/collections/cologne' },
          ],
        },
        {
          label: '🛁 Personal Care',
          href: '#',
          isGroup: true,
          nested: [
            { label: 'Soap', href: '/fragranza/collections/soap' },
            { label: 'Helmet Spray', href: '/fragranza/collections/helmet-spray' },
            { label: 'Liquid Hand Soap', href: '/fragranza/collections/liquid-hand-soap' },
          ],
        },
        {
          label: '🏠 Home & Auto',
          href: '#',
          isGroup: true,
          nested: [
            { label: 'Car Diffuser', href: '/fragranza/collections/car-diffuser' },
            { label: 'Dishwashing Liquid', href: '/fragranza/collections/dishwashing-liquid' },
          ],
        },
        {
          label: '🧪 Chemical Products',
          href: '#',
          isGroup: true,
          nested: [
            { label: 'Ethyl Alcohol', href: '/fragranza/collections/alcohol/ethyl' },
            { label: 'Isopropyl Alcohol', href: '/fragranza/collections/alcohol/isopropyl' },
          ],
        },
      ],
    },
    {
      label: 'Company',
      icon: AboutIcon,
      href: '#',
      submenu: [
        {
          label: 'Certificates & Awards',
          href: '/fragranza/certifications',
          nested: null,
        },
        {
          label: 'About',
          href: '/fragranza/about',
          nested: null,
        },
        {
          label: 'Contact',
          href: '/fragranza/contact',
          nested: null,
        },
        {
          label: 'Internship Program',
          href: '/internship',
          nested: [
            { label: 'Browse Opportunities', href: '/internship' },
            { label: 'Program Info', href: '/internship/about' },
            { label: 'Apply Now', href: '/internship/apply' },
          ],
        },
      ],
    },
  ];

  return (
    <motion.header
      className={`fixed top-0 w-full z-30 transition-all duration-300 ${
        isScrolled
          ? 'bg-gradient-to-b from-black/90 via-black/85 to-black/80 backdrop-blur-xl border-b border-yellow-500/20 shadow-xl'
          : 'bg-gradient-to-b from-black/70 to-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="/"
            className="flex items-center gap-2 sm:gap-3 flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <img
              src="https://res.cloudinary.com/djnzwvb2t/image/upload/v1775029733/FRAGRANZAOLIO_LOGO_wyvcvz.png"
              alt="Fragranza Olio Logo"
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain drop-shadow-xl"
            />
            <img
              src="https://res.cloudinary.com/djnzwvb2t/image/upload/v1775029733/Untitled_design_rzts79.png"
              alt="Fragranza Olio"
              className="h-6 sm:h-8 md:h-10 object-contain drop-shadow-md"
            />
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const hasSubmenu = item.submenu && item.submenu.length > 0;

              return (
                <div
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => hasSubmenu && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <motion.a
                    href={item.href}
                    className="flex items-center gap-2 px-3 py-2.5 text-gray-300 hover:text-yellow-400 relative transition-colors text-xs font-medium tracking-wider uppercase group"
                    whileHover={{ color: '#d4af37' }}
                  >
                    <IconComponent size={16} color="currentColor" />
                    <span>{item.label}</span>
                    {hasSubmenu && (
                      <motion.span
                        animate={{ rotate: activeDropdown === item.label ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-xs"
                      >
                        ▼
                      </motion.span>
                    )}

                    {/* Underline */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-600"
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>

                  {/* Desktop Dropdown */}
                  <AnimatePresence>
                    {hasSubmenu && activeDropdown === item.label && (
                      <motion.div
                        className="absolute top-full left-0 mt-0 min-w-56 bg-gradient-to-b from-slate-900/95 via-slate-800/95 to-black/95 backdrop-blur-xl rounded-xl shadow-2xl border border-yellow-500/20 overflow-visible z-50"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.submenu?.map((subitem, idx) => (
                          <div
                            key={`${item.label}-${idx}`}
                            className="relative group"
                            onMouseEnter={() =>
                              subitem.nested && setActiveNestedDropdown(`${item.label}-${subitem.label}`)
                            }
                            onMouseLeave={() => setActiveNestedDropdown(null)}
                          >
                            <motion.a
                              href={subitem.href}
                              className="flex items-center justify-between px-5 py-4 text-gray-300 hover:text-yellow-400 hover:bg-yellow-500/10 text-sm font-medium tracking-wide transition-all border-b border-yellow-500/10 last:border-b-0"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              whileHover={{ paddingLeft: '25px' }}
                            >
                              <span>{subitem.label}</span>
                              {subitem.nested && (
                                <span className="text-xs ml-2">→</span>
                              )}
                            </motion.a>

                            {/* Nested Dropdown */}
                            <AnimatePresence>
                              {subitem.nested && activeNestedDropdown === `${item.label}-${subitem.label}` && (
                                <motion.div
                                  className="absolute left-full top-0 ml-1 min-w-40 bg-gradient-to-b from-slate-800/95 via-slate-700/95 to-black/95 backdrop-blur-xl rounded-xl shadow-2xl border border-yellow-500/20 overflow-hidden z-50"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -10 }}
                                  transition={{ duration: 0.15 }}
                                >
                                  {subitem.nested.map((nestedItem, nestedIdx) => (
                                    <motion.a
                                      key={`${subitem.label}-${nestedIdx}`}
                                      href={nestedItem.href}
                                      className="block px-4 py-3 text-gray-300 hover:text-yellow-400 hover:bg-yellow-500/10 text-sm font-medium tracking-wide transition-all border-b border-yellow-500/10 last:border-b-0"
                                      initial={{ opacity: 0, x: -5 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: nestedIdx * 0.03 }}
                                      whileHover={{ paddingLeft: '20px' }}
                                    >
                                      {nestedItem.label}
                                    </motion.a>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* CTA Button */}
          <motion.button
            onClick={() => setIsAuthModalOpen(true)}
            className="hidden md:flex items-center gap-2 px-5 sm:px-6 py-2.5 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-bold rounded-lg transition-all text-xs sm:text-sm relative overflow-hidden group shadow-lg hover:shadow-yellow-500/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <BagIcon size={16} color="#000" />
            <span className="relative">Login</span>
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2 relative z-40"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <motion.span
                className="h-0.5 bg-yellow-500 block transition-all"
                animate={
                  isMobileMenuOpen ? { rotate: 45, y: 10 } : { rotate: 0, y: 0 }
                }
              />
              <motion.span
                className="h-0.5 bg-yellow-500 block"
                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              />
              <motion.span
                className="h-0.5 bg-yellow-500 block"
                animate={
                  isMobileMenuOpen ? { rotate: -45, y: -10 } : { rotate: 0, y: 0 }
                }
              />
            </div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="lg:hidden mt-4 pb-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col gap-2 border-t border-yellow-600/20 pt-4">
                {navItems.map((item) => {
                  const IconComponent = item.icon;
                  const hasSubmenu = item.submenu && item.submenu.length > 0;
                  const isExpanded = expandedMobileMenu === item.label;

                  return (
                    <div key={item.label}>
                      {hasSubmenu ? (
                        <motion.button
                          onClick={() => {
                            setExpandedMobileMenu(
                              isExpanded ? null : item.label
                            );
                          }}
                          className="w-full flex items-center justify-between gap-3 px-4 py-3 text-gray-300 hover:text-yellow-400 hover:bg-yellow-500/10 transition-all text-sm font-medium tracking-wide rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <IconComponent size={16} color="currentColor" />
                            <span>{item.label}</span>
                          </div>
                          {hasSubmenu && (
                            <motion.span
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                              className="text-xs"
                            >
                              ▼
                            </motion.span>
                          )}
                        </motion.button>
                      ) : (
                        <motion.a
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-yellow-400 hover:bg-yellow-500/10 transition-all text-sm font-medium tracking-wide rounded-lg block"
                        >
                          <IconComponent size={16} color="currentColor" />
                          <span>{item.label}</span>
                        </motion.a>
                      )}

                      {/* Mobile Submenu */}
                      <AnimatePresence>
                        {hasSubmenu && isExpanded && (
                          <motion.div
                            className="ml-4 mt-1 flex flex-col gap-1"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            {item.submenu?.map((subitem, idx) => {
                              const nestedExpanded = expandedMobileMenu === `${item.label}-${subitem.label}`;

                              return (
                                <div key={`${item.label}-${idx}`}>
                                  {subitem.nested ? (
                                    <motion.button
                                      onClick={() => {
                                        setExpandedMobileMenu(
                                          nestedExpanded ? null : `${item.label}-${subitem.label}`
                                        );
                                      }}
                                      className="w-full flex items-center justify-between px-5 py-3 text-gray-300 hover:text-yellow-400 hover:bg-yellow-500/10 text-sm font-medium tracking-wide transition-all rounded-lg border-l-2 border-yellow-500/20"
                                    >
                                      <span>{subitem.label}</span>
                                      <motion.span
                                        animate={{ rotate: nestedExpanded ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="text-xs"
                                      >
                                        ▼
                                      </motion.span>
                                    </motion.button>
                                  ) : (
                                    <motion.a
                                      href={subitem.href}
                                      onClick={() => setIsMobileMenuOpen(false)}
                                      className="px-5 py-3 text-gray-300 hover:text-yellow-400 hover:bg-yellow-500/10 text-sm font-medium tracking-wide transition-all rounded-lg border-l-2 border-yellow-500/20 block"
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: idx * 0.05 }}
                                    >
                                      {subitem.label}
                                    </motion.a>
                                  )}

                                  {/* Nested Mobile Submenu */}
                                  {subitem.nested && nestedExpanded && (
                                    <motion.div
                                      className="ml-4 mt-1 flex flex-col gap-1"
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: 'auto' }}
                                      exit={{ opacity: 0, height: 0 }}
                                      transition={{ duration: 0.2 }}
                                    >
                                      {subitem.nested.map((nestedItem, nestedIdx) => (
                                        <motion.a
                                          key={`${subitem.label}-${nestedIdx}`}
                                          href={nestedItem.href}
                                          onClick={() => setIsMobileMenuOpen(false)}
                                          className="px-5 py-2 text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/5 text-xs font-medium tracking-wide transition-all rounded-lg border-l-2 border-yellow-500/10 block"
                                          initial={{ opacity: 0, x: -10 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          transition={{ delay: nestedIdx * 0.03 }}
                                        >
                                          → {nestedItem.label}
                                        </motion.a>
                                      ))}
                                    </motion.div>
                                  )}
                                </div>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}

                {/* Mobile Login Button */}
                <motion.button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-bold rounded-lg transition-all text-sm flex items-center justify-center gap-2 shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <BagIcon size={16} color="#000" />
                  Login
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </motion.header>
  );
}
