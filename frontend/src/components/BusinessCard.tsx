import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'

interface BusinessCardProps {
  className?: string
}

const BusinessCard: React.FC<BusinessCardProps> = ({ className = '' }) => {
  const [isFlipped, setIsFlipped] = useState(false)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const mouseX = e.clientX
    const mouseY = e.clientY

    const rotateXValue = (mouseY - centerY) / 10
    const rotateYValue = (centerX - mouseX) / 10

    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  const handleCardClick = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <div 
      className={`perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        ref={cardRef}
        className="relative w-96 h-60 cursor-pointer preserve-3d"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${isFlipped ? 'rotateY(180deg)' : ''}`,
        }}
        onClick={handleCardClick}
        transition={{ duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
      >
        {/* Front of the card */}
        <div className="absolute inset-0 w-full h-full backface-hidden">
          <div className="w-full h-full bg-gradient-to-br from-dark-900 to-dark-950 rounded-xl border-2 border-primary/30 p-6 flex flex-col justify-between relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 cyber-grid opacity-20"></div>
            
            {/* Glowing corners */}
            <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-primary"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-primary"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-primary"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-primary"></div>

            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <span className="text-primary font-tech text-xl font-bold">JC</span>
                </div>
                <div>
                  <h2 className="text-2xl font-tech font-bold text-primary text-glow">JCorp</h2>
                  <p className="text-primary/70 text-sm">by lawithanx</p>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-primary/60">▸</span>
                  <span className="text-primary">Cybersecurity Specialist</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary/60">▸</span>
                  <span className="text-primary">Full-stack Developer</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary/60">▸</span>
                  <span className="text-primary">Graphic Designer</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 text-xs space-y-1">
              <div className="text-primary/80">lawithanx@gmail.com</div>
              <div className="text-primary/60 font-mono">Click to flip →</div>
            </div>

            {/* Animated glow effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-pulse"></div>
          </div>
        </div>

        {/* Back of the card */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
          <div className="w-full h-full bg-gradient-to-br from-dark-950 to-dark-900 rounded-xl border-2 border-primary/30 p-6 flex flex-col justify-between relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 cyber-grid opacity-20 rotate-45"></div>
            
            {/* Content */}
            <div className="relative z-10">
              <div className="text-center mb-6">
                <h3 className="text-xl font-tech font-bold text-primary mb-2">Contact & Crypto</h3>
                <div className="w-16 h-0.5 bg-primary mx-auto"></div>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex flex-col gap-1">
                  <span className="text-primary/70 text-xs uppercase tracking-wider">Email</span>
                  <span className="text-primary font-mono">lawithanx@gmail.com</span>
                </div>
                
                <div className="flex flex-col gap-1">
                  <span className="text-primary/70 text-xs uppercase tracking-wider">Bitcoin</span>
                  <span className="text-primary font-mono text-xs break-all">
                    bc1qghu4p0gktdccuph29vznclmg8krp3re6l5keht
                  </span>
                </div>
                
                <div className="flex flex-col gap-1">
                  <span className="text-primary/70 text-xs uppercase tracking-wider">Portfolio</span>
                  <span className="text-primary">github.com/lawithanx/jaguarcorp</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 text-center">
              <div className="text-primary/60 font-mono text-xs">← Click to flip back</div>
            </div>

            {/* Animated scanning line */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse"></div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default BusinessCard 