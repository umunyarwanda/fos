import React, { useState } from 'react'
import { Mail, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router'
import Logo from '~/assets/logo-dark.png'
import CoverImage3 from '~/assets/cover-image3.png'
import type { Route } from '../+types'

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Forgot Password - Family of Singers Dashboard" },
    { name: "description", content: "Reset your Family of Singers dashboard password to regain access to your account." },
  ];
}

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate password reset
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 2000)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <img src={Logo} alt="Family of Singers" className="h-30 w-auto" />
            </div>
            
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 font-primary mb-4">
              Check Your Email
            </h2>
            <p className="text-gray-600 mb-8">
              We've sent a password reset link to <strong>{email}</strong>. 
              Please check your email and follow the instructions to reset your password.
            </p>
            
            <div className="space-y-4">
              <Link 
                to="/login"
                className="w-full bg-theme-clr hover:bg-yellow-600 text-black font-semibold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
              >
                Back to Login
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <p className="text-sm text-gray-500">
                Didn't receive the email? Check your spam folder or{' '}
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-theme-clr hover:text-yellow-600 font-medium"
                >
                  try again
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Side - Reset Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <img src={Logo} alt="Family of Singers" className="h-30 w-auto" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 font-primary">
              Forgot Password?
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              No worries! Enter your email and we'll send you a reset link.
            </p>
          </motion.div>

          {/* Reset Form */}
          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 space-y-6"
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme-clr focus:border-transparent transition-colors"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-theme-clr hover:bg-yellow-600 disabled:bg-gray-400 text-black font-semibold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  Sending reset link...
                </>
              ) : (
                <>
                  Send Reset Link
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>

            {/* Back to Login */}
            <div className="text-center">
              <Link 
                to="/login"
                className="inline-flex items-center gap-2 text-theme-clr hover:text-yellow-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </Link>
            </div>
          </motion.form>
        </div>
      </div>

      {/* Right Side - Info & Background */}
      <div className="hidden lg:flex lg:flex-1 relative">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url(${CoverImage3})`
          }}
        />
        
        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-4xl font-bold mb-6 font-primary">
              We're Here to Help
            </h3>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Forgot your password? No problem! We'll help you get back into your account quickly and securely.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-theme-clr/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-theme-clr font-bold text-sm">1</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">Enter Your Email</h4>
                  <p className="text-white/80">Provide the email address associated with your account.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-theme-clr/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-theme-clr font-bold text-sm">2</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">Check Your Inbox</h4>
                  <p className="text-white/80">We'll send you a secure link to reset your password.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-theme-clr/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-theme-clr font-bold text-sm">3</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">Create New Password</h4>
                  <p className="text-white/80">Follow the link and set up your new password.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}