import React, { useRef, useState } from 'react'
import { Calendar, Clock, MapPin, Users, Share2, Heart, ArrowLeft, ExternalLink, Play, Music, Award, Star } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import { Link, useParams } from 'react-router'
import HeroCrumb from '~/components/HeroCrumb'
import CoverImage1 from '~/assets/cover-image1.png'
import CoverImage2 from '~/assets/cover-image2.png'
import CoverImage3 from '~/assets/cover-image3.png'
import type { Route } from '../+types'

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Event Details - Family of Singers" },
    { name: "description", content: "Join us for an unforgettable musical experience with Family of Singers. Discover event details, location, and booking information." },
  ];
}

export default function EventDetail() {
  const { id } = useParams()
  
  // Refs for scroll animations
  const eventInfoRef = useRef(null)
  const detailsRef = useRef(null)
  const performersRef = useRef(null)
  const galleryRef = useRef(null)
  const bookingRef = useRef(null)
  
  // Check if elements are in view
  const eventInfoInView = useInView(eventInfoRef, { once: true, margin: "-100px" })
  const detailsInView = useInView(detailsRef, { once: true, margin: "-100px" })
  const performersInView = useInView(performersRef, { once: true, margin: "-100px" })
  const galleryInView = useInView(galleryRef, { once: true, margin: "-100px" })
  const bookingInView = useInView(bookingRef, { once: true, margin: "-100px" })

  // State for interactions
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  // Sample event data - in real app, this would come from API based on id
  const event = {
    id: parseInt(id || '1'),
    title: "Family of Singers Christmas Concert",
    subtitle: "A Magical Evening of Christmas Carols",
    description: "Join us for a magical evening of Christmas carols and holiday classics performed by our talented choir members. This special concert will feature traditional hymns, contemporary Christmas songs, and beloved carols that will fill your heart with the joy of the season. Experience the warmth and beauty of Christmas through music that brings families and communities together.",
    longDescription: "Our Christmas Concert is one of our most anticipated events of the year, bringing together the entire Family of Singers community for an evening of musical celebration. This year's concert will feature a carefully curated selection of Christmas music that spans generations, from timeless classics to modern arrangements that showcase the versatility and talent of our choir members. The evening will include special guest performances, audience participation segments, and a heartwarming finale that captures the true spirit of Christmas. Whether you're a long-time supporter or experiencing our music for the first time, this concert promises to be an unforgettable celebration of faith, family, and the joy of the holiday season.",
    date: "15 Dec, 2024",
    time: "7:00 PM",
    duration: "2 hours",
    location: "Kigali Convention Centre",
    address: "KG 2 Roundabout, Kigali, Rwanda",
    price: "Free",
    capacity: "500",
    category: "Christmas Concert",
    status: "Upcoming",
    image: CoverImage1,
    gallery: [CoverImage1, CoverImage2, CoverImage3, CoverImage1],
    featured: true,
    tags: ["Christmas", "Gospel", "Family", "Community"]
  }

  const performers = [
    {
      name: "Dr. Jean Baptiste",
      role: "Conductor",
      image: CoverImage2,
      bio: "Artistic Director with 15+ years of experience"
    },
    {
      name: "Sarah Mukamana",
      role: "Soloist",
      image: CoverImage3,
      bio: "Lead soprano and featured soloist"
    },
    {
      name: "Peter Nkurunziza",
      role: "Pianist",
      image: CoverImage1,
      bio: "Accompanist and musical arranger"
    }
  ]

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href
      })
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href)
      alert('Event link copied to clipboard!')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroCrumb 
        title="Event"
        highlight="Details"
        description="Join us for an unforgettable musical experience"
      />

      {/* Event Info Section */}
      <section className="py-20" ref={eventInfoRef}>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Event Info */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={eventInfoInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-2"
            >
              {/* Back Button */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={eventInfoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-8"
              >
                <Link 
                  to="/events"
                  className="inline-flex items-center gap-2 text-theme-clr hover:text-yellow-600 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back to Events
                </Link>
              </motion.div>

              {/* Event Title */}
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={eventInfoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-primary"
              >
                {event.title}
              </motion.h1>

              {/* Event Subtitle */}
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={eventInfoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-xl text-theme-clr mb-6 font-secondary"
              >
                {event.subtitle}
              </motion.p>

              {/* Event Description */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={eventInfoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="space-y-4 text-gray-600 leading-relaxed mb-8"
              >
                <p>{event.description}</p>
                <p>{event.longDescription}</p>
              </motion.div>

              {/* Event Tags */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={eventInfoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="flex flex-wrap gap-2 mb-8"
              >
                {event.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="bg-theme-clr/10 text-theme-clr px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>

              {/* Action Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={eventInfoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="flex flex-wrap gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
                    isLiked 
                      ? 'bg-red-500 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-red-100 hover:text-red-600'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                  {isLiked ? 'Liked' : 'Like'}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBookmark}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
                    isBookmarked 
                      ? 'bg-theme-clr text-black' 
                      : 'bg-gray-100 text-gray-700 hover:bg-yellow-100'
                  }`}
                >
                  <Star className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
                  {isBookmarked ? 'Saved' : 'Save'}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShare}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                  Share
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Event Details Card */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={eventInfoInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Event Details</h3>
                
                {/* Event Image */}
                <div className="mb-6">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>

                {/* Event Info */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-theme-clr" />
                    <div>
                      <p className="font-semibold text-gray-900">{event.date}</p>
                      <p className="text-sm text-gray-600">{event.time}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-theme-clr" />
                    <div>
                      <p className="font-semibold text-gray-900">Duration</p>
                      <p className="text-sm text-gray-600">{event.duration}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-theme-clr mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">{event.location}</p>
                      <p className="text-sm text-gray-600">{event.address}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-theme-clr" />
                    <div>
                      <p className="font-semibold text-gray-900">Capacity</p>
                      <p className="text-sm text-gray-600">{event.capacity} people</p>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="bg-theme-clr/10 rounded-lg p-4 mb-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Ticket Price</p>
                    <p className="text-3xl font-bold text-theme-clr">{event.price}</p>
                  </div>
                </div>

                {/* Book Now Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-theme-clr hover:bg-yellow-600 text-black font-semibold py-4 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  Book Now
                  <ExternalLink className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Performers Section */}
      <section className="py-20 bg-white" ref={performersRef}>
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={performersInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Performers</h2>
            <p className="text-xl text-gray-600">Meet the talented musicians who will make this event unforgettable</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {performers.map((performer, index) => (
              <motion.div
                key={performer.name}
                initial={{ opacity: 0, y: 50 }}
                animate={performersInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: 0.4 + (index * 0.2) }}
                className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-24 h-24 bg-theme-clr rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Music className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{performer.name}</h3>
                <p className="text-theme-clr font-semibold mb-3">{performer.role}</p>
                <p className="text-gray-600 text-sm">{performer.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20" ref={galleryRef}>
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={galleryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Event Gallery</h2>
            <p className="text-xl text-gray-600">Preview images from similar events</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {event.gallery.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={galleryInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, delay: 0.4 + (index * 0.1) }}
                whileHover={{ scale: 1.05 }}
                className="relative group cursor-pointer"
              >
                <img 
                  src={image} 
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Play className="w-12 h-12 text-white" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-20 bg-gray-100" ref={bookingRef}>
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={bookingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Join Us?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Don't miss this incredible musical experience. Book your spot now and be part of something special.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-theme-clr hover:bg-yellow-600 text-black font-semibold py-4 px-8 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
              >
                Book Your Ticket
                <ExternalLink className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-theme-clr text-theme-clr hover:bg-theme-clr hover:text-black font-semibold py-4 px-8 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
              >
                Contact Us
                <ExternalLink className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}