'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Globe,
  Building2,
  Waves,
  AlertTriangle,
  Settings,
  HelpCircle,
  LogOut,
  BarChart2,
  Bell
} from 'lucide-react'

interface NavigationItem {
  name: string
  href: string
  icon: React.ElementType
}

const navigation: NavigationItem[] = [
  { name: 'Command Center', href: '/dashboard', icon: LayoutDashboard },
  { name: 'All Regions', href: '/regions', icon: Globe },
  { name: 'All Facilities', href: '/facilities', icon: Building2 },
  { name: 'All Pools', href: '/pools', icon: Waves },
  { name: 'System Alerts', href: '/alerts', icon: AlertTriangle },
  { name: 'Notifications', href: '/notifications', icon: Bell },
  { name: 'Analytics', href: '/analytics', icon: BarChart2 }
]

const bottomLinks = [
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Help', href: '/help', icon: HelpCircle },
  { name: 'Logout', href: '/logout', icon: LogOut }
]

interface LinkItemProps {
  item: NavigationItem
  isActive: boolean
}

export default function GlobalSidebar() {
  const pathname = usePathname()

  const LinkItem = ({ item, isActive }: LinkItemProps) => (
    <Link 
      href={item.href}
      className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-200
        ${isActive 
          ? 'bg-gradient-to-r from-blue-500/15 to-blue-500/5 dark:from-blue-500/20 dark:to-blue-500/5 text-blue-700 dark:text-blue-300 font-semibold shadow-sm' 
          : 'text-gray-700 dark:text-gray-400 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-50 dark:hover:from-gray-800/50 dark:hover:to-gray-800/30'}`}
    >
      <item.icon className={`w-5 h-5 ${isActive ? 'text-blue-500' : 'text-gray-500 dark:text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300'}`} />
      <span className="font-medium">{item.name}</span>
    </Link>
  )

  return (
    <div className="w-56 h-full bg-gradient-to-b from-white to-gray-50/50 dark:from-[#1E1E2D] dark:to-[#1A1A27] border-r border-gray-200 dark:border-gray-800/50 flex flex-col">
      <div className="p-4">
        <div className="flex items-center space-x-2 px-4 py-3 mb-6
                      bg-gradient-to-r from-blue-600/10 via-blue-400/5 to-transparent
                      dark:from-blue-500/20 dark:via-blue-400/10 dark:to-transparent
                      border border-blue-100 dark:border-blue-500/10
                      rounded-xl shadow-sm">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold">
            P
          </div>
          <span className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Pool Monitor
          </span>
        </div>

        <div className="px-3 mb-2">
          <h2 className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
            System Administration
          </h2>
        </div>

        <nav className="space-y-1 px-2">
          {navigation.map((link) => (
            <LinkItem 
              key={link.name} 
              item={link} 
              isActive={pathname === link.href} 
            />
          ))}
        </nav>
      </div>

      <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-800/50 bg-gradient-to-b from-transparent to-gray-50 dark:to-[#1A1A27]">
        <div className="px-3 mb-2">
          <h2 className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
            Settings
          </h2>
        </div>
        <nav className="space-y-1 px-2">
          {bottomLinks.map((link) => (
            <LinkItem 
              key={link.name} 
              item={link} 
              isActive={pathname === link.href} 
            />
          ))}
        </nav>
      </div>
    </div>
  )
} 