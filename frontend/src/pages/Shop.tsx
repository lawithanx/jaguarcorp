import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Layout from '../components/layout/Layout'
import ProductCard from '../components/shop/ProductCard'
import ShoppingCart from '../components/shop/ShoppingCart'
import ProductModal from '../components/shop/ProductModal'
import FilterSidebar from '../components/shop/FilterSidebar'
import LiveSearch from '../components/shop/LiveSearch'
import PointsCollector from '../components/shop/PointsCollector'
import { useShop } from '../hooks/useShop'
import { Product, CartItem, FilterOptions } from '../types/shop'
import { Search, Filter, Grid, List, Sparkles } from 'lucide-react'

const Shop: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<FilterOptions>({
    category: '',
    priceRange: [0, 1000],
    sortBy: 'featured'
  })
  const [showConfetti, setShowConfetti] = useState(false)
  const [userPoints, setUserPoints] = useState(0)

  const {
    products,
    cart,
    loading,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    applyPromoCode,
    getRecommendedProducts
  } = useShop()

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !filters.category || product.category === filters.category
    const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    
    return matchesSearch && matchesCategory && matchesPrice
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'name':
        return a.name.localeCompare(b.name)
      case 'popular':
        return b.views_count - a.views_count
      default:
        return b.is_featured ? 1 : -1
    }
  })

  const handleAddToCart = async (product: Product) => {
    await addToCart(product.id, 1)
    setUserPoints(prev => prev + 10) // Add points for each item
    
    // Trigger confetti effect
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 2000)
    
    // Play sound effect if supported
    if ('vibrate' in navigator) {
      navigator.vibrate(100)
    }
  }

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
  }

  const categories = [
    { id: 'assets', name: 'Digital Assets', icon: '💾' },
    { id: 'services', name: 'Services', icon: '🛠️' },
    { id: 'partnerships', name: 'Partnerships', icon: '🤝' },
    { id: 'merchandise', name: 'Merchandise', icon: '👕' }
  ]

  return (
    <Layout
      title="Shop"
      description="Discover premium digital assets, professional services, and exclusive merchandise"
      showHero={true}
    >
      {/* Confetti Effect */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-primary rounded-full"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: -10,
                  opacity: 1,
                  scale: 1
                }}
                animate={{
                  y: window.innerHeight + 10,
                  opacity: 0,
                  scale: 0,
                  rotate: 360
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  delay: Math.random() * 0.5
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Points Collector */}
      <PointsCollector points={userPoints} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Controls */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Live Search */}
            <div className="flex-1 max-w-md">
              <LiveSearch
                value={searchQuery}
                onChange={setSearchQuery}
                products={products}
                onProductSelect={handleProductClick}
              />
            </div>

            {/* View Controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="btn-secondary flex items-center gap-2"
              >
                <Filter size={20} />
                Filters
              </button>
              
              <div className="flex bg-dark-800 rounded-lg p-1 border border-primary/20">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary/20 text-primary' : 'text-primary/60'}`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary/20 text-primary' : 'text-primary/60'}`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Category Quick Filters */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilters(prev => ({ ...prev, category: '' }))}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                !filters.category
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'bg-dark-800 text-primary/60 border border-primary/20 hover:border-primary/40'
              }`}
            >
              All Categories
            </button>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setFilters(prev => ({ ...prev, category: category.id }))}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  filters.category === category.id
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'bg-dark-800 text-primary/60 border border-primary/20 hover:border-primary/40'
                }`}
              >
                <span>{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 280, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <FilterSidebar
                  filters={filters}
                  onFiltersChange={setFilters}
                  categories={categories}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Sparkles className="text-primary" size={20} />
                <span className="text-primary/80">
                  {sortedProducts.length} products found
                </span>
              </div>
              
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                className="input text-sm w-auto"
              >
                <option value="featured">Featured</option>
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>

            {/* Product Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="card animate-pulse">
                    <div className="h-48 bg-primary/10 rounded-lg mb-4"></div>
                    <div className="h-4 bg-primary/10 rounded mb-2"></div>
                    <div className="h-3 bg-primary/10 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : (
              <motion.div
                layout
                className={`grid gap-6 ${
                  viewMode === 'grid'
                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                    : 'grid-cols-1'
                }`}
              >
                <AnimatePresence>
                  {sortedProducts.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      viewMode={viewMode}
                      onAddToCart={() => handleAddToCart(product)}
                      onClick={() => handleProductClick(product)}
                      index={index}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Empty State */}
            {!loading && sortedProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold text-primary mb-2">No products found</h3>
                <p className="text-primary/60 mb-6">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setFilters({ category: '', priceRange: [0, 1000], sortBy: 'featured' })
                  }}
                  className="btn-primary"
                >
                  Clear All Filters
                </button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Recommended Products */}
        {!loading && sortedProducts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <h2 className="text-2xl font-tech font-bold text-primary mb-6 flex items-center gap-2">
              <Sparkles size={24} />
              Recommended for You
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {getRecommendedProducts(4).map((product, index) => (
                <ProductCard
                  key={`rec-${product.id}`}
                  product={product}
                  viewMode="grid"
                  onAddToCart={() => handleAddToCart(product)}
                  onClick={() => handleProductClick(product)}
                  index={index}
                  isRecommended={true}
                />
              ))}
            </div>
          </motion.section>
        )}
      </div>

      {/* Shopping Cart */}
      <ShoppingCart
        cart={cart}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
        onApplyPromo={applyPromoCode}
        userPoints={userPoints}
        onUsePoints={(points) => setUserPoints(prev => prev - points)}
      />

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />
    </Layout>
  )
}

export default Shop 