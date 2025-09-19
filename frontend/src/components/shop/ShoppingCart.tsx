import React, { useState, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  Gift, 
  Sparkles, 
  CreditCard,
  Coins,
  X,
  Zap
} from 'lucide-react'
import { CartItem } from '../../types/shop'

interface ShoppingCartProps {
  cart: CartItem[]
  onUpdateQuantity: (itemId: string, quantity: number) => void
  onRemoveItem: (itemId: string) => void
  onClearCart: () => void
  onApplyPromo: (code: string) => Promise<boolean>
  userPoints: number
  onUsePoints: (points: number) => void
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onApplyPromo,
  userPoints,
  onUsePoints
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [promoCode, setPromoCode] = useState('')
  const [showCheckoutAnimation, setShowCheckoutAnimation] = useState(false)
  const [draggedItem, setDraggedItem] = useState<string | null>(null)
  const cartRef = useRef<HTMLDivElement>(null)

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const pointsDiscount = Math.min(userPoints * 0.01, subtotal * 0.1) // Max 10% discount

  const handlePromoSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!promoCode.trim()) return
    
    const success = await onApplyPromo(promoCode)
    if (success) {
      setPromoCode('')
    }
  }

  const handleCheckout = () => {
    setShowCheckoutAnimation(true)
    // Trigger confetti and success animations
    setTimeout(() => {
      setShowCheckoutAnimation(false)
      setIsOpen(false)
      onClearCart()
    }, 3000)
  }

  const handleDragEnd = (itemId: string, info: any) => {
    const dragDistance = Math.abs(info.offset.x)
    if (dragDistance > 100) {
      onRemoveItem(itemId)
    }
    setDraggedItem(null)
  }

  return (
    <>
      {/* Cart Toggle Button */}
      <motion.button
        className="fixed bottom-6 right-6 bg-primary text-dark p-4 rounded-full shadow-lg z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        animate={{
          boxShadow: cartCount > 0 ? '0 0 20px rgba(0, 255, 0, 0.5)' : '0 0 10px rgba(0, 255, 0, 0.2)'
        }}
      >
        <ShoppingCart size={24} />
        <AnimatePresence>
          {cartCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold"
            >
              {cartCount}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-dark/80 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />

            {/* Cart Panel */}
            <motion.div
              ref={cartRef}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-dark-900 border-l border-primary/20 z-50 flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-primary/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/20 p-2 rounded-lg">
                      <ShoppingCart className="text-primary" size={24} />
                    </div>
                    <div>
                      <h2 className="text-xl font-tech font-bold text-primary">Shopping Cart</h2>
                      <p className="text-primary/60 text-sm">{cartCount} items</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-primary/60 hover:text-primary transition-colors p-2"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Points Display */}
                <motion.div
                  className="mt-4 bg-primary/10 rounded-lg p-3 border border-primary/20"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Coins className="text-primary" size={16} />
                      <span className="text-primary font-medium">Your Points</span>
                    </div>
                    <span className="text-primary font-bold">{userPoints}</span>
                  </div>
                  {pointsDiscount > 0 && (
                    <p className="text-xs text-primary/70 mt-1">
                      Save ${pointsDiscount.toFixed(2)} with points!
                    </p>
                  )}
                </motion.div>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                <AnimatePresence>
                  {cart.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col items-center justify-center h-full text-center p-8"
                    >
                      <div className="text-6xl mb-4 opacity-50">🛒</div>
                      <h3 className="text-lg font-semibold text-primary mb-2">Your cart is empty</h3>
                      <p className="text-primary/60 mb-6">Add some amazing products to get started!</p>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="btn-primary"
                      >
                        Continue Shopping
                      </button>
                    </motion.div>
                  ) : (
                    <div className="p-4 space-y-4">
                      {cart.map((item, index) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ delay: index * 0.1 }}
                          drag="x"
                          dragConstraints={{ left: -200, right: 0 }}
                          dragElastic={0.2}
                          onDragStart={() => setDraggedItem(item.id)}
                          onDragEnd={(_, info) => handleDragEnd(item.id, info)}
                          className={`card relative ${draggedItem === item.id ? 'z-10' : ''}`}
                        >
                          {/* Drag Indicator */}
                          <AnimatePresence>
                            {draggedItem === item.id && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-red-400"
                              >
                                <Trash2 size={20} />
                              </motion.div>
                            )}
                          </AnimatePresence>

                          <div className="flex gap-4">
                            {/* Product Image */}
                            <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                              {item.product.featured_image ? (
                                <img
                                  src={item.product.featured_image}
                                  alt={item.product.name}
                                  className="w-full h-full object-cover rounded-lg"
                                />
                              ) : (
                                <span className="text-2xl">📦</span>
                              )}
                            </div>

                            {/* Product Info */}
                            <div className="flex-1 min-w-0">
                              <h4 className="text-primary font-medium truncate">
                                {item.product.name}
                              </h4>
                              <p className="text-primary/60 text-sm">
                                ${item.price} each
                              </p>

                              {/* Quantity Controls */}
                              <div className="flex items-center gap-3 mt-2">
                                <div className="flex items-center gap-2 bg-dark-800 rounded-lg p-1">
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                    className="p-1 text-primary hover:bg-primary/20 rounded"
                                  >
                                    <Minus size={14} />
                                  </motion.button>
                                  <span className="text-primary font-medium min-w-[2rem] text-center">
                                    {item.quantity}
                                  </span>
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                    className="p-1 text-primary hover:bg-primary/20 rounded"
                                  >
                                    <Plus size={14} />
                                  </motion.button>
                                </div>

                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => onRemoveItem(item.id)}
                                  className="p-1 text-red-400 hover:bg-red-400/20 rounded"
                                >
                                  <Trash2 size={14} />
                                </motion.button>
                              </div>
                            </div>

                            {/* Item Total */}
                            <div className="text-right">
                              <div className="text-primary font-bold">
                                ${(item.price * item.quantity).toFixed(2)}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-primary/20 space-y-4">
                  {/* Promo Code */}
                  <form onSubmit={handlePromoSubmit} className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Promo code"
                      className="input flex-1 text-sm"
                    />
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-secondary text-sm px-4"
                    >
                      Apply
                    </motion.button>
                  </form>

                  {/* Points Usage */}
                  {userPoints > 0 && (
                    <div className="flex items-center justify-between bg-primary/10 rounded-lg p-3">
                      <span className="text-primary text-sm">Use points for discount?</span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onUsePoints(userPoints)}
                        className="text-primary font-medium text-sm hover:text-glow"
                      >
                        Use {userPoints} points
                      </motion.button>
                    </div>
                  )}

                  {/* Totals */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-primary/80">
                      <span>Subtotal:</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    {pointsDiscount > 0 && (
                      <div className="flex justify-between text-green-400">
                        <span>Points Discount:</span>
                        <span>-${pointsDiscount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-xl font-bold text-primary border-t border-primary/20 pt-2">
                      <span>Total:</span>
                      <span>${(subtotal - pointsDiscount).toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <motion.button
                    onClick={handleCheckout}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full btn-primary text-lg py-4 relative overflow-hidden"
                    disabled={showCheckoutAnimation}
                  >
                    <AnimatePresence>
                      {showCheckoutAnimation ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex items-center justify-center gap-2"
                        >
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <Sparkles size={20} />
                          </motion.div>
                          Processing...
                        </motion.div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <CreditCard size={20} />
                          Checkout
                        </div>
                      )}
                    </AnimatePresence>

                    {/* Success Animation */}
                    <AnimatePresence>
                      {showCheckoutAnimation && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 1.5 }}
                          className="absolute inset-0 bg-green-500 flex items-center justify-center"
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 2 }}
                          >
                            ✅ Success!
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>

                  {/* Clear Cart */}
                  {cart.length > 1 && (
                    <motion.button
                      onClick={onClearCart}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full text-red-400 hover:bg-red-400/10 py-2 rounded-lg transition-all text-sm"
                    >
                      Clear Cart
                    </motion.button>
                  )}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default ShoppingCart 