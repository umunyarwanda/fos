import React, { useState } from 'react'
import { 
  Play, 
  Search, 
  Filter,
  Plus,
  Calendar,
  ExternalLink,
  MoreVertical,
  Edit,
  Trash2,
  Upload,
  Eye
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Modal, Form, Input, Select, Button, message, Upload as AntUpload, DatePicker, Table, Tag, Avatar, Space, Dropdown } from 'antd'
import { MoreOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import CoverImage1 from '~/assets/cover-image1.png'
import CoverImage2 from '~/assets/cover-image2.png'
import CoverImage3 from '~/assets/cover-image3.png'
import Thumbnail1 from '~/assets/thumbs/thumb1.png'
import Thumbnail2 from '~/assets/thumbs/thumb2.png'
import Thumbnail3 from '~/assets/thumbs/thumb3.png'
import Thumbnail4 from '~/assets/thumbs/thumb4.png'
import type { Route } from '../+types'

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Videos - Family of Singers Dashboard" },
    { name: "description", content: "Manage choir videos, YouTube content, and media from the Family of Singers dashboard." },
  ];
}

export default function Videos() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [editingVideo, setEditingVideo] = useState(null)
  const [createForm] = Form.useForm()
  const [editForm] = Form.useForm()

  const videos = [
    {
      id: 1,
      title: "AKIRA ISHIMWE BY FAMILY OF SINGERS CHOIR",
      description: "Beautiful performance of Akira Ishimwe by our talented choir members",
      youtubeUrl: "https://www.youtube.com/watch?v=s_mc02cBYm8",
      thumbnail: Thumbnail1,
      category: "Performance",
      uploadDate: "2024-12-01",
      views: 1250,
      duration: "4:32",
      status: "published"
    },
    {
      id: 2,
      title: "IMANA YANYU [NTIGARAGARA] By Family of Singers Choir [Official Live recording 2025]",
      description: "Official live recording of our beautiful worship song",
      youtubeUrl: "https://www.youtube.com/watch?v=c5YncXlGAiY",
      thumbnail: Thumbnail2,
      category: "Worship",
      uploadDate: "2024-11-15",
      views: 2100,
      duration: "5:45",
      status: "published"
    },
    {
      id: 3,
      title: "IKIDENDEZI By Family of Singers Choir. Live Concert 2025",
      description: "Live concert performance showcasing our choir's talent",
      youtubeUrl: "https://www.youtube.com/watch?v=ymRAZmynOcY",
      thumbnail: Thumbnail3,
      category: "Concert",
      uploadDate: "2024-10-20",
      views: 3200,
      duration: "6:15",
      status: "published"
    },
    {
      id: 4,
      title: "ABIZERA By Family Of Singers Choir",
      description: "Inspirational performance of Abizera by our choir",
      youtubeUrl: "https://www.youtube.com/watch?v=A1QMnmDhSDo",
      thumbnail: Thumbnail4,
      category: "Inspirational",
      uploadDate: "2024-09-10",
      views: 1800,
      duration: "4:58",
      status: "published"
    },
    {
      id: 5,
      title: "Christmas Special Performance 2024",
      description: "Special Christmas performance featuring holiday classics",
      youtubeUrl: "https://www.youtube.com/watch?v=example5",
      thumbnail: CoverImage1,
      category: "Holiday",
      uploadDate: "2024-12-15",
      views: 950,
      duration: "7:20",
      status: "draft"
    }
  ]

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterCategory === 'all' || video.category === filterCategory
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800'
      case 'draft': return 'bg-yellow-100 text-yellow-800'
      case 'private': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Performance': return 'bg-blue-100 text-blue-800'
      case 'Worship': return 'bg-purple-100 text-purple-800'
      case 'Concert': return 'bg-red-100 text-red-800'
      case 'Inspirational': return 'bg-green-100 text-green-800'
      case 'Holiday': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  // Form handlers
  const handleCreateSubmit = async (values: any) => {
    try {
      console.log('Create video data:', values)
      message.success('Video added successfully!')
      setIsCreateModalVisible(false)
      createForm.resetFields()
    } catch (error) {
      message.error('Failed to add video')
    }
  }

  const handleEditSubmit = async (values: any) => {
    try {
      console.log('Edit video data:', values)
      message.success('Video updated successfully!')
      setIsEditModalVisible(false)
      setEditingVideo(null)
      editForm.resetFields()
    } catch (error) {
      message.error('Failed to update video')
    }
  }

  const handleEdit = (video: any) => {
    setEditingVideo(video)
    editForm.setFieldsValue({
      title: video.title,
      description: video.description,
      youtubeUrl: video.youtubeUrl,
      category: video.category,
      status: video.status
    })
    setIsEditModalVisible(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Videos</h1>
          <p className="text-gray-600">Manage your choir videos and YouTube content</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCreateModalVisible(true)}
          className="bg-theme-clr hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Video
        </motion.button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Play className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">24</h3>
              <p className="text-gray-600 text-sm">Total Videos</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">12.5K</h3>
              <p className="text-gray-600 text-sm">Total Views</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Upload className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">5</h3>
              <p className="text-gray-600 text-sm">Categories</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">3</h3>
              <p className="text-gray-600 text-sm">This Month</p>
            </div>
          </div>
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
                placeholder="Search videos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme-clr focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme-clr focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="Performance">Performance</option>
              <option value="Worship">Worship</option>
              <option value="Concert">Concert</option>
              <option value="Inspirational">Inspirational</option>
              <option value="Holiday">Holiday</option>
            </select>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Videos Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <Table
          dataSource={filteredVideos}
          columns={[
            {
              title: 'Video',
              key: 'video',
              render: (_, video) => (
                <div className="flex items-center gap-3">
                  <div className="relative w-16 h-12 rounded-lg overflow-hidden">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-1 right-1">
                      <span className="bg-black/70 text-white px-1 py-0.5 rounded text-xs">
                        {video.duration}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 line-clamp-2">{video.title}</div>
                    <div className="text-sm text-gray-600 line-clamp-1">{video.description}</div>
                  </div>
                </div>
              ),
            },
            {
              title: 'Category',
              key: 'category',
              render: (_, video) => (
                <Tag color={video.category === 'Performance' ? 'blue' : 
                           video.category === 'Worship' ? 'purple' :
                           video.category === 'Concert' ? 'red' :
                           video.category === 'Inspirational' ? 'green' : 'orange'}>
                  {video.category}
                </Tag>
              ),
            },
            {
              title: 'Status',
              key: 'status',
              render: (_, video) => (
                <Tag color={video.status === 'published' ? 'green' : 
                           video.status === 'draft' ? 'yellow' : 'gray'}>
                  {video.status}
                </Tag>
              ),
            },
            {
              title: 'Views',
              key: 'views',
              render: (_, video) => (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Eye className="w-3 h-3 text-gray-400" />
                  <span>{video.views.toLocaleString()}</span>
                </div>
              ),
            },
            {
              title: 'Upload Date',
              key: 'uploadDate',
              render: (_, video) => (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-3 h-3 text-gray-400" />
                  <span>{video.uploadDate}</span>
                </div>
              ),
            },
            {
              title: 'Actions',
              key: 'actions',
              render: (_, video) => (
                <Space>
                  <Button 
                    type="primary" 
                    className="table-button"
                    onClick={() => window.open(video.youtubeUrl, '_blank')}
                  >
                    <ExternalLink className="table-button-icon" />
                    Watch
                  </Button>
                  <Button 
                    type="primary" 
                    className="table-button table-button-edit"
                    onClick={() => handleEdit(video)}
                  >
                    <Edit className="table-button-icon" />
                    Edit
                  </Button>
                  <Dropdown
                    menu={{
                      items: [
                        {
                          key: 'edit',
                          label: 'Edit Video',
                          icon: <Edit className="w-3 h-3" />,
                          onClick: () => handleEdit(video),
                        },
                        {
                          key: 'watch',
                          label: 'Watch on YouTube',
                          icon: <ExternalLink className="w-3 h-3" />,
                          onClick: () => window.open(video.youtubeUrl, '_blank'),
                        },
                        {
                          key: 'duplicate',
                          label: 'Duplicate',
                          icon: <Upload className="w-3 h-3" />,
                        },
                        {
                          key: 'delete',
                          label: 'Delete',
                          icon: <Trash2 className="w-3 h-3" />,
                          danger: true,
                        },
                      ],
                    }}
                    trigger={['click']}
                  >
                    <Button 
                      className="table-button table-button-danger"
                    >
                      <MoreOutlined className="table-button-icon" />
                      More
                    </Button>
                  </Dropdown>
                </Space>
              ),
            },
          ]}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} of ${total} videos`,
          }}
          className="videos-table"
        />
      </div>

      {/* Empty State */}
      {filteredVideos.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-white rounded-xl shadow-lg"
        >
          <Play className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No videos found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || filterCategory !== 'all' 
              ? 'Try adjusting your search or filter criteria.'
              : 'Get started by adding your first video.'
            }
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCreateModalVisible(true)}
            className="bg-theme-clr hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center gap-2 mx-auto"
          >
            <Plus className="w-5 h-5" />
            Add Video
          </motion.button>
        </motion.div>
      )}

      {/* Create Video Modal */}
      <Modal
        title="Add New Video"
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
            label="Video Title"
            rules={[{ required: true, message: 'Please enter video title' }]}
          >
            <Input placeholder="Enter video title" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter video description' }]}
          >
            <Input.TextArea rows={3} placeholder="Enter video description" />
          </Form.Item>

          <Form.Item
            name="youtubeUrl"
            label="YouTube URL"
            rules={[
              { required: true, message: 'Please enter YouTube URL' },
              { 
                pattern: /^https:\/\/www\.youtube\.com\/watch\?v=/, 
                message: 'Please enter a valid YouTube URL' 
              }
            ]}
          >
            <Input placeholder="https://www.youtube.com/watch?v=..." />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true, message: 'Please select category' }]}
            >
              <Select placeholder="Select category">
                <Select.Option value="Performance">Performance</Select.Option>
                <Select.Option value="Worship">Worship</Select.Option>
                <Select.Option value="Concert">Concert</Select.Option>
                <Select.Option value="Inspirational">Inspirational</Select.Option>
                <Select.Option value="Holiday">Holiday</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true, message: 'Please select status' }]}
            >
              <Select placeholder="Select status">
                <Select.Option value="published">Published</Select.Option>
                <Select.Option value="draft">Draft</Select.Option>
                <Select.Option value="private">Private</Select.Option>
              </Select>
            </Form.Item>
          </div>

          <Form.Item
            name="uploadDate"
            label="Upload Date"
            rules={[{ required: true, message: 'Please select upload date' }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item
            name="duration"
            label="Duration (mm:ss)"
            rules={[{ required: true, message: 'Please enter video duration' }]}
          >
            <Input placeholder="4:32" />
          </Form.Item>

          <Form.Item
            name="thumbnail"
            label="Custom Thumbnail"
          >
            <AntUpload
              listType="picture-card"
              maxCount={1}
              beforeUpload={() => false}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </AntUpload>
          </Form.Item>

          <Form.Item className="mb-0">
            <div className="flex justify-end gap-3">
              <Button onClick={() => setIsCreateModalVisible(false)}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Add Video
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Video Modal */}
      <Modal
        title="Edit Video"
        open={isEditModalVisible}
        onCancel={() => {
          setIsEditModalVisible(false)
          setEditingVideo(null)
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
            label="Video Title"
            rules={[{ required: true, message: 'Please enter video title' }]}
          >
            <Input placeholder="Enter video title" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter video description' }]}
          >
            <Input.TextArea rows={3} placeholder="Enter video description" />
          </Form.Item>

          <Form.Item
            name="youtubeUrl"
            label="YouTube URL"
            rules={[
              { required: true, message: 'Please enter YouTube URL' },
              { 
                pattern: /^https:\/\/www\.youtube\.com\/watch\?v=/, 
                message: 'Please enter a valid YouTube URL' 
              }
            ]}
          >
            <Input placeholder="https://www.youtube.com/watch?v=..." />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true, message: 'Please select category' }]}
            >
              <Select placeholder="Select category">
                <Select.Option value="Performance">Performance</Select.Option>
                <Select.Option value="Worship">Worship</Select.Option>
                <Select.Option value="Concert">Concert</Select.Option>
                <Select.Option value="Inspirational">Inspirational</Select.Option>
                <Select.Option value="Holiday">Holiday</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true, message: 'Please select status' }]}
            >
              <Select placeholder="Select status">
                <Select.Option value="published">Published</Select.Option>
                <Select.Option value="draft">Draft</Select.Option>
                <Select.Option value="private">Private</Select.Option>
              </Select>
            </Form.Item>
          </div>

          <Form.Item className="mb-0">
            <div className="flex justify-end gap-3">
              <Button onClick={() => {
                setIsEditModalVisible(false)
                setEditingVideo(null)
              }}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Update Video
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}