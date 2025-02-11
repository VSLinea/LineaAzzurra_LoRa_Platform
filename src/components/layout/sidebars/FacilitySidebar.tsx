'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import {
  LayoutDashboard,
  Waves,
  Users,
  AlertTriangle,
  Settings,
  HelpCircle,
  LogOut,
  BarChart2,
  Package,
  Wrench,
  Calendar,
  ClipboardList,
  Globe,
  Building2,
  Building,
  Truck
} from 'lucide-react'
import { UserRoleType, LocationType } from '@/lib/auth/types'

interface NavigationItem {
  name: string
  href: string
  icon: React.ElementType
  requiredPermissions: string[]
  requiredRole?: UserRoleType
  scope?: LocationType[]
}

const getNavigationByRole = (role: UserRoleType): NavigationItem[] => {
  const baseNavigation: NavigationItem[] = [
    { 
      name: 'Overview', 
      href: '/dashboard', 
      icon: LayoutDashboard,
      requiredPermissions: ['VIEW']
    }
  ]

  const roleSpecificNavigation: Record<UserRoleType, NavigationItem[]> = {
    GLOBAL_ADMIN: [
      {
        name: 'Global Overview',
        href: '/global',
        icon: Globe,
        requiredPermissions: ['VIEW'],
        scope: [LocationType.GLOBAL]
      },
      {
        name: 'Regions',
        href: '/regions',
        icon: Building2,
        requiredPermissions: ['VIEW'],
        scope: [LocationType.REGION]
      },
      {
        name: 'Facilities',
        href: '/facilities',
        icon: Building,
        requiredPermissions: ['VIEW'],
        scope: [LocationType.FACILITY]
      },
      {
        name: 'Pools',
        href: '/pools',
        icon: Waves,
        requiredPermissions: ['VIEW'],
        scope: [LocationType.POOL]
      },
      {
        name: 'Users',
        href: '/users',
        icon: Users,
        requiredPermissions: ['MANAGE_USERS']
      },
      {
        name: 'Maintenance',
        href: '/maintenance',
        icon: Wrench,
        requiredPermissions: ['MANAGE_MAINTENANCE']
      },
      {
        name: 'Inventory',
        href: '/inventory',
        icon: Package,
        requiredPermissions: ['MANAGE_CHEMICALS']
      },
      {
        name: 'Reports',
        href: '/reports',
        icon: BarChart2,
        requiredPermissions: ['VIEW_REPORTS']
      }
    ],
    REGIONAL_MANAGER: [
      {
        name: 'Region Overview',
        href: '/region',
        icon: Building2,
        requiredPermissions: ['VIEW'],
        scope: [LocationType.REGION]
      },
      {
        name: 'Facilities',
        href: '/facilities',
        icon: Building,
        requiredPermissions: ['VIEW'],
        scope: [LocationType.FACILITY]
      },
      {
        name: 'Pools',
        href: '/pools',
        icon: Waves,
        requiredPermissions: ['VIEW'],
        scope: [LocationType.POOL]
      },
      {
        name: 'Staff',
        href: '/staff',
        icon: Users,
        requiredPermissions: ['MANAGE_USERS']
      },
      {
        name: 'Maintenance',
        href: '/maintenance',
        icon: Wrench,
        requiredPermissions: ['MANAGE_MAINTENANCE']
      },
      {
        name: 'Inventory',
        href: '/inventory',
        icon: Package,
        requiredPermissions: ['MANAGE_CHEMICALS']
      },
      {
        name: 'Reports',
        href: '/reports',
        icon: BarChart2,
        requiredPermissions: ['VIEW_REPORTS']
      }
    ],
    MAINTENANCE_COMPANY: [
      {
        name: 'Maintenance Tasks',
        href: '/tasks',
        icon: ClipboardList,
        requiredPermissions: ['MANAGE_MAINTENANCE']
      },
      {
        name: 'Equipment',
        href: '/equipment',
        icon: Wrench,
        requiredPermissions: ['MANAGE_MAINTENANCE']
      },
      {
        name: 'Supplies',
        href: '/supplies',
        icon: Truck,
        requiredPermissions: ['MANAGE_CHEMICALS']
      },
      {
        name: 'Reports',
        href: '/reports',
        icon: BarChart2,
        requiredPermissions: ['VIEW_REPORTS']
      }
    ],
    FACILITY_MANAGER: [
      {
        name: 'Facility Overview',
        href: '/facility',
        icon: Building,
        requiredPermissions: ['VIEW'],
        scope: [LocationType.FACILITY]
      },
      {
        name: 'Pools',
        href: '/pools',
        icon: Waves,
        requiredPermissions: ['VIEW'],
        scope: [LocationType.POOL]
      },
      {
        name: 'Staff',
        href: '/staff',
        icon: Users,
        requiredPermissions: ['MANAGE_USERS']
      },
      {
        name: 'Maintenance',
        href: '/maintenance',
        icon: Wrench,
        requiredPermissions: ['MANAGE_MAINTENANCE']
      },
      {
        name: 'Schedule',
        href: '/schedule',
        icon: Calendar,
        requiredPermissions: ['VIEW']
      },
      {
        name: 'Tasks',
        href: '/tasks',
        icon: ClipboardList,
        requiredPermissions: ['VIEW']
      },
      {
        name: 'Inventory',
        href: '/inventory',
        icon: Package,
        requiredPermissions: ['MANAGE_CHEMICALS']
      },
      {
        name: 'Reports',
        href: '/reports',
        icon: BarChart2,
        requiredPermissions: ['VIEW_REPORTS']
      }
    ],
    POOL_MANAGER: [
      {
        name: 'Pool Overview',
        href: '/pool',
        icon: Waves,
        requiredPermissions: ['VIEW'],
        scope: [LocationType.POOL]
      },
      {
        name: 'Maintenance',
        href: '/maintenance',
        icon: Wrench,
        requiredPermissions: ['MANAGE_MAINTENANCE']
      },
      {
        name: 'Schedule',
        href: '/schedule',
        icon: Calendar,
        requiredPermissions: ['VIEW']
      },
      {
        name: 'Tasks',
        href: '/tasks',
        icon: ClipboardList,
        requiredPermissions: ['VIEW']
      },
      {
        name: 'Chemicals',
        href: '/chemicals',
        icon: Package,
        requiredPermissions: ['MANAGE_CHEMICALS']
      },
      {
        name: 'Reports',
        href: '/reports',
        icon: BarChart2,
        requiredPermissions: ['VIEW_REPORTS']
      }
    ],
    TECHNICIAN: [
      {
        name: 'Tasks',
        href: '/tasks',
        icon: ClipboardList,
        requiredPermissions: ['VIEW']
      },
      {
        name: 'Maintenance',
        href: '/maintenance',
        icon: Wrench,
        requiredPermissions: ['MANAGE_MAINTENANCE']
      },
      {
        name: 'Chemicals',
        href: '/chemicals',
        icon: Package,
        requiredPermissions: ['MANAGE_CHEMICALS']
      }
    ],
    POOL_VIEWER: [
      {
        name: 'Pool Status',
        href: '/status',
        icon: Waves,
        requiredPermissions: ['VIEW'],
        scope: [LocationType.POOL]
      },
      {
        name: 'Reports',
        href: '/reports',
        icon: BarChart2,
        requiredPermissions: ['VIEW_REPORTS']
      }
    ]
  }

  return [...baseNavigation, ...roleSpecificNavigation[role]]
}

