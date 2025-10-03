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
import { Modal, Form, Input, DatePicker, TimePicker, Select, Button, message, Upload, InputNumber, Table, Tag, Space, Dropdown, Spin, Popconfirm, Image } from 'antd'
import { PlusOutlined, UploadOutlined, MoreOutlined, DeleteOutlined } from '@ant-design/icons'
import CoverImage1 from '~/assets/cover-image1.png'
import CoverImage2 from '~/assets/cover-image2.png'
import CoverImage3 from '~/assets/cover-image3.png'
import { useEvents } from '~/hooks/useEvents'
import { uploadApi } from '~/services/uploadApi'
import type { IGetEventResDto } from '@shared/interfaces/events/response/IGetEventResDto'
import type { Route } from '../+types'

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Events - Family of Singers Dashboard" },
    { name: "description", content: "Manage choir events, performances, and schedules from the Family of Singers dashboard." },
  ];
}

export default function Events() {
  const { events, loading, error, refetch, createEvent, updateEvent, deleteEvent } = useEvents()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [viewMode, setViewMode] = useState('table') // 'cards' or 'table'
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [isViewModalVisible, setIsViewModalVisible] = useState(false)
  const [editingEvent, setEditingEvent] = useState<IGetEventResDto | null>(null)
  const [viewingEvent, setViewingEvent] = useState<IGetEventResDto | null>(null)
  const [createForm] = Form.useForm()
  const [editForm] = Form.useForm()
  const [uploadingImages, setUploadingImages] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [isPreviewModalVisible, setIsPreviewModalVisible] = useState(false)

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'active' && event.isActive) ||
                         (filterStatus === 'featured' && event.isFeatured) ||
                         (filterStatus === 'inactive' && !event.isActive)
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (event: IGetEventResDto) => {
    if (!event.isActive) return 'bg-red-100 text-red-800'
    if (event.isFeatured) return 'bg-yellow-100 text-yellow-800'
    return 'bg-green-100 text-green-800'
  }

  const getStatusText = (event: IGetEventResDto) => {
    if (!event.isActive) return 'Inactive'
    if (event.isFeatured) return 'Featured'
    return 'Active'
  }

  // Form handlers
  const handleCreateSubmit = async (values: any) => {
    try {
      // Convert form values to API format
      const eventData = {
        title: values.title,
        subtitle: values.subtitle,
        description: values.description,
        eventDate: values.date?.format('YYYY-MM-DD'),
        startTime: values.time?.format('HH:mm'),
        endTime: values.endTime?.format('HH:mm'),
        location: values.location,
        address: values.address,
        capacity: values.capacity,
        isFeatured: values.isFeatured || false,
        tags: values.tags || [],
        galleryImages: uploadedImages.length > 0 ? uploadedImages : ['https://example.com/placeholder-image.jpg'],
        featuredPerformers: [], // Static for now
        venueType: values.venueType || 'indoor'
      }

      await createEvent(eventData)
      message.success('Event created successfully!')
      setIsCreateModalVisible(false)
      createForm.resetFields()
      setUploadedImages([])
    } catch (error) {
      console.error('Create event error:', error)
      message.error('Failed to create event')
    }
  }

  const handleEditSubmit = async (values: any) => {
    try {
      if (!editingEvent) return

      // Convert form values to API format
      const eventData = {
        title: values.title,
        subtitle: values.subtitle,
        description: values.description,
        location: values.location,
        address: values.address,
        capacity: values.capacity,
        isFeatured: values.isFeatured || false,
        tags: values.tags || [],
        galleryImages: uploadedImages.length > 0 ? uploadedImages : editingEvent.galleryImages || ['https://example.com/placeholder-image.jpg'],
        featuredPerformers: [], // Static for now
        venueType: values.venueType || 'indoor'
      }

      await updateEvent(editingEvent.id, eventData)
      message.success('Event updated successfully!')
      setIsEditModalVisible(false)
      setEditingEvent(null)
      setUploadedImages([])
      editForm.resetFields()
    } catch (error) {
      console.error('Update event error:', error)
      message.error('Failed to update event')
    }
  }

  const handleEdit = (event: IGetEventResDto) => {
    setEditingEvent(event)
    setUploadedImages(event.galleryImages || [])
    editForm.setFieldsValue({
      title: event.title,
      subtitle: event.subtitle,
      description: event.description,
      location: event.location,
      address: event.address,
      capacity: event.capacity,
      tags: event.tags || [],
      isFeatured: event.isFeatured,
      venueType: event.venueType
    })
    setIsEditModalVisible(true)
  }

  const handleView = (event: IGetEventResDto) => {
    setViewingEvent(event)
    setIsViewModalVisible(true)
  }

  const handleDelete = async (eventId: number) => {
    try {
      await deleteEvent(eventId)
      message.success('Event deleted successfully!')
    } catch (error) {
      console.error('Delete event error:', error)
      message.error('Failed to delete event')
    }
  }

  // Upload handlers
  const handleImageUpload = async (file: File) => {
    try {
      setUploadingImages(true)
      const uploadResult = await uploadApi.uploadSingleImage(file)
      setUploadedImages(prev => [...prev, uploadResult.secure_url])
      message.success('Image uploaded successfully!')
      return false // Prevent default upload behavior
    } catch (error) {
      console.error('Upload error:', error)
      message.error('Failed to upload image')
      return false
    } finally {
      setUploadingImages(false)
    }
  }

  // Handle multiple image uploads
  const handleMultipleImageUpload = async (fileList: any[]) => {
    try {
      setUploadingImages(true)
      
      // Extract File objects from the fileList
      const files = fileList.map(fileItem => fileItem.originFileObj || fileItem)
      
      // Upload all files at once
      const uploadResults = await uploadApi.uploadMultipleImages(files)
      const urls = uploadResults.map(result => result.secure_url)
      
      setUploadedImages(prev => [...prev, ...urls])
      message.success(`${uploadResults.length} images uploaded successfully!`)
      
      return false // Prevent default upload behavior
    } catch (error) {
      console.error('Multiple upload error:', error)
      message.error('Failed to upload images')
      return false
    } finally {
      setUploadingImages(false)
    }
  }

  const handleImageRemove = (file: any) => {
    const url = file.url || file.response?.secure_url
    if (url) {
      setUploadedImages(prev => prev.filter(img => img !== url))
    }
    return true
  }

  const handlePreview = (file: any) => {
    const url = file.url || file.response?.secure_url || file.thumbUrl
    if (url) {
      setPreviewImage(url)
      setIsPreviewModalVisible(true)
    }
    return false // Prevent default preview behavior
  }

  // Table columns configuration
  const columns = [
    {
      title: 'Event',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: IGetEventResDto) => (
        <div className="flex items-center gap-3">
          {record.galleryImages && record.galleryImages.length > 0 ? (
            // <img 
            //   src={record.galleryImages[0]} 
            //   alt={text}
            //   className="w-12 h-12 rounded-lg object-cover"
            // />

            <Image 
              src={record.galleryImages[0]} 
              alt={text}
              className="w-12 h-12 rounded-lg object-cover"
              style={{
                width: '48px',
                height: '48px',
                objectFit: 'cover',
                borderRadius: '10px',
              }}
            />
          ) : (
            <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-gray-400" />
            </div>
          )}
          <div>
            <div className="font-medium text-gray-900">{text}</div>
            {record.subtitle && (
              <div className="text-sm text-gray-500">{record.subtitle}</div>
            )}
          </div>
        </div>
      ),
    },
    {
      title: 'Date & Time',
      key: 'datetime',
      render: (record: IGetEventResDto) => (
        <div>
          <div className="font-medium text-gray-900">
            {new Date(record.eventDate).toLocaleDateString()}
          </div>
          <div className="text-sm text-gray-500">{record.startTime}</div>
        </div>
      ),
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      render: (location: string, record: IGetEventResDto) => (
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-400" />
          <div>
            <span className="text-sm">{location}</span>
            {record.address && (
              <div className="text-xs text-gray-500">{record.address}</div>
            )}
          </div>
        </div>
      ),
    },
    {
      title: 'Capacity',
      key: 'capacity',
      render: (record: IGetEventResDto) => (
        <div>
          <div className="text-sm font-medium text-gray-900">
            {record.capacity ? `${record.capacity} people` : 'Unlimited'}
          </div>
          <div className="text-xs text-gray-500">
            {record.venueType === 'indoor' ? 'Indoor' : 'Outdoor'}
          </div>
        </div>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      render: (record: IGetEventResDto) => {
        const statusText = getStatusText(record)
        const color = record.isActive ? (record.isFeatured ? 'gold' : 'green') : 'red'
        return <Tag color={color}>{statusText}</Tag>
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: IGetEventResDto) => (
        <Space size="small">
          <Button 
            type="primary" 
            className="table-button"
            onClick={() => handleView(record)}
          >
            <Eye className="table-button-icon" />
            View
          </Button>
          <Button onClick={() => handleEdit(record)} className="table-button table-button-edit">
            <Edit className="table-button-icon" />
            Edit
          </Button>
          <Popconfirm
            title="Remove this event"
            description="Are you sure to remove this event?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              handleDelete(record.id)
            }}
          >
            <Button type="text" className="table-button table-button-danger">
              <DeleteOutlined className="table-button-icon" />
              Delete
            </Button>
          </Popconfirm>
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
              <option value="active">Active</option>
              <option value="featured">Featured</option>
              <option value="inactive">Inactive</option>
            </select>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Spin size="large" />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-red-500 mb-4">{error}</div>
            <Button onClick={refetch} type="primary">
              Retry
            </Button>
          </div>
        ) : (
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
        )}
      </div>

      {/* Empty State */}
      {!loading && !error && filteredEvents.length === 0 && (
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
            name="subtitle"
            label="Subtitle"
          >
            <Input placeholder="Enter event subtitle (optional)" />
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
              label="Start Time"
              rules={[{ required: true, message: 'Please select start time' }]}
            >
              <TimePicker className="w-full" format="HH:mm" />
            </Form.Item>
          </div>

          <Form.Item
            name="endTime"
            label="End Time"
          >
            <TimePicker className="w-full" format="HH:mm" placeholder="Select end time (optional)" />
          </Form.Item>

          <Form.Item
            name="location"
            label="Location"
            rules={[{ required: true, message: 'Please enter event location' }]}
          >
            <Input placeholder="Enter event location" />
          </Form.Item>

          <Form.Item
            name="address"
            label="Address"
          >
            <Input placeholder="Enter full address (optional)" />
          </Form.Item>

          <Form.Item
            name="venueType"
            label="Venue Type"
            rules={[{ required: true, message: 'Please select venue type' }]}
          >
            <Select placeholder="Select venue type">
              <Select.Option value="indoor">Indoor</Select.Option>
              <Select.Option value="outdoor">Outdoor</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="capacity"
            label="Capacity"
          >
            <InputNumber className="w-full" placeholder="Enter event capacity (optional)" min={1} />
          </Form.Item>

          <Form.Item
            name="tags"
            label="Tags"
          >
            <Select
              mode="tags"
              placeholder="Add tags (press Enter to add)"
              style={{ width: '100%' }}
              tokenSeparators={[',']}
            />
          </Form.Item>

          <Form.Item
            label="Event Images"
            name="galleryImages"
          >
            <Upload
              multiple
              listType="picture-card"
              beforeUpload={handleImageUpload}
              onChange={({ fileList }) => {
                // Handle multiple file selection
                if (fileList.length > 0 && fileList.every(file => file.status === 'done')) {
                  handleMultipleImageUpload(fileList)
                }
              }}
              onRemove={handleImageRemove}
              onPreview={handlePreview}
              showUploadList={{
                showPreviewIcon: true,
                showRemoveIcon: true,
              }}
              accept="image/*"
              maxCount={5}
            >
              {uploadedImages.length >= 5 ? null : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
            <div className="text-sm text-gray-500 mt-2">
              Upload up to 5 images. Supported formats: JPG, PNG, GIF. You can select multiple files at once.
            </div>
          </Form.Item>

          <Form.Item
            name="isFeatured"
            label="Featured Event"
            valuePropName="checked"
          >
            <input type="checkbox" className="mr-2" />
            Mark as featured event
          </Form.Item>

          <Form.Item className="mb-0">
            <div className="flex justify-end gap-3">
              <Button onClick={() => setIsCreateModalVisible(false)}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" loading={uploadingImages}>
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
            name="subtitle"
            label="Subtitle"
          >
            <Input placeholder="Enter event subtitle (optional)" />
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
            name="address"
            label="Address"
          >
            <Input placeholder="Enter full address (optional)" />
          </Form.Item>

          <Form.Item
            name="venueType"
            label="Venue Type"
            rules={[{ required: true, message: 'Please select venue type' }]}
          >
            <Select placeholder="Select venue type">
              <Select.Option value="indoor">Indoor</Select.Option>
              <Select.Option value="outdoor">Outdoor</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="capacity"
            label="Capacity"
          >
            <InputNumber className="w-full" placeholder="Enter event capacity (optional)" min={1} />
          </Form.Item>

          <Form.Item
            name="tags"
            label="Tags"
          >
            <Select
              mode="tags"
              placeholder="Add tags (press Enter to add)"
              style={{ width: '100%' }}
              tokenSeparators={[',']}
            />
          </Form.Item>

          <Form.Item
            label="Event Images"
            name="galleryImages"
          >
            <Upload
              multiple
              listType="picture-card"
              beforeUpload={handleImageUpload}
              onChange={({ fileList }) => {
                // Handle multiple file selection
                if (fileList.length > 0 && fileList.every(file => file.status === 'done')) {
                  handleMultipleImageUpload(fileList)
                }
              }}
              onRemove={handleImageRemove}
              onPreview={handlePreview}
              showUploadList={{
                showPreviewIcon: true,
                showRemoveIcon: true,
              }}
              accept="image/*"
              maxCount={5}
              fileList={uploadedImages.map((url, index) => ({
                uid: index.toString(),
                name: `image-${index + 1}`,
                status: 'done',
                url: url,
              }))}
            >
              {uploadedImages.length >= 5 ? null : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
            <div className="text-sm text-gray-500 mt-2">
              Upload up to 5 images. Supported formats: JPG, PNG, GIF. You can select multiple files at once.
            </div>
          </Form.Item>

          <Form.Item
            name="isFeatured"
            label="Featured Event"
            valuePropName="checked"
          >
            <input type="checkbox" className="mr-2" />
            Mark as featured event
          </Form.Item>

          <Form.Item className="mb-0">
            <div className="flex justify-end gap-3">
              <Button onClick={() => {
                setIsEditModalVisible(false)
                setEditingEvent(null)
                setUploadedImages([])
              }}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" loading={uploadingImages}>
                Update Event
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>

      {/* View Event Modal */}
      <Modal
        title="Event Details"
        open={isViewModalVisible}
        onCancel={() => {
          setIsViewModalVisible(false)
          setViewingEvent(null)
        }}
        footer={null}
        width={700}
      >
        {viewingEvent && (
          <div className="space-y-6">
            {/* Event Header */}
            <div className="flex items-start gap-4">
              {viewingEvent.galleryImages && viewingEvent.galleryImages.length > 0 ? (
                // <img 
                //   src={viewingEvent.galleryImages[0]} 
                //   alt={viewingEvent.title}
                //   className="w-20 h-20 rounded-lg object-cover"
                // />
                <Image 
                  src={viewingEvent.galleryImages[0]} 
                  alt={viewingEvent.title}
                  className="w-20 h-20 rounded-lg object-cover"
                  style={{
                    width: '80px',
                    height: '80px',
                    objectFit: 'cover',
                    borderRadius: '10px',
                  }}
                />
              ) : (
                <div className="w-20 h-20 rounded-lg bg-gray-200 flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-gray-400" />
                </div>
              )}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{viewingEvent.title}</h2>
                {viewingEvent.subtitle && (
                  <p className="text-lg text-gray-600 mb-3">{viewingEvent.subtitle}</p>
                )}
                <div className="flex items-center gap-4">
                  <Tag color={viewingEvent.isActive ? (viewingEvent.isFeatured ? 'gold' : 'green') : 'red'}>
                    {getStatusText(viewingEvent)}
                  </Tag>
                  <Tag color="blue">{viewingEvent.venueType === 'indoor' ? 'Indoor' : 'Outdoor'}</Tag>
                </div>
              </div>
            </div>

            {/* Event Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Date & Time */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Date & Time
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {new Date(viewingEvent.eventDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {viewingEvent.startTime}
                      {viewingEvent.endTime && ` - ${viewingEvent.endTime}`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Location
                </h3>
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">{viewingEvent.location}</div>
                  {viewingEvent.address && (
                    <div className="text-xs text-gray-500">{viewingEvent.address}</div>
                  )}
                </div>
              </div>

              {/* Capacity */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Capacity
                </h3>
                <div className="text-sm text-gray-600">
                  {viewingEvent.capacity ? `${viewingEvent.capacity} people` : 'Unlimited'}
                </div>
              </div>

              {/* Tags */}
              {viewingEvent.tags && viewingEvent.tags.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {viewingEvent.tags.map((tag, index) => (
                      <Tag key={index} color="blue">{tag}</Tag>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">{viewingEvent.description}</p>
            </div>

            {/* Gallery Images */}
            {viewingEvent.galleryImages && viewingEvent.galleryImages.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Event Images</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {viewingEvent.galleryImages.map((image, index) => (
                    // <img
                    //   key={index}
                    //   src={image}
                    //   alt={`Event image ${index + 1}`}
                    //   className="w-full h-32 object-cover rounded-lg"
                    // />
                    <Image 
                      src={image}
                      alt={`Event image ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                      style={{
                        width: '100%',
                        height: '128px',
                        objectFit: 'cover',
                        borderRadius: '10px',
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Featured Performers */}
            {viewingEvent.featuredPerformers && viewingEvent.featuredPerformers.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Featured Performers</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {viewingEvent.featuredPerformers.map((performer, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      {performer.image && (
                        // <img
                        //   src={performer.image}
                        //   alt={performer.name}
                        //   className="w-12 h-12 rounded-full object-cover"
                        // />

                        <Image 
                          src={performer.image}
                          alt={performer.name}
                          className="w-12 h-12 rounded-full object-cover"
                          style={{
                            width: '48px',
                            height: '48px',
                            objectFit: 'cover',
                            borderRadius: '50%',
                          }}
                        />
                      )}
                      <div>
                        <div className="font-medium text-gray-900">{performer.name}</div>
                        <div className="text-sm text-gray-600">{performer.title}</div>
                        {performer.subtitle && (
                          <div className="text-xs text-gray-500">{performer.subtitle}</div>
                        )}
                        <div className="text-xs text-blue-600">{performer.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button onClick={() => {
                setIsViewModalVisible(false)
                setViewingEvent(null)
              }}>
                Close
              </Button>
              <Button 
                type="primary" 
                onClick={() => {
                  setIsViewModalVisible(false)
                  setViewingEvent(null)
                  handleEdit(viewingEvent)
                }}
              >
                Edit Event
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Image Preview Modal */}
      <Modal
        title="Image Preview"
        open={isPreviewModalVisible}
        onCancel={() => {
          setIsPreviewModalVisible(false)
          setPreviewImage(null)
        }}
        footer={null}
        width="auto"
        centered
      >
        {previewImage && (
          <div className="text-center">
            <img
              src={previewImage}
              alt="Preview"
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
          </div>
        )}
      </Modal>
    </div>
  )
}