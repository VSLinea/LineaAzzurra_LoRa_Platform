'use client'

import { useSession } from 'next-auth/react'
import { UserRoleType } from '@/lib/auth/types'
import GlobalSidebar from './sidebars/GlobalSidebar'
import RegionalSidebar from './sidebars/RegionalSidebar'
import FacilitySidebar from './sidebars/FacilitySidebar'
import PoolSidebar from './sidebars/PoolSidebar'

const ROLE_INDEX: Record<UserRoleType, number> = {
  GLOBAL_ADMIN: 1,
  REGIONAL_MANAGER: 2,
  MAINTENANCE_COMPANY: 2.1,
  FACILITY_MANAGER: 3,
  POOL_MANAGER: 4,
  TECHNICIAN: 5,
  POOL_VIEWER: 5
}

export default function SidebarRouter() {
  const { data: session } = useSession()
  const roleIndex = session?.user?.role ? ROLE_INDEX[session.user.role] : 5

  // Select sidebar based on role index
  switch (Math.floor(roleIndex)) {
    case 1:
      return <GlobalSidebar />
    case 2:
      return <RegionalSidebar />
    case 3:
      return <FacilitySidebar />
    default:
      return <PoolSidebar />
  }
} 