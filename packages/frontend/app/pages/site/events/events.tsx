import React, { useRef, useState } from 'react'
import { ArrowRight, Calendar, Clock, MapPin, Filter, Search } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import HeroCrumb from '~/components/HeroCrumb'
import EventCard, { EventStatus } from '~/components/EventCard'
import CoverImage1 from '~/assets/cover-image1.png'
import CoverImage2 from '~/assets/cover-image2.png'
import CoverImage3 from '~/assets/cover-image3.png'
import type { Route } from '../../+types'

// Event Card Wrapper Component to handle hooks properly
function EventCardWrapper({ event, index }: { event: any, index: number }) {
  const eventRef = useRef(null)
  const eventInView = useInView(eventRef, { once: true, margin: "-50px" })
  
  return (
    <motion.div
      ref={eventRef}
      initial={{ opacity: 0, y: 50 }}
      animate={eventInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      whileHover={{ y: -10 }}
      className="h-full"
    >
      <div className="relative h-full">
        <EventCard
          id={event.id}
          title={event.title}
          description={event.description}
          date={event.date}
          time={event.time}
          location={event.location}
          image={event.image}
          price={event.price}
          status={event.status}
        />
        {/* Event Type Badge */}
        {/* <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${
          event.type === 'upcoming' 
            ? 'bg-green-500 text-white' 
            : 'bg-gray-500 text-white'
        }`}>
          {event.type === 'upcoming' ? 'Upcoming' : 'Past'}
        </div> */}
      </div>
    </motion.div>
  )
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "All Events - Family of Singers" },
    { name: "description", content: "Discover all our concerts, performances, and special events. From upcoming shows to past performances, experience the complete journey of Family of Singers choir in Rwanda." },
  ];
}

