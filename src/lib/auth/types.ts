export enum LocationType {
  GLOBAL = 'GLOBAL',
  REGION = 'REGION',
  FACILITY = 'FACILITY',
  POOL = 'POOL'
}

export type UserRoleType = 
  | 'GLOBAL_ADMIN'
  | 'REGIONAL_MANAGER'
  | 'MAINTENANCE_COMPANY'
  | 'FACILITY_MANAGER'
  | 'POOL_MANAGER'
  | 'TECHNICIAN'
  | 'POOL_VIEWER'

export type PermissionType = 
  | 'VIEW'
  | 'EDIT'
  | 'CREATE'
  | 'DELETE'
  | 'MANAGE_USERS'
  | 'MANAGE_SETTINGS'
  | 'MANAGE_MAINTENANCE'
  | 'MANAGE_CHEMICALS'
  | 'MANAGE_ORDERS'
  | 'VIEW_REPORTS'

export interface UserRole {
  id: string;
  index: string;
  name: UserRoleType;
  permissions: PermissionType[];
}

export interface Location {
  id: string;
  name: string;
  type: LocationType;
  parentId?: string | null;
  parent?: Location | null;
  children?: Location[];
}

export interface User {
  id: string;
  email: string;
  name?: string | null;
  password: string;
  role: UserRoleType;
  locations: Location[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  user: {
    id: string;
    email: string;
    name?: string | null;
    role: UserRoleType;
    locations: Location[];
  };
  expires: string;
}

export interface JWT {
  role: UserRoleType;
  locations: Location[];
  email: string;
  name?: string | null;
  sub: string;
  iat: number;
  exp: number;
  jti: string;
} 