import React from 'react'
import { BarChart3, TrendingUp, Users, Calendar, Music, Award } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Route } from '../+types'

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Analytics - Family of Singers Dashboard" },
    { name: "description", content: "View performance analytics and insights for your choir from the Family of Singers dashboard." },
  ];
}

export default function Analytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600">Track your choir's performance and growth</p>
      </div>

      {/* Coming Soon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-xl shadow-lg p-12 text-center"
      >
        <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Analytics Coming Soon</h2>
        <p className="text-gray-600 mb-6">
          We're working on comprehensive analytics to help you track your choir's performance, 
          member engagement, and growth metrics.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div className="p-4 border border-gray-200 rounded-lg">
            <TrendingUp className="w-8 h-8 text-theme-clr mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">Performance Trends</h3>
            <p className="text-sm text-gray-600">Track attendance and engagement</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <Users className="w-8 h-8 text-theme-clr mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">Member Insights</h3>
            <p className="text-sm text-gray-600">Analyze member participation</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <Calendar className="w-8 h-8 text-theme-clr mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">Event Analytics</h3>
            <p className="text-sm text-gray-600">Measure event success</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}