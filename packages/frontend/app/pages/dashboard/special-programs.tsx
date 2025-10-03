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
import { useSpecialPrograms } from '~/hooks/useSpecialPrograms'
import { uploadApi } from '~/services/uploadApi'
import type { IGetSpecialProgramResDto } from '@shared/interfaces/special-programs/response/IGetSpecialProgramResDto'
import type { ICreateSpecialProgramReqDto } from '@shared/interfaces/special-programs/request/ICreateSpecialProgramReqDto'
import type { IUpdateSpecialProgramReqDto } from '@shared/interfaces/special-programs/request/IUpdateSpecialProgramReqDto'
import type { Route } from '../+types'

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Special Programs - Family of Singers Dashboard" },
    { name: "description", content: "Manage special programs, courses, and training sessions from the Family of Singers dashboard." },
  ];
}

export default function SpecialPrograms() {
  const { specialPrograms, loading, error, refetch, createSpecialProgram, updateSpecialProgram, deleteSpecialProgram } = useSpecialPrograms()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [viewMode, setViewMode] = useState('table') // 'cards' or 'table'
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [isViewModalVisible, setIsViewModalVisible] = useState(false)
  const [editingProgram, setEditingProgram] = useState<IGetSpecialProgramResDto | null>(null)
  const [viewingProgram, setViewingProgram] = useState<IGetSpecialProgramResDto | null>(null)
  const [createForm] = Form.useForm()
  const [editForm] = Form.useForm()
  const [uploadingImages, setUploadingImages] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [isPreviewModalVisible, setIsPreviewModalVisible] = useState(false)

  const filteredPrograms = specialPrograms.filter(program => {
    const matchesSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'active' && program.isActive) ||
                         (filterStatus === 'inactive' && !program.isActive)
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (program: IGetSpecialProgramResDto) => {
    if (!program.isActive) return 'bg-red-100 text-red-800'
    return 'bg-green-100 text-green-800'
  }

  const getStatusText = (program: IGetSpecialProgramResDto) => {
    if (!program.isActive) return 'Inactive'
    return 'Active'
  }

  // Form handlers
  const handleCreateSubmit = async (values: any) => {
    try {
      // Convert form values to API format
      const programData: ICreateSpecialProgramReqDto = {
        title: values.title,
        subtitle: values.subtitle,
        description: values.description,
        startDate: values.startDate?.format('YYYY-MM-DD'),
        endDate: values.endDate?.format('YYYY-MM-DD'),
        startTime: values.startTime?.format('HH:mm'),
        endTime: values.endTime?.format('HH:mm'),
        location: values.location,
        address: values.address,
        capacity: values.capacity || 0,
        monthlyTuition: Number(values.monthlyTuition) || 0,
        minAge: values.minAge || 0,
        maxAge: values.maxAge || 0,
        isFeatured: false,
        tags: values.tags || [],
        galleryImages: uploadedImages.length > 0 ? uploadedImages : ['https://example.com/placeholder-image.jpg'],
        instructors: [], // Static for now
        curriculum: [], // Static for now
        whatsIncluded: [], // Static for now
        schedule: [] // Static for now
      }

      await createSpecialProgram(programData)
      message.success('Special program created successfully!')
      setIsCreateModalVisible(false)
      createForm.resetFields()
      setUploadedImages([])
    } catch (error) {
      console.error('Create program error:', error)
      message.error('Failed to create special program')
    }
  }

  const handleEditSubmit = async (values: any) => {
    try {
      if (!editingProgram) return

      // Convert form values to API format
      const programData: IUpdateSpecialProgramReqDto = {
        title: values.title,
        subtitle: values.subtitle,
        description: values.description,
        startDate: values.startDate?.format('YYYY-MM-DD'),
        endDate: values.endDate?.format('YYYY-MM-DD'),
        startTime: values.startTime?.format('HH:mm'),
        endTime: values.endTime?.format('HH:mm'),
        location: values.location,
        address: values.address,
        capacity: values.capacity || 0,
        monthlyTuition: Number(values.monthlyTuition) || 0,
        minAge: values.minAge || 0,
        maxAge: values.maxAge || 0,
        isFeatured: false,
        tags: values.tags || [],
        galleryImages: uploadedImages.length > 0 ? uploadedImages : editingProgram.galleryImages || ['https://example.com/placeholder-image.jpg'],
        instructors: [], // Static for now
        curriculum: [], // Static for now
        whatsIncluded: [], // Static for now
        schedule: [] // Static for now
      }

      await updateSpecialProgram(editingProgram.id, programData)
      message.success('Special program updated successfully!')
      setIsEditModalVisible(false)
      setEditingProgram(null)
      setUploadedImages([])
      editForm.resetFields()
    } catch (error) {
      console.error('Update program error:', error)
      message.error('Failed to update special program')
    }
  }

  const handleEdit = (program: IGetSpecialProgramResDto) => {
    setEditingProgram(program)
    setUploadedImages(program.galleryImages || [])
    editForm.setFieldsValue({
      title: program.title,
      subtitle: program.subtitle,
      description: program.description,
      startDate: program.startDate ? new Date(program.startDate) : null,
      endDate: program.endDate ? new Date(program.endDate) : null,
      startTime: program.startTime,
      endTime: program.endTime,
      location: program.location,
      address: program.address,
      capacity: program.capacity,
      monthlyTuition: program.monthlyTuition,
      minAge: program.minAge,
      maxAge: program.maxAge,
      tags: program.tags || []
    })
    setIsEditModalVisible(true)
  }

  const handleView = (program: IGetSpecialProgramResDto) => {
    setViewingProgram(program)
    setIsViewModalVisible(true)
  }

  const handleDelete = async (programId: number) => {
    try {
      await deleteSpecialProgram(programId)
      message.success('Special program deleted successfully!')
    } catch (error) {
      console.error('Delete program error:', error)
      message.error('Failed to delete special program')
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
      title: 'Program',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: IGetSpecialProgramResDto) => (
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
      title: 'Duration',
      key: 'duration',
      render: (record: IGetSpecialProgramResDto) => (
        <div>
          <div className="font-medium text-gray-900">
            {record.startDate && new Date(record.startDate).toLocaleDateString()} - {record.endDate && new Date(record.endDate).toLocaleDateString()}
          </div>
          <div className="text-sm text-gray-500">{record.startTime} - {record.endTime}</div>
        </div>
      ),
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      render: (location: string, record: IGetSpecialProgramResDto) => (
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
      title: 'Details',
      key: 'details',
      render: (record: IGetSpecialProgramResDto) => (
        <div>
          <div className="text-sm font-medium text-gray-900">
            {record.capacity} students
          </div>
          <div className="text-xs text-gray-500">
            Ages {record.minAge}-{record.maxAge}
          </div>
          <div className="text-xs text-green-600 font-medium">
            ${record.monthlyTuition}/month
          </div>
        </div>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      render: (record: IGetSpecialProgramResDto) => {
        const statusText = getStatusText(record)
        const color = record.isActive ? 'green' : 'red'
        return <Tag color={color}>{statusText}</Tag>
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: IGetSpecialProgramResDto) => (
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
            title="Remove this program"
            description="Are you sure to remove this program?"
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
          <h1 className="text-2xl font-bold text-gray-900">Special Programs</h1>
          <p className="text-gray-600">Manage your special programs, courses, and training sessions</p>
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCreateModalVisible(true)}
            className="bg-theme-clr hover:bg-yellow-600 text-black font-medium py-3 px-6 rounded-lg transition-colors duration-300 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create Program
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
                placeholder="Search programs..."
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
              <option value="all">All Programs</option>
              <option value="active">Active</option>
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
            dataSource={filteredPrograms}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => 
                `${range[0]}-${range[1]} of ${total} programs`,
            }}
            className="special-programs-table"
          />
        )}
      </div>

      {/* Empty State */}
      {!loading && !error && filteredPrograms.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No programs found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || filterStatus !== 'all' 
              ? 'Try adjusting your search or filter criteria.'
              : 'Get started by creating your first special program.'
            }
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCreateModalVisible(true)}
            className="bg-theme-clr hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center gap-2 mx-auto"
          >
            <Plus className="w-5 h-5" />
            Create Program
          </motion.button>
        </motion.div>
      )}

      {/* Create Program Modal */}
      <Modal
        title="Create New Special Program"
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
            label="Program Title"
            rules={[{ required: true, message: 'Please enter program title' }]}
          >
            <Input placeholder="Enter program title" />
          </Form.Item>

          <Form.Item
            name="subtitle"
            label="Subtitle"
          >
            <Input placeholder="Enter program subtitle (optional)" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter program description' }]}
          >
            <Input.TextArea rows={3} placeholder="Enter program description" />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="startDate"
              label="Start Date"
              rules={[{ required: true, message: 'Please select start date' }]}
            >
              <DatePicker className="w-full" />
            </Form.Item>

            <Form.Item
              name="endDate"
              label="End Date"
              rules={[{ required: true, message: 'Please select end date' }]}
            >
              <DatePicker className="w-full" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="startTime"
              label="Start Time"
              rules={[{ required: true, message: 'Please select start time' }]}
            >
              <TimePicker className="w-full" format="HH:mm" />
            </Form.Item>

            <Form.Item
              name="endTime"
              label="End Time"
              rules={[{ required: true, message: 'Please select end time' }]}
            >
              <TimePicker className="w-full" format="HH:mm" />
            </Form.Item>
          </div>

          <Form.Item
            name="location"
            label="Location"
            rules={[{ required: true, message: 'Please enter program location' }]}
          >
            <Input placeholder="Enter program location" />
          </Form.Item>

          <Form.Item
            name="address"
            label="Address"
          >
            <Input placeholder="Enter full address (optional)" />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="capacity"
              label="Capacity"
              rules={[{ required: true, message: 'Please enter capacity' }]}
            >
              <InputNumber className="w-full" placeholder="Enter capacity" min={1} />
            </Form.Item>

            <Form.Item
              name="monthlyTuition"
              label="Monthly Tuition"
              rules={[{ required: true, message: 'Please enter monthly tuition' }]}
            >
              <InputNumber
                placeholder="Enter monthly tuition"
                className="w-full"
                min={0}
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => Number(value!.replace(/\$\s?|(,*)/g, '')) as any}
              />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="minAge"
              label="Minimum Age"
              rules={[{ required: true, message: 'Please enter minimum age' }]}
            >
              <InputNumber
                placeholder="Min age"
                className="w-full"
                min={1}
                max={100}
              />
            </Form.Item>

            <Form.Item
              name="maxAge"
              label="Maximum Age"
              rules={[{ required: true, message: 'Please enter maximum age' }]}
            >
              <InputNumber
                placeholder="Max age"
                className="w-full"
                min={1}
                max={100}
              />
            </Form.Item>
          </div>

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
            label="Program Images"
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

          <Form.Item className="mb-0">
            <div className="flex justify-end gap-3">
              <Button onClick={() => setIsCreateModalVisible(false)}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" loading={uploadingImages}>
                Create Program
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Program Modal */}
      <Modal
        title="Edit Program"
        open={isEditModalVisible}
        onCancel={() => {
          setIsEditModalVisible(false)
          setEditingProgram(null)
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
            label="Program Title"
            rules={[{ required: true, message: 'Please enter program title' }]}
          >
            <Input placeholder="Enter program title" />
          </Form.Item>

          <Form.Item
            name="subtitle"
            label="Subtitle"
          >
            <Input placeholder="Enter program subtitle (optional)" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter program description' }]}
          >
            <Input.TextArea rows={3} placeholder="Enter program description" />
          </Form.Item>

          <Form.Item
            name="location"
            label="Location"
            rules={[{ required: true, message: 'Please enter program location' }]}
          >
            <Input placeholder="Enter program location" />
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

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="minAge"
              label="Minimum Age"
              rules={[{ required: true, message: 'Please enter minimum age' }]}
            >
              <InputNumber
                placeholder="Min age"
                className="w-full"
                min={1}
                max={100}
              />
            </Form.Item>

            <Form.Item
              name="maxAge"
              label="Maximum Age"
              rules={[{ required: true, message: 'Please enter maximum age' }]}
            >
              <InputNumber
                placeholder="Max age"
                className="w-full"
                min={1}
                max={100}
              />
            </Form.Item>
          </div>

          <Form.Item
            name="monthlyTuition"
            label="Monthly Tuition"
            rules={[{ required: true, message: 'Please enter monthly tuition' }]}
          >
            <InputNumber
              placeholder="Enter monthly tuition"
              className="w-full"
              min={0}
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => Number(value!.replace(/\$\s?|(,*)/g, '')) as any}
            />
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
            label="Featured Program"
            valuePropName="checked"
          >
            <input type="checkbox" className="mr-2" />
            Mark as featured program
          </Form.Item>

          <Form.Item className="mb-0">
            <div className="flex justify-end gap-3">
              <Button onClick={() => {
                setIsEditModalVisible(false)
                setEditingProgram(null)
                setUploadedImages([])
              }}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" loading={uploadingImages}>
                Update Program
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>

      {/* View Program Modal */}
      <Modal
        title="Program Details"
        open={isViewModalVisible}
        onCancel={() => {
          setIsViewModalVisible(false)
          setViewingProgram(null)
        }}
        footer={null}
        width={700}
      >
        {viewingProgram && (
          <div className="space-y-6">
            {/* Program Header */}
            <div className="flex items-start gap-4">
              {viewingProgram.galleryImages && viewingProgram.galleryImages.length > 0 ? (
                // <img 
                //   src={viewingProgram.galleryImages[0]} 
                //   alt={viewingProgram.title}
                //   className="w-20 h-20 rounded-lg object-cover"
                // />
                <Image 
                  src={viewingProgram.galleryImages[0]} 
                  alt={viewingProgram.title}
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
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{viewingProgram.title}</h2>
                {viewingProgram.subtitle && (
                  <p className="text-lg text-gray-600 mb-3">{viewingProgram.subtitle}</p>
                )}
                <div className="flex items-center gap-4">
                  <Tag color={viewingProgram.isActive ? 'green' : 'red'}>
                    {getStatusText(viewingProgram)}
                  </Tag>
                  <Tag color="blue">Ages {viewingProgram.minAge}-{viewingProgram.maxAge}</Tag>
                </div>
              </div>
            </div>

            {/* Program Details Grid */}
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
                      {viewingProgram.startDate && new Date(viewingProgram.startDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })} - {viewingProgram.endDate && new Date(viewingProgram.endDate).toLocaleDateString('en-US', {
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
                      {viewingProgram.startTime}
                      {viewingProgram.endTime && ` - ${viewingProgram.endTime}`}
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
                  <div className="text-sm text-gray-600">{viewingProgram.location}</div>
                  {viewingProgram.address && (
                    <div className="text-xs text-gray-500">{viewingProgram.address}</div>
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
                  {viewingProgram.capacity ? `${viewingProgram.capacity} people` : 'Unlimited'}
                </div>
              </div>

              {/* Tags */}
              {viewingProgram.tags && viewingProgram.tags.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {viewingProgram.tags.map((tag, index) => (
                      <Tag key={index} color="blue">{tag}</Tag>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">{viewingProgram.description}</p>
            </div>

            {/* Gallery Images */}
            {viewingProgram.galleryImages && viewingProgram.galleryImages.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Program Images</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {viewingProgram.galleryImages.map((image, index) => (
                    // <img
                    //   key={index}
                    //   src={image}
                    //   alt={`Program image ${index + 1}`}
                    //   className="w-full h-32 object-cover rounded-lg"
                    // />
                    <Image 
                      src={image}
                      alt={`Program image ${index + 1}`}
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

            {/* Instructors */}
            {viewingProgram.instructors && viewingProgram.instructors.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Instructors</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {viewingProgram.instructors.map((instructor: any, index: number) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      {instructor.image && (
                        <Image 
                          src={instructor.image}
                          alt={instructor.name}
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
                        <div className="font-medium text-gray-900">{instructor.name}</div>
                        <div className="text-sm text-gray-600">{instructor.title}</div>
                        {instructor.subtitle && (
                          <div className="text-xs text-gray-500">{instructor.subtitle}</div>
                        )}
                        <div className="text-xs text-blue-600">{instructor.role}</div>
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
                setViewingProgram(null)
              }}>
                Close
              </Button>
              <Button 
                type="primary" 
                onClick={() => {
                  setIsViewModalVisible(false)
                  setViewingProgram(null)
                  handleEdit(viewingProgram)
                }}
              >
                Edit Program
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