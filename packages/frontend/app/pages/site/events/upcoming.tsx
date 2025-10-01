import React, { useRef } from 'react'
import { ArrowRight, Calendar, Clock, MapPin, Filter, Search } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import HeroCrumb from '~/components/HeroCrumb'
import EventCard from '~/components/EventCard'
import CoverImage1 from '~/assets/cover-image1.png'
import CoverImage2 from '~/assets/cover-image2.png'
import CoverImage3 from '~/assets/cover-image3.png'
import type { Route } from '../../+types'

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Upcoming Events - Family of Singers" },
    { name: "description", content: "Join us for our upcoming concerts, performances, and special events. Experience the magic of live music with Family of Singers choir in Rwanda." },
  ];
}

export default function UpcomingEvents() {
  // Refs for scroll animations
  const eventsRef = useRef(null)
  const newsletterRef = useRef(null)
  const statsRef = useRef(null)
  
  // Check if elements are in view
  const eventsInView = useInView(eventsRef, { once: true, margin: "-100px" })
  const newsletterInView = useInView(newsletterRef, { once: true, margin: "-100px" })
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" })

  // Dummy events data
  const upcomingEvents = [
    {
      id: 1,
      title: "Family of Singers Christmas Concert",
      description: "Join us for a magical evening of Christmas carols and holiday classics performed by our talented choir members. Experience the joy and warmth of the holiday season through beautiful music.",
      date: "15 Dec, 2024",
      time: "7:00 PM",
      location: "Kigali Convention Centre",
      image: CoverImage1,
      price: "Free"
    },
    {
      id: 2,
      title: "New Year Celebration Concert",
      description: "Ring in the new year with beautiful music and celebration. A night of hope, joy, and community spirit as we welcome 2025 together.",
      date: "31 Dec, 2024",
      time: "8:00 PM",
      location: "Kigali Arena",
      image: CoverImage2,
      price: "15,000 RWF"
    },
    {
      id: 3,
      title: "Spring Music Festival",
      description: "Celebrate the arrival of spring with our annual music festival featuring local and international artists. A celebration of renewal and new beginnings.",
      date: "20 Mar, 2025",
      time: "6:30 PM",
      location: "Kigali Cultural Centre",
      image: CoverImage3,
      price: "25,000 RWF"
    },
    {
      id: 4,
      title: "Easter Sunday Service",
      description: "Join us for a special Easter Sunday service with uplifting gospel music and hymns. Celebrate the resurrection with our choir's beautiful performances.",
      date: "20 Apr, 2025",
      time: "10:00 AM",
      location: "Presbyterian Church of Rwanda",
      image: CoverImage1,
      price: "Free"
    },
    {
      id: 5,
      title: "Mother's Day Tribute Concert",
      description: "A special tribute to all mothers with heartfelt songs and performances. Celebrate the love and sacrifice of mothers through music.",
      date: "11 May, 2025",
      time: "3:00 PM",
      location: "Kigali Conference Centre",
      image: CoverImage2,
      price: "10,000 RWF"
    },
    {
      id: 6,
      title: "Youth Choir Workshop",
      description: "An educational workshop for young singers to learn from our experienced choir members. Open to all youth interested in choral music.",
      date: "15 Jun, 2025",
      time: "9:00 AM",
      location: "Kigali Music Academy",
      image: CoverImage3,
      price: "5,000 RWF"
    },
    {
      id: 7,
      title: "Independence Day Celebration",
      description: "Celebrate Rwanda's independence with patriotic songs and cultural performances. A night of national pride and unity through music.",
      date: "1 Jul, 2025",
      time: "7:30 PM",
      location: "Amahoro Stadium",
      image: CoverImage1,
      price: "Free"
    },
    {
      id: 8,
      title: "Summer Music Retreat",
      description: "A weekend retreat focused on music, fellowship, and spiritual growth. Join us for workshops, performances, and community building.",
      date: "12-14 Aug, 2025",
      time: "All Day",
      location: "Lake Kivu Resort",
      image: CoverImage2,
      price: "50,000 RWF"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroCrumb 
        title="Our Upcoming"
        highlight="Events"
        description="Join us for our upcoming concerts, performances, and special events. Experience the magic of live music with Family of Singers."
      />

      {/* Events Grid */}
      <section className="py-20" ref={eventsRef}>
        <div className="container mx-auto px-4">
          {/* Events Count */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={eventsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <p className="text-gray-600">
              Showing <span className="font-semibold text-yellow-500">{upcomingEvents.length}</span> upcoming events
            </p>
          </motion.div>

          {/* Events Grid */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={eventsInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {upcomingEvents.map((event, index) => (
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

          {/* Load More Button */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={eventsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="text-center mt-16"
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 transition-colors duration-300 flex items-center gap-2 mx-auto"
            >
              Load More Events
              <ArrowRight className="w-5 h-5" />
            </motion.button>
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
              Stay Updated with <span className='text-theme-clr'>Our Events</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={newsletterInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-xl text-gray-300 mb-8"
            >
              Subscribe to our newsletter to get notified about upcoming concerts, 
              special performances, and choir news.
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
                50+
              </motion.div>
              <div className="text-gray-600">Events This Year</div>
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
                2,500+
              </motion.div>
              <div className="text-gray-600">Audience Members</div>
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
              <div className="text-gray-600">Venues Performed</div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
