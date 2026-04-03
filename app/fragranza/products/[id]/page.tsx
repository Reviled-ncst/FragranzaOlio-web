'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getProductsByGender, type Product, type ProductVariation } from '@/app/lib/productData';
import { addToCart } from '@/app/lib/cartService';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedOil, setSelectedOil] = useState<30 | 50 | 70>(50);
  const [selectedVolume, setSelectedVolume] = useState<'3ml' | '85ml'>('85ml');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const allProducts = [...getProductsByGender('men'), ...getProductsByGender('women')];
    const found = allProducts.find((p) => p.id === params.id);
    setProduct(found || null);
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <p className="text-gray-400">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black gap-6">
        <p className="text-gray-400 text-lg">Product not found</p>
        <button
          onClick={() => router.back()}
          className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  const selectedVariation = product.variations?.find(
    (v) => v.oilPercent === selectedOil && v.volume === selectedVolume
  );

  const handleAddToCart = () => {
    if (selectedVariation) {
      addToCart(
        product.id,
        product.name,
        {
          oil: selectedOil,
          volume: selectedVolume,
          price: selectedVariation.price,
        },
        product.image,
        quantity
      );
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors"
          whileHover={{ x: -4 }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Products
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center"
          >
            <div className="relative w-full aspect-square max-w-md rounded-2xl border border-yellow-500/20 bg-gradient-to-br from-yellow-500/5 to-black/50 overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-start space-y-6"
          >
            {/* Header */}
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">{product.name}</h1>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 text-sm font-semibold rounded-full border border-yellow-500/30">
                  {product.gender === 'men' ? 'For Men' : 'For Women'}
                </span>
                <span className="text-gray-400 text-sm">Base Price: ${product.basePrice}</span>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed">{product.description}</p>
            </div>

            {/* Notes Tags */}
            <div>
              <h3 className="text-yellow-300 font-semibold mb-3 text-sm tracking-wide">FRAGRANCE NOTES</h3>
              <div className="flex flex-wrap gap-2">
                {product.notes.map((note) => (
                  <span
                    key={note}
                    className="px-3 py-1.5 rounded-full text-xs bg-yellow-500/15 text-yellow-300 border border-yellow-500/30"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Intensity */}
            <div>
              <h3 className="text-yellow-300 font-semibold mb-3 text-sm tracking-wide">INTENSITY</h3>
              <div className="flex gap-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-3 w-3 rounded-full ${
                      i < product.intensity
                        ? 'bg-gradient-to-r from-yellow-400 to-amber-400'
                        : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-400 text-sm mt-2">{product.intensity}/5 - Intensity Level</p>
            </div>

            {/* Oil Percentage Selection */}
            <div>
              <h3 className="text-yellow-300 font-semibold mb-3 text-sm tracking-wide">OIL CONCENTRATION</h3>
              <div className="grid grid-cols-3 gap-3">
                {[30, 50, 70].map((oil) => (
                  <motion.button
                    key={oil}
                    onClick={() => setSelectedOil(oil as 30 | 50 | 70)}
                    className={`py-3 px-4 rounded-lg border-2 font-semibold transition-all ${
                      selectedOil === oil
                        ? 'bg-yellow-500/20 border-yellow-400 text-yellow-300'
                        : 'bg-white/5 border-yellow-500/30 text-gray-400 hover:border-yellow-500/50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {oil}%
                  </motion.button>
                ))}
              </div>
              <p className="text-gray-400 text-xs mt-2">
                {selectedOil === 30 && "Light • Fresh application"}
                {selectedOil === 50 && "Balanced • Standard strength"}
                {selectedOil === 70 && "Rich • Long-lasting intensity"}
              </p>
            </div>

            {/* Volume Selection */}
            <div>
              <h3 className="text-yellow-300 font-semibold mb-3 text-sm tracking-wide">BOTTLE SIZE</h3>
              <div className="grid grid-cols-2 gap-3">
                {(['3ml', '85ml'] as const).map((vol) => (
                  <motion.button
                    key={vol}
                    onClick={() => setSelectedVolume(vol)}
                    className={`py-3 px-4 rounded-lg border-2 font-semibold transition-all ${
                      selectedVolume === vol
                        ? 'bg-yellow-500/20 border-yellow-400 text-yellow-300'
                        : 'bg-white/5 border-yellow-500/30 text-gray-400 hover:border-yellow-500/50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {vol === '3ml' ? 'Sample' : 'Full Size'} {vol}
                  </motion.button>
                ))}
              </div>
              <p className="text-gray-400 text-xs mt-2">
                {selectedVolume === '3ml' && "Perfect for travel or trying new scents"}
                {selectedVolume === '85ml' && "Full size bottle for daily wear"}
              </p>
            </div>

            {/* Price Display */}
            {selectedVariation && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="pt-4 border-t border-yellow-500/20"
              >
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-yellow-300">${selectedVariation.price}</span>
                  <span className="text-gray-400 text-sm">
                    {selectedOil}% oil • {selectedVolume}
                  </span>
                </div>
                <p className="text-gray-500 text-xs mt-2">Stock: {selectedVariation.stock} units available</p>
              </motion.div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="flex gap-4 pt-4">
              <div className="flex items-center border border-yellow-500/30 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-gray-400 hover:text-yellow-300 transition-colors"
                >
                  −
                </button>
                <span className="px-4 py-2 text-white font-semibold min-w-[60px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-gray-400 hover:text-yellow-300 transition-colors"
                >
                  +
                </button>
              </div>

              <motion.button
                onClick={handleAddToCart}
                className="flex-1 py-3 bg-gradient-to-r from-yellow-400 to-amber-300 hover:from-yellow-300 hover:to-yellow-200 text-black font-bold rounded-lg transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {addedToCart ? '✓ Added to Cart' : 'Add to Cart'}
              </motion.button>
            </div>

            {/* Additional Info */}
            <div className="pt-6 border-t border-yellow-500/20 space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-300">Premium artisanal fragrance</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-300">Sustainably sourced ingredients</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-300">30-day satisfaction guarantee</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
