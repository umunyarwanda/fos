import React, { useState } from 'react'
import { Settings as SettingsIcon, User, Bell, Shield, Palette, Save } from 'lucide-react'
import { motion } from 'framer-motion'
import { Form, Input, Select, Switch, Button, message, Radio, Upload } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import type { Route } from '../+types'

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Settings - Family of Singers Dashboard" },
    { name: "description", content: "Manage your dashboard settings and preferences for the Family of Singers choir management system." },
  ];
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile')
  const [profileForm] = Form.useForm()
  const [notificationForm] = Form.useForm()
  const [privacyForm] = Form.useForm()
  const [appearanceForm] = Form.useForm()

  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      sms: false,
      eventReminders: true,
      memberUpdates: true,
      weeklyDigest: false
    },
    privacy: {
      profile: 'public',
      events: 'members',
      contactInfo: 'members',
      performanceHistory: 'public'
    },
    appearance: {
      theme: 'light',
      language: 'en',
      fontSize: 'medium',
      sidebarCollapsed: false
    }
  })

  const handleSave = (formName: string) => {
    try {
      console.log(`Saving ${formName} settings`)
      message.success('Settings saved successfully!')
    } catch (error) {
      message.error('Failed to save settings')
    }
  }

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'privacy', name: 'Privacy', icon: Shield },
    { id: 'appearance', name: 'Appearance', icon: Palette }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your dashboard preferences</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Settings</h3>
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-theme-clr text-black font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon className="w-4 h-4 inline mr-2" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Settings</h2>
                <Form
                  form={profileForm}
                  layout="vertical"
                  onFinish={() => handleSave('profile')}
                  initialValues={{
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'john@example.com',
                    phone: '+250 788 123 456',
                    role: 'Conductor',
                    voicePart: 'Conductor'
                  }}
                >
                  <div className="space-y-6">
                    {/* Personal Information */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <Form.Item
                          name="email"
                          label="Email"
                          rules={[
                            { required: true, message: 'Please enter email' },
                            { type: 'email', message: 'Please enter valid email' }
                          ]}
                        >
                          <Input placeholder="Enter email" />
                        </Form.Item>
                        <Form.Item
                          name="phone"
                          label="Phone"
                          rules={[{ required: true, message: 'Please enter phone number' }]}
                        >
                          <Input placeholder="Enter phone number" />
                        </Form.Item>
                      </div>
                    </div>

                    {/* Role Information */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Role Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Form.Item
                          name="role"
                          label="Role"
                          rules={[{ required: true, message: 'Please select role' }]}
                        >
                          <Select placeholder="Select role">
                            <Select.Option value="Conductor">Conductor</Select.Option>
                            <Select.Option value="Member">Member</Select.Option>
                            <Select.Option value="Administrator">Administrator</Select.Option>
                          </Select>
                        </Form.Item>
                        <Form.Item
                          name="voicePart"
                          label="Voice Part"
                          rules={[{ required: true, message: 'Please select voice part' }]}
                        >
                          <Select placeholder="Select voice part">
                            <Select.Option value="Conductor">Conductor</Select.Option>
                            <Select.Option value="Soprano">Soprano</Select.Option>
                            <Select.Option value="Alto">Alto</Select.Option>
                            <Select.Option value="Tenor">Tenor</Select.Option>
                            <Select.Option value="Bass">Bass</Select.Option>
                          </Select>
                        </Form.Item>
                      </div>
                    </div>

                    {/* Profile Picture */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Picture</h3>
                      <Form.Item name="avatar">
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
                    </div>

                    <Form.Item>
                      <Button type="primary" htmlType="submit" className="bg-theme-clr hover:bg-yellow-600 border-theme-clr">
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    </Form.Item>
                  </div>
                </Form>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Notification Settings</h2>
                <Form
                  form={notificationForm}
                  layout="vertical"
                  onFinish={() => handleSave('notifications')}
                  initialValues={settings.notifications}
                >
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Methods</h3>
                      <div className="space-y-4">
                        <Form.Item name="email" valuePropName="checked">
                          <div className="flex items-center justify-between">
                            <div>
                              <label className="text-sm font-medium text-gray-900">Email Notifications</label>
                              <p className="text-sm text-gray-600">Receive notifications via email</p>
                            </div>
                            <Switch />
                          </div>
                        </Form.Item>
                        <Form.Item name="push" valuePropName="checked">
                          <div className="flex items-center justify-between">
                            <div>
                              <label className="text-sm font-medium text-gray-900">Push Notifications</label>
                              <p className="text-sm text-gray-600">Receive push notifications in browser</p>
                            </div>
                            <Switch />
                          </div>
                        </Form.Item>
                        <Form.Item name="sms" valuePropName="checked">
                          <div className="flex items-center justify-between">
                            <div>
                              <label className="text-sm font-medium text-gray-900">SMS Notifications</label>
                              <p className="text-sm text-gray-600">Receive notifications via SMS</p>
                            </div>
                            <Switch />
                          </div>
                        </Form.Item>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Types</h3>
                      <div className="space-y-4">
                        <Form.Item name="eventReminders" valuePropName="checked">
                          <div className="flex items-center justify-between">
                            <div>
                              <label className="text-sm font-medium text-gray-900">Event Reminders</label>
                              <p className="text-sm text-gray-600">Get reminded about upcoming events</p>
                            </div>
                            <Switch />
                          </div>
                        </Form.Item>
                        <Form.Item name="memberUpdates" valuePropName="checked">
                          <div className="flex items-center justify-between">
                            <div>
                              <label className="text-sm font-medium text-gray-900">Member Updates</label>
                              <p className="text-sm text-gray-600">Notifications about new members and changes</p>
                            </div>
                            <Switch />
                          </div>
                        </Form.Item>
                        <Form.Item name="weeklyDigest" valuePropName="checked">
                          <div className="flex items-center justify-between">
                            <div>
                              <label className="text-sm font-medium text-gray-900">Weekly Digest</label>
                              <p className="text-sm text-gray-600">Receive weekly summary emails</p>
                            </div>
                            <Switch />
                          </div>
                        </Form.Item>
                      </div>
                    </div>

                    <Form.Item>
                      <Button type="primary" htmlType="submit" className="bg-theme-clr hover:bg-yellow-600 border-theme-clr">
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    </Form.Item>
                  </div>
                </Form>
              </div>
            )}

            {/* Privacy Tab */}
            {activeTab === 'privacy' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Privacy Settings</h2>
                <Form
                  form={privacyForm}
                  layout="vertical"
                  onFinish={() => handleSave('privacy')}
                  initialValues={settings.privacy}
                >
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Visibility</h3>
                      <Form.Item name="profile" label="Profile Visibility">
                        <Radio.Group>
                          <Radio value="public">Public - Anyone can see your profile</Radio>
                          <Radio value="members">Members Only - Only choir members can see</Radio>
                          <Radio value="private">Private - Only you can see</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Information</h3>
                      <Form.Item name="events" label="Event Participation">
                        <Radio.Group>
                          <Radio value="public">Public - Show in public event lists</Radio>
                          <Radio value="members">Members Only - Show only to choir members</Radio>
                          <Radio value="private">Private - Don't show participation</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                      <Form.Item name="contactInfo" label="Contact Information Visibility">
                        <Radio.Group>
                          <Radio value="public">Public - Anyone can contact you</Radio>
                          <Radio value="members">Members Only - Only choir members</Radio>
                          <Radio value="private">Private - No contact information shown</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance History</h3>
                      <Form.Item name="performanceHistory" label="Performance History">
                        <Radio.Group>
                          <Radio value="public">Public - Show all performances</Radio>
                          <Radio value="members">Members Only - Show to choir members</Radio>
                          <Radio value="private">Private - Don't show performance history</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </div>

                    <Form.Item>
                      <Button type="primary" htmlType="submit" className="bg-theme-clr hover:bg-yellow-600 border-theme-clr">
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    </Form.Item>
                  </div>
                </Form>
              </div>
            )}

            {/* Appearance Tab */}
            {activeTab === 'appearance' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Appearance Settings</h2>
                <Form
                  form={appearanceForm}
                  layout="vertical"
                  onFinish={() => handleSave('appearance')}
                  initialValues={settings.appearance}
                >
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Theme</h3>
                      <Form.Item name="theme" label="Color Theme">
                        <Radio.Group>
                          <Radio value="light">Light Theme</Radio>
                          <Radio value="dark">Dark Theme</Radio>
                          <Radio value="auto">Auto (System)</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Language</h3>
                      <Form.Item name="language" label="Interface Language">
                        <Select placeholder="Select language">
                          <Select.Option value="en">English</Select.Option>
                          <Select.Option value="fr">Français</Select.Option>
                          <Select.Option value="rw">Kinyarwanda</Select.Option>
                        </Select>
                      </Form.Item>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Display</h3>
                      <Form.Item name="fontSize" label="Font Size">
                        <Radio.Group>
                          <Radio value="small">Small</Radio>
                          <Radio value="medium">Medium</Radio>
                          <Radio value="large">Large</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Layout</h3>
                      <Form.Item name="sidebarCollapsed" valuePropName="checked">
                        <div className="flex items-center justify-between">
                          <div>
                            <label className="text-sm font-medium text-gray-900">Collapsed Sidebar</label>
                            <p className="text-sm text-gray-600">Start with sidebar collapsed by default</p>
                          </div>
                          <Switch />
                        </div>
                      </Form.Item>
                    </div>

                    <Form.Item>
                      <Button type="primary" htmlType="submit" className="bg-theme-clr hover:bg-yellow-600 border-theme-clr">
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    </Form.Item>
                  </div>
                </Form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}