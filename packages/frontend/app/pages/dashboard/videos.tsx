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
import { Modal, Form, Input, Select, Button, message, Upload as AntUpload, DatePicker, Table, Tag, Avatar, Space, Dropdown, Spin, Popconfirm } from 'antd'
import { MoreOutlined, PlusOutlined, UploadOutlined, DeleteOutlined } from '@ant-design/icons'
import CoverImage1 from '~/assets/cover-image1.png'
import CoverImage2 from '~/assets/cover-image2.png'
import CoverImage3 from '~/assets/cover-image3.png'
import Thumbnail1 from '~/assets/thumbs/thumb1.png'
import Thumbnail2 from '~/assets/thumbs/thumb2.png'
import Thumbnail3 from '~/assets/thumbs/thumb3.png'
import Thumbnail4 from '~/assets/thumbs/thumb4.png'
import { useVideos } from '~/hooks/useVideos'
import type { IGetVideoResDto } from '@shared/interfaces/videos/response/IGetVideoResDto'
import type { ICreateVideoReqDto } from '@shared/interfaces/videos/request/ICreateVideoReqDto'
import type { IUpdateVideoReqDto } from '@shared/interfaces/videos/request/IUpdateVideoReqDto'
import type { Route } from '../+types'

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Videos - Family of Singers Dashboard" },
    { name: "description", content: "Manage choir videos, YouTube content, and media from the Family of Singers dashboard." },
  ];
}

