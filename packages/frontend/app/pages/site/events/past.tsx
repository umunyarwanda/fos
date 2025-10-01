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
    { title: "Past Events - Family of Singers" },
    { name: "description", content: "Relive the beautiful moments from our previous concerts and performances. Experience the memories we've created together through music with Family of Singers." },
  ];
}

export default function PastEvents() {
  // Refs for scroll animations
  const eventsRef = useRef(null)
  const newsletterRef = useRef(null)
  const statsRef = useRef(null)
  
  // Check if elements are in view
  const eventsInView = useInView(eventsRef, { once: true, margin: "-100px" })
  const newsletterInView = useInView(newsletterRef, { once: true, margin: "-100px" })
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" })

  // Dummy past events data
  const pastEvents = [
    {
      id: 1,
      title: "Thanksgiving Concert 2024",
      description: "A beautiful evening of gratitude and music as we celebrated Thanksgiving with our community. Featuring traditional hymns and contemporary gospel songs.",
      date: "24 Nov, 2024",
      time: "7:00 PM",
      location: "Kigali Convention Centre",
      image: CoverImage1,
      price: "Free"
    },
    {
      id: 2,
      title: "Halloween Gospel Night",
      description: "A unique blend of gospel music and community celebration. We brought light and joy to the Halloween season with uplifting performances.",
      date: "31 Oct, 2024",
      time: "6:30 PM",
      location: "Kigali Cultural Centre",
      image: CoverImage2,
      price: "10,000 RWF"
    },
    {
      id: 3,
      title: "Harvest Festival Performance",
      description: "Celebrating the abundance of the harvest season with traditional Rwandan songs and contemporary gospel music. A night of cultural pride and spiritual joy.",
      date: "15 Oct, 2024",
      time: "5:00 PM",
      location: "Amahoro Stadium",
      image: CoverImage3,
      price: "Free"
    },
    {
      id: 4,
      title: "Back to School Concert",
      description: "Inspiring students and families as they prepared for the new academic year. A concert filled with hope, motivation, and beautiful music.",
      date: "8 Sep, 2024",
      time: "3:00 PM",
      location: "Kigali Conference Centre",
      image: CoverImage1,
      price: "5,000 RWF"
    },
    {
      id: 5,
      title: "Summer Music Festival 2024",
      description: "Our annual summer celebration featuring local artists and our choir. A day filled with music, food, and community fellowship.",
      date: "20 Aug, 2024",
      time: "2:00 PM",
      location: "Lake Kivu Resort",
      image: CoverImage2,
      price: "20,000 RWF"
    },
    {
      id: 6,
      title: "Father's Day Tribute",
      description: "Honoring all fathers with heartfelt songs and performances. A special tribute to the important role of fathers in our families and community.",
      date: "16 Jun, 2024",
      time: "4:00 PM",
      location: "Presbyterian Church of Rwanda",
      image: CoverImage3,
      price: "Free"
    },
    {
      id: 7,
      title: "Memorial Day Service",
      description: "A solemn and beautiful service honoring those who have passed. Our choir provided comfort and hope through music during this meaningful occasion.",
      date: "7 Apr, 2024",
      time: "10:00 AM",
      location: "Kigali Memorial Centre",
      image: CoverImage1,
      price: "Free"
    },
    {
      id: 8,
      title: "Valentine's Day Love Concert",
      description: "Celebrating love in all its forms with romantic ballads and uplifting gospel songs. A perfect evening for couples and families to enjoy together.",
      date: "14 Feb, 2024",
      time: "7:30 PM",
      location: "Kigali Arena",
      image: CoverImage2,
      price: "15,000 RWF"
    },
    {
      id: 9,
      title: "New Year's Eve Celebration 2024",
      description: "Welcoming 2024 with joy and celebration. Our choir performed alongside other local artists to ring in the new year with hope and music.",
      date: "31 Dec, 2023",
      time: "9:00 PM",
      location: "Kigali Convention Centre",
      image: CoverImage3,
      price: "25,000 RWF"
    },
    {
      id: 10,
      title: "Christmas Concert 2023",
      description: "A magical Christmas celebration with traditional carols and holiday favorites. Families gathered to celebrate the birth of Christ through beautiful music.",
      date: "23 Dec, 2023",
      time: "6:00 PM",
      location: "Kigali Cultural Centre",
      image: CoverImage1,
      price: "Free"
    },
    {
      id: 11,
      title: "Advent Season Opening",
      description: "Beginning the Advent season with anticipation and joy. Our choir led the community in preparing hearts for the Christmas celebration.",
      date: "3 Dec, 2023",
      time: "5:00 PM",
      location: "Presbyterian Church of Rwanda",
      image: CoverImage2,
      price: "Free"
    },
    {
      id: 12,
      title: "Thanksgiving Service 2023",
      description: "Giving thanks for the blessings of the year with a special service featuring our choir's most beloved hymns and contemporary worship songs.",
      date: "26 Nov, 2023",
      time: "11:00 AM",
      location: "Kigali Conference Centre",
      image: CoverImage3,
      price: "Free"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroCrumb 
        title="Our Past"
        highlight="Events"
        description="Relive the beautiful moments from our previous concerts and performances. Experience the memories we've created together through music."
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
              Showing <span className="font-semibold text-yellow-500">{pastEvents.length}</span> past events
            </p>
          </motion.div>

          {/* Events Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {pastEvents.map((event, index) => {
              const eventRef = useRef(null)
              const eventInView = useInView(eventRef, { once: true, margin: "-50px" })
              
              return (
                <motion.div
                  key={event.id}
                  ref={eventRef}
                  initial={{ opacity: 0, y: 50 }}
                  animate={eventInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
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
              )
            })}
          </div>

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
                150+
              </motion.div>
              <div className="text-gray-600">Past Performances</div>
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
                10,000+
              </motion.div>
              <div className="text-gray-600">Audience Reached</div>
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
                8+
              </motion.div>
              <div className="text-gray-600">Years of Service</div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
