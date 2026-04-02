'use client';

import { motion } from 'framer-motion';
import { useAuth } from '@/app/context/AuthContext';
import { useState, useEffect } from 'react';

export default function AccountPage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    address: '',
    city: '',
    country: '',
  });

  // Load saved preferences from localStorage
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        first_name: user.first_name || '',
        last_name: user.last_name || '',
      }));

      // Load additional preferences
      const saved = localStorage.getItem('client_preferences');
      if (saved) {
        const preferences = JSON.parse(saved);
        setFormData((prev) => ({
          ...prev,
          ...preferences,
        }));
      }
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      // Save to localStorage
      localStorage.setItem('client_preferences', JSON.stringify(formData));
      setSuccessMessage('Profile updated successfully!');
      setIsEditing(false);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setSuccessMessage('Failed to save profile');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Success Message */}
      {successMessage && (
        <motion.div
          className={`p-4 rounded-lg border ${
            successMessage.includes('successfully')
              ? 'bg-green-500/10 border-green-500/30 text-green-400'
              : 'bg-red-500/10 border-red-500/30 text-red-400'
          }`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {successMessage}
        </motion.div>
      )}

      <div>
        <h2 className="text-2xl font-bold text-white mb-2">My Account</h2>
        <p className="text-gray-400">Manage your profile and account settings</p>
      </div>

      {/* Profile Card */}
      <motion.div
        className="p-8 rounded-lg bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Profile Information</h3>
          <motion.button
            onClick={() => {
              if (isEditing) {
                // Reset form
                setFormData({
                  first_name: user?.first_name || '',
                  last_name: user?.last_name || '',
                  phone: formData.phone,
                  address: formData.address,
                  city: formData.city,
                  country: formData.country,
                });
              }
              setIsEditing(!isEditing);
            }}
            className="px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-500/30 rounded font-medium text-sm transition-all"
            whileHover={{ scale: 1.05 }}
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </motion.button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">First Name</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-yellow-500/30 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Last Name</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-yellow-500/30 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              />
            </div>

            {/* Email (Read-only) */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Email Address</label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-yellow-500/30 text-gray-500 cursor-not-allowed opacity-50 transition-all"
              />
            </div>

            {/* Account Type (Read-only) */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Account Type</label>
              <input
                type="text"
                value="Customer"
                disabled
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-yellow-500/30 text-gray-500 cursor-not-allowed opacity-50 transition-all"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-yellow-500/30 text-white placeholder-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          {/* Shipping Address */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Street Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-yellow-500/30 text-white placeholder-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              placeholder="Your street address"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* City */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-yellow-500/30 text-white placeholder-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                placeholder="Your city"
              />
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-yellow-500/30 text-white placeholder-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                placeholder="Your country"
              />
            </div>
          </div>

          {isEditing && (
            <motion.button
              onClick={handleSave}
              disabled={isSaving}
              className="w-full mt-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg transition-all disabled:opacity-50"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Account Settings */}
      <motion.div
        className="p-8 rounded-lg bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-xl font-bold text-white mb-6">Account Settings</h3>

        <div className="space-y-4">
          <motion.button className="w-full p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-yellow-500/20 hover:border-yellow-500/50 text-left transition-all group">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-white group-hover:text-yellow-400 transition-colors">Change Password</h4>
                <p className="text-sm text-gray-400">Update your password regularly</p>
              </div>
              <span className="text-yellow-400">→</span>
            </div>
          </motion.button>

          <motion.button className="w-full p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-yellow-500/20 hover:border-yellow-500/50 text-left transition-all group">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-white group-hover:text-yellow-400 transition-colors">Email Notifications</h4>
                <p className="text-sm text-gray-400">Manage your notification preferences</p>
              </div>
              <span className="text-yellow-400">→</span>
            </div>
          </motion.button>

          <motion.button className="w-full p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-yellow-500/20 hover:border-yellow-500/50 text-left transition-all group">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-white group-hover:text-yellow-400 transition-colors">Privacy Settings</h4>
                <p className="text-sm text-gray-400">Control your privacy and data</p>
              </div>
              <span className="text-yellow-400">→</span>
            </div>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
