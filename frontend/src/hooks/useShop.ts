import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Product, CartItem, Cart } from '../types/shop'

interface UseShopReturn {
  products: Product[]
  cart: CartItem[]
  loading: boolean
  error: string | null
  addToCart: (productId: string, quantity: number) => Promise<void>
  removeFromCart: (itemId: string) => Promise<void>
  updateCartQuantity: (itemId: string, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  applyPromoCode: (code: string) => Promise<boolean>
  getRecommendedProducts: (limit: number) => Product[]
}

export const useShop = (): UseShopReturn => {
  const [error, setError] = useState<string | null>(null)
  const queryClient = useQueryClient()

  // Fetch products
  const {
    data: products = [],
    isLoading: productsLoading
  } = useQuery<Product[]>('products', async () => {
    const response = await axios.get('/api/shop/products/')
    return response.data.results || response.data
  }, {
    staleTime: 5 * 60 * 1000, // 5 minutes
    onError: (error: any) => {
      setError(error.response?.data?.message || 'Failed to fetch products')
      toast.error('Failed to load products')
    }
  })

  // Fetch cart
  const {
    data: cartData,
    isLoading: cartLoading
  } = useQuery<Cart>('cart', async () => {
    const response = await axios.get('/api/shop/cart/')
    return response.data
  }, {
    onError: (error: any) => {
      console.error('Cart fetch error:', error)
    }
  })

  const cart = cartData?.items || []

  // Add to cart mutation
  const addToCartMutation = useMutation(
    async ({ productId, quantity }: { productId: string; quantity: number }) => {
      const response = await axios.post('/api/shop/cart/add/', {
        product_id: productId,
        quantity
      })
      return response.data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('cart')
        toast.success('Added to cart!', {
          icon: '🛒',
          duration: 2000
        })
      },
      onError: (error: any) => {
        const message = error.response?.data?.message || 'Failed to add to cart'
        toast.error(message)
      }
    }
  )

  // Remove from cart mutation
  const removeFromCartMutation = useMutation(
    async (itemId: string) => {
      await axios.post('/api/shop/cart/remove/', { item_id: itemId })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('cart')
        toast.success('Removed from cart')
      },
      onError: (error: any) => {
        toast.error('Failed to remove from cart')
      }
    }
  )

  // Update cart quantity mutation
  const updateQuantityMutation = useMutation(
    async ({ itemId, quantity }: { itemId: string; quantity: number }) => {
      await axios.put(`/api/shop/cart/items/${itemId}/`, { quantity })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('cart')
      },
      onError: (error: any) => {
        toast.error('Failed to update quantity')
      }
    }
  )

  // Clear cart mutation
  const clearCartMutation = useMutation(
    async () => {
      await axios.post('/api/shop/cart/clear/')
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('cart')
        toast.success('Cart cleared')
      },
      onError: (error: any) => {
        toast.error('Failed to clear cart')
      }
    }
  )

  // Apply promo code mutation
  const applyPromoMutation = useMutation(
    async (code: string) => {
      const response = await axios.post('/api/shop/cart/apply-promo/', { code })
      return response.data
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries('cart')
        toast.success(`Promo code applied! Saved $${data.discount}`)
      },
      onError: (error: any) => {
        const message = error.response?.data?.message || 'Invalid promo code'
        toast.error(message)
      }
    }
  )

  // Helper functions
  const addToCart = async (productId: string, quantity: number) => {
    await addToCartMutation.mutateAsync({ productId, quantity })
  }

  const removeFromCart = async (itemId: string) => {
    await removeFromCartMutation.mutateAsync(itemId)
  }

  const updateCartQuantity = async (itemId: string, quantity: number) => {
    await updateQuantityMutation.mutateAsync({ itemId, quantity })
  }

  const clearCart = async () => {
    await clearCartMutation.mutateAsync()
  }

  const applyPromoCode = async (code: string): Promise<boolean> => {
    try {
      await applyPromoMutation.mutateAsync(code)
      return true
    } catch {
      return false
    }
  }

  const getRecommendedProducts = (limit: number): Product[] => {
    // Simple recommendation logic based on featured and popular products
    const featured = products.filter(p => p.is_featured)
    const popular = products
      .filter(p => !p.is_featured)
      .sort((a, b) => b.views_count - a.views_count)
    
    return [...featured, ...popular].slice(0, limit)
  }

  const loading = productsLoading || cartLoading

  return {
    products,
    cart,
    loading,
    error,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    applyPromoCode,
    getRecommendedProducts
  }
} 