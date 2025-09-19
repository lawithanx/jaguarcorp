import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, AlertCircle, Eye, EyeOff, Shield } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard')
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!email || !password) {
      setError('Please enter both email and password')
      setLoading(false)
      return
    }

    try {
      const result = await login(email, password)
      
      if (result.success) {
        toast.success('Welcome to your client vault!')
        navigate('/dashboard')
      } else {
        setError(result.message || 'Login failed')
        toast.error(result.message || 'Login failed')
      }
    } catch (error) {
      setError('An unexpected error occurred')
      toast.error('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  // Jaguar Logo Component
  const JaguarLogo = ({ size = 32 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 10C30 10 15 25 15 45C15 65 30 80 50 80C70 80 85 65 85 45C85 25 70 10 50 10Z" fill="currentColor" opacity="0.1"/>
      <path d="M35 35C35 30 38 25 45 25C52 25 55 30 55 35C55 40 52 45 45 45C38 45 35 40 35 35Z" fill="currentColor"/>
      <path d="M65 35C65 30 62 25 55 25C48 25 45 30 45 35C45 40 48 45 55 45C62 45 65 40 65 35Z" fill="currentColor"/>
      <path d="M30 50C30 45 35 40 45 45C50 47 55 47 60 45C70 40 75 45 75 50C75 60 65 70 50 70C35 70 30 60 30 50Z" fill="currentColor"/>
      <circle cx="35" cy="30" r="3" fill="currentColor"/>
      <circle cx="65" cy="30" r="3" fill="currentColor"/>
    </svg>
  )

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark via-dark-900 to-dark">
      <div className="max-w-md w-full mx-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="card-professional p-8"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <JaguarLogo size={48} />
            </div>
            <h1 className="text-2xl font-bold text-primary mb-2">Client Access Portal</h1>
            <p className="text-primary/60">
              Secure access to your private vault
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-center gap-3"
              >
                <AlertCircle size={20} className="text-red-400" />
                <span className="text-red-400 text-sm">{error}</span>
              </motion.div>
            )}

            <div className="form-group">
              <label className="form-label">
                <Mail size={16} />
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-dark/50 border border-primary/20 rounded-lg focus:outline-none focus:border-primary/60 transition-colors text-primary placeholder-primary/40"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <Lock size={16} />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-dark/50 border border-primary/20 rounded-lg focus:outline-none focus:border-primary/60 transition-colors text-primary placeholder-primary/40 pr-12"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary/60 hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-dark/20 border-t-dark animate-spin rounded-full"></div>
                  Authenticating...
                </>
              ) : (
                <>
                  <Shield size={20} />
                  Access Vault
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 p-4 bg-primary/5 border border-primary/10 rounded-lg"
          >
            <h3 className="text-sm font-medium text-primary mb-2">Demo Access</h3>
            <div className="text-xs text-primary/60 space-y-1">
              <p><strong>Email:</strong> demo@jaguarcorp.com</p>
              <p><strong>Password:</strong> demo123</p>
            </div>
          </motion.div>

          {/* Contact */}
          <div className="mt-6 text-center">
            <p className="text-sm text-primary/60">
              Need access? {' '}
              <Link to="/contact" className="text-primary hover:text-primary/80 transition-colors">
                Contact our team
              </Link>
            </p>
            <p className="text-xs text-primary/40 mt-2">
              New to Jaguar Corp? We'd love to discuss partnership opportunities.
            </p>
          </div>
        </motion.div>

        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-center text-xs text-primary/40"
        >
          <p>🔒 All connections are encrypted and secure</p>
        </motion.div>
      </div>
    </div>
  )
}

export default Login 