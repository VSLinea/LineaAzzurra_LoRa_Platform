import { PermissionType, UserRoleType, LocationType } from './types';

export const RolePermissions: Record<UserRoleType, {
  index: string;
  scope: LocationType[];
  permissions: PermissionType[];
}> = {
  'GLOBAL_ADMIN': {
    index: '1',
    scope: ['GLOBAL', 'REGION', 'FACILITY', 'POOL'],
    permissions: ['VIEW', 'EDIT', 'CREATE', 'DELETE', 'MANAGE_USERS', 'MANAGE_SETTINGS', 'MANAGE_MAINTENANCE', 'MANAGE_CHEMICALS', 'MANAGE_ORDERS', 'VIEW_REPORTS']
  },
  
  'REGIONAL_MANAGER': {
    index: '2',
    scope: ['REGION', 'FACILITY', 'POOL'],
    permissions: ['VIEW', 'EDIT', 'CREATE', 'MANAGE_USERS', 'MANAGE_SETTINGS', 'MANAGE_MAINTENANCE', 'MANAGE_CHEMICALS', 'MANAGE_ORDERS', 'VIEW_REPORTS']
  },

  'MAINTENANCE_COMPANY': {
    index: '2.1',
    scope: ['REGION', 'FACILITY', 'POOL'],
    permissions: ['VIEW', 'MANAGE_MAINTENANCE', 'MANAGE_CHEMICALS', 'MANAGE_ORDERS', 'VIEW_REPORTS']
  },
  
  'FACILITY_MANAGER': {
    index: '3',
    scope: ['FACILITY', 'POOL'],
    permissions: ['VIEW', 'EDIT', 'MANAGE_MAINTENANCE', 'MANAGE_CHEMICALS', 'MANAGE_ORDERS', 'VIEW_REPORTS']
  },
  
  'POOL_MANAGER': {
    index: '4',
    scope: ['POOL'],
    permissions: ['VIEW', 'EDIT', 'MANAGE_MAINTENANCE', 'MANAGE_CHEMICALS', 'VIEW_REPORTS']
  },
  
  'TECHNICIAN': {
    index: '5',
    scope: ['POOL'],
    permissions: ['VIEW', 'MANAGE_MAINTENANCE', 'MANAGE_CHEMICALS', 'VIEW_REPORTS']
  },
  
  'POOL_VIEWER': {
    index: '5',
    scope: ['POOL'],
    permissions: ['VIEW', 'VIEW_REPORTS']
  }
};

export function hasPermission(
  userRole: UserRoleType,
  requiredPermission: PermissionType,
  locationTypes?: LocationType[]
): boolean {
  const roleConfig = RolePermissions[userRole];
  
  // Check if user has the required permission
  if (!roleConfig.permissions.includes(requiredPermission)) {
    return false;
  }
  
  // If location types are specified, check if user has access to all required locations
  if (locationTypes && locationTypes.length > 0) {
    return locationTypes.every(locationType => roleConfig.scope.includes(locationType));
  }
  
  return true;
}

export function canAccessLocation(
  userRole: UserRoleType,
  locationIndex: string,
  userLocationIndexes: string[]
): boolean {
  const roleConfig = RolePermissions[userRole];
  
  // Global admin can access everything
  if (userRole === 'GLOBAL_ADMIN') {
    return true;
  }
  
  // Check if any of the user's assigned locations is a parent of the target location
  return userLocationIndexes.some(userLocationIndex => {
    // Location index format: 1.2.3
    // Check if the target location is under any of the user's assigned locations
    return locationIndex.startsWith(userLocationIndex);
  });
} 