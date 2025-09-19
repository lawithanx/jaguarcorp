import React, { useState, useRef } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { ShoppingCart, Eye, Heart, Star, Award } from 'lucide-react'
import { Product } from '../../types/shop'

interface ProductCardProps {
  product: Product
  viewMode: 'grid' | 'list'
  onAddToCart: () => void
  onClick: () => void
  index: number
  isRecommended?: boolean
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  viewMode,
  onAddToCart,
  onClick,
  index,
  isRecommended = false
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [addingToCart, setAddingToCart] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Subtle 3D transforms for professional look
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [5, -5])
  const rotateY = useTransform(x, [-100, 100], [-5, 5])

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !isHovered) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    x.set((event.clientX - centerX) / 10)
    y.set((event.clientY - centerY) / 10)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  const handleAddToCartClick = async (e: React.MouseEvent) => {
    e.stopPropagation()
    setAddingToCart(true)
    await onAddToCart()
    setTimeout(() => setAddingToCart(false), 600)
  }

  if (viewMode === 'list') {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className="card-professional flex flex-col sm:flex-row gap-6 group cursor-pointer hover-lift"
        onClick={onClick}
      >
        {/* Image */}
        <div className="relative w-full sm:w-48 h-48 rounded-lg overflow-hidden bg-gradient-to-br from-primary/5 to-primary/2">
          {product.featured_image ? (
            <img
              src={product.featured_image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-4xl opacity-30">📦</div>
            </div>
          )}
          
          {/* Professional badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {product.is_featured && (
              <span className="bg-primary/90 text-dark px-2 py-1 rounded text-xs font-medium">
                Featured
              </span>
            )}
            {isRecommended && (
              <span className="bg-blue-600/90 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                <Star size={12} />
                Recommended
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold text-primary mb-2 group-hover:text-emphasis transition-colors">
              {product.name}
            </h3>
            <p className="text-primary/60 mb-4 line-clamp-2">
              {product.short_description}
            </p>
            
            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {product.features.slice(0, 3).map((feature, i) => (
                  <span
                    key={i}
                    className="text-xs bg-primary/8 text-primary/80 px-2 py-1 rounded border border-primary/15"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-2xl font-semibold text-primary">
                ${product.price}
              </div>
              {product.original_price && product.original_price > product.price && (
                <div className="text-primary/40 line-through">
                  ${product.original_price}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onClick()
                }}
                className="p-2 text-primary/60 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
              >
                <Eye size={18} />
              </button>
              <motion.button
                onClick={handleAddToCartClick}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={addingToCart}
                className="btn-primary text-sm px-4 py-2"
              >
                {addingToCart ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <ShoppingCart size={16} />
                  </motion.div>
                ) : (
                  <>
                    <ShoppingCart size={16} />
                    Add to Cart
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="relative group cursor-pointer"
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <motion.div
        className="card-professional transition-all duration-300"
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ y: -4 }}
      >
        {/* Image Container */}
        <div className="relative h-48 rounded-lg overflow-hidden bg-gradient-to-br from-primary/5 to-primary/2 mb-4">
          {product.featured_image ? (
            <motion.img
              src={product.featured_image}
              alt={product.name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <motion.div
                className="text-6xl opacity-30"
                animate={{ rotateY: isHovered ? 180 : 0 }}
                transition={{ duration: 0.6 }}
              >
                📦
              </motion.div>
            </div>
          )}
          
          {/* Professional overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-dark/40 flex items-center justify-center gap-3"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation()
                onClick()
              }}
              className="bg-primary/20 backdrop-blur-sm text-primary p-3 rounded-lg border border-primary/30 hover:bg-primary/30 transition-all"
            >
              <Eye size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-primary/20 backdrop-blur-sm text-primary p-3 rounded-lg border border-primary/30 hover:bg-primary/30 transition-all"
            >
              <Heart size={18} />
            </motion.button>
          </motion.div>

          {/* Professional badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.is_featured && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-primary/90 text-dark px-2 py-1 rounded text-xs font-medium flex items-center gap-1"
              >
                <Award size={12} />
                Featured
              </motion.span>
            )}
            {isRecommended && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-blue-600/90 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1"
              >
                <Star size={12} />
                For You
              </motion.span>
            )}
          </div>

          {/* Discount badge */}
          {product.original_price && product.original_price > product.price && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-3 right-3 bg-red-600/90 text-white px-2 py-1 rounded text-xs font-semibold"
            >
              -{Math.round(((product.original_price - product.price) / product.original_price) * 100)}%
            </motion.div>
          )}
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-primary group-hover:text-emphasis transition-colors line-clamp-2">
            {product.name}
          </h3>
          
          <p className="text-primary/60 text-sm line-clamp-2">
            {product.short_description}
          </p>

          {/* Features */}
          {product.features && product.features.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {product.features.slice(0, 2).map((feature, i) => (
                <span
                  key={i}
                  className="text-xs bg-primary/8 text-primary/80 px-2 py-1 rounded border border-primary/15"
                >
                  {feature}
                </span>
              ))}
              {product.features.length > 2 && (
                <span className="text-xs text-primary/50">
                  +{product.features.length - 2} more
                </span>
              )}
            </div>
          )}

          {/* Price and Actions */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <motion.div
                className="text-xl font-semibold text-primary"
                whileHover={{ scale: 1.05 }}
              >
                ${product.price}
              </motion.div>
              {product.original_price && product.original_price > product.price && (
                <div className="text-primary/40 line-through text-sm">
                  ${product.original_price}
                </div>
              )}
            </div>

            <motion.button
              onClick={handleAddToCartClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={addingToCart}
              className="bg-primary/15 text-primary p-2 rounded-lg border border-primary/25 hover:bg-primary hover:text-dark transition-all duration-300 disabled:opacity-50"
            >
              {addingToCart ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <ShoppingCart size={16} />
                </motion.div>
              ) : (
                <ShoppingCart size={16} />
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ProductCard 