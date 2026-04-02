'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import { ProtectRoute } from '@/app/components/ProtectedRoute';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

function ClientLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, logout, userRole } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  const clientModules = [
    { label: 'Shop', href: '/client', icon: '🛍️' },
    { label: 'My Orders', href: '/client/orders', icon: '📦' },
    { label: 'Learning Materials', href: '/client/learning', icon: '📚' },
    { label: 'Account', href: '/client/account', icon: '⚙️' },
  ];

  const isActive = (href: string) => {
    if (href === '/client') {
      return pathname === '/client';
    }
    return pathname.startsWith(href);
  };

  return (
    <motion.div className="min-h-screen bg-black flex" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Sidebar */}
      <motion.div
        className={`${
          isSidebarOpen ? 'w-56' : 'w-16'
        } bg-gradient-to-b from-slate-900 via-slate-800 to-black border-r border-yellow-500/20 transition-all duration-300 flex flex-col`}
        initial={{ x: -300 }}
        animate={{ x: 0 }}
      >
        {/* Header */}
        <div className="p-4 border-b border-yellow-500/20 flex items-center justify-between">
          <motion.button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-yellow-400 hover:text-yellow-300 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isSidebarOpen ? '✕' : '☰'}
          </motion.button>
          {isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs font-bold text-yellow-400"
            >
              MENU
            </motion.div>
          )}
        </div>

        {/* User Profile Card */}
        {isSidebarOpen && (
          <motion.div
            className="px-4 py-4 border-b border-yellow-500/10 bg-yellow-500/5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center flex-shrink-0 text-sm font-bold text-black">
                {user?.first_name?.[0]}{user?.last_name?.[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-yellow-400">CUSTOMER</p>
                <p className="text-sm text-white truncate font-semibold">
                  {user?.first_name} {user?.last_name}
                </p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-2">
          {isSidebarOpen && (
            <motion.div
              className="px-2 mb-4 text-xs font-bold text-gray-500 uppercase tracking-wider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Shopping
            </motion.div>
          )}
          <motion.div className="space-y-1">
            {clientModules.map((module, idx) => (
              <Link key={idx} href={module.href}>
                <motion.div
                  className={`px-4 py-3 rounded-lg border transition-all cursor-pointer flex items-center gap-3 ${
                    isActive(module.href)
                      ? 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400'
                      : 'border-yellow-500/0 text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/10 hover:border-yellow-500/30'
                  }`}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-xl flex-shrink-0">{module.icon}</span>
                  {isSidebarOpen && <span className="text-sm font-medium">{module.label}</span>}
                  {isSidebarOpen && isActive(module.href) && (
                    <motion.div
                      className="ml-auto w-2 h-2 rounded-full bg-yellow-400"
                      layoutId="activeIndicator"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.div>
              </Link>
            ))}
          </motion.div>

          {/* Account Section Divider */}
          {isSidebarOpen && (
            <motion.div className="my-4 border-t border-yellow-500/20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
          )}

          {/* Account Settings */}
          {isSidebarOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
              <div className="px-2 mb-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Account</div>
              <div className="space-y-1">
                <Link href="/client/account">
                  <motion.div
                    className={`px-4 py-3 rounded-lg border transition-all cursor-pointer flex items-center gap-3 ${
                      isActive('/client/account')
                        ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                        : 'border-yellow-500/0 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 hover:border-blue-500/30'
                    }`}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-lg flex-shrink-0">⚙️</span>
                    <span className="text-sm font-medium">Settings</span>
                    {isActive('/client/account') && (
                      <motion.div
                        className="ml-auto w-2 h-2 rounded-full bg-blue-400"
                        layoutId="accountIndicator"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          )}
        </nav>

        {/* Footer Section */}
        {isSidebarOpen && (
          <motion.div
            className="p-4 border-t border-yellow-500/20 space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.button
              onClick={logout}
              className="w-full px-4 py-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 rounded-lg font-medium text-sm transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Sign Out
            </motion.button>
            <p className="text-xs text-gray-600 text-center mt-3">v1.0 • Customer Portal</p>
          </motion.div>
        )}
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <motion.div
          className="bg-gradient-to-r from-slate-900 to-black border-b border-yellow-500/20 px-6 sm:px-8 py-4 sticky top-0 z-10"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Fragranza Olio <span className="text-yellow-400">Shop</span>
          </h1>
        </motion.div>

        {/* Page Content */}
        <motion.div className="flex-1 overflow-y-auto p-6 sm:p-8" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          {children}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectRoute requiredRoles={['CLIENT']}>
      <ClientLayoutContent>{children}</ClientLayoutContent>
    </ProtectRoute>
  );
}
