import React, { useState, useEffect } from 'react'
import { ArrowRight, Play, Users, Music, Award, Calendar, CheckCircle, Trophy, ThumbsUp, ExternalLink } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router'
import CoverImage1 from '~/assets/cover-image1.png'
import CoverImage2 from '~/assets/cover-image2.png'
import CoverImage3 from '~/assets/cover-image3.png'
import EventCard from '~/components/EventCard'
import Footer from '~/components/Footer'
import type { Route } from './+types'
import Thumbnail1 from '~/assets/thumbs/thumb1.png'
import Thumbnail2 from '~/assets/thumbs/thumb2.png'
import Thumbnail3 from '~/assets/thumbs/thumb3.png'
import Thumbnail4 from '~/assets/thumbs/thumb4.png'


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Family of Singers" },
    { name: "description", content: "Family of Singers is a choir that sings gospel music." },
  ];
}

function Index() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const images = [CoverImage1, CoverImage2, CoverImage3]
  
  // Refs for scroll animations
  const heroRef = useRef(null)
  const aboutRef = useRef(null)
  const eventsRef = useRef(null)
  const videosRef = useRef(null)
  const supportRef = useRef(null)
  const contactRef = useRef(null)
  
  // Check if elements are in view
  const heroInView = useInView(heroRef, { once: true, margin: "-100px" })
  const aboutInView = useInView(aboutRef, { once: true, margin: "-100px" })
  const eventsInView = useInView(eventsRef, { once: true, margin: "-100px" })
  const videosInView = useInView(videosRef, { once: true, margin: "-100px" })
  const supportInView = useInView(supportRef, { once: true, margin: "-100px" })
  const contactInView = useInView(contactRef, { once: true, margin: "-100px" })

  // Sample events data
  const events = [
    {
      id: 2,
      title: "New Year Celebration Concert",
      description: "Ring in the new year with beautiful music and celebration. A night of hope, joy, and community spirit.Ring in the new year with beautiful music and celebration. A night of hope, joy, and community spirit.Ring in the new year with beautiful music and celebration. A night of hope, joy, and community spirit.",
      date: "31 Dec, 2024",
      time: "8:00 PM",
      location: "Kigali Arena",
      image: CoverImage1,
      price: "15,000 RWF"
    },
    {
      id: 3,
      title: "Spring Music Festival",
      description: "Celebrate the arrival of spring with our annual music festival featuring local and international artists.Celebrate the arrival of spring with our annual music festival featuring local and international artists.Celebrate the arrival of spring with our annual music festival featuring local and international artists.",
      date: "20 Mar, 2025",
      time: "6:30 PM",
      location: "Kigali Cultural Centre",
      image: CoverImage2,
      price: "25,000 RWF"
    },
    {
      id: 1,
      title: "Family of Singers Christmas Concert",
      description: "Join us for a magical evening of Christmas carols and holiday classics performed by our talented choir members.Join us for a magical evening of Christmas carols and holiday classics performed by our talented choir members.Join us for a magical evening of Christmas carols and holiday classics performed by our talented choir members.",
      date: "15 Dec, 2024",
      time: "7:00 PM",
      location: "Kigali Convention Centre",
      image: CoverImage1,
      price: "Free"
    },
    {
      id: 4,
      title: "Family of Singers Christmas Concert",
      description: "Join us for a magical evening of Christmas carols and holiday classics performed by our talented choir members.Join us for a magical evening of Christmas carols and holiday classics performed by our talented choir members.Join us for a magical evening of Christmas carols and holiday classics performed by our talented choir members.",
      date: "15 Dec, 2024",
      time: "7:00 PM",
      location: "Kigali Convention Centre",
      image: CoverImage1,
      price: "Free"
    },
  ]

  // Sample video data
  const videos = [
    {
      id: 1,
      title: "AKIRA ISHIMWE BY FAMILY OF SINGERS CHOIR",
      date: "2 Weeks ago",
      youtubeUrl: "https://www.youtube.com/watch?v=s_mc02cBYm8",
      thumbnail: Thumbnail1
    },
    {
      id: 2,
      title: "IMANA YANYU [NTIGARAGARA] By Family of Singers Choir [Official Live recoding 2025]",
      date: "2 Months ago",
      youtubeUrl: "https://www.youtube.com/watch?v=c5YncXlGAiY",
      thumbnail: Thumbnail2
    },
    {
      id: 3,
      title: "IKIDENDEZI By Family of Singers Choir. Live Concert 2025",
      date: "4 Months ago",
      youtubeUrl: "https://www.youtube.com/watch?v=ymRAZmynOcY",
      thumbnail: Thumbnail3
    },
    {
      id: 4,
      title: "ABIZERA By Family Of Singers Choir",
      date: "6 Months ago",
      youtubeUrl: "https://www.youtube.com/watch?v=A1QMnmDhSDo",
      thumbnail: Thumbnail4
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-end pb-32 justify-center overflow-hidden">
        {/* Background Images with Fade Animation */}
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.3)), url(${image})`,
              transform: index === currentImageIndex ? 'scale(1.1)' : 'scale(1)',
              transition: 'opacity 1000ms ease-in-out, transform 5000ms ease-out',
            }}
          />
        ))}
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black " />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center" ref={heroRef}>
          <div className="max-w-4x  mx-auto">
            {/* Main Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-6xl font-bold font-primary text-white mb-6 leading-tight"
            >
              The Story of{' '}
              <span className="text-theme-clr">Family of Singers</span>
              , The Choir
            </motion.h1>
            
            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-white/90 mb-12 font-tertiary w-[75%] mx-auto leading-relaxed"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              {/* Contact Us Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to="/contact-us"
                  className="bg-theme-clr hover:bg-yellow-600 cursor-pointer text-black px-8 py-4 transition-all duration-300 flex items-center gap-2 group shadow-lg hover:shadow-xl"
                >
                  Contact Us
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              
              {/* Watch Video Button */}
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('https://www.youtube.com/@familyofsingerschoir7817/videos', '_blank')}
                className="flex items-center gap-3 text-white hover:text-theme-clr transition-colors duration-300 group cursor-pointer"
              >
                <div className="w-16 h-16 border-2 border-white group-hover:border-theme-clr rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                  <Play className="w-6 h-6 ml-1 text-white group-hover:text-theme-clr transition-colors duration-300" />
                </div>
                <span className="text-lg font-medium">Watch Video</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-black relative" ref={aboutRef}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={aboutInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute top-0 left-1/2 -translate-x-1/2 text-8xl font-bold font-primary text-transparent select-none opacity-80" 
          style={{ WebkitTextStroke: '3px rgba(230, 161, 31, 0.3)' }}
        >
          About Us
        </motion.div>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Image */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="order-2 lg:order-1"
            >
              <div className="relative">
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  src={CoverImage2} 
                  alt="Family of Singers Choir" 
                  className="w-[80%] mx-auto h-[700px] object-cover rounded-lg shadow-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
              </div>
            </motion.div>

            {/* Right Side - Content */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="order-1 lg:order-2"
            >
              <div className="relative p-8 rounded-lg">
                {/* Background Watermark */}
                
                <div className="relative z-10">
                  {/* Main Heading */}
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="text-3xl md:text-4xl font-bold text-white mb-2 font-primary"
                  >
                    Know about us
                  </motion.h2>
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                    className="text-4xl md:text-5xl font-bold text-white mb-6 font-primary"
                  >
                    A <span className='text-theme-clr'>Choir</span> Since <span className='text-theme-clr'>2025</span>
                  </motion.h2>
                  
                  {/* Description */}
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    className="text-white/80 mb-8 leading-relaxed font-tertiary"
                  >
                    We are a passionate choir dedicated to creating beautiful music that brings people together. 
                    Our mission is to share the joy of singing and create meaningful connections through the power of music.
                  </motion.p>

                  {/* Feature Blocks with Timeline */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={aboutInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.6, delay: 1.4 }}
                    className="relative mb-8"
                  >
                    {/* Vertical Line */}
                    <motion.div 
                      initial={{ scaleY: 0 }}
                      animate={aboutInView ? { scaleY: 1 } : { scaleY: 0 }}
                      transition={{ duration: 1, delay: 1.6 }}
                      className="absolute left-6 top-0 bottom-0 w-0.5 bg-theme-clr origin-top"
                    ></motion.div>
                    
                    {/* Feature 1 */}
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={aboutInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.6, delay: 1.8 }}
                      className="relative flex items-start gap-4 mb-6"
                    >
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-12 h-12 bg-gray-800 border-2 border-theme-clr/40 rounded flex items-center justify-center flex-shrink-0"
                      >
                        <CheckCircle className="size-8 text-theme-clr" />
                      </motion.div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2 font-primary">Certified</h3>
                        <p className="text-white/70 leading-relaxed font-tertiary">
                          Our choir is professionally certified and recognized for excellence in musical performance and community engagement.
                        </p>
                      </div>
                    </motion.div>

                    {/* Feature 2 */}
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={aboutInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.6, delay: 2.0 }}
                      className="relative flex items-start gap-4 mb-6"
                    >
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-12 h-12 bg-gray-800 border-2 border-theme-clr/40 rounded flex items-center justify-center flex-shrink-0"
                      >
                        <Trophy className="size-8 text-theme-clr" />
                      </motion.div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2 font-primary">Best Award</h3>
                        <p className="text-white/70 leading-relaxed font-tertiary">
                          We have received numerous awards and recognition for our outstanding performances and contributions to the music community.
                        </p>
                      </div>
                    </motion.div>

                    {/* Feature 3 */}
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={aboutInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.6, delay: 2.2 }}
                      className="relative flex items-start gap-4"
                    >
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-12 h-12 bg-gray-800 border-2 border-theme-clr/40 rounded flex items-center justify-center flex-shrink-0"
                      >
                        <ThumbsUp className="size-8 text-theme-clr" />
                      </motion.div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2 font-primary">Experienced</h3>
                        <p className="text-white/70 leading-relaxed font-tertiary">
                          With years of experience, our choir brings together talented singers to create memorable musical experiences.
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* About Us Button */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 2.4 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}                    
                  >
                    <Link 
                      to="/about"
                      className="bg-theme-clr w-fit hover:bg-yellow-600 text-black cursor-pointer px-6 py-3 transition-all duration-300 flex items-center gap-2 group"
                    >
                      About Us
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-20 bg-gray-50" ref={eventsRef}>
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={eventsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-primary">
              Upcoming <span className="text-theme-clr">Events</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-tertiary">
              Join us for our upcoming concerts and musical performances. Experience the magic of live music with Family of Singers.
            </p>
          </motion.div>

          {/* Events Grid */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={eventsInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 50 }}
                animate={eventsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: 0.6 + (index * 0.1) }}
                whileHover={{ y: -10 }}
              >
                <EventCard
                  id={event.id}
                  title={event.title}
                  description={event.description}
                  date={event.date}
                  time={event.time}
                  location={event.location}
                  image={event.image}
                  price={event.price}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* View All Events Button */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={eventsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="text-center mt-12"
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              
            >
              <Link
                to="/events"
                className="bg-transparent cursor-pointer border-2 border-theme-clr text-theme-clr hover:bg-theme-clr hover:text-black py-3 px-8 transition-all duration-300 flex items-center gap-2 group mx-auto"
              >
                View All Events
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Featured Performances Section */}
      <section className="py-20 bg-white" ref={videosRef}>
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={videosInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-primary">
              Music Videos On <span className="text-theme-clr">Youtube</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-tertiary">
              Watch our latest performances and musical highlights. Experience the beauty of our choir through these featured videos.
            </p>
          </motion.div>

          {/* Videos Grid */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={videosInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {videos.map((video, index) => (
              <motion.a
                key={video.id}
                initial={{ opacity: 0, y: 50 }}
                animate={videosInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: 0.6 + (index * 0.1) }}
                whileHover={{ y: -10, scale: 1.02 }}
                href={video.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-white overflow-hidden transition-all duration-300 transform"
              >
                {/* Video Thumbnail */}
                <div className="relative aspect-video overflow-hidden rounded-lg mb-3">
                  <motion.img 
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Play Button Overlay */}
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <div className="w-16 h-16 bg-theme-clr rounded-full flex items-center justify-center shadow-lg">
                      <Play className="w-6 h-6 text-black ml-1" />
                    </div>
                  </motion.div>
                </div>

                {/* Video Info */}
                <div className="">
                  {/* Video Title */}
                  <h3 className="text-[15px] font-semibold text-gray-900 font-secondary line-clamp-2 group-hover:text-theme-clr transition-colors">
                    {video.title}
                  </h3>
                  
                  {/* Video Date */}
                  <p className="text-gray-500 font-tertiary">
                    {video.date}
                  </p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* View All Videos Button */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={videosInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="text-center mt-12"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://www.youtube.com/@familyofsingerschoir7817/videos"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-theme-clr hover:bg-yellow-600 text-black py-3 px-8 transition-all duration-300 group"
            >
              View All Videos
              <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      
    </div>
  )
}

export default Index