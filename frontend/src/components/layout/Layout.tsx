import React from 'react'
import { motion } from 'framer-motion'

interface LayoutProps {
  children: React.ReactNode
  title?: string
  description?: string
  className?: string
  showHero?: boolean
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title, 
  description, 
  className = '',
  showHero = false 
}) => {
  return (
    <div className={`min-h-screen bg-dark ${className}`}>
      {/* Hero Section (optional) */}
      {showHero && title && (
        <section className="relative py-20 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 cyber-grid opacity-10"></div>
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-tech font-bold text-primary text-glow mb-6">
                {title}
              </h1>
              {description && (
                <p className="text-xl text-primary/70 max-w-3xl mx-auto leading-relaxed">
                  {description}
                </p>
              )}
            </motion.div>
          </div>
          
          {/* Bottom border */}
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
        </section>
      )}

      {/* Main Content */}
      <main className="relative">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-dark-950 border-t border-primary/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center border border-primary/30">
                  <span className="text-primary font-tech text-xl font-bold">JC</span>
                </div>
                <div>
                  <h3 className="text-xl font-tech font-bold text-primary">JCorp</h3>
                  <p className="text-sm text-primary/60">by lawithanx</p>
                </div>
              </div>
              <p className="text-primary/70 mb-4 max-w-md">
                Professional cybersecurity, full-stack development, and graphic design services. 
                Building secure, scalable, and innovative solutions.
              </p>
              <div className="flex items-center gap-4">
                <a 
                  href="mailto:lawithanx@gmail.com" 
                  className="text-primary/60 hover:text-primary transition-colors"
                >
                  📧 lawithanx@gmail.com
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-primary mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="/" className="text-primary/60 hover:text-primary transition-colors">Home</a></li>
                <li><a href="/portfolio" className="text-primary/60 hover:text-primary transition-colors">Portfolio</a></li>
                <li><a href="/shop" className="text-primary/60 hover:text-primary transition-colors">Shop</a></li>
                <li><a href="/contact" className="text-primary/60 hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold text-primary mb-4">Services</h4>
              <ul className="space-y-2">
                <li><span className="text-primary/60">Cybersecurity</span></li>
                <li><span className="text-primary/60">Web Development</span></li>
                <li><span className="text-primary/60">Graphic Design</span></li>
                <li><span className="text-primary/60">Consulting</span></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-primary/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-primary/60 text-sm">
              © 2024 JCorp by lawithanx. All rights reserved.
            </p>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <span className="text-primary/60 text-sm">Bitcoin:</span>
              <code className="text-primary/80 text-xs font-mono bg-primary/10 px-2 py-1 rounded">
                bc1qghu4p0gktdccuph29vznclmg8krp3re6l5keht
              </code>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout 