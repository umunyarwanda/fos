import React, { useState, useEffect } from 'react'
import { MapPin, Phone, Facebook, Twitter, Instagram, Youtube, ChevronDown, Menu, X } from 'lucide-react'
import Logo from '~/assets/logo.png'
import LogoLight from '~/assets/logo-light.png'
import LogoDark from '~/assets/logo-dark.png'
import { Link, useNavigation, useLocation } from 'react-router'

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDropdowns, setOpenDropdowns] = useState<number[]>([])
  const [isScrolled, setIsScrolled] = useState(false)
  const MENU_ITEMS = [
    {
      label: 'Home',
      href: '/'
    },
    
    {
      label: 'About Us',
      href: '/about'
    },

    {
      label: 'Events & Programs',
      children: [
        {
          label: 'Events',
          href: '/events'
        },
        // {
        //   label: 'Upcoming Events',
        //   href: '/upcoming-events'
        // },
        
        // {
        //   label: 'Past Events',
        //   href: '/past-events'
        // },
        
        
        {
          label: 'Special Programs',
          href: '/special-programs'
        },
        
        
      ]
    },
  
    {
      label: 'Our Schedule',
      href: '/our-schedule'
    },
    

    {
      label: 'Commissions',
      href: '/commissions'
    },

    {
      label: 'Contact Us',
      href: '/contact-us'
    },

    {
      label: 'Support Us',
      href: '/support-us',
      asButton: true,
    }
    
  ]
  const navigation = useNavigation()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50) // Change background after 50px scroll
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActiveLink = (href: string) => {
    if (href === '/') {
      return location.pathname === '/'
    }
    if (!href) return false
    return location.pathname.startsWith(href)
  }

  const isActiveDropdown = (children: any[]) => {
    return children.some(child => location.pathname.startsWith(child.href))
  }

  const toggleDropdown = (index: number) => {
    setOpenDropdowns(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50`}>
      {/* Top Bar */}
      <div className="bg-gray-800 text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          {/* Left side - Contact Info */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-yellow-400" />
              <span>Kigali, Rwanda</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-yellow-400" />
              <span>(+250) 788 123 456</span>
            </div>
          </div>
          
          {/* Right side - Social Media */}
          <div className="flex items-center space-x-4">
            <Facebook className="size-5 text-theme-clr hover:text-yellow-300 cursor-pointer transition-colors" />
            <Twitter className="size-5 text-theme-clr hover:text-yellow-300 cursor-pointer transition-colors" />
            <Instagram className="size-5 text-theme-clr hover:text-yellow-300 cursor-pointer transition-colors" />
            <Youtube className="size-5 text-theme-clr hover:text-yellow-300 cursor-pointer transition-colors" />
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className={`${isScrolled ? 'bg-white border-b border-gray-200' : 'bg-black/20 backdrop-blur-xs border-b border-white/10'} transition-all duration-300`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <img 
                  src={isScrolled ? LogoDark : LogoLight} 
                  alt="kLab Logo" 
                  className="size-24 w-auto"
                />
                <div className={`h-8 w-px ${isScrolled ? 'bg-gray-300' : 'bg-white/30'}`}></div>
                <div>
                  <h1 className={`text-xl font-bold ${isScrolled ? 'text-gray-900' : 'text-white'}`}>Family Of Singers</h1>
                  <p className={`text-sm ${isScrolled ? 'text-gray-600' : 'text-white/80'}`}>Choir</p>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {
                MENU_ITEMS.map((item, index) => {
                  if (item.children) {
                    return (
                      <div className="relative group" key={index}>
                        <span className={`transition-colors flex items-center space-x-1 ${isActiveDropdown(item.children) ? 'text-yellow-600' : isScrolled ? 'text-gray-900 hover:text-yellow-400' : 'text-white hover:text-yellow-400'}`}>
                          <span>{item.label}</span>
                          <ChevronDown className="w-4 h-4" />
                        </span>
                        {/* Dropdown Menu */}
                        <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                          <div className="py-2">
                            {
                              item.children.map((child, childIndex) => (
                                <Link to={child.href} key={childIndex} className={`block px-4 py-2 transition-colors text-[15px] ${isActiveLink(child.href) ? 'bg-yellow-100 text-yellow-600' : 'text-gray-700 hover:bg-yellow-100 hover:text-yellow-600'}`}>
                                  {child.label}
                                </Link>
                              ))
                            }
                          </div>
                        </div>
                      </div>
                    )
                  } else {
                    return (
                      <Link to={item.href as any} key={index} className={`font-medium transition-colors ${isActiveLink(item.href) ? 'text-yellow-600' : isScrolled ? 'text-gray-900 hover:text-yellow-400' : 'text-white hover:text-yellow-300'} ${item.asButton ? 'bg-theme-clr !text-black px-4 py-2 hover:bg-yellow-300' : ''}`}>
                        {item.label}
                      </Link>
                    )

                  }
                })
              }
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden ${isScrolled ? 'text-gray-900' : 'text-white'}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation Overlay */}
          {isMobileMenuOpen && (
            <div 
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          )}

          {/* Mobile Navigation Sidebar */}
          <div className={`fixed top-0 left-0 h-screen w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}>
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
              <div className="flex items-center space-x-3">
                <img 
                  src={LogoDark} 
                  alt="Family Of Singers Logo" 
                  className="size-10 w-auto"
                />
                <div>
                  <h1 className="text-lg font-bold text-gray-900">Family Of Singers</h1>
                  <p className="text-sm text-gray-600">Choir</p>
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Sidebar Navigation */}
            <div className="p-6">
              <div className="flex flex-col space-y-4">
                {MENU_ITEMS.map((item, index) => {
                  if (item.children) {
                    const isOpen = openDropdowns.includes(index)
                    return (
                      <div key={index} className="space-y-2">
                        <button
                          onClick={() => toggleDropdown(index)}
                          className={`flex items-center justify-between w-full font-medium text-[15px] transition-colors ${
                            isActiveDropdown(item.children) 
                              ? 'text-yellow-600' 
                              : 'text-gray-900 hover:text-yellow-600'
                          }`}
                        >
                          <span>{item.label}</span>
                          <ChevronDown 
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isOpen ? 'rotate-180' : ''
                            }`} 
                          />
                        </button>
                        {isOpen && (
                          <div className="ml-4 space-y-2">
                            {item.children.map((child, childIndex) => (
                              <Link 
                                to={child.href} 
                                key={childIndex} 
                                className={`block transition-colors text-sm ${
                                  isActiveLink(child.href) 
                                    ? 'text-yellow-600' 
                                    : 'text-gray-600 hover:text-yellow-600'
                                }`}
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  } else {
                    return (
                      <Link 
                        to={item.href as any} 
                        key={index} 
                        className={`transition-colors text-[15px] font-medium ${
                          isActiveLink(item.href) 
                            ? 'text-yellow-600' 
                            : 'text-gray-900 hover:text-yellow-600'
                        } ${item.asButton ? 'bg-yellow-500 !text-black px-4 py-3 rounded-lg hover:bg-yellow-600' : ''}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar