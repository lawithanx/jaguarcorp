import React from 'react'
import { motion } from 'framer-motion'
import { X, Filter, DollarSign, Package, Shield, Code, Palette, Users } from 'lucide-react'
import { FilterOptions } from '../../types/shop'

interface FilterSidebarProps {
  isOpen: boolean
  onClose: () => void
  filters: FilterOptions
  onFiltersChange: (filters: FilterOptions) => void
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  isOpen,
  onClose,
  filters,
  onFiltersChange
}) => {
  const categories = [
    { id: 'asset', name: 'Digital Assets', icon: Package, description: 'Software, tools, templates' },
    { id: 'service', name: 'Professional Services', icon: Shield, description: 'Consulting, audits, assessments' },
    { id: 'partnership', name: 'Partnerships', icon: Users, description: 'Strategic alliances, collaborations' },
    { id: 'merchandise', name: 'Merchandise', icon: Package, description: 'Physical products, branded items' },
    { id: 'consultation', name: 'Consultations', icon: Users, description: 'Expert advice, strategy sessions' }
  ]

  const priceRanges = [
    { min: 0, max: 100, label: 'Under $100' },
    { min: 100, max: 500, label: '$100 - $500' },
    { min: 500, max: 1000, label: '$500 - $1,000' },
    { min: 1000, max: 5000, label: '$1,000 - $5,000' },
    { min: 5000, max: 999999, label: '$5,000+' }
  ]

  const sortOptions = [
    { value: 'featured', label: 'Featured First' },
    { value: 'newest', label: 'Newest First' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'name', label: 'Name A-Z' },
    { value: 'popularity', label: 'Most Popular' }
  ]

  const handleCategoryChange = (categoryId: string) => {
    onFiltersChange({
      ...filters,
      category: filters.category === categoryId ? '' : categoryId
    })
  }

  const handlePriceRangeChange = (min: number, max: number) => {
    onFiltersChange({
      ...filters,
      priceRange: [min, max]
    })
  }

  const handleSortChange = (sortBy: string) => {
    onFiltersChange({
      ...filters,
      sortBy
    })
  }

  const clearFilters = () => {
    onFiltersChange({
      category: '',
      priceRange: [0, 10000],
      sortBy: 'featured'
    })
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        exit={{ x: -300 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="fixed left-0 top-0 h-full w-80 bg-dark-900 border-r border-primary/20 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-primary/10">
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-primary" />
            <h2 className="text-xl font-semibold text-primary">Filters</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-primary/60 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Clear Filters */}
          <div className="flex justify-between items-center">
            <span className="text-primary/80">Active Filters</span>
            <button
              onClick={clearFilters}
              className="text-primary/60 hover:text-primary text-sm underline"
            >
              Clear All
            </button>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-medium text-primary mb-4">Product Categories</h3>
            <div className="space-y-3">
              {categories.map(category => (
                <motion.div
                  key={category.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    filters.category === category.id
                      ? 'bg-primary/10 border-primary/30 text-primary'
                      : 'bg-primary/5 border-primary/15 text-primary/80 hover:border-primary/25'
                  }`}
                  onClick={() => handleCategoryChange(category.id)}
                >
                  <div className="flex items-center gap-3">
                    <category.icon size={16} />
                    <div>
                      <div className="font-medium text-sm">{category.name}</div>
                      <div className="text-xs opacity-70">{category.description}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="font-medium text-primary mb-4">Price Range</h3>
            <div className="space-y-2">
              {priceRanges.map(range => (
                <label
                  key={`${range.min}-${range.max}`}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="priceRange"
                    checked={filters.priceRange[0] === range.min && filters.priceRange[1] === range.max}
                    onChange={() => handlePriceRangeChange(range.min, range.max)}
                    className="w-4 h-4 text-primary bg-dark-800 border-primary/30 focus:ring-primary/20"
                  />
                  <span className="text-primary/80 group-hover:text-primary transition-colors">
                    {range.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Sort By */}
          <div>
            <h3 className="font-medium text-primary mb-4">Sort By</h3>
            <div className="space-y-2">
              {sortOptions.map(option => (
                <label
                  key={option.value}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="sortBy"
                    value={option.value}
                    checked={filters.sortBy === option.value}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="w-4 h-4 text-primary bg-dark-800 border-primary/30 focus:ring-primary/20"
                  />
                  <span className="text-primary/80 group-hover:text-primary transition-colors">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Professional Features */}
          <div>
            <h3 className="font-medium text-primary mb-4">Professional Features</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary bg-dark-800 border-primary/30 rounded focus:ring-primary/20"
                />
                <span className="text-primary/80">Security Clearance Required</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary bg-dark-800 border-primary/30 rounded focus:ring-primary/20"
                />
                <span className="text-primary/80">HIPAA Compliant</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary bg-dark-800 border-primary/30 rounded focus:ring-primary/20"
                />
                <span className="text-primary/80">SOX Compliance</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary bg-dark-800 border-primary/30 rounded focus:ring-primary/20"
                />
                <span className="text-primary/80">Enterprise Grade</span>
              </label>
            </div>
          </div>

          {/* Industry Focus */}
          <div>
            <h3 className="font-medium text-primary mb-4">Industry Focus</h3>
            <div className="space-y-2">
              {['Government', 'Healthcare', 'Legal', 'Financial', 'Enterprise'].map(industry => (
                <label
                  key={industry}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-primary bg-dark-800 border-primary/30 rounded focus:ring-primary/20"
                  />
                  <span className="text-primary/80 group-hover:text-primary transition-colors">
                    {industry}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default FilterSidebar 