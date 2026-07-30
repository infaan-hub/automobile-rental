import { motion } from 'framer-motion'
import BookingCard from './BookingCard'
import CarPreviewCard from './CarPreviewCard'

export default function Hero() {
  return (
    <section className="relative pt-36 pb-20 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        <div className="max-w-[700px] mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
            className="text-[clamp(2.6rem,7vw,5rem)] font-bold leading-[0.94] tracking-[-0.04em]"
          >
            Drive the
            <br />
            <span className="font-script text-[clamp(3rem,9vw,6.2rem)] leading-[1.1] tracking-normal">
              Experience
            </span>
            <br />
            You Deserve.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.25 }}
            className="mt-6 text-muted text-[clamp(0.9rem,1.4vw,1.05rem)] leading-relaxed max-w-lg mx-auto"
          >
            Choose from a fleet of well-maintained, high-performance vehicles. Easy booking, no hidden fees.
          </motion.p>
        </div>

        <div className="mt-10">
          <BookingCard />
        </div>
      </div>

      <div className="relative mt-16 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.45 }}
          className="relative w-full max-w-[65%]"
        >
          <motion.img
            src="/hero-car.svg"
            alt="Toyota Land Cruiser LC300 Black"
            className="w-full object-contain drop-shadow-2xl"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
        <CarPreviewCard />
      </div>
    </section>
  )
}
