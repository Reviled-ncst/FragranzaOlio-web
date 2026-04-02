'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/app/context/AuthContext';
import { ProtectRoute } from '@/app/components/ProtectedRoute';
import { AccountLayout } from '@/app/components/AccountLayout';
import { accountService } from '@/app/lib/accountService';
import { AccountProfile, UpdateProfileRequest } from '@/app/types/account';

function ProfileContent() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<AccountProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    bio: '',
  });

  // Load profile data
  useEffect(() => {
    const loadProfile = async () => {
      try {
        setIsLoading(true);
        // For now, use user data from auth context as profile
        // In production, fetch from API
        if (user) {
          const fullName = `${user.first_name} ${user.last_name}`;
          setProfile({
            id: user.id.toString(),
            email: user.email,
            name: fullName,
            department: user.department,
          });

          // Load saved profile data from localStorage
          const saved = localStorage.getItem('user_profile');
          if (saved) {
            const savedProfile = JSON.parse(saved);
            setFormData(savedProfile);
          } else {
            setFormData({
              name: fullName,
              phone: '',
              bio: '',
            });
          }
        }
      } catch (err) {
        setError('Failed to load profile');
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = async () => {
    try {
      setIsSaving(true);
      setError(null);
      setSuccess(false);

      // Save to localStorage
      localStorage.setItem('user_profile', JSON.stringify(formData));

      setProfile((prev) => ({
        ...prev!,
        ...formData,
      }));

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Failed to save profile');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full border-4 border-yellow-500/30 border-t-yellow-400 animate-spin"></div>
          <p className="text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  const isIntern = user?.role === 'INTERN';

  return (
    <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Intern Notice */}
      {isIntern && (
        <motion.div
          className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-400 text-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          📌 <strong>Note:</strong> Some fields are restricted for interns. You can only edit name, phone, and bio. Email and department are managed by your supervisor.
        </motion.div>
      )}

      {/* Profile Information */}
      <motion.div
        className="p-8 rounded-2xl bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-white mb-6">Profile Information</h2>

        {error && (
          <motion.div
            className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.div>
        )}

        {success && (
          <motion.div
            className="p-4 bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            ✓ Profile updated successfully
          </motion.div>
        )}

        <div className="space-y-6">
          {/* Full Name */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <label className="block text-sm font-medium text-white mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-yellow-500/20 text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none transition-all"
              placeholder="Enter your name"
            />
          </motion.div>

          {/* Email (Read-only) */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <label className="block text-sm font-medium text-white mb-2">Email Address</label>
            <input
              type="email"
              value={profile?.email || ''}
              disabled
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-yellow-500/20 text-gray-400 cursor-not-allowed"
            />
            <p className="text-xs text-gray-500 mt-1">
              {user?.role === 'INTERN' ? 'Your email cannot be changed' : 'Email cannot be changed'}
            </p>
          </motion.div>

          {/* Phone */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <label className="block text-sm font-medium text-white mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-yellow-500/20 text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none transition-all"
              placeholder="+1 (555) 123-4567"
            />
          </motion.div>

          {/* Bio */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <label className="block text-sm font-medium text-white mb-2">Bio (Optional)</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-yellow-500/20 text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none transition-all resize-none"
              placeholder="Tell us about yourself..."
            />
            <p className="text-xs text-gray-500 mt-1">Max 500 characters</p>
          </motion.div>

          {/* Department & Course (Read-only) */}
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Department</label>
              <input
                type="text"
                value={profile?.department || 'N/A'}
                disabled
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-yellow-500/20 text-gray-400 cursor-not-allowed"
              />
              {isIntern && <p className="text-xs text-blue-400 mt-1">🔒 Managed by supervisor</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Course</label>
              <input
                type="text"
                value={profile?.course || 'N/A'}
                disabled
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-yellow-500/20 text-gray-400 cursor-not-allowed"
              />
              {isIntern && <p className="text-xs text-blue-400 mt-1">🔒 Managed by supervisor</p>}
            </div>
          </motion.div>

          {/* Save Button */}
          <motion.div className="flex gap-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
            <motion.button
              onClick={handleSaveProfile}
              disabled={isSaving}
              className="px-6 py-3 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-500/30 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </motion.button>
            <motion.button
              onClick={() => {
                setFormData({
                  name: profile?.name || '',
                  phone: profile?.phone || '',
                  bio: '',
                });
              }}
              className="px-6 py-3 bg-white/5 hover:bg-white/10 text-gray-400 border border-yellow-500/10 rounded-lg font-medium transition-all"
              whileHover={{ scale: 1.02 }}
            >
              Cancel
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Avatar Section */}
      <motion.div
        className="p-8 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-amber-500/5 border border-yellow-500/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-2xl font-bold text-white mb-6">Profile Picture</h2>
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-500/20 to-amber-500/20 flex items-center justify-center border border-yellow-500/30 text-4xl">
            👤
          </div>
          <div>
            <p className="text-white font-medium mb-3">Upload a new profile picture</p>
            <motion.button
              className="px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-500/30 rounded-lg text-sm font-medium transition-all"
              whileHover={{ scale: 1.05 }}
            >
              Choose File
            </motion.button>
            <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF up to 5MB</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProfilePage() {
  return (
    <ProtectRoute requiredRoles={['SUPERADMIN', 'ADMIN', 'SUPERVISOR', 'INTERN']}>
      <AccountLayout>
        <ProfileContent />
      </AccountLayout>
    </ProtectRoute>
  );
}
