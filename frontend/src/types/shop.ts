export interface Product {
  id: string
  name: string
  slug: string
  description: string
  short_description: string
  price: number
  original_price?: number
  category: string
  product_type: 'asset' | 'service' | 'partnership' | 'merchandise' | 'consultation'
  features: string[]
  featured_image?: string
  gallery_images: string[]
  is_featured: boolean
  is_active: boolean
  is_free: boolean
  is_digital: boolean
  views_count: number
  created_at: string
  updated_at: string
}

export interface CartItem {
  id: string
  product: Product
  quantity: number
  price: number
  created_at: string
}

export interface Cart {
  id: string
  items: CartItem[]
  total_price: number
  total_items: number
  created_at: string
  updated_at: string
}

export interface FilterOptions {
  category: string
  priceRange: [number, number]
  sortBy: string
  inStock?: boolean
  featured?: boolean
}

export interface ProductCategory {
  id: string
  name: string
  slug: string
  description: string
  icon?: string
  products_count: number
}

export interface PromoCode {
  code: string
  discount_type: 'percentage' | 'fixed'
  discount_value: number
  valid_until: string
  minimum_amount?: number
}

export interface Order {
  id: string
  order_number: string
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
  payment_method: 'stripe' | 'paypal' | 'crypto'
  items: CartItem[]
  subtotal: number
  tax_amount: number
  total_amount: number
  created_at: string
}

export interface UserPoints {
  total_points: number
  points_used: number
  points_available: number
  points_history: PointsTransaction[]
}

export interface PointsTransaction {
  id: string
  type: 'earned' | 'used'
  amount: number
  description: string
  created_at: string
} 