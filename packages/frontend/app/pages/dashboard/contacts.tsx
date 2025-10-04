import React, { useState } from 'react'
import { 
  Mail, 
  Phone, 
  User, 
  MessageSquare, 
  Search, 
  Filter,
  Edit,
  Trash2,
  Eye,
  MoreVertical,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Modal, Form, Input, Select, Button, Table, Tag, Space, Dropdown, Spin, Popconfirm } from 'antd'
import { MoreOutlined, DeleteOutlined } from '@ant-design/icons'
import { toast } from 'sonner'
import { useContacts } from '~/hooks/useContacts'
import type { IGetContactResDto } from '@shared/interfaces/contacts/response/IGetContactResDto'
import { EContactStatus } from '@shared/enum/EContactStatus.enum'
import type { Route } from '../+types'

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contact Messages - Family of Singers Dashboard" },
    { name: "description", content: "Manage contact messages and inquiries from the Family of Singers dashboard." },
  ];
}

export default function Contacts() {
  const { contacts, loading, error, refetch, updateContact, deleteContact } = useContacts()
  
  // Show error notification if there's an error
  React.useEffect(() => {
    if (error) {
      toast.error('Failed to load contacts', {
        description: error,
        duration: 5000,
      })
    }
  }, [error])

  // Handle retry with notification
  const handleRetry = async () => {
    const loadingToast = toast.loading('Retrying...', {
      description: 'Attempting to load contacts again.',
    })
    
    try {
      await refetch()
      toast.dismiss(loadingToast)
      toast.success('Contacts loaded successfully!', {
        description: 'The contact list has been refreshed.',
        duration: 3000,
      })
    } catch (error) {
      toast.dismiss(loadingToast)
      const errorMessage = error instanceof Error ? error.message : 'Failed to load contacts'
      toast.error('Retry Failed', {
        description: errorMessage,
        duration: 5000,
      })
    }
  }
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [isViewModalVisible, setIsViewModalVisible] = useState(false)
  const [editingContact, setEditingContact] = useState<IGetContactResDto | null>(null)
  const [viewingContact, setViewingContact] = useState<IGetContactResDto | null>(null)
  const [editForm] = Form.useForm()

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'new' && contact.status === EContactStatus.NEW) ||
                         (filterStatus === 'in_progress' && contact.status === EContactStatus.IN_PROGRESS) ||
                         (filterStatus === 'responded' && contact.status === EContactStatus.RESPONDED) ||
                         (filterStatus === 'closed' && contact.status === EContactStatus.CLOSED)
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (contact: IGetContactResDto) => {
    switch (contact.status) {
      case EContactStatus.NEW: return 'bg-blue-100 text-blue-800'
      case EContactStatus.IN_PROGRESS: return 'bg-yellow-100 text-yellow-800'
      case EContactStatus.RESPONDED: return 'bg-green-100 text-green-800'
      case EContactStatus.CLOSED: return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (contact: IGetContactResDto) => {
    switch (contact.status) {
      case EContactStatus.NEW: return 'New'
      case EContactStatus.IN_PROGRESS: return 'In Progress'
      case EContactStatus.RESPONDED: return 'Responded'
      case EContactStatus.CLOSED: return 'Closed'
      default: return 'Unknown'
    }
  }

  const getStatusIcon = (contact: IGetContactResDto) => {
    switch (contact.status) {
      case EContactStatus.NEW: return <AlertCircle className="w-4 h-4" />
      case EContactStatus.IN_PROGRESS: return <Clock className="w-4 h-4" />
      case EContactStatus.RESPONDED: return <CheckCircle className="w-4 h-4" />
      case EContactStatus.CLOSED: return <XCircle className="w-4 h-4" />
      default: return <AlertCircle className="w-4 h-4" />
    }
  }


  const handleEditSubmit = async (values: any) => {
    if (!editingContact) return

    const loadingToast = toast.loading('Updating contact status...', {
      description: 'Please wait while we update the contact information.',
    })

    try {
      const contactData = {
        status: values.status,
        adminNotes: values.adminNotes
      }

      await updateContact(editingContact.id, contactData)
      
      toast.dismiss(loadingToast)
      toast.success('Contact updated successfully!', {
        description: 'The contact status has been updated.',
        duration: 4000,
      })
      
      setIsEditModalVisible(false)
      setEditingContact(null)
      editForm.resetFields()
    } catch (error) {
      console.error('Update contact error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to update contact status'
      toast.dismiss(loadingToast)
      toast.error('Update Failed', {
        description: errorMessage,
        duration: 5000,
      })
    }
  }

  const handleEdit = (contact: IGetContactResDto) => {
    setEditingContact(contact)
    editForm.setFieldsValue({
      status: contact.status,
      adminNotes: contact.adminNotes
    })
    setIsEditModalVisible(true)
  }

  const handleView = (contact: IGetContactResDto) => {
    setViewingContact(contact)
    setIsViewModalVisible(true)
  }

  const handleDelete = async (contactId: number) => {
    try {
      // Show loading toast
      const loadingToast = toast.loading('Deleting contact message...', {
        description: 'Please wait while we remove the contact.',
      })

      await deleteContact(contactId)
      
      // Dismiss loading toast and show success
      toast.dismiss(loadingToast)
      toast.success('Contact deleted successfully!', {
        description: 'The contact message has been removed.',
        duration: 4000,
      })
    } catch (error) {
      console.error('Delete contact error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete contact message'
      toast.error('Delete Failed', {
        description: errorMessage,
        duration: 5000,
      })
    }
  }


  // Table columns configuration
  const columns = [
    {
      title: 'Contact',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (text: string, record: IGetContactResDto) => (
        <div className="flex items-center gap-3">
          <div>
            <div className="font-medium text-gray-900">{text}</div>
            <div className="text-sm text-gray-500">{record.email}</div>
            {record.phoneNumber && (
              <div className="text-xs text-gray-400">{record.phoneNumber}</div>
            )}
          </div>
        </div>
      ),
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      render: (subject: string, record: IGetContactResDto) => (
        <div>
          <div className="font-medium text-gray-900">{subject}</div>
          <div className="text-sm text-gray-500 truncate max-w-xs">
            {record.message}
          </div>
        </div>
      ),
    },
    {
      title: 'Date',
      key: 'date',
      render: (record: IGetContactResDto) => (
        <div>
          <div className="font-medium text-gray-900">
            {record.createdAt ? new Date(record.createdAt).toLocaleDateString() : 'N/A'}
          </div>
          <div className="text-sm text-gray-500">
            {record.createdAt ? new Date(record.createdAt).toLocaleTimeString() : 'N/A'}
          </div>
        </div>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      render: (record: IGetContactResDto) => {
        const statusText = getStatusText(record)
        const statusIcon = getStatusIcon(record)
        const color = record.status === EContactStatus.NEW ? 'blue' : 
                     record.status === EContactStatus.IN_PROGRESS ? 'orange' : 
                     record.status === EContactStatus.RESPONDED ? 'green' : 'gray'
        return (
          <Tag color={color}>
            {statusText}
          </Tag>
        )
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: IGetContactResDto) => (
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
            title="Remove this contact message"
            description="Are you sure to remove this contact message?"
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
          <h1 className="text-2xl font-bold text-gray-900">Contact Messages</h1>
          <p className="text-gray-600">Manage contact messages and inquiries from visitors</p>
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
                placeholder="Search contacts..."
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
              <option value="all">All Messages</option>
              <option value="new">New</option>
              <option value="in_progress">In Progress</option>
              <option value="responded">Responded</option>
              <option value="closed">Closed</option>
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
            <Button onClick={handleRetry} type="primary">
              Retry
            </Button>
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={filteredContacts}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => 
                `${range[0]}-${range[1]} of ${total} messages`,
            }}
            className="contacts-table"
          />
        )}
      </div>

      {/* Empty State */}
      {!loading && !error && filteredContacts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No contact messages found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || filterStatus !== 'all' 
              ? 'Try adjusting your search or filter criteria.'
              : 'No contact messages have been received yet.'
            }
          </p>
        </motion.div>
      )}


      {/* Edit Contact Modal */}
      <Modal
        title="Update Contact Status"
        open={isEditModalVisible}
        onCancel={() => {
          setIsEditModalVisible(false)
          setEditingContact(null)
        }}
        footer={null}
        width={500}
      >
        {editingContact && (
          <div className="space-y-4">
            {/* Contact Info Display */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Contact Information</h3>
              <div className="space-y-2">
                <div><strong>Name:</strong> {editingContact.fullName}</div>
                <div><strong>Email:</strong> {editingContact.email}</div>
                {editingContact.phoneNumber && (
                  <div><strong>Phone:</strong> {editingContact.phoneNumber}</div>
                )}
                <div><strong>Subject:</strong> {editingContact.subject}</div>
              </div>
            </div>

        <Form
          form={editForm}
          layout="vertical"
          onFinish={handleEditSubmit}
          className="mt-4"
        >
              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true, message: 'Please select status' }]}
              >
                <Select placeholder="Select status">
                  <Select.Option value={EContactStatus.NEW}>New</Select.Option>
                  <Select.Option value={EContactStatus.IN_PROGRESS}>In Progress</Select.Option>
                  <Select.Option value={EContactStatus.RESPONDED}>Responded</Select.Option>
                  <Select.Option value={EContactStatus.CLOSED}>Closed</Select.Option>
                </Select>
              </Form.Item>

          <Form.Item
                name="adminNotes"
                label="Admin Notes"
              >
                <Input.TextArea 
                  rows={4} 
                  placeholder="Add admin notes (optional)" 
            />
          </Form.Item>

          <Form.Item className="mb-0">
            <div className="flex justify-end gap-3">
              <Button onClick={() => {
                setIsEditModalVisible(false)
                    setEditingContact(null)
              }}>
                Cancel
              </Button>
                  <Button type="primary" htmlType="submit">
                    Update Status
              </Button>
            </div>
          </Form.Item>
        </Form>
          </div>
        )}
      </Modal>

      {/* View Contact Modal */}
      <Modal
        title="Contact Message Details"
        open={isViewModalVisible}
        onCancel={() => {
          setIsViewModalVisible(false)
          setViewingContact(null)
        }}
        footer={null}
        width={700}
      >
        {viewingContact && (
          <div className="space-y-6">
            {/* Contact Header */}
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{viewingContact.fullName}</h2>
                <div className="flex items-center gap-2 mb-3">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">{viewingContact.email}</span>
                </div>
                {viewingContact.phoneNumber && (
                  <div className="flex items-center gap-2 mb-3">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">{viewingContact.phoneNumber}</span>
                  </div>
                )}
                <div className="flex items-center gap-4">
                  <Tag color={viewingContact.status === EContactStatus.NEW ? 'blue' : 
                             viewingContact.status === EContactStatus.IN_PROGRESS ? 'orange' : 
                             viewingContact.status === EContactStatus.RESPONDED ? 'green' : 'gray'}>
                    {getStatusText(viewingContact)}
                  </Tag>
                  {viewingContact.createdAt && (
                    <span className="text-sm text-gray-500">
                      {new Date(viewingContact.createdAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Subject */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Subject
                </h3>
                <div className="text-sm text-gray-600">{viewingContact.subject}</div>
              </div>

              {/* Date */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Date Received
                </h3>
                <div className="text-sm text-gray-600">
                  {viewingContact.createdAt ? new Date(viewingContact.createdAt).toLocaleString() : 'N/A'}
                </div>
              </div>
            </div>

            {/* Message */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Message</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{viewingContact.message}</p>
              </div>
            </div>

            {/* Admin Notes */}
            {viewingContact.adminNotes && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Admin Notes</h3>
                <div className="bg-yellow-50 rounded-lg p-4">
                  <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{viewingContact.adminNotes}</p>
                </div>
              </div>
            )}

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button onClick={() => {
                setIsViewModalVisible(false)
                setViewingContact(null)
              }}>
                Close
              </Button>
              <Button 
                type="primary" 
                onClick={() => {
                  setIsViewModalVisible(false)
                  setViewingContact(null)
                  handleEdit(viewingContact)
                }}
              >
                Edit Contact
              </Button>
            </div>
          </div>
        )}
      </Modal>

    </div>
  )
}