import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import { useAuth } from '../context/AuthContext'
import { Mail, Lock, Eye, EyeOff, Shield, CheckCircle, AlertCircle } from 'lucide-react'

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [showRegister, setShowRegister] = useState(false)
  
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (error) setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      await login(formData.email, formData.password)
      navigate('/dashboard')
    } catch (err) {
      setError('Invalid email or password. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      // For demo purposes, simulate registration
      await new Promise(resolve => setTimeout(resolve, 1500))
      setError('Registration functionality will be available in the full version.')
    } catch (err) {
      setError('Registration failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const demoCredentials = [
    { type: 'General Client', email: 'client@example.com', password: 'demo123' },
    { type: 'Law Firm', email: 'legal@example.com', password: 'demo123' },
    { type: 'Healthcare', email: 'medical@example.com', password: 'demo123' },
    { type: 'Government', email: 'gov@example.com', password: 'demo123' }
  ]

  return (
    <Layout>
      <div className="min-h-screen py-20 bg-gradient-to-br from-primary/3 via-transparent to-primary/2">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h1 className="text-4xl md:text-5xl font-semibold text-primary mb-6">
                  Client Portal Access
                </h1>
                <p className="text-xl text-primary/60 leading-relaxed">
                  Secure access to your private vault containing purchased services, 
                  project deliverables, and exclusive content.
                </p>
              </div>

              {/* Security Features */}
              <div className="space-y-4">
                <h2 className="text-xl font-medium text-primary">Secure & Professional</h2>
                <div className="space-y-3">
                  {[
                    { icon: Shield, title: 'Enterprise Security', desc: 'Bank-level encryption and security' },
                    { icon: CheckCircle, title: 'Compliance Ready', desc: 'HIPAA, SOX, and regulatory standards' },
                    { icon: Lock, title: 'Private Vault', desc: 'Your exclusive content and deliverables' }
                  ].map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <feature.icon size={16} className="text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-primary">{feature.title}</div>
                        <div className="text-primary/60 text-sm">{feature.desc}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Demo Credentials */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="card-professional"
              >
                <h3 className="font-medium text-primary mb-4">Demo Access Credentials</h3>
                <div className="space-y-3">
                  {demoCredentials.map((cred, index) => (
                    <div key={cred.type} className="text-sm">
                      <div className="font-medium text-primary/80">{cred.type}:</div>
                      <div className="text-primary/60 font-mono text-xs">
                        {cred.email} / {cred.password}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Login Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full max-w-md mx-auto"
            >
              <div className="card-professional">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-semibold text-primary mb-2">
                    {showRegister ? 'Create Account' : 'Welcome Back'}
                  </h2>
                  <p className="text-primary/60">
                    {showRegister 
                      ? 'Register for secure access to your professional services'
                      : 'Sign in to access your private vault and exclusive content'
                    }
                  </p>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg mb-6"
                  >
                    <div className="flex items-center gap-2">
                      <AlertCircle size={18} />
                      <span>{error}</span>
                    </div>
                  </motion.div>
                )}

                <form onSubmit={showRegister ? handleRegister : handleSubmit} className="space-y-6">
                  {showRegister && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-group">
                          <label className="form-label">First Name</label>
                          <input
                            type="text"
                            name="firstName"
                            className="input w-full"
                            placeholder="John"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Last Name</label>
                          <input
                            type="text"
                            name="lastName"
                            className="input w-full"
                            placeholder="Doe"
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Organization</label>
                        <input
                          type="text"
                          name="company"
                          className="input w-full"
                          placeholder="Your company or organization"
                        />
                      </div>
                    </>
                  )}

                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/40" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="input w-full pl-10"
                        placeholder="your.email@company.com"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Password</label>
                    <div className="relative">
                      <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/40" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        className="input w-full pl-10 pr-10"
                        placeholder={showRegister ? 'Create a secure password' : 'Enter your password'}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary/40 hover:text-primary/60"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {showRegister && (
                    <div className="form-group">
                      <label className="form-label">Account Type</label>
                      <select name="userType" className="input w-full" required>
                        <option value="">Select account type</option>
                        <option value="general">General Client</option>
                        <option value="law">Legal Practice</option>
                        <option value="medical">Healthcare Organization</option>
                        <option value="financial">Financial Services</option>
                        <option value="government">Government Agency</option>
                      </select>
                    </div>
                  )}

                  {!showRegister && (
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4 text-primary bg-dark-800 border-primary/30 rounded focus:ring-primary/20" />
                        <span className="text-sm text-primary/70">Remember me</span>
                      </label>
                      <Link to="/forgot-password" className="text-sm text-primary hover:text-primary/80">
                        Forgot password?
                      </Link>
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className="btn-primary w-full py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-3">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-dark border-t-transparent rounded-full"
                        />
                        {showRegister ? 'Creating Account...' : 'Signing In...'}
                      </div>
                    ) : (
                      showRegister ? 'Create Professional Account' : 'Access Client Portal'
                    )}
                  </motion.button>
                </form>

                <div className="mt-6 text-center">
                  <span className="text-primary/60">
                    {showRegister ? 'Already have an account?' : "Don't have an account?"}
                  </span>
                  <button
                    onClick={() => {
                      setShowRegister(!showRegister)
                      setError('')
                      setFormData({ email: '', password: '' })
                    }}
                    className="ml-2 text-primary hover:text-primary/80 font-medium"
                  >
                    {showRegister ? 'Sign In' : 'Register'}
                  </button>
                </div>

                {/* Security Notice */}
                <div className="mt-6 pt-6 border-t border-primary/10">
                  <div className="text-xs text-primary/50 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Shield size={14} />
                      <span>Enterprise Security</span>
                    </div>
                    <p>
                      Your data is protected with enterprise-grade encryption. 
                      We comply with HIPAA, SOX, and other regulatory standards.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Login 