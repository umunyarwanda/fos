import React, { useRef } from 'react'
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Youtube, Send, ArrowRight } from 'lucide-react'
import LogoLight from '~/assets/logo-light.png'
import { motion, useInView } from 'framer-motion'
import CoverImage1 from '~/assets/cover-image1.png'
import { Link } from 'react-router'

function Footer() {
  const supportRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  const supportInView = useInView(supportRef)
  const contactInView = useInView(contactRef)
  return (
    <>
      {/* Support Us CTA Section */}
      <section className="pt-20 pb-5 bg-black" ref={supportRef}>
        <div className="container mx-auto px-4 text-center">
          {/* Main Title */}
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={supportInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold text-white mb-6 font-primary"
          >
            Support <span className="text-theme-clr">Us</span>
          </motion.h2>
          
          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={supportInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-white/80 max-w-2xl mx-auto mb-12 font-tertiary leading-relaxed"
          >
            Help us continue creating beautiful music and supporting our community. Your support makes a difference in keeping our choir alive and thriving.
          </motion.p>

          {/* CTA Button */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={supportInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              >
              <Link 
                to="/support-us"
                className="bg-theme-clr cursor-pointer hover:bg-yellow-600 text-black py-4 px-8 transition-all duration-300 flex items-center gap-2 group shadow-lg hover:shadow-xl"
              >
                Make a Donation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              >
              <a 
                href='https://www.youtube.com/@familyofsingers' 
                target='_blank'
                className="bg-transparent border-2 cursor-pointer border-theme-clr text-theme-clr hover:bg-theme-clr hover:text-black py-4 px-8 transition-all duration-300 flex items-center gap-2 group"
              >
                Visit Our Channel
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="relative pt-24 pb-48 bg-black overflow-hidden" ref={contactRef}>
        {/* Background Image with Blur */}

        <div 
          className='absolute inset-0 bg-cover bg-center bg-no-repeat bg-black'
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${CoverImage1})`,
            backgroundAttachment: 'fixed',
          }}
        >

        </div>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black" />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left Side - Text Content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={contactInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex-1"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-primary">
                Don't Hesitate To <span className='text-theme-clr'>Contact Us!</span>
              </h2>
              <p className="text-lg text-white/80 mb-4 font-tertiary">
                Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante.
              </p>
              <p className="text-lg text-white/80 font-tertiary">
                Etiam sit amet orci eget eros faucibus.
              </p>
            </motion.div>
            
            {/* Right Side - Contact Button */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={contactInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex-shrink-0"
            >
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                >
                <Link 
                  to="/contact-us"
                  className="bg-theme-clr hover:bg-yellow-600 cursor-pointer py-4 px-8 transition-all duration-300 flex items-center gap-2 group shadow-lg hover:shadow-xl"
                >
                  Contact Us
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      <footer className="bg-gray-900 text-white">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src={LogoLight} 
                  alt="Father Of Singers Logo" 
                  className="size-24 w-auto"
                />
                <div>
                  <h3 className="text-2xl font-bold text-white">Family Of Singers</h3>
                  <p className="text-sm text-white/80">Choir</p>
                </div>
              </div>
              <p className="text-white/70 mb-6 leading-relaxed">
                We are a passionate choir dedicated to creating beautiful music that brings people together. 
                Our mission is to share the joy of singing and create meaningful connections through the power of music.
              </p>
              <div className="flex space-x-4">
                <Facebook className="w-5 h-5 text-theme-clr hover:text-yellow-300 cursor-pointer transition-colors" />
                <Twitter className="w-5 h-5 text-theme-clr hover:text-yellow-300 cursor-pointer transition-colors" />
                <Instagram className="w-5 h-5 text-theme-clr hover:text-yellow-300 cursor-pointer transition-colors" />
                <Youtube className="w-5 h-5 text-theme-clr hover:text-yellow-300 cursor-pointer transition-colors" />
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold text-white mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li><Link to="/about" className="text-white/70 hover:text-theme-clr transition-colors">About Us</Link></li>
                <li><Link to="/events" className="text-white/70 hover:text-theme-clr transition-colors">Events</Link></li>
                <li><Link to="/special-programs" className="text-white/70 hover:text-theme-clr transition-colors">Special Programs</Link></li>
                <li><Link to="/our-schedule" className="text-white/70 hover:text-theme-clr transition-colors">Our Schedule</Link></li>
                <li><Link to="/commissions" className="text-white/70 hover:text-theme-clr transition-colors">Book Services</Link></li>
                <li><Link to="/contact-us" className="text-white/70 hover:text-theme-clr transition-colors">Contact Us</Link></li>
              </ul>
            </div>

            {/* Useful Links */}
            <div>
              <h4 className="text-lg font-bold text-white mb-6">Useful Links</h4>
              <ul className="space-y-3">
                <li><Link to="/support-us" className="text-white/70 hover:text-theme-clr transition-colors">Support Us</Link></li>
                <li><Link to="/contact-us" className="text-white/70 hover:text-theme-clr transition-colors">Get In Touch</Link></li>
                <li><Link to="/events" className="text-white/70 hover:text-theme-clr transition-colors">Past Events</Link></li>
                <li><Link to="/commissions" className="text-white/70 hover:text-theme-clr transition-colors">Bookings</Link></li>
                <li><Link to="/about" className="text-white/70 hover:text-theme-clr transition-colors">Our Story</Link></li>
                <li><Link to="/" className="text-white/70 hover:text-theme-clr transition-colors">Home</Link></li>
              </ul>
            </div>

            {/* Get In Touch */}
            <div>
              <h4 className="text-lg font-bold text-white mb-6">Get In Touch</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-theme-clr" />
                  <span className="text-white/70">Kigali, Rwanda</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-theme-clr" />
                  <span className="text-white/70">(+250) 788 123 456</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-theme-clr" />
                  <span className="text-white/70">familyofsingers@domain.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-theme-clr" />
                  <span className="text-white/70">07.00 AM - 19.00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-white/10" id='subscribe-section'>
          <div className="container mx-auto px-4 py-12">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white mb-4">Subscribe Our Newsletter</h3>
              <p className="text-white/70 mb-8 max-w-2xl mx-auto">
                Stay updated with our latest performances, events, and news. Join our community and never miss a beat.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter Your Email" 
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-theme-clr"
                />
                <button className="bg-theme-clr hover:bg-yellow-600 text-black px-6 py-3 transition-colors duration-300 flex items-center gap-2">
                  Subscribe
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-white/10">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/60">
              <p>Family of Singers Choir Website by kLab</p>
              <p>Copyright © 2024. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer