'use client';

import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRoles?: string[];
}

export function ProtectRoute({ children, requiredRoles }: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading, userRole } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/');
    } else if (!isLoading && requiredRoles && userRole && !requiredRoles.includes(userRole)) {
      router.push('/unauthorized');
    }
  }, [isLoading, isAuthenticated, userRole, requiredRoles, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }}>
          <div className="w-12 h-12 border-4 border-yellow-500/30 border-t-yellow-500 rounded-full" />
        </motion.div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (requiredRoles && userRole && !requiredRoles.includes(userRole)) {
    return null;
  }

  return <>{children}</>;
}

export function RoleBasedAccess({ children, allowedRoles }: { children: ReactNode; allowedRoles: string[] }) {
  const { userRole } = useAuth();

  if (!userRole || !allowedRoles.includes(userRole)) {
    return null;
  }

  return <>{children}</>;
}
