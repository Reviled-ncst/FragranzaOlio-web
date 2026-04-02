'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';

interface AccountLayoutProps {
  children: React.ReactNode;
}

const navigationItems = [
  { label: 'Profile', href: '/account/profile', icon: '👤' },
  { label: 'Security', href: '/account/security', icon: '🔒' },
  { label: 'Preferences', href: '/account/preferences', icon: '⚙️' },
];

const internNavigationItems = [
  { label: 'Dashboard', href: '/account/intern-dashboard', icon: '📊' },
  { label: 'Profile', href: '/account/profile', icon: '👤' },
  { label: 'Security', href: '/account/security', icon: '🔒' },
  { label: 'Preferences', href: '/account/preferences', icon: '⚙️' },
];

export function AccountLayout({ children }: AccountLayoutProps) {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <motion.div className="min-h-screen bg-black pt-32 pb-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Account <span className="text-yellow-400">Settings</span>
            </h1>
            <p className="text-gray-400">Manage your profile and preferences</p>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div className="grid grid-cols-1 lg:grid-cols-4 gap-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          {/* Sidebar Navigation */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20 sticky top-32">
              <h2 className="text-xl font-bold text-white mb-6">Settings</h2>
              <nav className="space-y-2">
                {(user?.role === 'INTERN' ? internNavigationItems : navigationItems).map((item, idx) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.div key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }}>
                      <Link href={item.href}>
                        <motion.button
                          className={`w-full px-4 py-3 rounded-lg flex items-center gap-3 font-medium transition-all ${ isActive ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' : 'text-gray-400 hover:text-white bg-white/5 border border-yellow-500/10 hover:border-yellow-500/20'}`}
                          whileHover={{ x: 4 }}
                        >
                          <span className="text-lg">{item.icon}</span>
                          {item.label}
                        </motion.button>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* User Info Card */}
              <div className="mt-8 pt-8 border-t border-yellow-500/10">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-yellow-500/20 to-amber-500/20 flex items-center justify-center border border-yellow-500/30">
                    <span className="text-2xl">👤</span>
                  </div>
                  <p className="text-white font-semibold text-sm mb-1">{user?.first_name} {user?.last_name}</p>
                  <p className="text-gray-400 text-xs">{user?.email}</p>
                  <p className="text-yellow-400 text-xs mt-2 font-medium">{user?.role}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Area */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {children}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
