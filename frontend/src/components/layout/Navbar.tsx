import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, User, LogOut, Shield } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const location = useLocation()
  const { isAuthenticated, user, logout } = useAuth()

  // Jaguar Logo Component
  const JaguarLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 10C30 10 15 25 15 45C15 65 30 80 50 80C70 80 85 65 85 45C85 25 70 10 50 10Z" fill="currentColor" opacity="0.1"/>
      <path d="M35 35C35 30 38 25 45 25C52 25 55 30 55 35C55 40 52 45 45 45C38 45 35 40 35 35Z" fill="currentColor"/>
      <path d="M65 35C65 30 62 25 55 25C48 25 45 30 45 35C45 40 48 45 55 45C62 45 65 40 65 35Z" fill="currentColor"/>
      <path d="M30 50C30 45 35 40 45 45C50 47 55 47 60 45C70 40 75 45 75 50C75 60 65 70 50 70C35 70 30 60 30 50Z" fill="currentColor"/>
      <circle cx="35" cy="30" r="3" fill="currentColor"/>
      <circle cx="65" cy="30" r="3" fill="currentColor"/>
    </svg>
  )

  const navigation = [
    { name: 'Home', href: '/' },
    { 
      name: 'Portfolio', 
      href: '/portfolio',
      submenu: [
        { name: 'Our Work', href: '/portfolio' },
        { name: 'Investments', href: '/portfolio/investments' }
      ]
    },
    { name: 'Shop', href: '/shop' },
    { name: 'Contact', href: '/contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMouseEnter = (name: string) => {
    setActiveDropdown(name)
  }

  const handleMouseLeave = () => {
    setActiveDropdown(null)
  }

  const handleLogout = () => {
    logout()
    setIsOpen(false)
  }

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-dark/95 backdrop-blur-md border-b border-primary/20' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <JaguarLogo className="w-10 h-10 text-primary group-hover:scale-110 transition-transform duration-200" />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-primary tracking-tight">
                JAGUAR CORP
              </span>
              <span className="text-xs text-primary/60 font-mono -mt-1">
                ELITE TECH SOLUTIONS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.submenu && handleMouseEnter(item.name)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  to={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    location.pathname === item.href ||
                    (item.submenu && item.submenu.some(sub => location.pathname === sub.href))
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-primary/70 hover:text-primary'
                  }`}
                >
                  <span>{item.name}</span>
                  {item.submenu && (
                    <ChevronDown 
                      size={16} 
                      className={`transition-transform duration-200 ${
                        activeDropdown === item.name ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </Link>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {item.submenu && activeDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-48 bg-dark/95 backdrop-blur-md border border-primary/20 rounded-lg shadow-lg overflow-hidden"
                    >
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          className="block px-4 py-3 text-sm text-primary/70 hover:text-primary hover:bg-primary/10 transition-colors duration-200"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {/* Auth Section */}
            <div className="flex items-center space-x-4 ml-6 pl-6 border-l border-primary/20">
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/dashboard"
                    className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-primary/70 hover:text-primary transition-colors duration-200"
                  >
                    <Shield size={16} />
                    <span>Vault</span>
                  </Link>
                  <div className="flex items-center space-x-2 text-primary/70">
                    <User size={16} />
                    <span className="text-sm">{user?.email || 'Client'}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-primary/70 hover:text-red-400 transition-colors duration-200"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="btn-primary text-sm px-4 py-2"
                >
                  Client Login
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-primary/70 hover:text-primary transition-colors duration-200"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-dark/95 backdrop-blur-md border-t border-primary/20 mt-2 rounded-lg overflow-hidden"
            >
              <div className="px-4 py-4 space-y-3">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${
                        location.pathname === item.href
                          ? 'text-primary bg-primary/10 rounded-md'
                          : 'text-primary/70 hover:text-primary'
                      }`}
                    >
                      {item.name}
                    </Link>
                    {item.submenu && (
                      <div className="ml-4 mt-2 space-y-2">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            onClick={() => setIsOpen(false)}
                            className="block px-3 py-2 text-sm text-primary/60 hover:text-primary transition-colors duration-200"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                <div className="border-t border-primary/20 pt-4 mt-4">
                  {isAuthenticated ? (
                    <div className="space-y-3">
                      <Link
                        to="/dashboard"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center space-x-2 px-3 py-2 text-base font-medium text-primary/70 hover:text-primary transition-colors duration-200"
                      >
                        <Shield size={16} />
                        <span>Client Vault</span>
                      </Link>
                      <div className="flex items-center space-x-2 px-3 py-2 text-primary/70">
                        <User size={16} />
                        <span className="text-sm">{user?.email || 'Client'}</span>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 px-3 py-2 text-base font-medium text-primary/70 hover:text-red-400 transition-colors duration-200 w-full text-left"
                      >
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </div>
                  ) : (
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="block w-full btn-primary text-center py-3"
                    >
                      Client Login
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

export default Navbar 