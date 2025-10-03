import React, { useState } from 'react'
import { 
  DollarSign, 
  Clock, 
  FileText, 
  Plus, 
  Search, 
  Filter,
  Edit,
  Trash2,
  Eye,
  MoreVertical
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Modal, Form, Input, Select, Button, message, Upload, InputNumber, Table, Tag, Space, Dropdown, Spin, Popconfirm, Image } from 'antd'
import { PlusOutlined, UploadOutlined, MoreOutlined, DeleteOutlined } from '@ant-design/icons'
import CoverImage1 from '~/assets/cover-image1.png'
import CoverImage2 from '~/assets/cover-image2.png'
import CoverImage3 from '~/assets/cover-image3.png'
import { useCommissions } from '~/hooks/useCommissions'
import { uploadApi } from '~/services/uploadApi'
import type { IGetCommissionResDto } from '@shared/interfaces/commissions/response/IGetCommissionResDto'
import type { ICreateCommissionReqDto } from '@shared/interfaces/commissions/request/ICreateCommissionReqDto'
import type { IUpdateCommissionReqDto } from '@shared/interfaces/commissions/request/IUpdateCommissionReqDto'
import type { Route } from '../+types'

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Commissions - Family of Singers Dashboard" },
    { name: "description", content: "Manage choir commissions, pricing, and services from the Family of Singers dashboard." },
  ];
}

