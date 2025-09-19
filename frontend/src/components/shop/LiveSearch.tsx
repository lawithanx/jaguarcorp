import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Clock, TrendingUp } from 'lucide-react'
import { Product } from '../../types/shop'

interface LiveSearchProps {
  value: string
  onChange: (value: string) => void
  products: Product[]
  onProductSelect: (product: Product) => void
}

const LiveSearch: React.FC<LiveSearchProps> = ({
  value,
  onChange,
  products,
  onProductSelect
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  const searchResults = products.filter(product =>
    product.name.toLowerCase().includes(value.toLowerCase()) ||
    product.description.toLowerCase().includes(value.toLowerCase()) ||
    product.features.some(feature => 
      feature.toLowerCase().includes(value.toLowerCase())
    )
  ).slice(0, 6)

  const popularSearches = ['React Template', 'Security Audit', 'Design Service', 'Partnership']

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (searchTerm: string) => {
    onChange(searchTerm)
    if (searchTerm.trim() && !recentSearches.includes(searchTerm)) {
      setRecentSearches(prev => [searchTerm, ...prev.slice(0, 4)])
    }
    setIsOpen(false)
  }

  const handleProductClick = (product: Product) => {
    onProductSelect(product)
    setIsOpen(false)
  }

  const clearSearch = () => {
    onChange('')
    inputRef.current?.focus()
  }

  return (
    <div className="relative">
      {/* Search Input */}
      <div className="relative">
        <Search 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/60" 
          size={20} 
        />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder="Search products, services, assets..."
          className="input pl-12 pr-12 w-full"
        />
        {value && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary/60 hover:text-primary"
          >
            <X size={20} />
          </motion.button>
        )}
      </div>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={resultsRef}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-dark-900 border border-primary/30 rounded-xl shadow-xl z-50 max-h-96 overflow-hidden"
          >
            {value ? (
              <>
                {/* Search Results */}
                {searchResults.length > 0 ? (
                  <div className="p-2">
                    <div className="text-xs text-primary/60 px-3 py-2 font-medium">
                      Search Results ({searchResults.length})
                    </div>
                    {searchResults.map((product, index) => (
                      <motion.button
                        key={product.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleProductClick(product)}
                        className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors group"
                      >
                        <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          {product.featured_image ? (
                            <img
                              src={product.featured_image}
                              alt={product.name}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            <span className="text-lg">📦</span>
                          )}
                        </div>
                        <div className="flex-1 text-left">
                          <div className="text-primary font-medium group-hover:text-glow">
                            {product.name}
                          </div>
                          <div className="text-primary/60 text-sm">
                            {product.category} • ${product.price}
                          </div>
                        </div>
                        {product.is_featured && (
                          <div className="bg-primary/20 text-primary px-2 py-1 rounded text-xs">
                            Featured
                          </div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center">
                    <div className="text-4xl mb-2">🔍</div>
                    <div className="text-primary/70">No products found</div>
                    <div className="text-primary/50 text-sm">Try a different search term</div>
                  </div>
                )}
              </>
            ) : (
              <div className="p-2">
                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div className="mb-4">
                    <div className="text-xs text-primary/60 px-3 py-2 font-medium flex items-center gap-2">
                      <Clock size={14} />
                      Recent Searches
                    </div>
                    {recentSearches.map((search, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleSearch(search)}
                        className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors text-left"
                      >
                        <Clock size={16} className="text-primary/60" />
                        <span className="text-primary">{search}</span>
                      </motion.button>
                    ))}
                  </div>
                )}

                {/* Popular Searches */}
                <div>
                  <div className="text-xs text-primary/60 px-3 py-2 font-medium flex items-center gap-2">
                    <TrendingUp size={14} />
                    Popular Searches
                  </div>
                  {popularSearches.map((search, index) => (
                    <motion.button
                      key={search}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleSearch(search)}
                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors text-left"
                    >
                      <TrendingUp size={16} className="text-primary/60" />
                      <span className="text-primary">{search}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default LiveSearch 