'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/app/context/AuthContext';
import { ProtectRoute } from '@/app/components/ProtectedRoute';
import { AccountLayout } from '@/app/components/AccountLayout';
import { accountService } from '@/app/lib/accountService';

function SecurityContent() {
  const { user } = useAuth();
  const [passwordForm, setPasswordForm] = useState({
    current_password: '',
    new_password: '',
    confirm_password: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSavePassword = async () => {
    try {
      setIsChangingPassword(true);
      setPasswordError(null);
      setPasswordSuccess(false);

      // Validate passwords
      if (!passwordForm.current_password || !passwordForm.new_password || !passwordForm.confirm_password) {
        setPasswordError('All password fields are required');
        return;
      }

      if (passwordForm.new_password !== passwordForm.confirm_password) {
        setPasswordError('New passwords do not match');
        return;
      }

      if (passwordForm.new_password.length < 8) {
        setPasswordError('New password must be at least 8 characters');
        return;
      }

      // For now, just show success
      // In production, call API
      setPasswordSuccess(true);
      setPasswordForm({
        current_password: '',
        new_password: '',
        confirm_password: '',
      });
      setTimeout(() => setPasswordSuccess(false), 3000);
    } catch (err) {
      setPasswordError('Failed to change password');
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setIsDeletingAccount(true);
      setPasswordError(null);

      if (!deletePassword) {
        setPasswordError('Password is required to delete account');
        return;
      }

      // For now, just show confirmation
      // In production, call API
      alert('Account deletion not available in demo mode');
    } catch (err) {
      setPasswordError('Failed to delete account');
    } finally {
      setIsDeletingAccount(false);
    }
  };

  return (
    <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Change Password */}
      <motion.div
        className="p-8 rounded-2xl bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-white mb-6">Change Password</h2>

        {passwordError && (
          <motion.div
            className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {passwordError}
          </motion.div>
        )}

        {passwordSuccess && (
          <motion.div
            className="p-4 bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            ✓ Password changed successfully
          </motion.div>
        )}

        <div className="space-y-6">
          {/* Current Password */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <label className="block text-sm font-medium text-white mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showPasswords.current ? 'text' : 'password'}
                name="current_password"
                value={passwordForm.current_password}
                onChange={handlePasswordChange}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-yellow-500/20 text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none transition-all pr-12"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowPasswords((prev) => ({ ...prev, current: !prev.current }))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPasswords.current ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </motion.div>

          {/* New Password */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <label className="block text-sm font-medium text-white mb-2">New Password</label>
            <div className="relative">
              <input
                type={showPasswords.new ? 'text' : 'password'}
                name="new_password"
                value={passwordForm.new_password}
                onChange={handlePasswordChange}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-yellow-500/20 text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none transition-all pr-12"
                placeholder="Enter new password (min 8 characters)"
              />
              <button
                type="button"
                onClick={() => setShowPasswords((prev) => ({ ...prev, new: !prev.new }))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPasswords.new ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Use at least 8 characters with a mix of letters and numbers</p>
          </motion.div>

          {/* Confirm Password */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <label className="block text-sm font-medium text-white mb-2">Confirm New Password</label>
            <div className="relative">
              <input
                type={showPasswords.confirm ? 'text' : 'password'}
                name="confirm_password"
                value={passwordForm.confirm_password}
                onChange={handlePasswordChange}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-yellow-500/20 text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none transition-all pr-12"
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() => setShowPasswords((prev) => ({ ...prev, confirm: !prev.confirm }))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPasswords.confirm ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </motion.div>

          {/* Save Button */}
          <motion.div className="flex gap-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <motion.button
              onClick={handleSavePassword}
              disabled={isChangingPassword}
              className="px-6 py-3 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-500/30 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isChangingPassword ? 'Changing...' : 'Change Password'}
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Two-Factor Authentication */}
      <motion.div
        className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-yellow-500/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Two-Factor Authentication</h2>
            <p className="text-gray-400 mb-4">Add an extra layer of security to your account</p>
          </div>
          <div className="text-right">
            <span className="inline-block px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-medium">NOT ENABLED</span>
          </div>
        </div>
        <p className="text-gray-400 mb-4">
          Two-factor authentication adds an additional security layer by requiring a code from your phone in addition to your password when logging in.
        </p>
        <motion.button
          className="px-6 py-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30 rounded-lg font-medium transition-all"
          whileHover={{ scale: 1.02 }}
        >
          Enable 2FA
        </motion.button>
      </motion.div>

      {/* Email Verification */}
      <motion.div
        className="p-8 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-yellow-500/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Email Verification</h2>
            <p className="text-gray-400">{user?.email}</p>
          </div>
          <span className="inline-block px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">VERIFIED</span>
        </div>
      </motion.div>

      {/* Active Sessions */}
      <motion.div
        className="p-8 rounded-2xl bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold text-white mb-6">Active Sessions</h2>
        <div className="space-y-3">
          {[
            { device: 'Windows (Current)', browser: 'Chrome', lastActive: 'Just now' },
            { device: 'iPhone 14 Pro', browser: 'Safari', lastActive: '2 hours ago' },
          ].map((session, idx) => (
            <motion.div
              key={idx}
              className="p-4 rounded-lg bg-white/5 border border-yellow-500/10 flex items-center justify-between"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + idx * 0.05 }}
            >
              <div>
                <p className="text-white font-semibold text-sm">{session.device}</p>
                <p className="text-gray-400 text-xs">{session.browser} • Last active {session.lastActive}</p>
              </div>
              {idx === 0 ? (
                <span className="text-green-400 text-xs font-medium">ACTIVE</span>
              ) : (
                <motion.button
                  className="px-3 py-1 text-red-400 text-xs hover:text-red-300 transition-all"
                  whileHover={{ scale: 1.05 }}
                >
                  Sign out
                </motion.button>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        className="p-8 rounded-2xl bg-gradient-to-br from-red-500/10 to-rose-500/5 border border-red-500/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <h2 className="text-2xl font-bold text-red-400 mb-4">Danger Zone</h2>
        <p className="text-gray-400 mb-6">
          Permanently delete your account and all associated data. This action cannot be undone.
        </p>
        <motion.button
          onClick={() => setShowDeleteModal(true)}
          className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 rounded-lg font-medium transition-all"
          whileHover={{ scale: 1.02 }}
        >
          Delete Account
        </motion.button>
      </motion.div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-slate-900 border border-red-500/30 rounded-2xl p-8 max-w-md w-full mx-4"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h3 className="text-xl font-bold text-white mb-4">Delete Account?</h3>
            <p className="text-gray-400 mb-6">
              This action is permanent and cannot be undone. All your data will be deleted.
            </p>

            {passwordError && (
              <motion.div
                className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg mb-4 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {passwordError}
              </motion.div>
            )}

            <div className="mb-6">
              <label className="block text-sm font-medium text-white mb-2">Confirm with your password</label>
              <input
                type="password"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-red-500/20 text-white placeholder-gray-500 focus:border-red-400"
                placeholder="Enter password to confirm"
              />
            </div>

            <div className="flex gap-3">
              <motion.button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeletePassword('');
                  setPasswordError(null);
                }}
                className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg font-medium transition-all"
                whileHover={{ scale: 1.02 }}
              >
                Cancel
              </motion.button>
              <motion.button
                onClick={handleDeleteAccount}
                disabled={isDeletingAccount}
                className="flex-1 px-4 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 rounded-lg font-medium disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
              >
                {isDeletingAccount ? 'Deleting...' : 'Delete'}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default function SecurityPage() {
  return (
    <ProtectRoute requiredRoles={['SUPERADMIN', 'ADMIN', 'SUPERVISOR', 'INTERN']}>
      <AccountLayout>
        <SecurityContent />
      </AccountLayout>
    </ProtectRoute>
  );
}
