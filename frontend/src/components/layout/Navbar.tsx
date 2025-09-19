import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { Menu, X, User, LogOut, ShoppingCart, Settings } from 'lucide-react'

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { user, logout } = useAuth()
  const location = useLocation()

  const navigation = [
    { name: 'Home', href: '/', icon: '🏠' },
    { name: 'Portfolio', href: '/portfolio', icon: '💼' },
    { name: 'Shop', href: '/shop', icon: '🛒' },
    { name: 'Contact', href: '/contact', icon: '📧' },
  ]

  const isActive = (path: string) => location.pathname === path

  const handleLogout = async () => {
    logout()
    setShowUserMenu(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-950/90 backdrop-blur-md border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center border border-primary/30 group-hover:border-primary/50 transition-all duration-300">
              <span className="text-primary font-tech text-lg font-bold group-hover:text-glow">JC</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-tech font-bold text-primary group-hover:text-glow transition-all duration-300">
                JCorp
              </h1>
              <p className="text-xs text-primary/60 -mt-1">by lawithanx</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    isActive(item.href)
                      ? 'bg-primary/20 text-primary border border-primary/30'
                      : 'text-primary/70 hover:text-primary hover:bg-primary/10 border border-transparent hover:border-primary/20'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* User Menu / Login */}
          <div className="hidden md:block">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 hover:border-primary/50 transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <User size={16} className="text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-primary">{user.first_name}</p>
                    <p className="text-xs text-primary/60 capitalize">{user.user_type}</p>
                  </div>
                </button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-dark-900 border border-primary/30 rounded-lg shadow-lg overflow-hidden"
                    >
                      <Link
                        to="/dashboard"
                        className="flex items-center gap-3 px-4 py-3 text-sm text-primary hover:bg-primary/10 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Settings size={16} />
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-primary hover:bg-primary/10 transition-colors"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className="btn-primary flex items-center gap-2"
              >
                <User size={16} />
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-primary hover:bg-primary/10 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-900/95 backdrop-blur-md border-t border-primary/20"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-lg text-base font-medium transition-all duration-300 flex items-center gap-3 ${
                    isActive(item.href)
                      ? 'bg-primary/20 text-primary border border-primary/30'
                      : 'text-primary/70 hover:text-primary hover:bg-primary/10'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-xl">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
              
              <div className="border-t border-primary/20 pt-4 mt-4">
                {user ? (
                  <>
                    <div className="px-3 py-2 text-primary">
                      <p className="font-medium">{user.first_name} {user.last_name}</p>
                      <p className="text-sm text-primary/60 capitalize">{user.user_type}</p>
                    </div>
                    <Link
                      to="/dashboard"
                      className="block px-3 py-2 rounded-lg text-base font-medium text-primary/70 hover:text-primary hover:bg-primary/10 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout()
                        setIsOpen(false)
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-base font-medium text-primary/70 hover:text-primary hover:bg-primary/10 transition-colors"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-lg text-base font-medium bg-primary/20 text-primary border border-primary/30"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar 