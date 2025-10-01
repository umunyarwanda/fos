import React, { useRef } from 'react'
import { Users, Music, Award, Heart, Calendar, MapPin, Phone, Mail } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import HeroCrumb from '~/components/HeroCrumb'
import CoverImage1 from '~/assets/cover-image1.png'
import CoverImage2 from '~/assets/cover-image2.png'
import CoverImage3 from '~/assets/cover-image3.png'
import type { Route } from '../+types'

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About Us - Family of Singers" },
    { name: "description", content: "Learn about Family of Singers (FOS) choir, our mission, history, and the passionate community that brings beautiful gospel music to Rwanda." },
  ];
}

export default function About() {
  // Refs for scroll animations
  const whoWeAreRef = useRef(null)
  const missionRef = useRef(null)
  const conductorRef = useRef(null)
  const valuesRef = useRef(null)
  const familiesRef = useRef(null)
  
  // Check if elements are in view
  const whoWeAreInView = useInView(whoWeAreRef, { once: true, margin: "-100px" })
  const missionInView = useInView(missionRef, { once: true, margin: "-100px" })
  const conductorInView = useInView(conductorRef, { once: true, margin: "-100px" })
  const valuesInView = useInView(valuesRef, { once: true, margin: "-100px" })
  const familiesInView = useInView(familiesRef, { once: true, margin: "-100px" })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroCrumb 
        title="About"
        highlight="Family Of Singers"
        description="Discover the passion, dedication, and musical excellence that defines our choir community"
      />

      {/* Who We Are Section */}
      <section className="py-20" ref={whoWeAreRef}>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Grid */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={whoWeAreInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <img 
                  src={CoverImage1} 
                  alt="Choir Members" 
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
                <img 
                  src={CoverImage2} 
                  alt="Choir Performance" 
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="space-y-4 mt-8">
                <img 
                  src={CoverImage3} 
                  alt="Choir on Stage" 
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
                <img 
                  src={CoverImage1} 
                  alt="Choir Members" 
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
              </div>
            </motion.div>

            {/* Content */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={whoWeAreInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-yellow-500 mb-2" style={{ fontFamily: 'cursive' }}>
                  About us
                </h2>
                <div className="w-16 h-1 bg-yellow-500 mx-auto mb-6"></div>
              </div>
              
              <h3 className="text-4xl font-bold text-gray-900 mb-6">Who we are</h3>
              
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Family of Singers (FOS) is a choir that proclaims the gospel of JESUS Christ through 
                  music at the Presbyterian Church of Rwanda (EPR), Kiyovu Parish.
                </p>
                <p>
                  FOS members are composed of different generations, including youth, elders, single people, 
                  couples, and single parents. The ministry began in October 2009.
                </p>
                <p>
                  Our commitment is to evangelize through music and promote good family relationships 
                  grounded in Christian values. We believe that music has the power to bring people 
                  together and spread the message of love and hope.
                </p>
              </div>

              {/* FOS Branding */}
              <div className="mt-8 flex items-center gap-4">
                <div className="text-6xl font-bold text-yellow-500">FOS</div>
                <div className="text-gray-600">
                  <div className="text-lg font-semibold">Family</div>
                  <div className="text-sm">CONSTITUENCY</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-white" ref={missionRef}>
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Mission & Vision</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We are driven by our commitment to musical excellence and community building
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-gray-50 rounded-lg p-8"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                To create exceptional choral music that inspires, uplifts, and brings communities 
                together. We strive to preserve and promote the rich tradition of choral singing 
                while embracing diverse musical styles and cultures.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-gray-50 rounded-lg p-8"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                To be Rwanda's premier choral ensemble, recognized for our artistic excellence, 
                cultural impact, and commitment to nurturing the next generation of choral musicians. 
                We envision a world where music unites people across all differences.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Conductor Section */}
      <section className="py-20" ref={conductorRef}>
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={conductorInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Conductor</h2>
            <p className="text-xl text-gray-600">The musical vision behind our success</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={conductorInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <div className="h-64 md:h-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <Music className="w-12 h-12" />
                      </div>
                      <h3 className="text-xl font-bold">Dr. Jean Baptiste</h3>
                      <p className="text-sm opacity-90">Artistic Director & Conductor</p>
                    </div>
                  </div>
                </div>
                <div className="md:w-2/3 p-8">
                  <div className="space-y-4 text-gray-600">
                    <p>
                      Dr. Jean Baptiste brings over 15 years of experience in choral conducting 
                      and music education to Family Of Singers. A graduate of the Royal College 
                      of Music in London, he has conducted choirs across Africa and Europe.
                    </p>
                    <p>
                      His passion for choral music and his ability to bring out the best in each 
                      singer has been instrumental in our choir's growth and success. Under his 
                      leadership, we have developed a distinctive sound that blends traditional 
                      African harmonies with classical choral techniques.
                    </p>
                    <p>
                      Dr. Baptiste believes that music is a universal language that can bridge 
                      cultural divides and bring people together in harmony.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white" ref={valuesRef}>
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Community</h3>
              <p className="text-gray-600">
                We believe in the power of music to build strong, supportive communities 
                where every voice matters and every member is valued.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Excellence</h3>
              <p className="text-gray-600">
                We are committed to the highest standards of musical performance, 
                continuously striving to improve and perfect our craft.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Passion</h3>
              <p className="text-gray-600">
                Our love for choral music drives everything we do, from rehearsals 
                to performances, creating an environment of joy and inspiration.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Families Section */}
      <section className="py-20 bg-white" ref={familiesRef}>
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={familiesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Families</h2>
            <div className="w-16 h-1 bg-yellow-500 mx-auto"></div>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Family Card 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={familiesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <img 
                  src={CoverImage2} 
                  alt="Mama Dorothee Family" 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Mama Dorothee Family</h3>
                <p className="text-gray-600 text-sm">Description</p>
              </div>
            </motion.div>

            {/* Family Card 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={familiesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <img 
                  src={CoverImage3} 
                  alt="Mama Dorothee Family" 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Mama Dorothee Family</h3>
                <p className="text-gray-600 text-sm">Description</p>
              </div>
            </motion.div>

            {/* Family Card 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={familiesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <img 
                  src={CoverImage1} 
                  alt="Mama Dorothee Family" 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Mama Dorothee Family</h3>
                <p className="text-gray-600 text-sm">Description</p>
              </div>
            </motion.div>

            {/* Family Card 4 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={familiesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <img 
                  src={CoverImage2} 
                  alt="Mama Dorothee Family" 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Mama Dorothee Family</h3>
                <p className="text-gray-600 text-sm">Description</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
