import { motion } from 'framer-motion'
import BackgroundShapes from './BackgroundShapes'
import Navbar from './Navbar'

export default function AuthLayout({ children, imageSide = 'left' }) {
  return (
    <main className="min-h-screen bg-bg relative overflow-hidden">
      <BackgroundShapes />
      <Navbar />
      <div className="min-h-screen flex items-center justify-center px-4 pt-28 pb-16">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-10 items-center">
          {imageSide === 'left' && (
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="hidden lg:flex items-center justify-center"
            >
              <img
                src="/hero-car.svg"
                alt="Luxury sports car"
                className="w-full max-w-lg object-contain drop-shadow-2xl"
              />
            </motion.div>
          )}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
            className="flex justify-center"
          >
            {children}
          </motion.div>
          {imageSide === 'right' && (
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="hidden lg:flex items-center justify-center"
            >
              <img
                src="/hero-car.svg"
                alt="Luxury sports car"
                className="w-full max-w-lg object-contain drop-shadow-2xl"
              />
            </motion.div>
          )}
        </div>
      </div>
    </main>
  )
}
