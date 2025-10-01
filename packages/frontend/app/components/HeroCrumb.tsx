import React from 'react'
import { motion } from 'framer-motion'
import CoverImage1 from '~/assets/cover-image1.png'

interface HeroCrumbProps {
  title: string
  highlight: string
  description?: string
}

function HeroCrumb({ title, highlight, description }: HeroCrumbProps) {
  return (
    <section 
      className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 pt-52 pb-32"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.4)), url(${CoverImage1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center text-white">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-5xl font-bold mb-6 font-primary"
          >
            {title} {highlight && <span className='text-theme-clr'>{highlight}</span>}
          </motion.h1>
          {
            description && (
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="md:text-lg text-gray-300 max-w-3xl mx-auto"
              >
                {description}
              </motion.p>
            )
          }
        </div>
      </div>
    </section>
  )
}

export default HeroCrumb