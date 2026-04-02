'use client';

import { redirect } from 'next/navigation';
import { ProtectRoute } from '@/app/components/ProtectedRoute';

export default function AccountPage() {
  // Redirect to profile page
  redirect('/account/profile');

  return null;
}

// Wrap with protection
export function AccountPageWithProtection() {
  return (
    <ProtectRoute requiredRoles={['SUPERADMIN', 'ADMIN', 'SUPERVISOR', 'INTERN']}>
      <AccountPage />
    </ProtectRoute>
  );
}