export default function Videos() {
  const { videos, loading, error, refetch, createVideo, updateVideo, deleteVideo } = useVideos()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [isViewModalVisible, setIsViewModalVisible] = useState(false)
  const [editingVideo, setEditingVideo] = useState<IGetVideoResDto | null>(null)
  const [viewingVideo, setViewingVideo] = useState<IGetVideoResDto | null>(null)
  const [createForm] = Form.useForm()
  const [editForm] = Form.useForm()

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (video.description && video.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         video.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterCategory === 'all' || video.type === filterCategory
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (video: IGetVideoResDto) => {
    if (!video.isActive) return 'bg-red-100 text-red-800'
    if (video.isFeatured) return 'bg-yellow-100 text-yellow-800'
    return 'bg-green-100 text-green-800'
  }

  const getStatusText = (video: IGetVideoResDto) => {
    if (!video.isActive) return 'Inactive'
    if (video.isFeatured) return 'Featured'
    return 'Active'
  }

  const getCategoryColor = (type: string) => {
    switch (type) {
      case 'performance': return 'bg-blue-100 text-blue-800'
      case 'concert': return 'bg-red-100 text-red-800'
      case 'other': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string): string | null => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
    const match = url.match(regex)
    return match ? match[1] : null
  }

  // Get YouTube thumbnail URL
  const getYouTubeThumbnail = (url: string): string => {
    const videoId = getYouTubeVideoId(url)
    if (videoId) {
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    }
    return ''
  }

  // Form handlers
  const handleCreateSubmit = async (values: any) => {
    try {
      // Convert form values to API format
      const videoData: ICreateVideoReqDto = {
        url: values.url,
        title: values.title,
        description: values.description,
        type: values.type,
        isActive: values.isActive !== false,
        isFeatured: values.isFeatured || false
      }

      await createVideo(videoData)
      message.success('Video added successfully!')
      setIsCreateModalVisible(false)
      createForm.resetFields()
    } catch (error) {
      console.error('Create video error:', error)
      message.error('Failed to add video')
    }
  }

  const handleEditSubmit = async (values: any) => {
    try {
      if (!editingVideo) return

      // Convert form values to API format
      const videoData: IUpdateVideoReqDto = {
        url: values.url,
        title: values.title,
        description: values.description,
        type: values.type,
        isActive: values.isActive,
        isFeatured: values.isFeatured
      }

      await updateVideo(editingVideo.id, videoData)
      message.success('Video updated successfully!')
      setIsEditModalVisible(false)
      setEditingVideo(null)
      editForm.resetFields()
    } catch (error) {
      console.error('Update video error:', error)
      message.error('Failed to update video')
    }
  }

  const handleEdit = (video: IGetVideoResDto) => {
    setEditingVideo(video)
    editForm.setFieldsValue({
      url: video.url,
      title: video.title,
      description: video.description,
      type: video.type,
      isActive: video.isActive,
      isFeatured: video.isFeatured
    })
    setIsEditModalVisible(true)
  }

  const handleView = (video: IGetVideoResDto) => {
    setViewingVideo(video)
    setIsViewModalVisible(true)
  }

  const handleDelete = async (videoId: number) => {
    try {
      await deleteVideo(videoId)
      message.success('Video deleted successfully!')
    } catch (error) {
      console.error('Delete video error:', error)
      message.error('Failed to delete video')
    }
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
              <option value="performance">Performance</option>
              <option value="concert">Concert</option>
              <option value="other">Other</option>
            </select>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Videos Table */}
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
          dataSource={filteredVideos}
          columns={[
            {
              title: 'Video',
              key: 'video',
                render: (_, video: IGetVideoResDto) => {
                  const thumbnailUrl = getYouTubeThumbnail(video.url)
                  return (
                <div className="flex items-center gap-3">
                  <div className="relative w-16 h-12 rounded-lg overflow-hidden">
                        {thumbnailUrl ? (
                    <img 
                            src={thumbnailUrl} 
                      alt={video.title}
                      className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback to placeholder if thumbnail fails to load
                              e.currentTarget.style.display = 'none'
                              e.currentTarget.nextElementSibling?.classList.remove('hidden')
                            }}
                    />
                        ) : null}
                        <div className={`absolute inset-0 bg-gray-200 flex items-center justify-center ${thumbnailUrl ? 'hidden' : ''}`}>
                          <Play className="w-6 h-6 text-gray-400" />
                        </div>
                    <div className="absolute bottom-1 right-1">
                          <div className="bg-black/70 text-white px-1 py-0.5 rounded text-xs">
                            <Play className="w-3 h-3" />
                          </div>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 line-clamp-2">{video.title}</div>
                        <div className="text-sm text-gray-600 line-clamp-1">{video.description || 'No description'}</div>
                  </div>
                </div>
                  )
                },
              },
              {
                title: 'Type',
                key: 'type',
                render: (_, video: IGetVideoResDto) => (
                  <Tag color={video.type === 'performance' ? 'blue' : 
                             video.type === 'concert' ? 'red' : 'gray'}>
                    {video.type.charAt(0).toUpperCase() + video.type.slice(1)}
                </Tag>
              ),
            },
            {
              title: 'Status',
              key: 'status',
                render: (_, video: IGetVideoResDto) => {
                  const statusText = getStatusText(video)
                  const color = video.isActive ? (video.isFeatured ? 'gold' : 'green') : 'red'
                  return <Tag color={color}>{statusText}</Tag>
                },
              },
              {
                title: 'URL',
                key: 'url',
                render: (_, video: IGetVideoResDto) => (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <ExternalLink className="w-3 h-3 text-gray-400" />
                    <span className="truncate max-w-32">{video.url}</span>
                </div>
              ),
            },
            {
                title: 'Created',
                key: 'createdAt',
                render: (_, video: IGetVideoResDto) => (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-3 h-3 text-gray-400" />
                    <span>{video.createdAt ? new Date(video.createdAt).toLocaleDateString() : 'N/A'}</span>
                </div>
              ),
            },
            {
              title: 'Actions',
              key: 'actions',
                render: (_, video: IGetVideoResDto) => (
                  <Space size="small">
                  <Button 
                    type="primary" 
                    className="table-button"
                      onClick={() => handleView(video)}
                  >
                      <Eye className="table-button-icon" />
                      View
                  </Button>
                  <Button 
                    type="primary" 
                    className="table-button table-button-edit"
                    onClick={() => handleEdit(video)}
                  >
                    <Edit className="table-button-icon" />
                    Edit
                  </Button>
                    <Button 
                      type="primary" 
                      className="table-button"
                      onClick={() => window.open(video.url, '_blank')}
                    >
                      <ExternalLink className="table-button-icon" />
                      Watch
                    </Button>
                    <Popconfirm
                      title="Remove this video"
                      description="Are you sure to remove this video?"
                      okText="Yes"
                      cancelText="No"
                      onConfirm={() => {
                        handleDelete(video.id)
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
        )}
      </div>

      {/* Empty State */}
      {!loading && !error && filteredVideos.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
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
            name="url"
            label="Video URL"
            rules={[
              { required: true, message: 'Please enter video URL' },
              { 
                pattern: /^https?:\/\//, 
                message: 'Please enter a valid URL starting with http:// or https://' 
              }
            ]}
          >
            <Input placeholder="https://www.youtube.com/watch?v=..." />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="type"
              label="Type"
              rules={[{ required: true, message: 'Please select type' }]}
            >
              <Select placeholder="Select type">
                <Select.Option value="performance">Performance</Select.Option>
                <Select.Option value="concert">Concert</Select.Option>
                <Select.Option value="other">Other</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="isActive"
              label="Status"
              valuePropName="checked"
            >
              <input type="checkbox" className="mr-2" />
              Active
            </Form.Item>
          </div>

          <Form.Item
            name="isFeatured"
            label="Featured Video"
            valuePropName="checked"
          >
            <input type="checkbox" className="mr-2" />
            Mark as featured video
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
            name="url"
            label="Video URL"
            rules={[
              { required: true, message: 'Please enter video URL' },
              { 
                pattern: /^https?:\/\//, 
                message: 'Please enter a valid URL starting with http:// or https://' 
              }
            ]}
          >
            <Input placeholder="https://www.youtube.com/watch?v=..." />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="type"
              label="Type"
              rules={[{ required: true, message: 'Please select type' }]}
            >
              <Select placeholder="Select type">
                <Select.Option value="performance">Performance</Select.Option>
                <Select.Option value="concert">Concert</Select.Option>
                <Select.Option value="other">Other</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="isActive"
              label="Status"
              valuePropName="checked"
            >
              <input type="checkbox" className="mr-2" />
              Active
            </Form.Item>
          </div>

          <Form.Item
            name="isFeatured"
            label="Featured Video"
            valuePropName="checked"
          >
            <input type="checkbox" className="mr-2" />
            Mark as featured video
          </Form.Item>

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

      {/* View Video Modal */}
      <Modal
        title="Video Details"
        open={isViewModalVisible}
        onCancel={() => {
          setIsViewModalVisible(false)
          setViewingVideo(null)
        }}
        footer={null}
        width={700}
      >
        {viewingVideo && (
          <div className="space-y-6">
            {/* Video Header */}
            <div className="flex items-start gap-4">
              <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                {(() => {
                  const thumbnailUrl = getYouTubeThumbnail(viewingVideo.url)
                  return thumbnailUrl ? (
                    <img 
                      src={thumbnailUrl} 
                      alt={viewingVideo.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to placeholder if thumbnail fails to load
                        e.currentTarget.style.display = 'none'
                        e.currentTarget.nextElementSibling?.classList.remove('hidden')
                      }}
                    />
                  ) : null
                })()}
                <div className={`absolute inset-0 bg-gray-200 flex items-center justify-center ${getYouTubeThumbnail(viewingVideo.url) ? 'hidden' : ''}`}>
                  <Play className="w-8 h-8 text-gray-400" />
                </div>
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <Play className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{viewingVideo.title}</h2>
                {viewingVideo.description && (
                  <p className="text-lg text-gray-600 mb-3">{viewingVideo.description}</p>
                )}
                <div className="flex items-center gap-4">
                  <Tag color={viewingVideo.isActive ? (viewingVideo.isFeatured ? 'gold' : 'green') : 'red'}>
                    {getStatusText(viewingVideo)}
                  </Tag>
                  <Tag color={viewingVideo.type === 'performance' ? 'blue' : 
                             viewingVideo.type === 'concert' ? 'red' : 'gray'}>
                    {viewingVideo.type.charAt(0).toUpperCase() + viewingVideo.type.slice(1)}
                  </Tag>
                </div>
              </div>
            </div>

            {/* Video Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* URL */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Video URL
                </h3>
                <div className="text-sm text-gray-600 break-all">{viewingVideo.url}</div>
              </div>

              {/* Created Date */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Created Date
                </h3>
                <div className="text-sm text-gray-600">
                  {viewingVideo.createdAt ? new Date(viewingVideo.createdAt).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : 'N/A'}
                </div>
              </div>
            </div>

            {/* Description */}
            {viewingVideo.description && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">{viewingVideo.description}</p>
              </div>
            )}

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button onClick={() => {
                setIsViewModalVisible(false)
                setViewingVideo(null)
              }}>
                Close
              </Button>
              <Button 
                type="primary" 
                onClick={() => window.open(viewingVideo.url, '_blank')}
              >
                Watch Video
              </Button>
              <Button 
                type="primary" 
                onClick={() => {
                  setIsViewModalVisible(false)
                  setViewingVideo(null)
                  handleEdit(viewingVideo)
                }}
              >
                Edit Video
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}