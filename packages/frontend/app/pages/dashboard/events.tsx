import React, { useState } from 'react'
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Plus, 
  Search, 
  Filter,
  Edit,
  Trash2,
  Eye,
  MoreVertical
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Modal, Form, Input, DatePicker, TimePicker, Select, Button, message, Upload, InputNumber, Table, Tag, Space, Dropdown } from 'antd'
import { PlusOutlined, UploadOutlined, MoreOutlined } from '@ant-design/icons'
import CoverImage1 from '~/assets/cover-image1.png'
import CoverImage2 from '~/assets/cover-image2.png'
import CoverImage3 from '~/assets/cover-image3.png'
import type { Route } from '../+types'

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Events - Family of Singers Dashboard" },
    { name: "description", content: "Manage choir events, performances, and schedules from the Family of Singers dashboard." },
  ];
}

export default function Events() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [viewMode, setViewMode] = useState('table') // 'cards' or 'table'
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [editingEvent, setEditingEvent] = useState(null)
  const [createForm] = Form.useForm()
  const [editForm] = Form.useForm()

  const events = [
    {
      id: 1,
      title: 'Christmas Concert 2024',
      description: 'A magical evening of Christmas carols and holiday classics',
      date: 'Dec 15, 2024',
      time: '7:00 PM',
      location: 'Kigali Convention Centre',
      attendees: 45,
      capacity: 500,
      image: CoverImage1,
      status: 'upcoming',
      category: 'Concert'
    },
    {
      id: 2,
      title: 'New Year Celebration',
      description: 'Ring in the new year with beautiful music and celebration',
      date: 'Dec 31, 2024',
      time: '8:00 PM',
      location: 'Kigali Arena',
      attendees: 42,
      capacity: 1000,
      image: CoverImage2,
      status: 'upcoming',
      category: 'Celebration'
    },
    {
      id: 3,
      title: 'Spring Music Festival',
      description: 'Celebrate the arrival of spring with our annual music festival',
      date: 'Mar 20, 2025',
      time: '6:30 PM',
      location: 'Kigali Cultural Centre',
      attendees: 38,
      capacity: 300,
      image: CoverImage3,
      status: 'upcoming',
      category: 'Festival'
    },
    {
      id: 4,
      title: 'Easter Service',
      description: 'Special Easter service with choir performance',
      date: 'Apr 20, 2025',
      time: '10:00 AM',
      location: 'Presbyterian Church',
      attendees: 50,
      capacity: 200,
      image: CoverImage1,
      status: 'upcoming',
      category: 'Service'
    }
  ]

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || event.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-green-100 text-green-800'
      case 'ongoing': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-gray-100 text-gray-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  // Form handlers
  const handleCreateSubmit = async (values: any) => {
    try {
      console.log('Create event data:', values)
      message.success('Event created successfully!')
      setIsCreateModalVisible(false)
      createForm.resetFields()
    } catch (error) {
      message.error('Failed to create event')
    }
  }

  const handleEditSubmit = async (values: any) => {
    try {
      console.log('Edit event data:', values)
      message.success('Event updated successfully!')
      setIsEditModalVisible(false)
      setEditingEvent(null)
      editForm.resetFields()
    } catch (error) {
      message.error('Failed to update event')
    }
  }

  const handleEdit = (event: any) => {
    setEditingEvent(event)
    editForm.setFieldsValue({
      title: event.title,
      description: event.description,
      location: event.location,
      category: event.category,
      capacity: event.capacity
    })
    setIsEditModalVisible(true)
  }

  const handleDelete = (eventId: number) => {
    message.success('Event deleted successfully!')
  }

  // Table columns configuration
  const columns = [
    {
      title: 'Event',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: any) => (
        <div className="flex items-center gap-3">
          <img 
            src={record.image} 
            alt={text}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div>
            <div className="font-medium text-gray-900">{text}</div>
            <div className="text-sm text-gray-500">{record.category}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Date & Time',
      key: 'datetime',
      render: (record: any) => (
        <div>
          <div className="font-medium text-gray-900">{record.date}</div>
          <div className="text-sm text-gray-500">{record.time}</div>
        </div>
      ),
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      render: (location: string) => (
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span className="text-sm">{location}</span>
        </div>
      ),
    },
    {
      title: 'Attendance',
      key: 'attendance',
      render: (record: any) => (
        <div>
          <div className="text-sm font-medium text-gray-900">
            {record.attendees} / {record.capacity}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
            <div 
              className="bg-theme-clr h-2 rounded-full transition-all duration-300"
              style={{ width: `${(record.attendees / record.capacity) * 100}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {Math.round((record.attendees / record.capacity) * 100)}%
          </div>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusConfig = {
          upcoming: { color: 'green', text: 'Upcoming' },
          ongoing: { color: 'blue', text: 'Ongoing' },
          completed: { color: 'default', text: 'Completed' },
          cancelled: { color: 'red', text: 'Cancelled' }
        }
        const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.completed
        return <Tag color={config.color}>{config.text}</Tag>
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => (
        <Space size="small">
          <Button type="primary" className="table-button">
            <Eye className="table-button-icon" />
            View
          </Button>
          <Button onClick={() => handleEdit(record)} className="table-button table-button-edit">
            <Edit className="table-button-icon" />
            Edit
          </Button>
          <Dropdown
            menu={{
              items: [
                {
                  key: 'duplicate',
                  label: 'Duplicate Event',
                  icon: <Plus className="w-4 h-4" />
                },
                {
                  key: 'export',
                  label: 'Export Details',
                  icon: <Calendar className="w-4 h-4" />
                },
                {
                  type: 'divider'
                },
                {
                  key: 'delete',
                  label: 'Delete Event',
                  icon: <Trash2 className="w-4 h-4" />,
                  danger: true,
                  onClick: () => handleDelete(record.id)
                }
              ]
            }}
            trigger={['click']}
          >
            <Button className="table-button table-button-danger">
              <MoreOutlined className="table-button-icon" />
              More
            </Button>
          </Dropdown>
        </Space>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Events</h1>
          <p className="text-gray-600">Manage your choir events and performances</p>
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCreateModalVisible(true)}
            className="bg-theme-clr hover:bg-yellow-600 text-black font-medium py-3 px-6 rounded-lg transition-colors duration-300 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create Event
          </motion.button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme-clr focus:border-transparent"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme-clr focus:border-transparent"
            >
              <option value="all">All Events</option>
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <Table
          columns={columns}
          dataSource={filteredEvents}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} of ${total} events`,
          }}
          className="events-table"
        />
      </div>

      {/* Empty State */}
      {filteredEvents.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || filterStatus !== 'all' 
              ? 'Try adjusting your search or filter criteria.'
              : 'Get started by creating your first event.'
            }
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCreateModalVisible(true)}
            className="bg-theme-clr hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center gap-2 mx-auto"
          >
            <Plus className="w-5 h-5" />
            Create Event
          </motion.button>
        </motion.div>
      )}

      {/* Create Event Modal */}
      <Modal
        title="Create New Event"
        open={isCreateModalVisible}
        onCancel={() => setIsCreateModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={createForm}
          layout="vertical"
          onFinish={handleCreateSubmit}
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
              <Select.Option value="festival">Festival</Select.Option>
              <Select.Option value="service">Service</Select.Option>
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
              <Button onClick={() => setIsCreateModalVisible(false)}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Create Event
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Event Modal */}
      <Modal
        title="Edit Event"
        open={isEditModalVisible}
        onCancel={() => {
          setIsEditModalVisible(false)
          setEditingEvent(null)
        }}
        footer={null}
        width={600}
      >
        <Form
          form={editForm}
          layout="vertical"
          onFinish={handleEditSubmit}
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
              <Select.Option value="festival">Festival</Select.Option>
              <Select.Option value="service">Service</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="capacity"
            label="Capacity"
            rules={[{ required: true, message: 'Please enter event capacity' }]}
          >
            <InputNumber className="w-full" placeholder="Enter event capacity" min={1} />
          </Form.Item>

          <Form.Item className="mb-0">
            <div className="flex justify-end gap-3">
              <Button onClick={() => {
                setIsEditModalVisible(false)
                setEditingEvent(null)
              }}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Update Event
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}