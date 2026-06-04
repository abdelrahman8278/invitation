'use client'

import { motion, AnimatePresence } from 'framer-motion'

type FlipDigitProps = {
  value: number
  boxClassName?: string
  textClassName?: string
}

export default function FlipDigit({ value, boxClassName = 'bg-pink-900 border-pink-700/50 shadow-2xl', textClassName = 'text-white' }: FlipDigitProps) {
  return (
    <div className={`relative flex h-11 w-7 items-center justify-center overflow-hidden rounded-lg border sm:h-[4.5rem] sm:w-12 sm:rounded-xl ${boxClassName}`}>
      <div className="absolute top-1/2 z-20 h-px w-full -translate-y-1/2 bg-black/30" />
      
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/20 via-transparent to-black/20" />

      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={value}
          initial={{ y: 25, opacity: 0, rotateX: -90 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          exit={{ y: -25, opacity: 0, rotateX: 90 }}
          transition={{ 
            duration: 0.4, 
            ease: [0.4, 0, 0.2, 1],
            opacity: { duration: 0.2 }
          }}
          className={`font-playfair text-xl font-bold tabular-nums sm:text-4xl ${textClassName}`}
        >
          {value}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
