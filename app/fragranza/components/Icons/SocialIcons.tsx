'use client';

import { motion } from 'framer-motion';

interface IconProps {
  className?: string;
  size?: number;
  color?: string;
}

export const InstagramIcon = ({ className = '', size = 24, color = '#d4af37' }: IconProps) => (
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
    whileHover={{ scale: 1.2, rotate: 10 }}
    transition={{ type: 'spring', stiffness: 400 }}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <circle cx="17.5" cy="6.5" r="1.5" fill={color} />
  </motion.svg>
);

export const PinterestIcon = ({ className = '', size = 24, color = '#d4af37' }: IconProps) => (
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
    whileHover={{ scale: 1.2, rotate: -10 }}
    transition={{ type: 'spring', stiffness: 400 }}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M8 12c0-2.21 1.79-4 4-4s4 1.79 4 4M12 9v7" strokeWidth="1.5" />
  </motion.svg>
);

export const TikTokIcon = ({ className = '', size = 24, color = '#d4af37' }: IconProps) => (
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
    whileHover={{ scale: 1.2, rotate: 10 }}
    transition={{ type: 'spring', stiffness: 400 }}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </motion.svg>
);

export const CheckmarkIcon = ({ className = '', size = 24, color = '#d4af37' }: IconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    initial={{ scale: 0, rotate: -180 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{ type: 'spring', stiffness: 500, damping: 15 }}
  >
    <polyline points="20 6 9 17 4 12" />
  </motion.svg>
);

export const HeartIcon = ({ className = '', size = 24, color = '#d4af37' }: IconProps) => (
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
    whileHover={{ scale: 1.2, fill: color }}
    transition={{ type: 'spring', stiffness: 400 }}
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </motion.svg>
);

export const StarIcon = ({ className = '', size = 24, color = '#d4af37' }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="12 2 15.09 10.26 23.77 10.26 17.43 16.7 19.52 22.74 12 17.3 4.48 22.74 6.57 16.7 0.23 10.26 8.91 10.26 12 2" />
  </svg>
);

export const FilterIcon = ({ className = '', size = 24, color = '#d4af37' }: IconProps) => (
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
    whileHover={{ scale: 1.1 }}
    transition={{ type: 'spring', stiffness: 400 }}
  >
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </motion.svg>
);

export const SearchIcon = ({ className = '', size = 24, color = '#d4af37' }: IconProps) => (
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
    whileHover={{ scale: 1.1 }}
    transition={{ type: 'spring', stiffness: 400 }}
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </motion.svg>
);