const getBottomLinks = (role: UserRoleType): NavigationItem[] => {
  const baseLinks: NavigationItem[] = [
    {
      name: 'Help',
      href: '/help',
      icon: HelpCircle,
      requiredPermissions: ['VIEW']
    },
    {
      name: 'Logout',
      href: '/logout',
      icon: LogOut,
      requiredPermissions: ['VIEW']
    }
  ]

  // Only show settings for roles that can manage them
  if (['GLOBAL_ADMIN', 'REGIONAL_MANAGER', 'FACILITY_MANAGER'].includes(role)) {
    return [
      {
        name: 'Settings',
        href: '/settings',
        icon: Settings,
        requiredPermissions: ['MANAGE_SETTINGS']
      },
      ...baseLinks
    ]
  }

  return baseLinks
}

interface LinkItemProps {
  item: NavigationItem
  isActive: boolean
}

export default function FacilitySidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const userRole = session?.user?.role || 'POOL_VIEWER'

  const navigation = getNavigationByRole(userRole)
  const bottomLinks = getBottomLinks(userRole)

  // Filter navigation items based on user permissions
  const filteredNavigation = navigation.filter(item => {
    // Check if user has all required permissions
    const hasPermissions = item.requiredPermissions.every(permission =>
      session?.user?.role === userRole
    )

    // Check if user has access to required location types
    const hasLocationAccess = !item.scope || item.scope.every(locationType =>
      session?.user?.locations?.some(loc => loc.type === locationType)
    )

    return hasPermissions && hasLocationAccess
  })

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

  // Get the location name based on user role
  const getLocationName = () => {
    if (!session?.user?.locations?.[0]) return userRole.replace('_', ' ')
    const location = session.user.locations[0]
    return location.name || userRole.replace('_', ' ')
  }

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
            {getLocationName()}
          </h2>
        </div>

        <nav className="space-y-1 px-2">
          {filteredNavigation.map((link) => (
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