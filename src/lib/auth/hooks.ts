import { useSession } from 'next-auth/react'
import { useCallback } from 'react'
import type { UserRoleType, Location, PermissionType } from './types'

const ROLE_HIERARCHY: Record<UserRoleType, number> = {
  GLOBAL_ADMIN: 50,
  REGIONAL_MANAGER: 40,
  MAINTENANCE_COMPANY: 35,
  FACILITY_MANAGER: 30,
  POOL_MANAGER: 20,
  TECHNICIAN: 10,
  POOL_VIEWER: 0
}

const ROLE_PERMISSIONS: Record<UserRoleType, PermissionType[]> = {
  GLOBAL_ADMIN: [
    'VIEW', 'EDIT', 'CREATE', 'DELETE',
    'MANAGE_USERS', 'MANAGE_SETTINGS',
    'MANAGE_MAINTENANCE', 'MANAGE_CHEMICALS',
    'MANAGE_ORDERS', 'VIEW_REPORTS'
  ],
  REGIONAL_MANAGER: [
    'VIEW', 'EDIT', 'CREATE',
    'MANAGE_USERS', 'MANAGE_SETTINGS',
    'MANAGE_MAINTENANCE', 'MANAGE_CHEMICALS',
    'MANAGE_ORDERS', 'VIEW_REPORTS'
  ],
  MAINTENANCE_COMPANY: [
    'VIEW', 'MANAGE_MAINTENANCE',
    'MANAGE_CHEMICALS', 'MANAGE_ORDERS',
    'VIEW_REPORTS'
  ],
  FACILITY_MANAGER: [
    'VIEW', 'EDIT',
    'MANAGE_MAINTENANCE', 'MANAGE_CHEMICALS',
    'MANAGE_ORDERS', 'VIEW_REPORTS'
  ],
  POOL_MANAGER: [
    'VIEW', 'EDIT',
    'MANAGE_MAINTENANCE', 'MANAGE_CHEMICALS',
    'VIEW_REPORTS'
  ],
  TECHNICIAN: [
    'VIEW', 'EDIT',
    'MANAGE_MAINTENANCE', 'MANAGE_CHEMICALS'
  ],
  POOL_VIEWER: ['VIEW']
}

export function useAuth() {
  const { data: session, status } = useSession()

  const hasPermission = useCallback((permission: PermissionType) => {
    if (!session?.user?.role) return false
    return ROLE_PERMISSIONS[session.user.role].includes(permission)
  }, [session?.user?.role])

  const canAccessLocation = useCallback((locationId: string) => {
    if (!session?.user?.locations) return false
    return session.user.locations.some(loc => loc.id === locationId)
  }, [session?.user?.locations])

  const hasRole = useCallback((role: UserRoleType) => {
    if (!session?.user?.role) return false
    return ROLE_HIERARCHY[session.user.role] >= ROLE_HIERARCHY[role]
  }, [session?.user?.role])

  const getAccessibleLocations = useCallback(() => {
    return session?.user?.locations || []
  }, [session?.user?.locations])

  return {
    user: session?.user,
    isAuthenticated: status === 'authenticated',
    isLoading: status === 'loading',
    hasPermission,
    canAccessLocation,
    hasRole,
    getAccessibleLocations
  }
}

export function useAuthorization() {
  const { hasPermission, hasRole, canAccessLocation } = useAuth()

  const checkAccess = useCallback(({
    requiredPermissions = [] as PermissionType[],
    requiredRole,
    locationId
  }: {
    requiredPermissions?: PermissionType[]
    requiredRole?: UserRoleType
    locationId?: string
  } = {}) => {
    // Check permissions
    const hasPermissions = requiredPermissions.every(permission => 
      hasPermission(permission)
    )
    if (!hasPermissions) return false

    // Check role
    if (requiredRole && !hasRole(requiredRole)) return false

    // Check location access
    if (locationId && !canAccessLocation(locationId)) return false

    return true
  }, [hasPermission, hasRole, canAccessLocation])

  return {
    checkAccess
  }
}

export function useLocations() {
  const { getAccessibleLocations } = useAuth()

  const getLocationHierarchy = useCallback(() => {
    const locations = getAccessibleLocations()
    const locationMap = new Map<string, Location & { children: Location[] }>()

    // Initialize all locations with empty children array
    locations.forEach(location => {
      locationMap.set(location.id, { ...location, children: [] })
    })

    // Build hierarchy
    const rootLocations: Location[] = []
    locations.forEach(location => {
      const locationWithChildren = locationMap.get(location.id)!
      if (location.parentId && locationMap.has(location.parentId)) {
        const parent = locationMap.get(location.parentId)!
        parent.children.push(locationWithChildren)
      } else {
        rootLocations.push(locationWithChildren)
      }
    })

    return rootLocations
  }, [getAccessibleLocations])

  return {
    locations: getAccessibleLocations(),
    getLocationHierarchy
  }
} 