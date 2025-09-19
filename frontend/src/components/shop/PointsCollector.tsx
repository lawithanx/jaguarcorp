import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Coins, Sparkles, Gift } from 'lucide-react'

interface PointsCollectorProps {
  points: number
}

const PointsCollector: React.FC<PointsCollectorProps> = ({ points }) => {
  const [previousPoints, setPreviousPoints] = useState(points)
  const [showAnimation, setShowAnimation] = useState(false)
  const [pointsGained, setPointsGained] = useState(0)

  useEffect(() => {
    if (points > previousPoints) {
      const gained = points - previousPoints
      setPointsGained(gained)
      setShowAnimation(true)
      
      setTimeout(() => {
        setShowAnimation(false)
        setPreviousPoints(points)
      }, 2000)
    }
  }, [points, previousPoints])

  const getPointsLevel = (points: number) => {
    if (points >= 1000) return { level: 'Diamond', color: 'text-blue-400', icon: '💎' }
    if (points >= 500) return { level: 'Gold', color: 'text-yellow-400', icon: '🥇' }
    if (points >= 200) return { level: 'Silver', color: 'text-gray-400', icon: '🥈' }
    return { level: 'Bronze', color: 'text-orange-400', icon: '🥉' }
  }

  const level = getPointsLevel(points)

  return (
    <>
      {/* Points Display */}
      <motion.div
        className="fixed top-20 right-6 bg-dark-900/90 backdrop-blur-sm border border-primary/30 rounded-xl p-4 z-40"
        whileHover={{ scale: 1.05 }}
      >
        <div className="flex items-center gap-3">
          <div className="bg-primary/20 p-2 rounded-lg">
            <Coins className="text-primary" size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-primary font-bold">{points}</span>
              <span className="text-primary/60 text-sm">Points</span>
            </div>
            <div className={`text-xs ${level.color} flex items-center gap-1`}>
              <span>{level.icon}</span>
              {level.level} Member
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-3">
          <div className="w-full bg-dark-800 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-primary to-primary/60 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((points % 200) / 200 * 100, 100)}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
          <div className="text-xs text-primary/60 mt-1 text-center">
            {200 - (points % 200)} points to next level
          </div>
        </div>
      </motion.div>

      {/* Points Animation */}
      <AnimatePresence>
        {showAnimation && (
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 0 }}
            animate={{ opacity: 1, scale: 1, y: -50 }}
            exit={{ opacity: 0, scale: 0, y: -100 }}
            className="fixed top-32 right-20 z-50 bg-primary text-dark px-4 py-2 rounded-full font-bold flex items-center gap-2"
          >
            <Sparkles size={16} />
            +{pointsGained} Points!
            
            {/* Particle Effects */}
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-primary rounded-full"
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 1,
                  scale: 1
                }}
                animate={{
                  x: (Math.random() - 0.5) * 100,
                  y: (Math.random() - 0.5) * 100,
                  opacity: 0,
                  scale: 0
                }}
                transition={{
                  duration: 1,
                  delay: i * 0.1
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Milestone Celebrations */}
      <AnimatePresence>
        {points > 0 && points % 100 === 0 && showAnimation && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <div className="bg-dark-900/95 backdrop-blur-sm border border-primary/30 rounded-xl p-8 text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="text-6xl mb-4"
              >
                🎉
              </motion.div>
              <h3 className="text-2xl font-bold text-primary mb-2">Milestone Reached!</h3>
              <p className="text-primary/70">{points} Points Collected</p>
              <div className="mt-4 flex justify-center">
                <div className="bg-primary/20 text-primary px-4 py-2 rounded-lg flex items-center gap-2">
                  <Gift size={16} />
                  Special Reward Unlocked!
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default PointsCollector 