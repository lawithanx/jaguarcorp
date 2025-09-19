import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import axios from 'axios'

interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  user_type: string
  is_active: boolean
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Configure axios defaults
  axios.defaults.baseURL = 'http://localhost:8000'
  axios.defaults.withCredentials = true

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('authToken')
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        const response = await axios.get('/api/auth/user/')
        setUser(response.data)
      }
    } catch (error) {
      localStorage.removeItem('authToken')
      delete axios.defaults.headers.common['Authorization']
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await axios.post('/api/auth/login/', {
        email,
        password
      })

      if (response.data.access_token) {
        localStorage.setItem('authToken', response.data.access_token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`
        setUser(response.data.user)
        return { success: true }
      }

      return { success: false, message: 'Login failed' }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed. Please check your credentials.'
      return { success: false, message }
    }
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    delete axios.defaults.headers.common['Authorization']
    setUser(null)
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 