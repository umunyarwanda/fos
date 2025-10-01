import React, { useState, useRef } from 'react'
import { ArrowRight, Calendar, Clock, MapPin, Phone, Mail, Music, Users, Award, CheckCircle, Star, Quote } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import HeroCrumb from '~/components/HeroCrumb'
import CoverImage1 from '~/assets/cover-image1.png'
import CoverImage2 from '~/assets/cover-image2.png'
import CoverImage3 from '~/assets/cover-image3.png'
import type { Route } from '../+types'

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Book Our Services - Family of Singers" },
    { name: "description", content: "Commission the Family of Singers choir for your special events. Professional choral services for weddings, funerals, corporate events, and more in Rwanda." },
  ];
}

export default function Commissions() {
  // Refs for scroll animations
  const servicesRef = useRef(null)
  const formRef = useRef(null)
  const testimonialsRef = useRef(null)
  const contactRef = useRef(null)
  
  // Check if elements are in view
  const servicesInView = useInView(servicesRef, { once: true, margin: "-100px" })
  const formInView = useInView(formRef, { once: true, margin: "-100px" })
  const testimonialsInView = useInView(testimonialsRef, { once: true, margin: "-100px" })
  const contactInView = useInView(contactRef, { once: true, margin: "-100px" })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    eventTime: '',
    location: '',
    duration: '',
    budget: '',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
  }

  const services = [
    {
      id: 1,
      title: "Wedding Ceremonies",
      description: "Make your special day unforgettable with beautiful wedding music. We provide ceremony and reception music tailored to your preferences.",
      price: "From 150,000 RWF",
      duration: "2-4 hours",
      image: CoverImage1,
      features: ["Ceremony Music", "Reception Performance", "Custom Song Selection", "Sound Equipment"]
    },
    {
      id: 2,
      title: "Funeral Services",
      description: "Honor your loved ones with respectful and comforting music. We provide appropriate hymns and songs for memorial services.",
      price: "From 100,000 RWF",
      duration: "1-2 hours",
      image: CoverImage2,
      features: ["Memorial Hymns", "Comforting Songs", "Respectful Performance", "Flexible Scheduling"]
    },
    {
      id: 3,
      title: "Corporate Events",
      description: "Enhance your corporate events with professional choral performances. Perfect for conferences, galas, and company celebrations.",
      price: "From 200,000 RWF",
      duration: "1-3 hours",
      image: CoverImage3,
      features: ["Professional Performance", "Custom Repertoire", "Sound System", "Event Coordination"]
    },
    {
      id: 4,
      title: "Religious Services",
      description: "Enhance your church services and religious celebrations with our uplifting gospel music and traditional hymns.",
      price: "From 80,000 RWF",
      duration: "1-2 hours",
      image: CoverImage1,
      features: ["Gospel Music", "Traditional Hymns", "Service Integration", "Spiritual Focus"]
    },
    {
      id: 5,
      title: "Birthday Celebrations",
      description: "Make birthdays extra special with personalized musical performances. We can learn and perform favorite songs.",
      price: "From 120,000 RWF",
      duration: "1-2 hours",
      image: CoverImage2,
      features: ["Personalized Songs", "Birthday Medleys", "Interactive Performance", "Memorable Experience"]
    },
    {
      id: 6,
      title: "Community Events",
      description: "Support your community events with inspiring choral music. Perfect for festivals, fundraisers, and public celebrations.",
      price: "From 100,000 RWF",
      duration: "1-3 hours",
      image: CoverImage3,
      features: ["Community Focus", "Flexible Repertoire", "Public Performance", "Cultural Integration"]
    }
  ]

  const testimonials = [
    {
      id: 1,
      name: "Grace Mukamana",
      event: "Wedding Ceremony",
      rating: 5,
      comment: "The Family of Singers made our wedding absolutely magical. Their beautiful voices and professional service exceeded all our expectations.",
      image: CoverImage1
    },
    {
      id: 2,
      name: "Pastor Jean Baptiste",
      event: "Church Service",
      rating: 5,
      comment: "Their performance at our church service was truly inspiring. The congregation was moved by their beautiful gospel music.",
      image: CoverImage2
    },
    {
      id: 3,
      name: "Marie Claire",
      event: "Corporate Event",
      rating: 5,
      comment: "Professional, talented, and punctual. The Family of Singers added elegance and beauty to our company's annual gala.",
      image: CoverImage3
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroCrumb 
        title="Book Our"
        highlight="Services"
        description="Commission the Family of Singers for your special events. From weddings to corporate functions, we bring beautiful music to make your occasion memorable."
      />

      {/* Services Section */}
      <section className="py-20" ref={servicesRef}>
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We offer a wide range of musical services for various occasions. 
              Let us help make your event truly special with our beautiful choral performances.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: 0.4 + (index * 0.1) }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={servicesInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + (index * 0.1), type: "spring", stiffness: 200 }}
                    className="absolute top-4 right-4"
                  >
                    <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold">
                      {service.price}
                    </span>
                  </motion.div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-gray-600">{service.duration}</span>
                  </div>

                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={servicesInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, delay: 0.8 + (index * 0.1) + (featureIndex * 0.1) }}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-20 bg-white" ref={formRef}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Book Our <span className="text-yellow-500">Services</span>
              </h2>
              <p className="text-lg text-gray-600">
                Fill out the form below and we'll get back to you within 24 hours to discuss your event details.
              </p>
            </motion.div>

            <motion.form 
              onSubmit={handleSubmit} 
              initial={{ opacity: 0, y: 50 }}
              animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-gray-100 rounded-2xl shadow-xl p-8"
            >
              <div className="grid md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Event Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Details</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Event Type *</label>
                    <select
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    >
                      <option value="">Select Event Type</option>
                      <option value="wedding">Wedding Ceremony</option>
                      <option value="funeral">Funeral Service</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="religious">Religious Service</option>
                      <option value="birthday">Birthday Celebration</option>
                      <option value="community">Community Event</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Event Date *</label>
                    <input
                      type="date"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Event Time *</label>
                    <input
                      type="time"
                      name="eventTime"
                      value={formData.eventTime}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Location *</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    placeholder="Venue name and address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  >
                    <option value="">Select Duration</option>
                    <option value="1 hour">1 Hour</option>
                    <option value="2 hours">2 Hours</option>
                    <option value="3 hours">3 Hours</option>
                    <option value="4+ hours">4+ Hours</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                >
                  <option value="">Select Budget Range</option>
                  <option value="50k-100k">50,000 - 100,000 RWF</option>
                  <option value="100k-150k">100,000 - 150,000 RWF</option>
                  <option value="150k-200k">150,000 - 200,000 RWF</option>
                  <option value="200k+">200,000+ RWF</option>
                </select>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Tell us more about your event, special requests, or any questions you have..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-8 text-center"
              >
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center gap-2 mx-auto"
                >
                  Send Booking Request
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </motion.div>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-900 text-white" ref={testimonialsRef}>
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              What Our <span className="text-yellow-500">Clients Say</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our clients have to say about our services.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 50 }}
                animate={testimonialsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: 0.4 + (index * 0.2) }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300"
              >
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={testimonialsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + (index * 0.2), type: "spring", stiffness: 200 }}
                  className="flex items-center gap-1 mb-4"
                >
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, rotate: -10 }}
                  animate={testimonialsInView ? { opacity: 1, rotate: 0 } : { opacity: 0, rotate: -10 }}
                  transition={{ duration: 0.5, delay: 0.8 + (index * 0.2) }}
                >
                  <Quote className="w-8 h-8 text-yellow-400 mb-4" />
                </motion.div>
                
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  animate={testimonialsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.6, delay: 1.0 + (index * 0.2) }}
                  className="text-gray-300 mb-4 italic"
                >
                  "{testimonial.comment}"
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={testimonialsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ duration: 0.6, delay: 1.2 + (index * 0.2) }}
                  className="flex items-center gap-3"
                >
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.event}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
