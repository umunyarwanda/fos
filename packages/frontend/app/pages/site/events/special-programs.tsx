import React, { useRef } from 'react'
import { ArrowRight, Calendar, Clock, MapPin, Filter, Search, Star, Users, Award } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import HeroCrumb from '~/components/HeroCrumb'
import EventCard from '~/components/EventCard'
import CoverImage1 from '~/assets/cover-image1.png'
import CoverImage2 from '~/assets/cover-image2.png'
import CoverImage3 from '~/assets/cover-image3.png'
import type { Route } from '../../+types'

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Special Programs - Family of Singers" },
    { name: "description", content: "Discover our exclusive programs, workshops, and special initiatives designed to enhance your musical journey and community involvement with Family of Singers." },
  ];
}

export default function SpecialPrograms() {
  // Refs for scroll animations
  const programsRef = useRef(null)
  const categoriesRef = useRef(null)
  const newsletterRef = useRef(null)
  const statsRef = useRef(null)
  
  // Check if elements are in view
  const programsInView = useInView(programsRef, { once: true, margin: "-100px" })
  const categoriesInView = useInView(categoriesRef, { once: true, margin: "-100px" })
  const newsletterInView = useInView(newsletterRef, { once: true, margin: "-100px" })
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" })

  // Dummy special programs data
  const specialPrograms = [
    {
      id: 1,
      title: "Annual Choir Retreat",
      description: "Join us for our exclusive annual retreat focused on spiritual growth, team building, and musical excellence. A weekend of fellowship, worship, and professional development.",
      date: "15-17 Mar, 2025",
      time: "All Day",
      location: "Lake Kivu Resort",
      image: CoverImage1,
      price: "75,000 RWF"
    },
    {
      id: 2,
      title: "Masterclass with Conductor",
      description: "An exclusive masterclass led by renowned international conductor Dr. Sarah Johnson. Learn advanced choral techniques and performance skills in this intensive workshop.",
      date: "22 Feb, 2025",
      time: "9:00 AM",
      location: "Kigali Music Academy",
      image: CoverImage2,
      price: "50,000 RWF"
    },
    {
      id: 3,
      title: "Youth Choir Development Program",
      description: "A comprehensive program designed to nurture young talent and develop the next generation of choral musicians. Open to ages 12-25 with varying skill levels.",
      date: "Saturdays",
      time: "2:00 PM",
      location: "Presbyterian Church of Rwanda",
      image: CoverImage3,
      price: "30,000 RWF"
    },
    {
      id: 4,
      title: "Gospel Music Workshop Series",
      description: "A 6-week intensive workshop series covering gospel music history, vocal techniques, and performance skills. Perfect for aspiring gospel singers and choir members.",
      date: "5 Jan ",
      time: "3:00 PM",
      location: "Kigali Cultural Centre",
      image: CoverImage1,
      price: "40,000 RWF"
    },
    {
      id: 5,
      title: "Recording Studio Experience",
      description: "Experience professional recording in our state-of-the-art studio. Record your favorite gospel songs and take home a professional-quality CD of your performance.",
      date: "28 Dec, 2024",
      time: "10:00 AM",
      location: "Kigali Recording Studio",
      image: CoverImage2,
      price: "60,000 RWF"
    },
    {
      id: 6,
      title: "Community Outreach Program",
      description: "Join us in bringing music and hope to underserved communities. This program includes performances at orphanages, hospitals, and community centers.",
      date: "14 Dec, 2024",
      time: "8:00 AM",
      location: "Various Locations",
      image: CoverImage3,
      price: "Free"
    },
    {
      id: 7,
      title: "Choir Leadership Training",
      description: "Develop leadership skills for choir directors and section leaders. Learn about conducting, vocal coaching, and choir management in this intensive program.",
      date: "7 Dec, 2024",
      time: "9:00 AM",
      location: "Kigali Conference Centre",
      image: CoverImage1,
      price: "35,000 RWF"
    },
    {
      id: 8,
      title: "International Choir Exchange",
      description: "An exciting opportunity to collaborate with choirs from other countries. This program includes cultural exchange, joint performances, and international networking.",
      date: "25 Nov - 2 Dec, 2024",
      time: "All Day",
      location: "Kigali & International",
      image: CoverImage2,
      price: "100,000 RWF"
    },
    {
      id: 9,
      title: "Music Therapy Workshop",
      description: "Learn how music can heal and bring comfort to those in need. This workshop covers the therapeutic aspects of music and its application in community service.",
      date: "18 Nov, 2024",
      time: "10:00 AM",
      location: "Kigali Health Centre",
      image: CoverImage3,
      price: "25,000 RWF"
    },
    {
      id: 10,
      title: "Choir Competition Preparation",
      description: "Intensive preparation for upcoming choir competitions. Work with professional coaches to perfect your performance and competitive edge.",
      date: "11 Nov, 2024",
      time: "9:00 AM",
      location: "Kigali Music Academy",
      image: CoverImage1,
      price: "45,000 RWF"
    },
    {
      id: 11,
      title: "Digital Music Production Course",
      description: "Learn modern music production techniques, digital recording, and audio editing. Perfect for choir members interested in technology and music production.",
      date: "4 Nov",
      time: "Saturdays 10:00 AM",
      location: "Kigali Tech Hub",
      image: CoverImage2,
      price: "55,000 RWF"
    },
    {
      id: 12,
      title: "Choir Alumni Reunion",
      description: "A special gathering for former choir members to reconnect, share memories, and perform together once again. Open to all past members and their families.",
      date: "28 Oct, 2024",
      time: "2:00 PM",
      location: "Kigali Convention Centre",
      image: CoverImage3,
      price: "20,000 RWF"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroCrumb 
        title="Special"
        highlight="Programs"
        description="Discover our exclusive programs, workshops, and special initiatives designed to enhance your musical journey and community involvement."
      />

      {/* Programs Grid */}
      <section className="py-20" ref={programsRef}>
        <div className="container mx-auto px-4">
          {/* Programs Count */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={programsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <p className="text-gray-600">
              Showing <span className="font-semibold text-yellow-500">{specialPrograms.length}</span> special programs
            </p>
          </motion.div>

          {/* Programs Grid */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={programsInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {specialPrograms.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 50 }}
                animate={programsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: 0.6 + (index * 0.1) }}
                whileHover={{ y: -10 }}
              >
                <EventCard
                  id={program.id}
                  title={program.title}
                  description={program.description}
                  date={program.date}
                  time={program.time}
                  location={program.location}
                  image={program.image}
                  price={program.price}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Load More Button */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={programsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="text-center mt-16"
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 transition-colors duration-300 flex items-center gap-2 mx-auto"
            >
              Load More Programs
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Program Categories */}
      <section className="py-20 bg-white" ref={categoriesRef}>
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={categoriesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={categoriesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              Program <span className="text-yellow-500">Categories</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={categoriesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Our special programs are designed to cater to different aspects of musical development and community engagement.
            </motion.p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={categoriesInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {/* Educational Programs */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={categoriesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="text-center p-8 bg-gray-50 rounded-lg"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={categoriesInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.8, delay: 1.2, type: "spring", stiffness: 200 }}
                className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Users className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Educational Programs</h3>
              <p className="text-gray-600">
                Workshops, masterclasses, and training programs designed to enhance musical skills and knowledge.
              </p>
            </motion.div>

            {/* Community Outreach */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={categoriesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="text-center p-8 bg-gray-50 rounded-lg"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={categoriesInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.8, delay: 1.4, type: "spring", stiffness: 200 }}
                className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Award className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Community Outreach</h3>
              <p className="text-gray-600">
                Programs that bring music and hope to underserved communities and special populations.
              </p>
            </motion.div>

            {/* Professional Development */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={categoriesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="text-center p-8 bg-gray-50 rounded-lg"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={categoriesInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.8, delay: 1.6, type: "spring", stiffness: 200 }}
                className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Star className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Professional Development</h3>
              <p className="text-gray-600">
                Advanced training for choir leaders, conductors, and aspiring music professionals.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gray-900 text-white" ref={newsletterRef}>
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={newsletterInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={newsletterInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-3xl md:text-4xl font-bold font-primary mb-4"
            >
              Stay Updated with <span className='text-theme-clr'>Our Programs</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={newsletterInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-xl text-gray-300 mb-8"
            >
              Subscribe to our newsletter to get notified about new programs, workshops, 
              and special opportunities.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={newsletterInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col md:flex-row gap-4 max-w-md mx-auto justify-center"
            >
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#subscribe-section" 
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 transition-colors duration-300 inline-block"
              >
                Subscribe
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-20 bg-white" ref={statsRef}>
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={statsInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-8 text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={statsInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.8, delay: 0.6, type: "spring", stiffness: 200 }}
                className="text-4xl font-bold text-yellow-500 mb-2"
              >
                25+
              </motion.div>
              <div className="text-gray-600">Special Programs</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={statsInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.8, delay: 0.8, type: "spring", stiffness: 200 }}
                className="text-4xl font-bold text-yellow-500 mb-2"
              >
                500+
              </motion.div>
              <div className="text-gray-600">Participants Trained</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={statsInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.8, delay: 1.0, type: "spring", stiffness: 200 }}
                className="text-4xl font-bold text-yellow-500 mb-2"
              >
                15+
              </motion.div>
              <div className="text-gray-600">International Collaborations</div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
