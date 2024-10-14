'use client'

import { useState, useEffect } from 'react'
import { Menu, MoreVertical, MoreHorizontal, Grid, ChevronDown, Settings, Search, Plus, X } from 'lucide-react'

const menuTypes = [
  { name: 'Hamburger Menu', icon: Menu },
  { name: 'Kebab Menu', icon: MoreVertical },
  { name: 'Meatball Menu', icon: MoreHorizontal },
  { name: 'Grid Menu', icon: Grid },
  { name: 'Drawer Menu', icon: Menu },
  { name: 'Action Overflow', icon: MoreVertical },
  { name: 'Chevron Menu', icon: ChevronDown },
  { name: 'Sidebar Menu', icon: Menu },
  { name: 'Dots Menu', icon: Settings },
  { name: 'Tabs Menu', icon: Menu },
  { name: 'Toggle Menu', icon: Menu },
  { name: 'Context Menu', icon: Menu },
  { name: 'Dropdown Menu', icon: ChevronDown },
  { name: 'More Options', icon: Plus },
  { name: 'Search Menu', icon: Search },
]

export default function Component() {
  const [currentMenuIndex, setCurrentMenuIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false)
      setIsDrawerOpen(false)
      setIsSidebarOpen(false)
      setCurrentMenuIndex((prevIndex) => (prevIndex + 1) % menuTypes.length)
    }, 5000) // Change menu every 5 seconds

    return () => clearTimeout(timer)
  }, [currentMenuIndex])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true)
      if (menuTypes[currentMenuIndex].name === 'Drawer Menu') {
        setIsDrawerOpen(true)
      }
      if (menuTypes[currentMenuIndex].name === 'Sidebar Menu') {
        setIsSidebarOpen(true)
      }
    }, 1000) // Open menu 1 second after changing

    return () => clearTimeout(timer)
  }, [currentMenuIndex])

  const MenuDropdown = ({ items }: { items: string[] }) => (
    <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        {items.map((item, index) => (
          <a
            key={index}
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
          >
            {item}
          </a>
        ))}
      </div>
    </div>
  )

  const renderCurrentMenu = () => {
    const { name, icon: Icon } = menuTypes[currentMenuIndex]
    
    switch (name) {
      case 'Hamburger Menu':
      case 'Kebab Menu':
      case 'Meatball Menu':
      case 'Action Overflow':
      case 'Chevron Menu':
      case 'Dots Menu':
      case 'More Options':
        return (
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
              aria-label={`Toggle ${name}`}
            >
              <Icon className="h-6 w-6" />
            </button>
            {isOpen && <MenuDropdown items={['Option 1', 'Option 2', 'Option 3']} />}
          </div>
        )
      
      case 'Grid Menu':
        return (
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
              aria-label="Toggle Grid Menu"
            >
              <Grid className="h-6 w-6" />
            </button>
            {isOpen && (
              <div className="absolute z-10 mt-2 w-48 bg-white rounded-md shadow-lg">
                <div className="grid grid-cols-3 gap-2 p-2">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )
      
      case 'Drawer Menu':
        return (
          <div className="relative">
            <button
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
              aria-label="Toggle Drawer Menu"
            >
              <Menu className="h-6 w-6" />
            </button>
            {isDrawerOpen && (
              <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out">
                <div className="p-4">
                  <h2 className="text-lg font-semibold">Drawer Menu</h2>
                  <button onClick={() => setIsDrawerOpen(false)} className="mt-4 px-4 py-2 bg-gray-200 rounded">Close</button>
                </div>
              </div>
            )}
          </div>
        )
      
      case 'Sidebar Menu':
        return (
          <div className="relative">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
              aria-label="Toggle Sidebar Menu"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} w-64 bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out`}>
              <div className="p-4">
                <h2 className="text-lg font-semibold">Sidebar Menu</h2>
                <nav className="mt-4">
                  <a href="#" className="block py-2">Home</a>
                  <a href="#" className="block py-2">Profile</a>
                  <a href="#" className="block py-2">Settings</a>
                </nav>
                <button onClick={() => setIsSidebarOpen(false)} className="mt-4 px-4 py-2 bg-gray-200 rounded">Close</button>
              </div>
            </div>
          </div>
        )
      
      case 'Tabs Menu':
        return (
          <div className="relative">
            <div className="flex border-b border-gray-200">
              {['Tab 1', 'Tab 2', 'Tab 3'].map((tab, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 text-sm font-medium ${index === 0 ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'} focus:outline-none`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        )
      
      case 'Toggle Menu':
        return (
          <div className="relative">
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input type="checkbox" className="sr-only" checked={isOpen} onChange={() => setIsOpen(!isOpen)} />
                <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                <div className={`dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition ${isOpen ? 'transform translate-x-full bg-blue-600' : ''}`}></div>
              </div>
              <div className="ml-3 text-gray-700 font-medium">
                Toggle
              </div>
            </label>
          </div>
        )
      
      case 'Context Menu':
        return (
          <div className="relative">
            <div
              className="w-32 h-32 bg-gray-200 flex items-center justify-center cursor-context-menu"
              onContextMenu={(e) => {
                e.preventDefault()
                setIsOpen(!isOpen)
              }}
            >
              Right-click me
            </div>
            {isOpen && (
              <MenuDropdown items={['Copy', 'Cut', 'Paste']} />
            )}
          </div>
        )
      
      case 'Dropdown Menu':
        return (
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Options
              <ChevronDown className="ml-2 h-4 w-4 inline" />
            </button>
            {isOpen && (
              <MenuDropdown items={['Option 1', 'Option 2', 'Option 3']} />
            )}
          </div>
        )
      
      case 'Search Menu':
        return (
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
              aria-label="Search"
            >
              <Search className="h-6 w-6" />
            </button>
            {isOpen && (
              <div className="absolute z-10 mt-2 w-64 bg-white rounded-md shadow-lg">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-4 py-2 border-b border-gray-200 rounded-t-md focus:outline-none"
                />
                <div className="py-2">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Recent Search 1</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Recent Search 2</a>
                </div>
              </div>
            )}
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-8">Menu Type Showcase</h1>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center">{menuTypes[currentMenuIndex].name}</h2>
        <div className="flex justify-center items-center h-48">
          {renderCurrentMenu()}
        </div>
      </div>
    </div>
  )
}
