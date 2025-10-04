import React, { useState } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router'
import { 
  Home, 
  Calendar, 
  Users, 
  BarChart3, 
  Settings, 
  Menu, 
  X, 
  Bell, 
  Search, 
  LogOut,
  Music,
  User,
  ChevronDown,
  Plus,
  HelpCircle,
  Crown,
  Play,
  CalendarDays,
  CalendarCheck,
  DollarSign,
  Mail
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from '~/assets/logo-dark.png'
import { ConfigProvider } from 'antd'
import { useAuth } from '~/contexts/AuthContext'
import { ProtectedRoute } from '~/components/ProtectedRoute'

function DashboardLayout() {
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Events', href: '/dashboard/events', icon: CalendarDays },
    { name: 'Special Programs', href: '/dashboard/special-programs', icon: CalendarCheck },
    { name: 'Members', href: '/dashboard/members', icon: Users },
    { name: 'Commissions', href: '/dashboard/commissions', icon: DollarSign },
    { name: 'Videos', href: '/dashboard/videos', icon: Play },
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    { name: 'Contacts', href: '/dashboard/contacts', icon: Mail },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ]

  const isActiveLink = (href: string) => {
    if (href === '/dashboard') {
      return location.pathname === '/dashboard'
    }
    return location.pathname.startsWith(href)
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <ProtectedRoute>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              colorPrimary: 'var(--color-theme-clr)',
            },
          },
          token: {
            fontFamily: 'Poppins, sans-serif',
          }
        }}
      >
      <div className="min-h-screen bg-gray-50 flex overflow-hidden">
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div 
              className="fixed inset-0 bg-[#00000052] bg-opacity-25"
              onClick={() => setSidebarOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div 
              className="fixed inset-0 bg-[#00000052] bg-opacity-25"
              onClick={() => setSidebarOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <motion.div
        initial={false}
        animate={{ x: sidebarOpen ? 0 : -380 }}
        className="fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl lg:hidden"
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center px-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <img src={Logo} alt="Family of Singers" className="size-10" />
              <div>
                <h1 className="text-lg font-bold text-gray-900">FOS</h1>
                <p className="text-xs text-gray-500">Dashboard</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="ml-auto p-2 rounded-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActiveLink(item.href)
                    ? 'bg-theme-clr/10 text-theme-clr border-r-2 border-theme-clr'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
                {item.name === 'Events' && (
                  <button className="ml-auto p-1 rounded hover:bg-gray-200">
                    <Plus className="w-4 h-4" />
                  </button>
                )}
                {item.name === 'Members' && (
                  <button className="ml-auto p-1 rounded hover:bg-gray-200">
                    <Plus className="w-4 h-4" />
                  </button>
                )}
                {item.name === 'Videos' && (
                  <button className="ml-auto p-1 rounded hover:bg-gray-200">
                    <Plus className="w-4 h-4" />
                  </button>
                )}
              </Link>
            ))}
          </nav>

          {/* Bottom Links */}
          <div className="px-4 pb-6 space-y-1">
            <Link
              to="/help"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <HelpCircle className="w-5 h-5" />
              Help & Information
            </Link>
            <button
              onClick={() => handleLogout()}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors w-full text-left"
            >
              <LogOut className="w-5 h-5" />
              Log out
            </button>
          </div>
        </div>
      </motion.div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-72 bg-white shadow-xl flex-col h-screen fixed left-0 top-0 z-30">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16x items-center px-6 border-b border-gray-200">
            <div className="flex items-center gap-3 py-4">
              <img src={Logo} alt="Family of Singers" className="h-14 w-auto" />
              <div>
                <h1 className="text-lg font-bold text-gray-900">FOS</h1>
                <p className="text-xs text-gray-500">Dashboard</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActiveLink(item.href)
                    ? 'bg-theme-clr/10 text-theme-clr border-r-2 border-theme-clr'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
                {item.name === 'Events' && (
                  <button className="ml-auto p-1 rounded hover:bg-gray-200">
                  </button>
                )}
                {item.name === 'Members' && (
                  <button className="ml-auto p-1 rounded hover:bg-gray-200">
                  </button>
                )}
                {item.name === 'Videos' && (
                  <button className="ml-auto p-1 rounded hover:bg-gray-200">
                  </button>
                )}
              </Link>
            ))}
          </nav>

          {/* Bottom Links */}
          <div className="px-4 pb-6 space-y-1">
            <Link
              to="/help"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <HelpCircle className="w-5 h-5" />
              Help & Information
            </Link>
            <button
              onClick={() => {
                // Handle logout
              }}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors w-full text-left"
            >
              <LogOut className="w-5 h-5" />
              Log out
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:ml-72 overflow-y-auto h-screen">
        {/* Top bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-20">
          <div className="flex items-center justify-between">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Search bar */}
            <div className="flex-1 max-w-lg mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme-clr focus:border-transparent"
                />
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="p-2 rounded-lg hover:bg-gray-100 relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>

              {/* User menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
                >
                  <div className="w-8 h-8 bg-theme-clr rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-black" />
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-700">
                    {user ? `${user.firstName} ${user.lastName}` : 'User'}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>

                {/* User dropdown */}
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"
                    >
                      <Link
                        to="/dashboard/settings"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </Link>
                      <Link
                        to="/"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Music className="w-4 h-4" />
                        View Site
                      </Link>
                      <hr className="my-1" />
                      <button
                        onClick={() => {
                          setUserMenuOpen(false)
                          handleLogout()
                        }}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
      </div>
      </ConfigProvider>
    </ProtectedRoute>
  )
}

export default DashboardLayout