import React, { useState } from 'react'
import { 
  Users, 
  Search, 
  Filter,
  Plus,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Music,
  MoreVertical,
  Edit,
  Trash2,
  UserPlus,
  Eye
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Modal, Form, Input, Select, Button, message, Upload, DatePicker, InputNumber, Table, Tag, Avatar, Space, Dropdown } from 'antd'
import { MoreOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import CoverImage1 from '~/assets/cover-image1.png'
import CoverImage2 from '~/assets/cover-image2.png'
import CoverImage3 from '~/assets/cover-image3.png'
import type { Route } from '../+types'

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Members - Family of Singers Dashboard" },
    { name: "description", content: "Manage choir members, roles, and contact information from the Family of Singers dashboard." },
  ];
}

export default function Members() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('all')
  const [viewMode, setViewMode] = useState('grid') // grid or list
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [editingMember, setEditingMember] = useState(null)
  const [createForm] = Form.useForm()
  const [editForm] = Form.useForm()

  const members = [
    {
      id: 1,
      name: 'Sarah Mukamana',
      role: 'Soprano',
      email: 'sarah@example.com',
      phone: '+250 788 123 456',
      location: 'Kigali, Rwanda',
      joinDate: 'Jan 15, 2024',
      performances: 24,
      avatar: CoverImage1,
      status: 'active',
      voice: 'Soprano',
      experience: '5 years'
    },
    {
      id: 2,
      name: 'Peter Nkurunziza',
      role: 'Tenor',
      email: 'peter@example.com',
      phone: '+250 789 987 654',
      location: 'Kigali, Rwanda',
      joinDate: 'Feb 20, 2024',
      performances: 18,
      avatar: CoverImage2,
      status: 'active',
      voice: 'Tenor',
      experience: '3 years'
    },
    {
      id: 3,
      name: 'Grace Uwimana',
      role: 'Alto',
      email: 'grace@example.com',
      phone: '+250 787 456 789',
      location: 'Kigali, Rwanda',
      joinDate: 'Mar 10, 2024',
      performances: 15,
      avatar: CoverImage3,
      status: 'active',
      voice: 'Alto',
      experience: '2 years'
    },
    {
      id: 4,
      name: 'Jean Baptiste',
      role: 'Conductor',
      email: 'jean@example.com',
      phone: '+250 786 321 654',
      location: 'Kigali, Rwanda',
      joinDate: 'Jan 1, 2020',
      performances: 120,
      avatar: CoverImage1,
      status: 'active',
      voice: 'Conductor',
      experience: '15 years'
    },
    {
      id: 5,
      name: 'Marie Claire',
      role: 'Bass',
      email: 'marie@example.com',
      phone: '+250 785 147 258',
      location: 'Kigali, Rwanda',
      joinDate: 'Apr 5, 2024',
      performances: 12,
      avatar: CoverImage2,
      status: 'inactive',
      voice: 'Bass',
      experience: '1 year'
    },
    {
      id: 6,
      name: 'David Nkurunziza',
      role: 'Tenor',
      email: 'david@example.com',
      phone: '+250 784 963 741',
      location: 'Kigali, Rwanda',
      joinDate: 'May 12, 2024',
      performances: 8,
      avatar: CoverImage3,
      status: 'active',
      voice: 'Tenor',
      experience: '6 months'
    }
  ]

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterRole === 'all' || member.role === filterRole
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Conductor': return 'bg-purple-100 text-purple-800'
      case 'Soprano': return 'bg-pink-100 text-pink-800'
      case 'Alto': return 'bg-blue-100 text-blue-800'
      case 'Tenor': return 'bg-green-100 text-green-800'
      case 'Bass': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  // Form handlers
  const handleCreateSubmit = async (values: any) => {
    try {
      console.log('Create member data:', values)
      message.success('Member added successfully!')
      setIsCreateModalVisible(false)
      createForm.resetFields()
    } catch (error) {
      message.error('Failed to add member')
    }
  }

  const handleEditSubmit = async (values: any) => {
    try {
      console.log('Edit member data:', values)
      message.success('Member updated successfully!')
      setIsEditModalVisible(false)
      setEditingMember(null)
      editForm.resetFields()
    } catch (error) {
      message.error('Failed to update member')
    }
  }

  const handleEdit = (member: any) => {
    setEditingMember(member)
    editForm.setFieldsValue({
      name: member.name,
      email: member.email,
      phone: member.phone,
      location: member.location,
      voice: member.voice,
      experience: member.experience,
      status: member.status
    })
    setIsEditModalVisible(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Members</h1>
          <p className="text-gray-600">Manage your choir members and their information</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCreateModalVisible(true)}
          className="bg-theme-clr hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center gap-2"
        >
          <UserPlus className="w-5 h-5" />
          Add Member
        </motion.button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">45</h3>
              <p className="text-gray-600 text-sm">Total Members</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">42</h3>
              <p className="text-gray-600 text-sm">Active</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Music className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">5</h3>
              <p className="text-gray-600 text-sm">Voice Parts</p>
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
              <p className="text-gray-600 text-sm">New This Month</p>
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
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme-clr focus:border-transparent"
              />
            </div>
          </div>

          {/* Role Filter */}
          <div className="flex gap-2">
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme-clr focus:border-transparent"
            >
              <option value="all">All Roles</option>
              <option value="Conductor">Conductor</option>
              <option value="Soprano">Soprano</option>
              <option value="Alto">Alto</option>
              <option value="Tenor">Tenor</option>
              <option value="Bass">Bass</option>
            </select>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <Table
          dataSource={filteredMembers}
          columns={[
            {
              title: 'Member',
              key: 'member',
              render: (_, member) => (
                <div className="flex items-center gap-3">
                  <Avatar 
                    src={member.avatar} 
                    size={48}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{member.name}</div>
                    <div className="text-sm text-gray-600">{member.role}</div>
                  </div>
                </div>
              ),
            },
            {
              title: 'Contact',
              key: 'contact',
              render: (_, member) => (
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-3 h-3 text-gray-400" />
                    <span className="text-gray-600">{member.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-3 h-3 text-gray-400" />
                    <span className="text-gray-600">{member.phone}</span>
                  </div>
                </div>
              ),
            },
            {
              title: 'Location',
              key: 'location',
              render: (_, member) => (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-3 h-3 text-gray-400" />
                  <span>{member.location}</span>
                </div>
              ),
            },
            {
              title: 'Voice Part',
              key: 'voice',
              render: (_, member) => (
                <Tag color={member.voice === 'Conductor' ? 'purple' : 
                           member.voice === 'Soprano' ? 'pink' :
                           member.voice === 'Alto' ? 'blue' :
                           member.voice === 'Tenor' ? 'green' : 'orange'}>
                  {member.voice}
                </Tag>
              ),
            },
            {
              title: 'Status',
              key: 'status',
              render: (_, member) => (
                <Tag color={member.status === 'active' ? 'green' : 
                           member.status === 'inactive' ? 'gray' : 'yellow'}>
                  {member.status}
                </Tag>
              ),
            },
            {
              title: 'Experience',
              key: 'experience',
              render: (_, member) => (
                <span className="text-sm text-gray-600">{member.experience}</span>
              ),
            },
            {
              title: 'Performances',
              key: 'performances',
              render: (_, member) => (
                <span className="font-semibold text-gray-900">{member.performances}</span>
              ),
            },
            {
              title: 'Joined',
              key: 'joinDate',
              render: (_, member) => (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-3 h-3 text-gray-400" />
                  <span>{member.joinDate}</span>
                </div>
              ),
            },
            {
              title: 'Actions',
              key: 'actions',
              render: (_, member) => (
                <Space>
                  <Button 
                    type="primary" 
                    className="table-button"
                  >
                    <Eye className="table-button-icon" />
                    View
                  </Button>
                  <Button 
                    type="primary" 
                    className="table-button table-button-edit"
                    onClick={() => handleEdit(member)}
                  >
                    <Edit className="table-button-icon" />
                    Edit
                  </Button>
                  <Dropdown
                    menu={{
                      items: [
                        {
                          key: 'edit',
                          label: 'Edit Member',
                          icon: <Edit className="w-3 h-3" />,
                          onClick: () => handleEdit(member),
                        },
                        {
                          key: 'email',
                          label: 'Send Email',
                          icon: <Mail className="w-3 h-3" />,
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
              `${range[0]}-${range[1]} of ${total} members`,
          }}
          className="members-table"
        />
      </div>

      {/* Empty State */}
      {filteredMembers.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-white rounded-xl shadow-lg"
        >
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No members found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || filterRole !== 'all' 
              ? 'Try adjusting your search or filter criteria.'
              : 'Get started by adding your first choir member.'
            }
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCreateModalVisible(true)}
            className="bg-theme-clr hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center gap-2 mx-auto"
          >
            <UserPlus className="w-5 h-5" />
            Add Member
          </motion.button>
        </motion.div>
      )}

      {/* Create Member Modal */}
      <Modal
        title="Add New Member"
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
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[{ required: true, message: 'Please enter first name' }]}
            >
              <Input placeholder="Enter first name" />
            </Form.Item>

            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[{ required: true, message: 'Please enter last name' }]}
            >
              <Input placeholder="Enter last name" />
            </Form.Item>
          </div>

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
            name="location"
            label="Location"
            rules={[{ required: true, message: 'Please enter location' }]}
          >
            <Input placeholder="Enter member's location" />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
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
                <Select.Option value="conductor">Conductor</Select.Option>
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
          </div>

          <Form.Item
            name="joinDate"
            label="Join Date"
            rules={[{ required: true, message: 'Please select join date' }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select status' }]}
          >
            <Select placeholder="Select member status">
              <Select.Option value="active">Active</Select.Option>
              <Select.Option value="inactive">Inactive</Select.Option>
              <Select.Option value="pending">Pending</Select.Option>
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
              <Button onClick={() => setIsCreateModalVisible(false)}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Add Member
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Member Modal */}
      <Modal
        title="Edit Member"
        open={isEditModalVisible}
        onCancel={() => {
          setIsEditModalVisible(false)
          setEditingMember(null)
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
            name="location"
            label="Location"
            rules={[{ required: true, message: 'Please enter location' }]}
          >
            <Input placeholder="Enter member's location" />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
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
                <Select.Option value="conductor">Conductor</Select.Option>
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
          </div>

          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select status' }]}
          >
            <Select placeholder="Select member status">
              <Select.Option value="active">Active</Select.Option>
              <Select.Option value="inactive">Inactive</Select.Option>
              <Select.Option value="pending">Pending</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item className="mb-0">
            <div className="flex justify-end gap-3">
              <Button onClick={() => {
                setIsEditModalVisible(false)
                setEditingMember(null)
              }}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Update Member
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}