export default function AllEvents() {
  // Refs for scroll animations
  const eventsRef = useRef(null)
  const newsletterRef = useRef(null)
  const statsRef = useRef(null)
  
  // Check if elements are in view
  const eventsInView = useInView(eventsRef, { once: true, margin: "-100px" })
  const newsletterInView = useInView(newsletterRef, { once: true, margin: "-100px" })
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" })

  // State for filtering
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Dummy upcoming events data
  const upcomingEvents = [
    {
      id: 1,
      title: "Family of Singers Christmas Concert",
      description: "Join us for a magical evening of Christmas carols and holiday classics performed by our talented choir members. Experience the joy and warmth of the holiday season through beautiful music.",
      date: "15 Dec, 2024",
      time: "7:00 PM",
      location: "Kigali Convention Centre",
      image: CoverImage1,
      price: "Free",
      type: "upcoming",
      status: EventStatus.Upcoming
    },
    {
      id: 2,
      title: "New Year Celebration Concert",
      description: "Ring in the new year with beautiful music and celebration. A night of hope, joy, and community spirit as we welcome 2025 together.",
      date: "31 Dec, 2024",
      time: "8:00 PM",
      location: "Kigali Arena",
      image: CoverImage2,
      price: "15,000 RWF",
      type: "upcoming",
      status: EventStatus.Upcoming
    },
    {
      id: 3,
      title: "Spring Music Festival",
      description: "Celebrate the arrival of spring with our annual music festival featuring local and international artists. A celebration of renewal and new beginnings.",
      date: "20 Mar, 2025",
      time: "6:30 PM",
      location: "Kigali Cultural Centre",
      image: CoverImage3,
      price: "25,000 RWF",
      status: EventStatus.Upcoming
    },
    {
      id: 4,
      title: "Easter Sunday Service",
      description: "Join us for a special Easter Sunday service with uplifting gospel music and hymns. Celebrate the resurrection with our choir's beautiful performances.",
      date: "20 Apr, 2025",
      time: "10:00 AM",
      location: "Presbyterian Church of Rwanda",
      image: CoverImage1,
      price: "Free",
      status: EventStatus.Upcoming
    },
    {
      id: 5,
      title: "Mother's Day Tribute Concert",
      description: "A special tribute to all mothers with heartfelt songs and performances. Celebrate the love and sacrifice of mothers through music.",
      date: "11 May, 2025",
      time: "3:00 PM",
      location: "Kigali Conference Centre",
      image: CoverImage2,
      price: "10,000 RWF",
      status: EventStatus.Upcoming
    },
    {
      id: 6,
      title: "Youth Choir Workshop",
      description: "An educational workshop for young singers to learn from our experienced choir members. Open to all youth interested in choral music.",
      date: "15 Jun, 2025",
      time: "9:00 AM",
      location: "Kigali Music Academy",
      image: CoverImage3,
      price: "5,000 RWF",
      status: EventStatus.Upcoming
    },
    {
      id: 7,
      title: "Independence Day Celebration",
      description: "Celebrate Rwanda's independence with patriotic songs and cultural performances. A night of national pride and unity through music.",
      date: "1 Jul, 2025",
      time: "7:30 PM",
      location: "Amahoro Stadium",
      image: CoverImage1,
      price: "Free",
      status: EventStatus.Upcoming
    },
    {
      id: 8,
      title: "Summer Music Retreat",
      description: "A weekend retreat focused on music, fellowship, and spiritual growth. Join us for workshops, performances, and community building.",
      date: "12-14 Aug, 2025",
      time: "All Day",
      location: "Lake Kivu Resort",
      image: CoverImage2,
      price: "50,000 RWF",
      status: EventStatus.Upcoming
    }
  ]

  // Dummy past events data
  const pastEvents = [
    {
      id: 9,
      title: "Thanksgiving Concert 2024",
      description: "A beautiful evening of gratitude and music as we celebrated Thanksgiving with our community. Featuring traditional hymns and contemporary gospel songs.",
      date: "24 Nov, 2024",
      time: "7:00 PM",
      location: "Kigali Convention Centre",
      image: CoverImage1,
      price: "Free",
      status: EventStatus.Past
    },
    {
      id: 10,
      title: "Halloween Gospel Night",
      description: "A unique blend of gospel music and community celebration. We brought light and joy to the Halloween season with uplifting performances.",
      date: "31 Oct, 2024",
      time: "6:30 PM",
      location: "Kigali Cultural Centre",
      image: CoverImage2,
      price: "10,000 RWF",
      status: EventStatus.Past
    },
    {
      id: 11,
      title: "Harvest Festival Performance",
      description: "Celebrating the abundance of the harvest season with traditional Rwandan songs and contemporary gospel music. A night of cultural pride and spiritual joy.",
      date: "15 Oct, 2024",
      time: "5:00 PM",
      location: "Amahoro Stadium",
      image: CoverImage3,
      price: "Free",
      status: EventStatus.Past
    },
    {
      id: 12,
      title: "Back to School Concert",
      description: "Inspiring students and families as they prepared for the new academic year. A concert filled with hope, motivation, and beautiful music.",
      date: "8 Sep, 2024",
      time: "3:00 PM",
      location: "Kigali Conference Centre",
      image: CoverImage1,
      price: "5,000 RWF",
      status: EventStatus.Past
    },
    {
      id: 13,
      title: "Summer Music Festival 2024",
      description: "Our annual summer celebration featuring local artists and our choir. A day filled with music, food, and community fellowship.",
      date: "20 Aug, 2024",
      time: "2:00 PM",
      location: "Lake Kivu Resort",
      image: CoverImage2,
      price: "20,000 RWF",
      status: EventStatus.Past
    },
    {
      id: 14,
      title: "Father's Day Tribute",
      description: "Honoring all fathers with heartfelt songs and performances. A special tribute to the important role of fathers in our families and community.",
      date: "16 Jun, 2024",
      time: "4:00 PM",
      location: "Presbyterian Church of Rwanda",
      image: CoverImage3,
      price: "Free",
      status: EventStatus.Past
    },
    {
      id: 15,
      title: "Memorial Day Service",
      description: "A solemn and beautiful service honoring those who have passed. Our choir provided comfort and hope through music during this meaningful occasion.",
      date: "7 Apr, 2024",
      time: "10:00 AM",
      location: "Kigali Memorial Centre",
      image: CoverImage1,
      price: "Free",
      status: EventStatus.Past
    },
    {
      id: 16,
      title: "Valentine's Day Love Concert",
      description: "Celebrating love in all its forms with romantic ballads and uplifting gospel songs. A perfect evening for couples and families to enjoy together.",
      date: "14 Feb, 2024",
      time: "7:30 PM",
      location: "Kigali Arena",
      image: CoverImage2,
      price: "15,000 RWF",
      status: EventStatus.Past
    },
    {
      id: 17,
      title: "New Year's Eve Celebration 2024",
      description: "Welcoming 2024 with joy and celebration. Our choir performed alongside other local artists to ring in the new year with hope and music.",
      date: "31 Dec, 2023",
      time: "9:00 PM",
      location: "Kigali Convention Centre",
      image: CoverImage3,
      price: "25,000 RWF",
      status: EventStatus.Past
    },
    {
      id: 18,
      title: "Christmas Concert 2023",
      description: "A magical Christmas celebration with traditional carols and holiday favorites. Families gathered to celebrate the birth of Christ through beautiful music.",
      date: "23 Dec, 2023",
      time: "6:00 PM",
      location: "Kigali Cultural Centre",
      image: CoverImage1,
      price: "Free",
      status: EventStatus.Past
    },
    {
      id: 19,
      title: "Advent Season Opening",
      description: "Beginning the Advent season with anticipation and joy. Our choir led the community in preparing hearts for the Christmas celebration.",
      date: "3 Dec, 2023",
      time: "5:00 PM",
      location: "Presbyterian Church of Rwanda",
      image: CoverImage2,
      price: "Free",
      status: EventStatus.Past
    },
    {
      id: 20,
      title: "Thanksgiving Service 2023",
      description: "Giving thanks for the blessings of the year with a special service featuring our choir's most beloved hymns and contemporary worship songs.",
      date: "26 Nov, 2023",
      time: "11:00 AM",
      location: "Kigali Conference Centre",
      image: CoverImage3,
      price: "Free",
      status: EventStatus.Past
    }
  ]

  // Combine all events
  const allEvents = [...upcomingEvents, ...pastEvents]

  // Filter events based on active filter and search term
  const filteredEvents = allEvents.filter(event => {
    const matchesFilter = activeFilter === 'all' || event.status === activeFilter
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const filterButtons = [
    { key: 'all', label: 'All Events', count: allEvents.length },
    { key: 'upcoming', label: 'Upcoming', count: upcomingEvents.length },
    { key: 'past', label: 'Past Events', count: pastEvents.length }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroCrumb 
        title="All Our"
        highlight="Events"
        description="Discover all our concerts, performances, and special events. From upcoming shows to past performances, experience the complete journey of Family of Singers."
      />

      {/* Filter and Search Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={eventsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-6xl mx-auto"
          >
            {/* Search Bar */}
            <div className="relative mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search events by title, description, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              {filterButtons.map((filter) => (
                <motion.button
                  key={filter.key}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveFilter(filter.key)}
                  className={`px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-2 ${
                    activeFilter === filter.key
                      ? 'bg-yellow-500 text-black font-semibold'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {filter.label}
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    activeFilter === filter.key
                      ? 'bg-black text-yellow-500'
                      : 'bg-gray-400 text-white'
                  }`}>
                    {filter.count}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="pt-10 pb-10" ref={eventsRef}>
        <div className="container mx-auto px-4">
          {/* Events Count */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={eventsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <p className="text-gray-600">
              Showing <span className="font-semibold text-yellow-500">{filteredEvents.length}</span> {activeFilter === 'all' ? 'events' : activeFilter === 'upcoming' ? 'upcoming events' : 'past events'}
              {searchTerm && (
                <span className="text-gray-500"> for "{searchTerm}"</span>
              )}
            </p>
          </motion.div>

          {/* Events Grid */}
          {activeFilter === 'all' ? (
            <div className="space-y-16">
              {/* Upcoming Events Section */}
              {filteredEvents.filter(event => event.status === EventStatus.Upcoming).length > 0 && (
                <div>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={eventsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex items-center mb-8"
                  >
                    <h2 className="text-xl font-bold text-gray-900 mr-4">UPCOMING</h2>
                    <h2 className="text-xl font-bold text-yellow-500">EVENTS</h2>
                    <div className="flex-1 h-px bg-gray-300 ml-6"></div>
                  </motion.div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 items-stretch">
                    {filteredEvents
                      .filter(event => event.status === EventStatus.Upcoming)
                      .map((event, index) => (
                        <EventCardWrapper key={event.id} event={event} index={index} />
                      ))}
                  </div>
                </div>
              )}

              {/* Past Events Section */}
              {filteredEvents.filter(event => event.status === EventStatus.Past).length > 0 && (
                <div>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={eventsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex items-center mb-8"
                  >
                    <h2 className="text-xl font-bold text-gray-900 mr-4">PAST</h2>
                    <h2 className="text-xl font-bold text-yellow-500">EVENTS</h2>
                    <div className="flex-1 h-px bg-gray-300 ml-6"></div>
                  </motion.div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 items-stretch">
                    {filteredEvents
                      .filter(event => event.status === EventStatus.Past)
                      .map((event, index) => (
                        <EventCardWrapper key={event.id} event={event} index={index} />
                      ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 items-stretch">
              {filteredEvents.map((event, index) => (
                <EventCardWrapper key={event.id} event={event} index={index} />
              ))}
            </div>
          )}

          {/* No Results Message */}
          {filteredEvents.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={eventsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center py-16"
            >
              <div className="text-gray-500 text-lg">
                No events found matching your criteria.
              </div>
              <button
                onClick={() => {
                  setActiveFilter('all')
                  setSearchTerm('')
                }}
                className="mt-4 text-yellow-500 hover:text-yellow-600 font-semibold"
              >
                Clear filters
              </button>
            </motion.div>
          )}

          {/* Load More Button */}
          {filteredEvents.length > 0 && (
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
          )}
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
            className="grid md:grid-cols-4 gap-8 text-center"
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
                {allEvents.length}
              </motion.div>
              <div className="text-gray-600">Total Events</div>
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
                {upcomingEvents.length}
              </motion.div>
              <div className="text-gray-600">Upcoming Events</div>
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
                10,000+
              </motion.div>
              <div className="text-gray-600">Audience Reached</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={statsInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.8, delay: 1.2, type: "spring", stiffness: 200 }}
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
