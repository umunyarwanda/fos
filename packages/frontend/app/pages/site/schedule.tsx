import React, { useState, useRef } from 'react'
import { Calendar, Clock, MapPin, Users, Music, ChevronLeft, ChevronRight, Filter, Download } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import HeroCrumb from '~/components/HeroCrumb'
import CoverImage1 from '~/assets/cover-image1.png'
import CoverImage2 from '~/assets/cover-image2.png'
import CoverImage3 from '~/assets/cover-image3.png'
import type { Route } from '../+types'

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Our Schedule - Family of Singers" },
    { name: "description", content: "View our choir schedule including rehearsals, performances, and special events. Stay updated with Family of Singers activities and join our musical community." },
  ];
}

export default function Schedule() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedFilter, setSelectedFilter] = useState('all')

  // Refs for scroll animations
  const scheduleRef = useRef(null)
  const guidelinesRef = useRef(null)
  const contactRef = useRef(null)
  
  // Check if elements are in view
  const scheduleInView = useInView(scheduleRef, { once: true, margin: "-100px" })
  const guidelinesInView = useInView(guidelinesRef, { once: true, margin: "-100px" })
  const contactInView = useInView(contactRef, { once: true, margin: "-100px" })

  // Sample schedule data
  const scheduleData = [
    {
      id: 1,
      title: "Weekly Rehearsal",
      type: "rehearsal",
      date: "2024-12-15",
      time: "6:00 PM - 8:00 PM",
      location: "Presbyterian Church of Rwanda",
      description: "Regular weekly rehearsal for all choir members",
      attendees: "All Members",
      status: "confirmed"
    },
    {
      id: 2,
      title: "Christmas Concert",
      type: "performance",
      date: "2024-12-20",
      time: "7:00 PM - 9:00 PM",
      location: "Kigali Convention Centre",
      description: "Annual Christmas concert featuring holiday classics",
      attendees: "All Members",
      status: "confirmed"
    },
    {
      id: 3,
      title: "Youth Section Practice",
      type: "rehearsal",
      date: "2024-12-17",
      time: "4:00 PM - 6:00 PM",
      location: "Presbyterian Church of Rwanda",
      description: "Special practice session for youth members",
      attendees: "Youth Members",
      status: "confirmed"
    },
    {
      id: 4,
      title: "New Year Celebration",
      type: "performance",
      date: "2024-12-31",
      time: "8:00 PM - 12:00 AM",
      location: "Kigali Arena",
      description: "New Year's Eve celebration concert",
      attendees: "All Members",
      status: "confirmed"
    },
    {
      id: 5,
      title: "Sectional Rehearsal - Sopranos",
      type: "rehearsal",
      date: "2024-12-18",
      time: "5:00 PM - 6:30 PM",
      location: "Presbyterian Church of Rwanda",
      description: "Soprano section practice",
      attendees: "Soprano Section",
      status: "confirmed"
    },
    {
      id: 6,
      title: "Community Outreach",
      type: "outreach",
      date: "2024-12-22",
      time: "2:00 PM - 4:00 PM",
      location: "Kigali Orphanage",
      description: "Performance at local orphanage",
      attendees: "Volunteers",
      status: "confirmed"
    },
    {
      id: 7,
      title: "Sectional Rehearsal - Altos",
      type: "rehearsal",
      date: "2024-12-19",
      time: "5:00 PM - 6:30 PM",
      location: "Presbyterian Church of Rwanda",
      description: "Alto section practice",
      attendees: "Alto Section",
      status: "confirmed"
    },
    {
      id: 8,
      title: "Recording Session",
      type: "recording",
      date: "2024-12-23",
      time: "10:00 AM - 4:00 PM",
      location: "Kigali Recording Studio",
      description: "Recording new album tracks",
      attendees: "Selected Members",
      status: "confirmed"
    }
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'rehearsal': return 'bg-blue-100 text-blue-800'
      case 'performance': return 'bg-green-100 text-green-800'
      case 'outreach': return 'bg-purple-100 text-purple-800'
      case 'recording': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'rehearsal': return <Users className="w-4 h-4" />
      case 'performance': return <Music className="w-4 h-4" />
      case 'outreach': return <Users className="w-4 h-4" />
      case 'recording': return <Music className="w-4 h-4" />
      default: return <Calendar className="w-4 h-4" />
    }
  }

  const filteredSchedule = selectedFilter === 'all' 
    ? scheduleData 
    : scheduleData.filter(item => item.type === selectedFilter)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const getMonthName = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentMonth)
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setCurrentMonth(newDate)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroCrumb 
        title="Our"
        highlight="Schedule"
        description="Stay updated with our rehearsal schedules, performances, and upcoming events. Plan your participation in our choir activities."
      />

      {/* Schedule Overview */}
      <section className="py-20" ref={scheduleRef}>
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={scheduleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              View our upcoming rehearsals, performances, and special events. 
              All choir members are encouraged to attend regular rehearsals.
            </p>
          </motion.div>

          {/* Calendar Navigation */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={scheduleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white rounded-lg shadow-lg p-6 mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigateMonth('prev')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>
              
              <h3 className="text-[20px] font-semibold text-gray-900">
                {getMonthName(currentMonth)}
              </h3>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigateMonth('next')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Filter Options */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={scheduleInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-4 mb-6"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedFilter('all')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedFilter === 'all' 
                    ? 'bg-yellow-500 text-black' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All Events
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedFilter('rehearsal')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedFilter === 'rehearsal' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Rehearsals
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedFilter('performance')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedFilter === 'performance' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Performances
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedFilter('outreach')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedFilter === 'outreach' 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Outreach
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedFilter('recording')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedFilter === 'recording' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Recording
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Schedule List */}
          <div className="space-y-4">
            {filteredSchedule.map((item, index) => {
              const itemRef = useRef(null)
              const itemInView = useInView(itemRef, { once: true, margin: "-50px" })
              
              return (
                <motion.div 
                  key={item.id}
                  ref={itemRef}
                  initial={{ opacity: 0, y: 50 }}
                  animate={itemInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  whileHover={{ y: -5, scale: 1.01 }}
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`inline-flex items-center gap-1 px-3 capitalize py-1 rounded-full text-sm font-medium ${getTypeColor(item.type)}`}>
                        {getTypeIcon(item.type)}
                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                      </span>
                      <span className="text-sm text-gray-500 capitalize">{item.status}</span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-3 text-[16px]">{item.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-yellow-500" />
                        <span className="text-gray-700">{formatDate(item.date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-yellow-500" />
                        <span className="text-gray-700">{item.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-yellow-500" />
                        <span className="text-gray-700">{item.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:text-right">
                    <div className="text-sm text-gray-500 mb-1">Attendees</div>
                    <div className="text-gray-900 font-medium">{item.attendees}</div>
                  </div>
                </div>
                </motion.div>
              )
            })}
          </div>

          {/* Download Schedule Button */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={scheduleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="text-center mt-12"
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 transition-colors duration-300 flex items-center gap-2 mx-auto"
            >
              <Download className="w-5 h-5" />
              Download Schedule
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Rehearsal Guidelines */}
      <section className="py-20 bg-white" ref={guidelinesRef}>
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={guidelinesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={guidelinesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-3xl font-semibold text-gray-900 mb-4"
            >
              Rehearsal <span className="text-yellow-500">Guidelines</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={guidelinesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Important information for all choir members to ensure productive and enjoyable rehearsals.
            </motion.p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={guidelinesInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={guidelinesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="text-center p-6 bg-gray-50 rounded-lg"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={guidelinesInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.8, delay: 1.2, type: "spring", stiffness: 200 }}
                className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Clock className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Punctuality</h3>
              <p className="text-gray-600">
                Please arrive 10 minutes before rehearsal time. Late arrivals disrupt the flow of practice.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={guidelinesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="text-center p-6 bg-gray-50 rounded-lg"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={guidelinesInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.8, delay: 1.4, type: "spring", stiffness: 200 }}
                className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Music className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Preparation</h3>
              <p className="text-gray-600">
                Bring your music sheets and practice the assigned pieces before each rehearsal.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={guidelinesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="text-center p-6 bg-gray-50 rounded-lg"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={guidelinesInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.8, delay: 1.6, type: "spring", stiffness: 200 }}
                className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Users className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Attendance</h3>
              <p className="text-gray-600">
                Regular attendance is expected. Please notify in advance if you cannot attend.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact for Schedule Changes */}
      <section className="pt-20 pb-0 bg-black text-white" ref={contactRef}>
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-3xl font-bold mb-4"
            >
              Need to Make <span className="text-yellow-500">Changes?</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg text-gray-300 mb-8"
            >
              If you need to request schedule changes or have questions about upcoming events, 
              please contact our choir coordinator.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="tel:+250788123456"
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3  transition-colors duration-300 inline-flex items-center gap-2"
              >
                <Clock className="w-5 h-5" />
                Call Coordinator
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:schedule@familyofsingers.rw"
                className="bg-transparent border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black px-6 py-3  transition-colors duration-300 inline-flex items-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Email Schedule Team
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