export default function Commissions() {
  const { commissions, loading, error, refetch, createCommission, updateCommission, deleteCommission } = useCommissions()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [isViewModalVisible, setIsViewModalVisible] = useState(false)
  const [editingCommission, setEditingCommission] = useState<IGetCommissionResDto | null>(null)
  const [viewingCommission, setViewingCommission] = useState<IGetCommissionResDto | null>(null)
  const [createForm] = Form.useForm()
  const [editForm] = Form.useForm()
  const [uploadingImage, setUploadingImage] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [isPreviewModalVisible, setIsPreviewModalVisible] = useState(false)

  const filteredCommissions = commissions.filter(commission => {
    const matchesSearch = commission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (commission.description && commission.description.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesSearch
  })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  // Form handlers
  const handleCreateSubmit = async (values: any) => {
    try {
      // Convert form values to API format
      const commissionData: ICreateCommissionReqDto = {
        title: values.title,
        description: values.description,
        amount: Number(values.amount),
        duration: values.duration,
        inclusions: values.inclusions || [],
        coverImage: uploadedImage || values.coverImage || undefined
      }

      await createCommission(commissionData)
      message.success('Commission created successfully!')
      setIsCreateModalVisible(false)
      createForm.resetFields()
      setUploadedImage(null)
    } catch (error) {
      console.error('Create commission error:', error)
      message.error('Failed to create commission')
    }
  }

  const handleEditSubmit = async (values: any) => {
    try {
      if (!editingCommission) return

      // Convert form values to API format
      const commissionData: IUpdateCommissionReqDto = {
        title: values.title,
        description: values.description,
        amount: Number(values.amount),
        duration: values.duration,
        inclusions: values.inclusions || [],
        coverImage: uploadedImage || values.coverImage || undefined
      }

      await updateCommission(editingCommission.id, commissionData)
      message.success('Commission updated successfully!')
      setIsEditModalVisible(false)
      setEditingCommission(null)
      setUploadedImage(null)
      editForm.resetFields()
    } catch (error) {
      console.error('Update commission error:', error)
      message.error('Failed to update commission')
    }
  }

  const handleEdit = (commission: IGetCommissionResDto) => {
    setEditingCommission(commission)
    setUploadedImage(commission.coverImage || null)
    editForm.setFieldsValue({
      title: commission.title,
      description: commission.description,
      amount: commission.amount,
      duration: commission.duration,
      inclusions: commission.inclusions || [],
      coverImage: commission.coverImage
    })
    setIsEditModalVisible(true)
  }

  const handleView = (commission: IGetCommissionResDto) => {
    setViewingCommission(commission)
    setIsViewModalVisible(true)
  }

  const handleDelete = async (commissionId: number) => {
    try {
      await deleteCommission(commissionId)
      message.success('Commission deleted successfully!')
    } catch (error) {
      console.error('Delete commission error:', error)
      message.error('Failed to delete commission')
    }
  }

  // Upload handlers
  const handleImageUpload = async (file: File) => {
    try {
      setUploadingImage(true)
      const uploadResult = await uploadApi.uploadSingleImage(file)
      setUploadedImage(uploadResult.secure_url)
      message.success('Cover image uploaded successfully!')
      return false // Prevent default upload behavior
    } catch (error) {
      console.error('Upload error:', error)
      message.error('Failed to upload image')
      return false
    } finally {
      setUploadingImage(false)
    }
  }

  const handleImageRemove = (file: any) => {
    setUploadedImage(null)
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
      title: 'Commission',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: IGetCommissionResDto) => (
        <div className="flex items-center gap-3">
          {record.coverImage ? (
            <Image 
              src={record.coverImage} 
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
              <DollarSign className="w-6 h-6 text-gray-400" />
            </div>
          )}
          <div>
            <div className="font-medium text-gray-900">{text}</div>
            {record.description && (
              <div className="text-sm text-gray-500 line-clamp-1">{record.description}</div>
            )}
          </div>
        </div>
      ),
    },
    {
      title: 'Amount',
      key: 'amount',
      render: (record: IGetCommissionResDto) => (
        <div className="text-lg font-bold text-green-600">
          {formatCurrency(record.amount)}
        </div>
      ),
    },
    {
      title: 'Duration',
      key: 'duration',
      render: (record: IGetCommissionResDto) => (
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <span className="text-sm">{record.duration || 'Not specified'}</span>
        </div>
      ),
    },
    {
      title: 'Inclusions',
      key: 'inclusions',
      render: (record: IGetCommissionResDto) => (
        <div>
          {record.inclusions && record.inclusions.length > 0 ? (
            <div className="text-sm text-gray-600">
              {record.inclusions.length} item{record.inclusions.length > 1 ? 's' : ''}
            </div>
          ) : (
            <div className="text-sm text-gray-400">No inclusions</div>
          )}
        </div>
      ),
    },
    {
      title: 'Created',
      key: 'createdAt',
      render: (record: IGetCommissionResDto) => (
        <div className="text-sm text-gray-600">
          {record.createdAt ? new Date(record.createdAt).toLocaleDateString() : 'N/A'}
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: IGetCommissionResDto) => (
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
            title="Remove this commission"
            description="Are you sure to remove this commission?"
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
          <h1 className="text-2xl font-bold text-gray-900">Commissions</h1>
          <p className="text-gray-600">Manage your choir commissions and pricing</p>
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCreateModalVisible(true)}
            className="bg-theme-clr hover:bg-yellow-600 text-black font-medium py-3 px-6 rounded-lg transition-colors duration-300 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create Commission
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
                placeholder="Search commissions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme-clr focus:border-transparent"
              />
            </div>
          </div>

          {/* Filter */}
          <div className="flex gap-2">
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
            dataSource={filteredCommissions}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => 
                `${range[0]}-${range[1]} of ${total} commissions`,
            }}
            className="commissions-table"
          />
        )}
      </div>

      {/* Empty State */}
      {!loading && !error && filteredCommissions.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <DollarSign className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No commissions found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm 
              ? 'Try adjusting your search criteria.'
              : 'Get started by creating your first commission.'
            }
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCreateModalVisible(true)}
            className="bg-theme-clr hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center gap-2 mx-auto"
          >
            <Plus className="w-5 h-5" />
            Create Commission
          </motion.button>
        </motion.div>
      )}

      {/* Create Commission Modal */}
      <Modal
        title="Create New Commission"
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
            label="Commission Title"
            rules={[{ required: true, message: 'Please enter commission title' }]}
          >
            <Input placeholder="Enter commission title" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter commission description' }]}
          >
            <Input.TextArea rows={3} placeholder="Enter commission description" />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="amount"
              label="Amount"
              rules={[{ required: true, message: 'Please enter commission amount' }]}
            >
              <InputNumber
                placeholder="Enter amount"
                className="w-full"
                min={0}
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => Number(value!.replace(/\$\s?|(,*)/g, '')) as any}
              />
            </Form.Item>

            <Form.Item
              name="duration"
              label="Duration"
            >
              <Input placeholder="e.g., 2 weeks, 1 month" />
            </Form.Item>
          </div>

          <Form.Item
            name="inclusions"
            label="Inclusions"
          >
            <Select
              mode="tags"
              placeholder="Add inclusions (press Enter to add)"
              style={{ width: '100%' }}
              tokenSeparators={[',']}
            />
          </Form.Item>

          <Form.Item
            label="Cover Image"
            name="coverImage"
          >
            <Upload
              listType="picture-card"
              beforeUpload={handleImageUpload}
              onRemove={handleImageRemove}
              onPreview={handlePreview}
              showUploadList={{
                showPreviewIcon: true,
                showRemoveIcon: true,
              }}
              accept="image/*"
              maxCount={1}
              fileList={uploadedImage ? [{
                uid: '1',
                name: 'cover-image',
                status: 'done',
                url: uploadedImage,
              }] : []}
            >
              {uploadedImage ? null : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
            <div className="text-sm text-gray-500 mt-2">
              Upload a cover image for this commission. Supported formats: JPG, PNG, GIF.
            </div>
          </Form.Item>

          <Form.Item className="mb-0">
            <div className="flex justify-end gap-3">
              <Button onClick={() => setIsCreateModalVisible(false)}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" loading={uploadingImage}>
                Create Commission
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Commission Modal */}
      <Modal
        title="Edit Commission"
        open={isEditModalVisible}
        onCancel={() => {
          setIsEditModalVisible(false)
          setEditingCommission(null)
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
            label="Commission Title"
            rules={[{ required: true, message: 'Please enter commission title' }]}
          >
            <Input placeholder="Enter commission title" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter commission description' }]}
          >
            <Input.TextArea rows={3} placeholder="Enter commission description" />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="amount"
              label="Amount"
              rules={[{ required: true, message: 'Please enter commission amount' }]}
            >
              <InputNumber
                placeholder="Enter amount"
                className="w-full"
                min={0}
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => Number(value!.replace(/\$\s?|(,*)/g, '')) as any}
              />
            </Form.Item>

            <Form.Item
              name="duration"
              label="Duration"
            >
              <Input placeholder="e.g., 2 weeks, 1 month" />
            </Form.Item>
          </div>

          <Form.Item
            name="inclusions"
            label="Inclusions"
          >
            <Select
              mode="tags"
              placeholder="Add inclusions (press Enter to add)"
              style={{ width: '100%' }}
              tokenSeparators={[',']}
            />
          </Form.Item>

          <Form.Item
            label="Cover Image"
            name="coverImage"
          >
            <Upload
              listType="picture-card"
              beforeUpload={handleImageUpload}
              onRemove={handleImageRemove}
              onPreview={handlePreview}
              showUploadList={{
                showPreviewIcon: true,
                showRemoveIcon: true,
              }}
              accept="image/*"
              maxCount={1}
              fileList={uploadedImage ? [{
                uid: '1',
                name: 'cover-image',
                status: 'done',
                url: uploadedImage,
              }] : []}
            >
              {uploadedImage ? null : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
            <div className="text-sm text-gray-500 mt-2">
              Upload a cover image for this commission. Supported formats: JPG, PNG, GIF.
            </div>
          </Form.Item>

          <Form.Item className="mb-0">
            <div className="flex justify-end gap-3">
              <Button onClick={() => {
                setIsEditModalVisible(false)
                setEditingCommission(null)
                setUploadedImage(null)
              }}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" loading={uploadingImage}>
                Update Commission
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>

      {/* View Commission Modal */}
      <Modal
        title="Commission Details"
        open={isViewModalVisible}
        onCancel={() => {
          setIsViewModalVisible(false)
          setViewingCommission(null)
        }}
        footer={null}
        width={700}
      >
        {viewingCommission && (
          <div className="space-y-6">
            {/* Commission Header */}
            <div className="flex items-start gap-4">
              {viewingCommission.coverImage ? (
                <Image 
                  src={viewingCommission.coverImage} 
                  alt={viewingCommission.title}
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
                  <DollarSign className="w-8 h-8 text-gray-400" />
                </div>
              )}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{viewingCommission.title}</h2>
                {viewingCommission.description && (
                  <p className="text-lg text-gray-600 mb-3">{viewingCommission.description}</p>
                )}
                <div className="flex items-center gap-4">
                  <div className="text-2xl font-bold text-green-600">
                    {formatCurrency(viewingCommission.amount)}
                  </div>
                  {viewingCommission.duration && (
                    <Tag color="blue">{viewingCommission.duration}</Tag>
                  )}
                </div>
              </div>
            </div>

            {/* Commission Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Amount */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Commission Amount
                </h3>
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(viewingCommission.amount)}
                </div>
              </div>

              {/* Duration */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Duration
                </h3>
                <div className="text-sm text-gray-600">
                  {viewingCommission.duration || 'Not specified'}
                </div>
              </div>

              {/* Inclusions */}
              {viewingCommission.inclusions && viewingCommission.inclusions.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-4 md:col-span-2">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Inclusions
                  </h3>
                  <div className="space-y-2">
                    {viewingCommission.inclusions.map((inclusion, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">{inclusion}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            {viewingCommission.description && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">{viewingCommission.description}</p>
              </div>
            )}

            {/* Cover Image */}
            {viewingCommission.coverImage && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Cover Image</h3>
                <div className="flex justify-center">
                  <Image 
                    src={viewingCommission.coverImage}
                    alt={viewingCommission.title}
                    className="max-w-full h-64 object-cover rounded-lg"
                    style={{
                      maxWidth: '100%',
                      height: '256px',
                      objectFit: 'cover',
                      borderRadius: '10px',
                    }}
                  />
                </div>
              </div>
            )}

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button onClick={() => {
                setIsViewModalVisible(false)
                setViewingCommission(null)
              }}>
                Close
              </Button>
              <Button 
                type="primary" 
                onClick={() => {
                  setIsViewModalVisible(false)
                  setViewingCommission(null)
                  handleEdit(viewingCommission)
                }}
              >
                Edit Commission
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