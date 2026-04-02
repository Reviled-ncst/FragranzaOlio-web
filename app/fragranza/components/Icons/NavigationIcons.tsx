'use client';

import { motion } from 'framer-motion';

interface IconProps {
  className?: string;
  size?: number;
  color?: string;
  animated?: boolean;
}

export const ShopIcon = ({ className = '', size = 24, color = '#d4af37' }: IconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    whileHover={{ scale: 1.1, rotate: 5 }}
    transition={{ type: 'spring', stiffness: 300 }}
  >
    <circle cx="9" cy="21" r="1" fill={color} />
    <circle cx="20" cy="21" r="1" fill={color} />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </motion.svg>
);

export const CollectionsIcon = ({ className = '', size = 24, color = '#d4af37' }: IconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    whileHover={{ scale: 1.1, rotate: -5 }}
    transition={{ type: 'spring', stiffness: 300 }}
  >
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </motion.svg>
);

export const AboutIcon = ({ className = '', size = 24, color = '#d4af37' }: IconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    whileHover={{ scale: 1.1, rotate: 5 }}
    transition={{ type: 'spring', stiffness: 300 }}
  >
    <circle cx="12" cy="12" r="10" fill="none" />
    <path d="M12 16v-4M12 8h.01" />
  </motion.svg>
);

export const IngredientsIcon = ({ className = '', size = 24, color = '#d4af37' }: IconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    whileHover={{ scale: 1.1, rotate: -5 }}
    transition={{ type: 'spring', stiffness: 300 }}
  >
    <path d="M12 2v20M2 12h20M7 7l10 10M17 7l-10 10" />
  </motion.svg>
);

export const BlogIcon = ({ className = '', size = 24, color = '#d4af37' }: IconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    whileHover={{ scale: 1.1, rotate: 5 }}
    transition={{ type: 'spring', stiffness: 300 }}
  >
    <path d="M4 4h16v16H4zM4 9h16M8 13h4M8 17h8" />
  </motion.svg>
);

export const ContactIcon = ({ className = '', size = 24, color = '#d4af37' }: IconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    whileHover={{ scale: 1.1, rotate: -5 }}
    transition={{ type: 'spring', stiffness: 300 }}
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 4l10 7 10-7" />
  </motion.svg>
);

export const BagIcon = ({ className = '', size = 24, color = '#d4af37' }: IconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    whileHover={{ scale: 1.15, y: -2 }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: 'spring', stiffness: 400 }}
  >
    <circle cx="9" cy="21" r="1" fill={color} />
    <circle cx="20" cy="21" r="1" fill={color} />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" stroke={color} fill="none" />
  </motion.svg>
);

export const InternshipIcon = ({ className = '', size = 24, color = '#d4af37' }: IconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    whileHover={{ scale: 1.1, rotate: 5 }}
    transition={{ type: 'spring', stiffness: 300 }}
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" fill="none" />
    <path d="M16 11h6M19 8v6" />
  </motion.svg>
);
