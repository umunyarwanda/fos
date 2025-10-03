import React, { useRef, useState } from 'react'
import { Calendar, Clock, MapPin, Users, Share2, Heart, ArrowLeft, ExternalLink, Play, Music, Award, Star, BookOpen, Target, Users2 } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import { Link, useParams } from 'react-router'
import HeroCrumb from '~/components/HeroCrumb'
import CoverImage1 from '~/assets/cover-image1.png'
import CoverImage2 from '~/assets/cover-image2.png'
import CoverImage3 from '~/assets/cover-image3.png'
import type { Route } from '../+types'

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Special Program Details - Family of Singers" },
    { name: "description", content: "Discover our special programs designed to nurture musical talent and build community. Learn about our unique educational and performance opportunities." },
  ];
}

export default function SpecialProgramDetail() {
  const { id } = useParams()
  
  // Refs for scroll animations
  const programInfoRef = useRef(null)
  const detailsRef = useRef(null)
  const instructorsRef = useRef(null)
  const curriculumRef = useRef(null)
  const galleryRef = useRef(null)
  const enrollmentRef = useRef(null)
  
  // Check if elements are in view
  const programInfoInView = useInView(programInfoRef, { once: true, margin: "-100px" })
  const detailsInView = useInView(detailsRef, { once: true, margin: "-100px" })
  const instructorsInView = useInView(instructorsRef, { once: true, margin: "-100px" })
  const curriculumInView = useInView(curriculumRef, { once: true, margin: "-100px" })
  const galleryInView = useInView(galleryRef, { once: true, margin: "-100px" })
  const enrollmentInView = useInView(enrollmentRef, { once: true, margin: "-100px" })

  // State for interactions
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  // Sample special program data - in real app, this would come from API based on id
  const program = {
    id: parseInt(id || '1'),
    title: "Young Voices Academy",
    subtitle: "Nurturing the Next Generation of Musical Talent",
    description: "Our Young Voices Academy is a comprehensive music education program designed specifically for children and teenagers aged 8-18. This program combines vocal training, music theory, performance skills, and character development to create well-rounded young musicians who are prepared for both musical excellence and life success.",
    longDescription: "The Young Voices Academy represents our commitment to developing the next generation of musical talent. Through a carefully structured curriculum that balances technical skill development with creative expression, students learn not just how to sing, but how to understand music deeply, work collaboratively, and express themselves with confidence. The program includes individual coaching, group rehearsals, performance opportunities, and mentorship from experienced musicians. Students also participate in community outreach performances, building both their skills and their sense of social responsibility. Our holistic approach ensures that graduates of the program are not only talented musicians but also confident, disciplined, and community-minded individuals.",
    startDate: "15 Jan, 2025",
    endDate: "15 Dec, 2025",
    duration: "11 months",
    schedule: "Saturdays 9:00 AM - 12:00 PM",
    location: "Family of Singers Music Center",
    address: "KG 2 Roundabout, Kigali, Rwanda",
    ageRange: "8-18 years",
    capacity: "30 students",
    category: "Music Education",
    level: "Beginner to Intermediate",
    status: "Enrolling",
    image: CoverImage1,
    gallery: [CoverImage1, CoverImage2, CoverImage3, CoverImage1],
    featured: true,
    tags: ["Education", "Youth", "Vocal Training", "Community"],
    tuition: "RWF 50,000/month",
    includes: [
      "Weekly group classes",
      "Individual voice coaching",
      "Music theory instruction",
      "Performance opportunities",
      "Certificate upon completion"
    ]
  }

  const instructors = [
    {
      name: "Dr. Jean Baptiste",
      role: "Program Director",
      image: CoverImage2,
      bio: "Music Education Specialist with 20+ years of experience in youth development",
      qualifications: "PhD in Music Education, Certified Voice Instructor"
    },
    {
      name: "Sarah Mukamana",
      role: "Lead Vocal Coach",
      image: CoverImage3,
      bio: "Professional soprano and experienced youth mentor",
      qualifications: "Master's in Vocal Performance, 10+ years teaching experience"
    },
    {
      name: "Peter Nkurunziza",
      role: "Music Theory Instructor",
      image: CoverImage1,
      bio: "Pianist and music theory expert specializing in young learners",
      qualifications: "Bachelor's in Music Theory, Certified Music Educator"
    }
  ]

  const curriculum = [
    {
      module: "Foundation Skills",
      duration: "3 months",
      topics: ["Basic vocal technique", "Breathing exercises", "Pitch recognition", "Rhythm training"],
      description: "Building the fundamental skills every young singer needs"
    },
    {
      module: "Musical Development",
      duration: "4 months", 
      topics: ["Music theory basics", "Sight reading", "Harmony", "Performance skills"],
      description: "Developing musical understanding and performance confidence"
    },
    {
      module: "Advanced Techniques",
      duration: "3 months",
      topics: ["Advanced vocal techniques", "Style interpretation", "Stage presence", "Leadership skills"],
      description: "Mastering advanced skills and preparing for leadership roles"
    },
    {
      module: "Performance & Leadership",
      duration: "1 month",
      topics: ["Concert preparation", "Mentoring younger students", "Community outreach", "Graduation performance"],
      description: "Applying skills in real-world performance and leadership contexts"
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
        title: program.title,
        text: program.description,
        url: window.location.href
      })
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href)
      alert('Program link copied to clipboard!')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroCrumb 
        title="Special"
        highlight="Program"
        description="Discover our unique educational and performance opportunities"
      />

      {/* Program Info Section */}
      <section className="py-20" ref={programInfoRef}>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Program Info */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={programInfoInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-2"
            >
              {/* Back Button */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={programInfoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-8"
              >
                <Link 
                  to="/special-programs"
                  className="inline-flex items-center gap-2 text-theme-clr hover:text-yellow-600 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back to Special Programs
                </Link>
              </motion.div>

              {/* Program Title */}
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={programInfoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-primary"
              >
                {program.title}
              </motion.h1>

              {/* Program Subtitle */}
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={programInfoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-xl text-theme-clr mb-6 font-secondary"
              >
                {program.subtitle}
              </motion.p>

              {/* Program Description */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={programInfoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="space-y-4 text-gray-600 leading-relaxed mb-8"
              >
                <p>{program.description}</p>
                <p>{program.longDescription}</p>
              </motion.div>

              {/* Program Tags */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={programInfoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="flex flex-wrap gap-2 mb-8"
              >
                {program.tags.map((tag, index) => (
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
                animate={programInfoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
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

            {/* Program Details Card */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={programInfoInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Program Details</h3>
                
                {/* Program Image */}
                <div className="mb-6">
                  <img 
                    src={program.image} 
                    alt={program.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>

                {/* Program Info */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-theme-clr" />
                    <div>
                      <p className="font-semibold text-gray-900">{program.startDate} - {program.endDate}</p>
                      <p className="text-sm text-gray-600">{program.duration}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-theme-clr" />
                    <div>
                      <p className="font-semibold text-gray-900">Schedule</p>
                      <p className="text-sm text-gray-600">{program.schedule}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-theme-clr mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">{program.location}</p>
                      <p className="text-sm text-gray-600">{program.address}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-theme-clr" />
                    <div>
                      <p className="font-semibold text-gray-900">Age Range</p>
                      <p className="text-sm text-gray-600">{program.ageRange}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Users2 className="w-5 h-5 text-theme-clr" />
                    <div>
                      <p className="font-semibold text-gray-900">Capacity</p>
                      <p className="text-sm text-gray-600">{program.capacity}</p>
                    </div>
                  </div>
                </div>

                {/* Tuition */}
                <div className="bg-theme-clr/10 rounded-lg p-4 mb-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Monthly Tuition</p>
                    <p className="text-3xl font-bold text-theme-clr">{program.tuition}</p>
                  </div>
                </div>

                {/* What's Included */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">What's Included:</h4>
                  <ul className="space-y-2">
                    {program.includes.map((item, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <Award className="w-4 h-4 text-theme-clr" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Enroll Now Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-theme-clr hover:bg-yellow-600 text-black font-semibold py-4 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  Enroll Now
                  <ExternalLink className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Instructors Section */}
      <section className="py-20 bg-white" ref={instructorsRef}>
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={instructorsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Instructors</h2>
            <p className="text-xl text-gray-600">Learn from experienced professionals dedicated to your musical growth</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {instructors.map((instructor, index) => (
              <motion.div
                key={instructor.name}
                initial={{ opacity: 0, y: 50 }}
                animate={instructorsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: 0.4 + (index * 0.2) }}
                className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-24 h-24 bg-theme-clr rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Music className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{instructor.name}</h3>
                <p className="text-theme-clr font-semibold mb-3">{instructor.role}</p>
                <p className="text-gray-600 text-sm mb-3">{instructor.bio}</p>
                <p className="text-xs text-gray-500 italic">{instructor.qualifications}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="py-20" ref={curriculumRef}>
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={curriculumInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Program Curriculum</h2>
            <p className="text-xl text-gray-600">A structured learning journey designed for musical excellence</p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {curriculum.map((module, index) => (
              <motion.div
                key={module.module}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={curriculumInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                transition={{ duration: 0.8, delay: 0.4 + (index * 0.2) }}
                className="bg-white rounded-xl p-8 mb-8 shadow-lg"
              >
                <div className="flex items-start gap-6">
                  <div className="bg-theme-clr text-black rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">{module.module}</h3>
                      <span className="bg-theme-clr/10 text-theme-clr px-3 py-1 rounded-full text-sm font-medium">
                        {module.duration}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{module.description}</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      {module.topics.map((topic, topicIndex) => (
                        <div key={topicIndex} className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-theme-clr" />
                          <span className="text-sm text-gray-700">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-gray-100" ref={galleryRef}>
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={galleryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Program Gallery</h2>
            <p className="text-xl text-gray-600">See our students in action and program highlights</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {program.gallery.map((image, index) => (
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

      {/* Enrollment Section */}
      <section className="py-20" ref={enrollmentRef}>
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={enrollmentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Begin Your Musical Journey?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Join our special program and discover your musical potential. Limited spots available for the upcoming session.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-theme-clr hover:bg-yellow-600 text-black font-semibold py-4 px-8 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
              >
                Enroll Now
                <ExternalLink className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-theme-clr text-theme-clr hover:bg-theme-clr hover:text-black font-semibold py-4 px-8 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
              >
                Learn More
                <Target className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}