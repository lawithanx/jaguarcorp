import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingCart, Heart, Star, Shield, CheckCircle } from 'lucide-react'
import { Product } from '../../types/shop'

interface ProductModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
  onAddToCart: () => void
}

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart
}) => {
  if (!product) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-dark-900 border border-primary/20 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-primary/10">
              <h2 className="text-2xl font-semibold text-primary">Product Details</h2>
              <button
                onClick={onClose}
                className="p-2 text-primary/60 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {/* Product Image */}
              <div className="space-y-4">
                <div className="relative h-64 md:h-80 bg-gradient-to-br from-primary/5 to-primary/2 rounded-lg overflow-hidden">
                  {product.featured_image ? (
                    <img
                      src={product.featured_image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-8xl opacity-20">
                        {product.product_type === 'asset' ? '📦' : 
                         product.product_type === 'service' ? '🛠️' : 
                         product.product_type === 'consultation' ? '👥' : '🎁'}
                      </div>
                    </div>
                  )}
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.is_featured && (
                      <span className="bg-primary/90 text-dark px-3 py-1 rounded text-sm font-medium flex items-center gap-1">
                        <Star size={14} />
                        Featured
                      </span>
                    )}
                    {product.is_digital && (
                      <span className="bg-blue-600/90 text-white px-3 py-1 rounded text-sm font-medium">
                        Digital
                      </span>
                    )}
                  </div>

                  {/* Discount */}
                  {product.original_price && product.original_price > product.price && (
                    <div className="absolute top-4 right-4 bg-red-600/90 text-white px-3 py-1 rounded text-sm font-semibold">
                      -{Math.round(((product.original_price - product.price) / product.original_price) * 100)}% OFF
                    </div>
                  )}
                </div>

                {/* Gallery Preview */}
                {product.gallery_images && product.gallery_images.length > 0 && (
                  <div className="flex gap-2 overflow-x-auto">
                    {product.gallery_images.slice(0, 4).map((image, index) => (
                      <div key={index} className="w-16 h-16 bg-primary/5 rounded flex-shrink-0">
                        <img src={image} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover rounded" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-semibold text-primary mb-2">{product.name}</h1>
                  <p className="text-primary/60 leading-relaxed">{product.description}</p>
                </div>

                {/* Price */}
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-semibold text-primary">${product.price}</span>
                  {product.original_price && product.original_price > product.price && (
                    <span className="text-primary/40 line-through text-xl">${product.original_price}</span>
                  )}
                  {product.is_free && (
                    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded text-sm font-medium">
                      FREE
                    </span>
                  )}
                </div>

                {/* Features */}
                {product.features && product.features.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium text-primary mb-3">Features & Benefits</h3>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3 text-primary/80">
                          <CheckCircle size={16} className="text-primary/60 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technical Details */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-primary/5 rounded-lg border border-primary/10">
                  <div>
                    <span className="text-sm text-primary/60">Category</span>
                    <div className="font-medium text-primary capitalize">{product.product_type}</div>
                  </div>
                  <div>
                    <span className="text-sm text-primary/60">Delivery</span>
                    <div className="font-medium text-primary">{product.is_digital ? 'Instant' : '2-3 days'}</div>
                  </div>
                  {!product.is_digital && product.stock_quantity !== undefined && (
                    <div>
                      <span className="text-sm text-primary/60">Stock</span>
                      <div className="font-medium text-primary">{product.stock_quantity} available</div>
                    </div>
                  )}
                  {product.download_limit && (
                    <div>
                      <span className="text-sm text-primary/60">Downloads</span>
                      <div className="font-medium text-primary">{product.download_limit} times</div>
                    </div>
                  )}
                </div>

                {/* Security & Compliance */}
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield size={16} className="text-green-400" />
                    <span className="font-medium text-green-400">Security & Compliance</span>
                  </div>
                  <ul className="text-sm text-green-400/80 space-y-1">
                    <li>• Enterprise-grade security</li>
                    <li>• HIPAA/SOX compliant</li>
                    <li>• Secure download & delivery</li>
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onAddToCart}
                    className="btn-primary flex-1 py-3"
                  >
                    <ShoppingCart size={18} />
                    Add to Cart
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-3 border border-primary/30 text-primary hover:bg-primary/10 rounded-lg transition-all"
                  >
                    <Heart size={18} />
                  </motion.button>
                </div>

                {/* Additional Info */}
                <div className="text-xs text-primary/50 space-y-1">
                  <p>✓ 30-day money-back guarantee</p>
                  <p>✓ 24/7 professional support</p>
                  <p>✓ Secure payment processing</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ProductModal 