import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  full_name: string
  user_type: 'general' | 'law' | 'medical' | 'financial' | 'admin'
  is_verified: boolean
}

interface AuthContextType {
  user: User | null
  token: string | null
  loading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: RegisterData) => Promise<boolean>
  logout: () => void
  refreshUser: () => Promise<void>
}

interface RegisterData {
  username: string
  email: string
  password: string
  password_confirm: string
  first_name: string
  last_name: string
  phone?: string
  user_type: string
}

const AuthContext = createContext<AuthContextType | null>(null)

// Configure axios defaults
axios.defaults.baseURL = 'http://localhost:8000'
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Token ${token}`
  }
  return config
})

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (token) {
      refreshUser()
    } else {
      setLoading(false)
    }
  }, [token])

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true)
    try {
      const response = await axios.post('/api/auth/login/', { email, password })
      const { user, token } = response.data
      
      setUser(user)
      setToken(token)
      localStorage.setItem('token', token)
      
      toast.success('Login successful!')
      return true
    } catch (error: any) {
      const message = error.response?.data?.detail || 'Login failed'
      toast.error(message)
      return false
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData: RegisterData): Promise<boolean> => {
    setLoading(true)
    try {
      const response = await axios.post('/api/auth/register/', userData)
      const { user, token } = response.data
      
      setUser(user)
      setToken(token)
      localStorage.setItem('token', token)
      
      toast.success('Registration successful!')
      return true
    } catch (error: any) {
      const message = error.response?.data?.email?.[0] || 
                     error.response?.data?.password?.[0] || 
                     'Registration failed'
      toast.error(message)
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
    toast.success('Logged out successfully')
  }

  const refreshUser = async () => {
    try {
      const response = await axios.get('/api/auth/user/')
      setUser(response.data)
    } catch (error) {
      // Token is invalid, clear it
      logout()
    } finally {
      setLoading(false)
    }
  }

  const value: AuthContextType = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    refreshUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 