import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Shield, Award, Zap } from 'lucide-react'

interface BusinessCardProps {
  className?: string
}

const BusinessCard: React.FC<BusinessCardProps> = ({ className = '' }) => {
  const [isFlipped, setIsFlipped] = useState(false)

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

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'contact@jaguarcorp.com', link: 'mailto:contact@jaguarcorp.com' },
    { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567', link: 'tel:+15551234567' },
    { icon: MapPin, label: 'Location', value: 'Global Operations', link: null },
    { icon: Globe, label: 'Website', value: 'jaguarcorp.com', link: 'https://jaguarcorp.com' }
  ]

  const specializations = [
    { icon: Shield, title: 'Cybersecurity', description: 'Enterprise-grade security solutions' },
    { icon: Award, title: 'Government', description: 'Classified & sensitive operations' },
    { icon: Zap, title: 'Innovation', description: 'Cutting-edge technology solutions' }
  ]

  const certifications = [
    'Top Secret Clearance',
    'CISSP Certified',
    'AWS Solutions Architect',
    'HIPAA Compliance Expert'
  ]

  return (
    <div className={`perspective-1000 ${className}`}>
      <motion.div
        className="relative w-96 h-64 cursor-pointer preserve-3d"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        onClick={() => setIsFlipped(!isFlipped)}
        whileHover={{ scale: 1.02, rotateX: 2 }}
      >
        {/* Front Side */}
        <motion.div
          className="absolute inset-0 backface-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="w-full h-full bg-gradient-to-br from-dark to-dark-900 rounded-xl border border-primary/30 shadow-2xl p-8 flex flex-col justify-between relative overflow-hidden">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="grid-pattern"></div>
            </div>

            {/* Header */}
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <JaguarLogo size={40} />
                  <div>
                    <h1 className="text-2xl font-bold text-primary tracking-tight">
                      JAGUAR CORP
                    </h1>
                    <p className="text-sm text-primary/60 font-mono -mt-1">
                      ELITE TECH SOLUTIONS
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-primary/50 font-mono">EST. 2019</div>
                  <div className="text-xs text-primary/50 font-mono">SECURITY CLEARED</div>
                </div>
              </div>

              <div className="space-y-1 mb-6">
                <h2 className="text-xl font-semibold text-primary">Strategic Technology</h2>
                <h3 className="text-lg text-primary/80">Consulting & Development</h3>
                <p className="text-sm text-primary/60">
                  Cybersecurity • Government Solutions • Enterprise Development
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="relative z-10">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-sm text-primary/70">
                    <Mail size={14} />
                    <span>contact@jaguarcorp.com</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-primary/70">
                    <Globe size={14} />
                    <span>jaguarcorp.com</span>
                  </div>
                </div>
                <div className="text-right text-xs text-primary/50">
                  <div>Click to flip</div>
                  <div className="mt-1 text-primary/30">●●●</div>
                </div>
              </div>
            </div>

            {/* Subtle Corner Accent */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-primary/5 to-transparent rounded-tr-full"></div>
          </div>
        </motion.div>

        {/* Back Side */}
        <motion.div
          className="absolute inset-0 backface-hidden"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="w-full h-full bg-gradient-to-bl from-dark to-dark-900 rounded-xl border border-primary/30 shadow-2xl p-6 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 opacity-5">
              <div className="grid-pattern"></div>
            </div>

            <div className="relative z-10 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <JaguarLogo size={24} />
                <span className="text-xs text-primary/50 font-mono">CAPABILITIES</span>
              </div>

              {/* Specializations */}
              <div className="space-y-3 mb-4">
                {specializations.map((spec) => (
                  <div key={spec.title} className="flex items-start space-x-3">
                    <div className="bg-primary/10 p-1.5 rounded-md mt-0.5">
                      <spec.icon size={14} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-primary">{spec.title}</div>
                      <div className="text-xs text-primary/60">{spec.description}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Certifications */}
              <div className="flex-1">
                <h3 className="text-sm font-medium text-primary mb-3">Key Certifications</h3>
                <div className="grid grid-cols-2 gap-2">
                  {certifications.map((cert) => (
                    <div key={cert} className="text-xs bg-primary/5 text-primary/70 px-2 py-1 rounded border border-primary/10">
                      {cert}
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Grid */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-primary/10">
                {contactInfo.slice(0, 4).map((contact) => (
                  <div key={contact.label} className="flex items-center space-x-2">
                    <contact.icon size={12} className="text-primary/60" />
                    <div className="text-xs text-primary/70 truncate">{contact.value}</div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex justify-center space-x-4 mt-3 pt-3 border-t border-primary/10">
                <Linkedin size={16} className="text-primary/60 hover:text-primary cursor-pointer transition-colors" />
                <Github size={16} className="text-primary/60 hover:text-primary cursor-pointer transition-colors" />
                <Globe size={16} className="text-primary/60 hover:text-primary cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default BusinessCard 