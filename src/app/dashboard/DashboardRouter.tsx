'use client'

import { useSession } from 'next-auth/react'
import GlobalDashboard from './levels/GlobalDashboard'
import RegionalDashboard from './levels/RegionalDashboard'
import FacilityDashboard from './levels/FacilityDashboard'
import PoolDashboard from './levels/PoolDashboard'
import { UserRoleType } from '@/lib/auth/types'

const ROLE_INDEX: Record<UserRoleType, number> = {
  GLOBAL_ADMIN: 1,
  REGIONAL_MANAGER: 2,
  MAINTENANCE_COMPANY: 2.1,
  FACILITY_MANAGER: 3,
  POOL_MANAGER: 4,
  TECHNICIAN: 5,
  POOL_VIEWER: 5
}

export default function DashboardRouter() {
  const { data: session } = useSession()
  const roleIndex = session?.user?.role ? ROLE_INDEX[session.user.role] : 5

  // Select dashboard based on role index
  switch (Math.floor(roleIndex)) {
    case 1:
      return <GlobalDashboard />
    case 2:
      return <RegionalDashboard />
    case 3:
      return <FacilityDashboard />
    default:
      return <PoolDashboard />
  }
} 