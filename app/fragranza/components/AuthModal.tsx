'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, FormEvent, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useAuth } from '@/app/context/AuthContext';
import { CheckmarkIcon } from './Icons/SocialIcons';
import TermsAndConditionsModal from './TermsAndConditionsModal';

const EyeIcon = ({ size = 20, color = '#9ca3af' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = ({ size = 20, color = '#9ca3af' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { login, isLoading } = useAuth();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen || showTermsModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, showTermsModal]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (isLoginMode) {
      // Login mode - use real authentication
      try {
        await login(email, password);
        // Close modal immediately to show redirect
        onClose();
        setEmail('');
        setPassword('');
        setError('');
        setIsLoginMode(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Login failed');
      }
    } else {
      // Register mode - currently just shows success (no real backend)
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (!agreedToTerms) {
        setError('Please accept the Terms & Conditions');
        return;
      }
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
        setEmail('');
        setPassword('');
        setName('');
        setConfirmPassword('');
        setIsLoginMode(true);
        setError('');
        setAgreedToTerms(false);
      }, 2000);
    }
  };

  if (!mounted) return null;

  const modalContent = (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              transition={{ duration: 0.2 }}
            />

            {/* Modal Container */}
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-6xl h-auto max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl pointer-events-auto"
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 40 }}
                transition={{ duration: 0.4, type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 shadow-2xl border border-yellow-500/30 h-full max-h-[85vh] overflow-hidden">
                  {/* LEFT SIDE - BRANDING */}
                  <motion.div
                    className="hidden lg:flex flex-col items-center justify-center p-8 bg-gradient-to-br from-yellow-600/10 via-amber-600/5 to-black relative overflow-hidden min-h-[500px]"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-yellow-600/10 pointer-events-none" />
                    <div className="absolute top-0 left-1/2 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl -translate-x-1/2" />

                    <motion.div
                      className="relative z-10 text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      <motion.div
                        className="mb-8 flex justify-center"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <img
                          src="https://res.cloudinary.com/djnzwvb2t/image/upload/v1775029733/FRAGRANZAOLIO_LOGO_wyvcvz.png"
                          alt="Fragranza Olio Logo"
                          className="w-24 h-24 object-contain drop-shadow-2xl"
                        />
                      </motion.div>

                      <motion.div
                        className="mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <img
                          src="https://res.cloudinary.com/djnzwvb2t/image/upload/v1775029733/Untitled_design_rzts79.png"
                          alt="Fragranza Olio"
                          className="h-16 object-contain mx-auto mb-6"
                        />
                        <p className="text-gray-400 text-lg leading-relaxed max-w-xs">
                          Experience luxury and elegance with our premium artisanal fragrances
                        </p>
                      </motion.div>

                      <motion.div
                        className="mt-12 space-y-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                      >
                        {['Premium Craftsmanship', 'Exclusive Collections', 'Luxury Experience'].map((benefit, i) => (
                          <motion.div
                            key={benefit}
                            className="flex items-center justify-center gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 + i * 0.1 }}
                          >
                            <div className="w-2 h-2 rounded-full bg-yellow-400" />
                            <span className="text-gray-300 text-sm">{benefit}</span>
                          </motion.div>
                        ))}
                      </motion.div>
                    </motion.div>
                  </motion.div>

                  {/* RIGHT SIDE - AUTH FORM */}
                  <motion.div
                    className="relative p-6 sm:p-8 md:p-10 lg:p-12 bg-gradient-to-b from-slate-900 via-slate-800 to-black overflow-y-auto"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    {/* Close Button */}
                    <motion.button
                      onClick={onClose}
                      className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-yellow-500/20 flex items-center justify-center transition-all"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-white text-lg leading-none">×</span>
                    </motion.button>

                    {/* Toggle Switch */}
                    <motion.div
                      className="relative inline-flex items-center justify-center gap-0 mb-8 w-full bg-slate-700/30 rounded-full p-1"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <motion.div
                        className="absolute h-10 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 pointer-events-none"
                        initial={false}
                        animate={{
                          left: isLoginMode ? '4px' : 'calc(50% + 2px)',
                          width: 'calc(50% - 6px)',
                        }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />

                      <button
                        type="button"
                        onClick={() => {
                          setIsLoginMode(true);
                          setError('');
                        }}
                        className={`relative z-10 flex-1 px-6 py-2 font-semibold text-sm rounded-full transition-all ${
                          isLoginMode ? 'text-black' : 'text-gray-400 hover:text-gray-300'
                        }`}
                      >
                        Sign In
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setIsLoginMode(false);
                          setError('');
                        }}
                        className={`relative z-10 flex-1 px-6 py-2 font-semibold text-sm rounded-full transition-all ${
                          !isLoginMode ? 'text-black' : 'text-gray-400 hover:text-gray-300'
                        }`}
                      >
                        Sign Up
                      </button>
                    </motion.div>

                    {/* Form Container */}
                    {!success ? (
                      <motion.form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {/* Heading */}
                        <motion.div
                          className="mb-6"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          <h2 className="text-2xl font-bold text-white mb-1">
                            {isLoginMode ? 'Welcome Back' : 'Join Fragranza'}
                          </h2>
                          <p className="text-gray-400 text-sm">{isLoginMode ? 'Sign in to your account' : 'Create your luxury account'}</p>
                        </motion.div>

                        {/* Error Message */}
                        {error && (
                          <motion.div
                            className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-300 text-sm"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            {error}
                          </motion.div>
                        )}

                        {/* Name Field (Register Only) */}
                        <AnimatePresence>
                          {!isLoginMode && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <label className="block text-sm font-semibold text-gray-200 mb-2">Full Name</label>
                              <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Your name"
                                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-yellow-500/30 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/60 focus:ring-2 focus:ring-yellow-500/20 transition-all"
                                required={!isLoginMode}
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Email Field */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.45 }}
                        >
                          <label className="block text-sm font-semibold text-gray-200 mb-2">Email Address</label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-yellow-500/30 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/60 focus:ring-2 focus:ring-yellow-500/20 transition-all"
                            required
                          />
                        </motion.div>

                        {/* Password Field */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                        >
                          <label className="block text-sm font-semibold text-gray-200 mb-2">Password</label>
                          <div className="relative">
                            <input
                              type={showPassword ? 'text' : 'password'}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="••••••••"
                              className="w-full px-4 pr-12 py-3 rounded-lg bg-white/5 border border-yellow-500/30 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/60 focus:ring-2 focus:ring-yellow-500/20 transition-all"
                              required
                            />
                            <motion.button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-3.5 text-gray-400 hover:text-yellow-400 transition-colors"
                              whileHover={{ scale: 1.1 }}
                            >
                              {showPassword ? <EyeOffIcon size={18} color="currentColor" /> : <EyeIcon size={18} color="currentColor" />}
                            </motion.button>
                          </div>
                        </motion.div>

                        {/* Confirm Password (Register Only) */}
                        <AnimatePresence>
                          {!isLoginMode && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <label className="block text-sm font-semibold text-gray-200 mb-2">Confirm Password</label>
                              <div className="relative">
                                <input
                                  type={showConfirmPassword ? 'text' : 'password'}
                                  value={confirmPassword}
                                  onChange={(e) => setConfirmPassword(e.target.value)}
                                  placeholder="••••••••"
                                  className="w-full px-4 pr-12 py-3 rounded-lg bg-white/5 border border-yellow-500/30 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/60 focus:ring-2 focus:ring-yellow-500/20 transition-all"
                                  required={!isLoginMode}
                                />
                                <motion.button
                                  type="button"
                                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                  className="absolute right-3 top-3.5 text-gray-400 hover:text-yellow-400 transition-colors"
                                  whileHover={{ scale: 1.1 }}
                                >
                                  {showConfirmPassword ? <EyeOffIcon size={18} color="currentColor" /> : <EyeIcon size={18} color="currentColor" />}
                                </motion.button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Forgot Password / Terms */}
                        <motion.div
                          className="flex items-center justify-between text-sm"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.55 }}
                        >
                          {isLoginMode ? (
                            <button type="button" className="text-yellow-400 hover:text-yellow-300 font-medium">
                              Forgot password?
                            </button>
                          ) : (
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={agreedToTerms}
                                onChange={(e) => setAgreedToTerms(e.target.checked)}
                                className="w-4 h-4 rounded bg-white/10 border border-yellow-500/30 cursor-pointer accent-yellow-500"
                                required
                              />
                              <span className="text-gray-400 text-xs">
                                I agree to{' '}
                                <button
                                  type="button"
                                  onClick={() => setShowTermsModal(true)}
                                  className="text-yellow-400 hover:text-yellow-300 underline"
                                >
                                  Terms & Conditions
                                </button>
                              </span>
                            </label>
                          )}
                        </motion.div>

                        {/* Submit Button */}
                        <motion.button
                          type="submit"
                          disabled={isLoading}
                          className="w-full py-3 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-bold rounded-lg mt-6 flex items-center justify-center gap-2 disabled:opacity-50 transition-all"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {isLoading ? (
                            <>
                              <motion.div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }} />
                              {isLoginMode ? 'Signing in...' : 'Creating account...'}
                            </>
                          ) : isLoginMode ? (
                            'Sign In'
                          ) : (
                            'Create Account'
                          )}
                        </motion.button>

                        {/* Social Login (Login Only) */}
                        {isLoginMode && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="pt-2">
                            <div className="relative mb-4">
                              <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-yellow-500/20"></div>
                              </div>
                              <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-gradient-to-b from-slate-900 via-slate-800 to-black text-gray-400">or continue with</span>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <button type="button" className="py-2.5 border border-yellow-500/30 rounded-lg hover:bg-white/5 text-sm text-gray-300 transition-all font-medium">
                                Google
                              </button>
                              <button type="button" className="py-2.5 border border-yellow-500/30 rounded-lg hover:bg-white/5 text-sm text-gray-300 transition-all font-medium">
                                Apple
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </motion.form>
                    ) : (
                      <motion.div
                        className="flex flex-col items-center justify-center py-16"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <motion.div
                          className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center mb-4"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                        >
                          <CheckmarkIcon size={32} color="#000" />
                        </motion.div>
                        <p className="text-white font-bold text-lg">{isLoginMode ? 'Welcome Back!' : 'Welcome!'}</p>
                        <p className="text-gray-400 text-sm mt-2">{isLoginMode ? 'Redirecting to dashboard...' : 'Account created successfully'}</p>
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Terms and Conditions Modal */}
      <TermsAndConditionsModal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        onAccept={() => setAgreedToTerms(true)}
      />
    </>
  );

  return createPortal(modalContent, document.body);
}
