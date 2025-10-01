import React, { useRef, useState } from 'react'
import { 
  Calendar, 
  Users, 
  Music, 
  TrendingUp, 
  Clock, 
  MapPin, 
  Star,
  Plus,
  ArrowRight,
  Eye,
  BarChart3,
  Activity,
  Target
} from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar, Line, Doughnut } from 'react-chartjs-2'
import { Modal, Form, Input, DatePicker, TimePicker, Select, Button, message, Upload, InputNumber } from 'antd'
import { PlusOutlined, UploadOutlined } from '@ant-design/icons'
import CoverImage1 from '~/assets/cover-image1.png'
import CoverImage2 from '~/assets/cover-image2.png'
import CoverImage3 from '~/assets/cover-image3.png'
import type { Route } from '../+types'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard - Family of Singers" },
    { name: "description", content: "Manage your choir events, members, and activities from the Family of Singers dashboard." },
  ];
}

export default function Dashboard() {
  const statsRef = useRef(null)
  const eventsRef = useRef(null)
  const membersRef = useRef(null)
  const recentRef = useRef(null)
  
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" })
  const eventsInView = useInView(eventsRef, { once: true, margin: "-100px" })
  const membersInView = useInView(membersRef, { once: true, margin: "-100px" })
  const recentInView = useInView(recentRef, { once: true, margin: "-100px" })

  // Modal states
  const [isEventModalVisible, setIsEventModalVisible] = useState(false)
  const [isMemberModalVisible, setIsMemberModalVisible] = useState(false)
  const [eventForm] = Form.useForm()
  const [memberForm] = Form.useForm()

  const stats = [
    {
      title: 'Total Events',
      value: '24',
      change: '+12%',
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Active Members',
      value: '45',
      change: '+8%',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Performances',
      value: '18',
      change: '+25%',
      icon: Music,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Growth Rate',
      value: '32%',
      change: '+5%',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: 'Christmas Concert 2024',
      date: 'Dec 15, 2024',
      time: '7:00 PM',
      location: 'Kigali Convention Centre',
      attendees: 45,
      image: CoverImage1,
      status: 'upcoming'
    },
    {
      id: 2,
      title: 'New Year Celebration',
      date: 'Dec 31, 2024',
      time: '8:00 PM',
      location: 'Kigali Arena',
      attendees: 42,
      image: CoverImage2,
      status: 'upcoming'
    },
    {
      id: 3,
      title: 'Spring Music Festival',
      date: 'Mar 20, 2025',
      time: '6:30 PM',
      location: 'Kigali Cultural Centre',
      attendees: 38,
      image: CoverImage3,
      status: 'upcoming'
    }
  ]

  const recentMembers = [
    {
      id: 1,
      name: 'Sarah Mukamana',
      role: 'Soprano',
      joinDate: '2 days ago',
      avatar: CoverImage1,
      status: 'active'
    },
    {
      id: 2,
      name: 'Peter Nkurunziza',
      role: 'Tenor',
      joinDate: '1 week ago',
      avatar: CoverImage2,
      status: 'active'
    },
    {
      id: 3,
      name: 'Grace Uwimana',
      role: 'Alto',
      joinDate: '2 weeks ago',
      avatar: CoverImage3,
      status: 'active'
    }
  ]

  // Chart data
  const performanceData = [
    { month: 'Jan', thisYear: 8, lastYear: 6 },
    { month: 'Feb', thisYear: 12, lastYear: 8 },
    { month: 'Mar', thisYear: 15, lastYear: 10 },
    { month: 'Apr', thisYear: 18, lastYear: 12 },
    { month: 'May', thisYear: 22, lastYear: 15 },
    { month: 'Jun', thisYear: 25, lastYear: 18 },
    { month: 'Jul', thisYear: 28, lastYear: 20 },
    { month: 'Aug', thisYear: 32, lastYear: 22 },
    { month: 'Sep', thisYear: 35, lastYear: 25 },
    { month: 'Oct', thisYear: 38, lastYear: 28 },
    { month: 'Nov', thisYear: 42, lastYear: 30 },
    { month: 'Dec', thisYear: 45, lastYear: 32 }
  ]

  const memberGrowthData = [
    { month: 'Jan', members: 25 },
    { month: 'Feb', members: 28 },
    { month: 'Mar', members: 32 },
    { month: 'Apr', members: 35 },
    { month: 'May', members: 38 },
    { month: 'Jun', members: 42 },
    { month: 'Jul', members: 45 },
    { month: 'Aug', members: 47 },
    { month: 'Sep', members: 50 },
    { month: 'Oct', members: 48 },
    { month: 'Nov', members: 46 },
    { month: 'Dec', members: 45 }
  ]

  const voiceDistribution = [
    { voice: 'Soprano', count: 12, percentage: 27 },
    { voice: 'Alto', count: 10, percentage: 22 },
    { voice: 'Tenor', count: 8, percentage: 18 },
    { voice: 'Bass', count: 15, percentage: 33 }
  ]

  // Form handlers
  const handleEventSubmit = async (values: any) => {
    try {
      console.log('Event data:', values)
      message.success('Event created successfully!')
      setIsEventModalVisible(false)
      eventForm.resetFields()
    } catch (error) {
      message.error('Failed to create event')
    }
  }

  const handleMemberSubmit = async (values: any) => {
    try {
      console.log('Member data:', values)
      message.success('Member added successfully!')
      setIsMemberModalVisible(false)
      memberForm.resetFields()
    } catch (error) {
      message.error('Failed to add member')
    }
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className=" rounded-2xl"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, John!</h1>
            <p className="text-gray-600">Here's what's happening with your choir today.</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
          >
            
            <div className="space-y-2 flex items-center justify-between">
              <div>
                <motion.h3 
                  className="text-3xl font-bold text-gray-900"
                  initial={{ scale: 0.8 }}
                  animate={statsInView ? { scale: 1 } : { scale: 0.8 }}
                  transition={{ duration: 0.4, delay: 0.2 + (index * 0.1) }}
                >
                  {stat.value}
                </motion.h3>
                <p className="text-gray-600 font-medium">{stat.title}</p>
              </div>
              <div className="flex items-center flex-col justify-between gap-2">
                <motion.div 
                  className={`w-14 h-14 ${stat.bgColor} rounded-xl flex items-center justify-center shadow-lg`}
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <stat.icon className={`w-7 h-7 ${stat.color}`} />
                </motion.div>
                <motion.div 
                  className="flex items-center gap-1 bg-green-50 px-3 py-1 rounded-full"
                  whileHover={{ scale: 1.05 }}
                >
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-semibold text-green-600">{stat.change}</span>
                </motion.div>
              </div>
            </div>
            
            {/* Progress indicator */}
            <div className="mt-4 w-full bg-gray-200 rounded-full h-1.5">
              <motion.div 
                className={`h-1.5 rounded-full ${stat.bgColor.replace('bg-', 'bg-').replace('-100', '-500')}`}
                initial={{ width: 0 }}
                animate={statsInView ? { width: `${Math.min(parseInt(stat.value.replace(/[^\d]/g, '')) * 2, 100)}%` } : { width: 0 }}
                transition={{ duration: 1, delay: 0.5 + (index * 0.1) }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Performance Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Performance Trends</h2>
            <BarChart3 className="w-5 h-5 text-theme-clr" />
          </div>
          
          <div className="h-80">
            <Bar
              data={{
                labels: performanceData.slice(-6).map(d => d.month),
                datasets: [
                  {
                    label: 'This Year',
                    data: performanceData.slice(-6).map(d => d.thisYear),
                    backgroundColor: '#e6a11f',
                    borderColor: '#d4941a',
                    borderWidth: 1,
                  },
                  {
                    label: 'Last Year',
                    data: performanceData.slice(-6).map(d => d.lastYear),
                    backgroundColor: '#e5e7eb',
                    borderColor: '#d1d5db',
                    borderWidth: 1,
                  }
                ]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: '#f3f4f6'
                    }
                  },
                  x: {
                    grid: {
                      color: '#f3f4f6'
                    }
                  }
                }
              }}
            />
          </div>
        </motion.div>

        {/* Member Growth Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Member Growth</h2>
            <Activity className="w-5 h-5 text-theme-clr" />
          </div>
          
          <div className="h-80">
            <Line
              data={{
                labels: memberGrowthData.slice(-6).map(d => d.month),
                datasets: [
                  {
                    label: 'Members',
                    data: memberGrowthData.slice(-6).map(d => d.members),
                    borderColor: '#e6a11f',
                    backgroundColor: 'rgba(230, 161, 31, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#e6a11f',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                  }
                ]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: '#f3f4f6'
                    }
                  },
                  x: {
                    grid: {
                      color: '#f3f4f6'
                    }
                  }
                }
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Voice Distribution Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Voice Distribution</h2>
          <Target className="w-5 h-5 text-theme-clr" />
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="h-80">
            <Doughnut
              data={{
                labels: voiceDistribution.map(v => v.voice),
                datasets: [
                  {
                    data: voiceDistribution.map(v => v.count),
                    backgroundColor: [
                      '#3b82f6',
                      '#10b981', 
                      '#f59e0b',
                      '#ef4444'
                    ],
                    borderColor: '#ffffff',
                    borderWidth: 3,
                  }
                ]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom' as const,
                  },
                },
              }}
            />
          </div>
          
          <div className="space-y-4">
            {voiceDistribution.map((voice, index) => (
              <div key={voice.voice} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ 
                      backgroundColor: index === 0 ? '#3b82f6' : index === 1 ? '#10b981' : index === 2 ? '#f59e0b' : '#ef4444'
                    }}
                  ></div>
                  <span className="font-medium text-gray-900">{voice.voice}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">{voice.count}</div>
                  <div className="text-sm text-gray-600">{voice.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Upcoming Events */}
        <div className="lg:col-span-2" ref={eventsRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={eventsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Upcoming Events</h2>
              <Link 
                to="/dashboard/events"
                className="text-theme-clr hover:text-yellow-600 font-medium text-sm flex items-center gap-1"
              >
                View all
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={eventsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
                  className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{event.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {event.date} at {event.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">{event.attendees} attendees</div>
                    <div className="text-xs text-theme-clr font-medium">{event.status}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsEventModalVisible(true)}
              className="w-full mt-6 bg-theme-clr hover:bg-yellow-600 text-black font-semibold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create New Event
            </motion.button>
          </motion.div>
        </div>

        {/* Recent Members */}
        <div ref={membersRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={membersInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Members</h2>
              <Link 
                to="/dashboard/members"
                className="text-theme-clr hover:text-yellow-600 font-medium text-sm flex items-center gap-1"
              >
                View all
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-4">
              {recentMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={membersInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <img 
                    src={member.avatar} 
                    alt={member.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{member.name}</h4>
                    <p className="text-sm text-gray-600">{member.role}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">{member.joinDate}</div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-green-600">{member.status}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsMemberModalVisible(true)}
              className="w-full mt-6 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Member
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Quick Actions */}
      <div ref={recentRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={recentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-theme-clr hover:bg-theme-clr/5 transition-colors text-center"
            >
              <Calendar className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <h3 className="font-medium text-gray-900">Create Event</h3>
              <p className="text-sm text-gray-600">Schedule a new performance</p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-theme-clr hover:bg-theme-clr/5 transition-colors text-center"
            >
              <Users className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <h3 className="font-medium text-gray-900">Add Member</h3>
              <p className="text-sm text-gray-600">Invite new choir members</p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-theme-clr hover:bg-theme-clr/5 transition-colors text-center"
            >
              <BarChart3 className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <h3 className="font-medium text-gray-900">View Analytics</h3>
              <p className="text-sm text-gray-600">Check performance metrics</p>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Event Creation Modal */}
      <Modal
        title="Create New Event"
        open={isEventModalVisible}
        onCancel={() => setIsEventModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={eventForm}
          layout="vertical"
          onFinish={handleEventSubmit}
          className="mt-4"
        >
          <Form.Item
            name="title"
            label="Event Title"
            rules={[{ required: true, message: 'Please enter event title' }]}
          >
            <Input placeholder="Enter event title" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter event description' }]}
          >
            <Input.TextArea rows={3} placeholder="Enter event description" />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="date"
              label="Event Date"
              rules={[{ required: true, message: 'Please select event date' }]}
            >
              <DatePicker className="w-full" />
            </Form.Item>

            <Form.Item
              name="time"
              label="Event Time"
              rules={[{ required: true, message: 'Please select event time' }]}
            >
              <TimePicker className="w-full" format="HH:mm" />
            </Form.Item>
          </div>

          <Form.Item
            name="location"
            label="Location"
            rules={[{ required: true, message: 'Please enter event location' }]}
          >
            <Input placeholder="Enter event location" />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: 'Please select event category' }]}
          >
            <Select placeholder="Select event category">
              <Select.Option value="concert">Concert</Select.Option>
              <Select.Option value="rehearsal">Rehearsal</Select.Option>
              <Select.Option value="workshop">Workshop</Select.Option>
              <Select.Option value="meeting">Meeting</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="capacity"
            label="Capacity"
            rules={[{ required: true, message: 'Please enter event capacity' }]}
          >
            <InputNumber className="w-full" placeholder="Enter event capacity" min={1} />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
          >
            <Input placeholder="Enter event price (optional)" />
          </Form.Item>

          <Form.Item
            name="image"
            label="Event Image"
          >
            <Upload
              listType="picture-card"
              maxCount={1}
              beforeUpload={() => false}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item className="mb-0">
            <div className="flex justify-end gap-3">
              <Button onClick={() => setIsEventModalVisible(false)}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Create Event
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>

      {/* Member Addition Modal */}
      <Modal
        title="Add New Member"
        open={isMemberModalVisible}
        onCancel={() => setIsMemberModalVisible(false)}
        footer={null}
        width={500}
      >
        <Form
          form={memberForm}
          layout="vertical"
          onFinish={handleMemberSubmit}
          className="mt-4"
        >
          <Form.Item
            name="name"
            label="Full Name"
            rules={[{ required: true, message: 'Please enter member name' }]}
          >
            <Input placeholder="Enter member's full name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter email' },
              { type: 'email', message: 'Please enter valid email' }
            ]}
          >
            <Input placeholder="Enter member's email" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[{ required: true, message: 'Please enter phone number' }]}
          >
            <Input placeholder="Enter member's phone number" />
          </Form.Item>

          <Form.Item
            name="voice"
            label="Voice Part"
            rules={[{ required: true, message: 'Please select voice part' }]}
          >
            <Select placeholder="Select voice part">
              <Select.Option value="soprano">Soprano</Select.Option>
              <Select.Option value="alto">Alto</Select.Option>
              <Select.Option value="tenor">Tenor</Select.Option>
              <Select.Option value="bass">Bass</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="experience"
            label="Experience Level"
            rules={[{ required: true, message: 'Please select experience level' }]}
          >
            <Select placeholder="Select experience level">
              <Select.Option value="beginner">Beginner</Select.Option>
              <Select.Option value="intermediate">Intermediate</Select.Option>
              <Select.Option value="advanced">Advanced</Select.Option>
              <Select.Option value="professional">Professional</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="avatar"
            label="Profile Picture"
          >
            <Upload
              listType="picture-card"
              maxCount={1}
              beforeUpload={() => false}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item className="mb-0">
            <div className="flex justify-end gap-3">
              <Button onClick={() => setIsMemberModalVisible(false)}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Add Member
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}