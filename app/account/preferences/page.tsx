'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/app/context/AuthContext';
import { ProtectRoute } from '@/app/components/ProtectedRoute';
import { AccountLayout } from '@/app/components/AccountLayout';

interface PreferencesState {
  email_notifications: boolean;
  weekly_digest: boolean;
  marketing_emails: boolean;
  sms_notifications: boolean;
  private_profile: boolean;
  show_activity: boolean;
  theme: 'light' | 'dark' | 'auto';
}

function PreferencesContent() {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<PreferencesState>({
    email_notifications: true,
    weekly_digest: true,
    marketing_emails: false,
    sms_notifications: false,
    private_profile: false,
    show_activity: true,
    theme: 'dark',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('user_preferences');
    if (saved) {
      try {
        setPreferences(JSON.parse(saved));
      } catch (err) {
        console.error('Failed to load preferences');
      }
    }
  }, []);

  const handleToggle = (key: keyof PreferencesState) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: typeof prev[key] === 'boolean' ? !prev[key] : prev[key],
    }));
  };

  const handleThemeChange = (theme: 'light' | 'dark' | 'auto') => {
    setPreferences((prev) => ({
      ...prev,
      theme,
    }));
  };

  const handleSavePreferences = async () => {
    try {
      setIsSaving(true);
      // Save to localStorage
      localStorage.setItem('user_preferences', JSON.stringify(preferences));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to save preferences');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {success && (
        <motion.div
          className="p-4 bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          ✓ Preferences saved successfully
        </motion.div>
      )}

      {/* Email Notifications */}
      <motion.div
        className="p-8 rounded-2xl bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-white mb-1">Email Notifications</h2>
        <p className="text-gray-400 mb-6">Manage how we contact you via email</p>

        <div className="space-y-4">
          {/* Email Notifications */}
          <motion.div
            className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-yellow-500/10 hover:border-yellow-500/20 transition-all"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 }}
          >
            <div>
              <p className="text-white font-semibold">Email Notifications</p>
              <p className="text-gray-400 text-sm">Receive updates about your internship</p>
            </div>
            <motion.button
              onClick={() => handleToggle('email_notifications')}
              className={`w-12 h-7 rounded-full transition-all relative ${ preferences.email_notifications ? 'bg-yellow-500/30' : 'bg-white/10'}`}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div className={`w-5 h-5 rounded-full bg-yellow-400 absolute top-1 transition-all ${ preferences.email_notifications ? 'right-1' : 'left-1'}`} />
            </motion.button>
          </motion.div>

          {/* Weekly Digest */}
          <motion.div
            className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-yellow-500/10 hover:border-yellow-500/20 transition-all"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div>
              <p className="text-white font-semibold">Weekly Digest</p>
              <p className="text-gray-400 text-sm">Get a summary of your week's activity</p>
            </div>
            <motion.button
              onClick={() => handleToggle('weekly_digest')}
              className={`w-12 h-7 rounded-full transition-all relative ${preferences.weekly_digest ? 'bg-yellow-500/30' : 'bg-white/10'}`}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div className={`w-5 h-5 rounded-full bg-yellow-400 absolute top-1 transition-all ${preferences.weekly_digest ? 'right-1' : 'left-1'}`} />
            </motion.button>
          </motion.div>

          {/* Marketing Emails */}
          <motion.div
            className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-yellow-500/10 hover:border-yellow-500/20 transition-all"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <div>
              <p className="text-white font-semibold">Marketing & Updates</p>
              <p className="text-gray-400 text-sm">Learn about new features and events</p>
            </div>
            <motion.button
              onClick={() => handleToggle('marketing_emails')}
              className={`w-12 h-7 rounded-full transition-all relative ${preferences.marketing_emails ? 'bg-yellow-500/30' : 'bg-white/10'}`}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div className={`w-5 h-5 rounded-full bg-yellow-400 absolute top-1 transition-all ${preferences.marketing_emails ? 'right-1' : 'left-1'}`} />
            </motion.button>
          </motion.div>

          {/* SMS Notifications */}
          <motion.div
            className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-yellow-500/10 hover:border-yellow-500/20 transition-all"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div>
              <p className="text-white font-semibold">SMS Notifications</p>
              <p className="text-gray-400 text-sm">Receive important alerts via text</p>
            </div>
            <motion.button
              onClick={() => handleToggle('sms_notifications')}
              className={`w-12 h-7 rounded-full transition-all relative ${preferences.sms_notifications ? 'bg-yellow-500/30' : 'bg-white/10'}`}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div className={`w-5 h-5 rounded-full bg-yellow-400 absolute top-1 transition-all ${preferences.sms_notifications ? 'right-1' : 'left-1'}`} />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Privacy Settings */}
      <motion.div
        className="p-8 rounded-2xl bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-2xl font-bold text-white mb-1">Privacy Settings</h2>
        <p className="text-gray-400 mb-6">Control who can see your profile and activity</p>

        <div className="space-y-4">
          {/* Private Profile */}
          <motion.div
            className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-yellow-500/10 hover:border-yellow-500/20 transition-all"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
          >
            <div>
              <p className="text-white font-semibold">Private Profile</p>
              <p className="text-gray-400 text-sm">Only show your profile to supervisors</p>
            </div>
            <motion.button
              onClick={() => handleToggle('private_profile')}
              className={`w-12 h-7 rounded-full transition-all relative ${preferences.private_profile ? 'bg-yellow-500/30' : 'bg-white/10'}`}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div className={`w-5 h-5 rounded-full bg-yellow-400 absolute top-1 transition-all ${preferences.private_profile ? 'right-1' : 'left-1'}`} />
            </motion.button>
          </motion.div>

          {/* Show Activity */}
          <motion.div
            className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-yellow-500/10 hover:border-yellow-500/20 transition-all"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div>
              <p className="text-white font-semibold">Show Activity Status</p>
              <p className="text-gray-400 text-sm">Let others see when you're active</p>
            </div>
            <motion.button
              onClick={() => handleToggle('show_activity')}
              className={`w-12 h-7 rounded-full transition-all relative ${preferences.show_activity ? 'bg-yellow-500/30' : 'bg-white/10'}`}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div className={`w-5 h-5 rounded-full bg-yellow-400 absolute top-1 transition-all ${preferences.show_activity ? 'right-1' : 'left-1'}`} />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Appearance */}
      <motion.div
        className="p-8 rounded-2xl bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <h2 className="text-2xl font-bold text-white mb-1">Appearance</h2>
        <p className="text-gray-400 mb-6">Customize how the interface looks</p>

        <div className="space-y-4">
          <p className="text-sm font-medium text-white">Theme</p>
          <div className="grid grid-cols-3 gap-3">
            {(['light', 'dark', 'auto'] as const).map((theme) => (
              <motion.button
                key={theme}
                onClick={() => handleThemeChange(theme)}
                className={`p-4 rounded-lg border-2 transition-all capitalize font-medium ${
                  preferences.theme === theme
                    ? 'border-yellow-400 bg-yellow-500/10 text-yellow-400'
                    : 'border-yellow-500/20 bg-white/5 text-gray-400 hover:border-yellow-500/40'
                }`}
                whileHover={{ scale: 1.02 }}
              >
                {theme}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Save Button */}
      <motion.div className="flex gap-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <motion.button
          onClick={handleSavePreferences}
          disabled={isSaving}
          className="px-6 py-3 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-500/30 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isSaving ? 'Saving...' : 'Save Preferences'}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default function PreferencesPage() {
  return (
    <ProtectRoute requiredRoles={['SUPERADMIN', 'ADMIN', 'SUPERVISOR', 'INTERN']}>
      <AccountLayout>
        <PreferencesContent />
      </AccountLayout>
    </ProtectRoute>
  );
}
