'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

interface TermsAndConditionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept?: () => void;
}

export default function TermsAndConditionsModal({
  isOpen,
  onClose,
  onAccept,
}: TermsAndConditionsModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            transition={{ duration: 0.2 }}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-[101] px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-gradient-to-b from-slate-900 via-slate-800 to-black p-8 border border-yellow-500/30 shadow-2xl"
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ duration: 0.4 }}
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

              {/* Header */}
              <motion.h1
                className="text-3xl font-bold text-white mb-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Terms & Conditions
              </motion.h1>
              <motion.p
                className="text-gray-400 text-sm mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                Last updated: April 2026
              </motion.p>

              {/* Content */}
              <div
                className="space-y-6 text-gray-300 text-sm leading-relaxed"
              >
                {/* Section 1 */}
                <div>
                  <h2 className="text-lg font-semibold text-yellow-400 mb-3">
                    1. User Agreement
                  </h2>
                  <p>
                    By accessing and using Fragranza Olio's website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                  </p>
                </div>

                {/* Section 2 */}
                <div>
                  <h2 className="text-lg font-semibold text-yellow-400 mb-3">
                    2. Use License
                  </h2>
                  <p>
                    Permission is granted to temporarily download one copy of the materials (information or software) on Fragranza Olio's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                  </p>
                  <ul className="list-disc list-inside space-y-1 mt-2 ml-2">
                    <li>Modifying or copying the materials</li>
                    <li>Using the materials for any commercial purpose or for any public display</li>
                    <li>Attempting to decompile or reverse engineer any software contained on the website</li>
                    <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
                    <li>Removing any copyright or other proprietary notations from the materials</li>
                  </ul>
                </div>

                {/* Section 3 */}
                <div>
                  <h2 className="text-lg font-semibold text-yellow-400 mb-3">
                    3. Disclaimer
                  </h2>
                  <p>
                    The materials on Fragranza Olio's website are provided on an 'as is' basis. Fragranza Olio makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                  </p>
                </div>

                {/* Section 4 */}
                <div>
                  <h2 className="text-lg font-semibold text-yellow-400 mb-3">
                    4. Limitations
                  </h2>
                  <p>
                    In no event shall Fragranza Olio or its suppliers be liable for any damages (including, without limitation, damages for loss of data or information, or for business interruption) arising out of the use or inability to use the materials on Fragranza Olio's website.
                  </p>
                </div>

                {/* Section 5 */}
                <div>
                  <h2 className="text-lg font-semibold text-yellow-400 mb-3">
                    5. Accuracy of Materials
                  </h2>
                  <p>
                    The materials appearing on Fragranza Olio's website could include technical, typographical, or photographic errors. Fragranza Olio does not warrant that any of the materials on its website are accurate, complete, or current. Fragranza Olio may modify the materials contained on its website at any time without notice.
                  </p>
                </div>

                {/* Section 6 */}
                <div>
                  <h2 className="text-lg font-semibold text-yellow-400 mb-3">
                    6. Materials and Content
                  </h2>
                  <p>
                    Fragranza Olio has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Fragranza Olio of the site. Use of any such linked website is at the user's own risk.
                  </p>
                </div>

                {/* Section 7 */}
                <div>
                  <h2 className="text-lg font-semibold text-yellow-400 mb-3">
                    7. Modifications
                  </h2>
                  <p>
                    Fragranza Olio may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
                  </p>
                </div>

                {/* Section 8 */}
                <div>
                  <h2 className="text-lg font-semibold text-yellow-400 mb-3">
                    8. Governed By and Location
                  </h2>
                  <p>
                    These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction where Fragranza Olio operates, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
                  </p>
                </div>

                {/* Section 9 */}
                <div>
                  <h2 className="text-lg font-semibold text-yellow-400 mb-3">
                    9. Product Information & Ordering
                  </h2>
                  <p>
                    All product information, pricing, and availability are subject to change without notice. Fragranza Olio reserves the right to refuse or cancel any order. All perfumes are verified for authenticity and quality before shipment. Product descriptions are as accurate as possible, but colors may vary due to screen display differences.
                  </p>
                </div>

                {/* Section 10 */}
                <div>
                  <h2 className="text-lg font-semibold text-yellow-400 mb-3">
                    10. Return and Refund Policy
                  </h2>
                  <p>
                    We offer a 30-day money-back guarantee on all unopened products. Items must be returned in original condition with all packaging. Shipping costs are non-refundable unless the return is due to our error or a defective product.
                  </p>
                </div>

                {/* Section 11 */}
                <div>
                  <h2 className="text-lg font-semibold text-yellow-400 mb-3">
                    11. Intellectual Property Rights
                  </h2>
                  <p>
                    All content on Fragranza Olio's website, including but not limited to text, graphics, logos, images, and software, is the property of Fragranza Olio or its partners and is protected by international copyright laws.
                  </p>
                </div>

                {/* Section 12 */}
                <div>
                  <h2 className="text-lg font-semibold text-yellow-400 mb-3">
                    12. Age Restriction
                  </h2>
                  <p>
                    You must be at least 18 years old to purchase products from Fragranza Olio. By placing an order, you represent and warrant that you are at least 18 years of age.
                  </p>
                </div>

                {/* Section 13 */}
                <div>
                  <h2 className="text-lg font-semibold text-yellow-400 mb-3">
                    13. Contact Information
                  </h2>
                  <p>
                    If you have any questions about these Terms & Conditions, please contact us at support@fragranzaolio.com or visit our website for more information.
                  </p>
                </div>
              </div>

              {/* Accept Button */}
              <motion.button
                onClick={() => {
                  onAccept?.();
                  onClose();
                }}
                className="w-full mt-8 py-3 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-bold rounded-lg transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                I Understand
              </motion.button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
