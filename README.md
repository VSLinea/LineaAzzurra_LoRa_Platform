# Linea Azzurra LoRa Platform

A comprehensive pool management and monitoring system with role-based access control.

## Authentication & Authorization System

### Role Hierarchy

The system implements a hierarchical role-based access control (RBAC) with the following roles (from highest to lowest access):

1. GLOBAL_ADMIN (50) - Full system access
2. REGIONAL_MANAGER (40) - Regional level management
3. MAINTENANCE_COMPANY (35) - Multi-facility maintenance access
4. FACILITY_MANAGER (30) - Facility level management
5. POOL_MANAGER (20) - Pool level management
6. TECHNICIAN (10) - Maintenance operations
7. POOL_VIEWER (0) - Basic viewing access

### Protected Routes

```typescript
/admin                    - GLOBAL_ADMIN
/api/admin               - GLOBAL_ADMIN
/regions                 - REGIONAL_MANAGER
/api/regions            - REGIONAL_MANAGER
/company/maintenance    - MAINTENANCE_COMPANY
/api/company/maintenance - MAINTENANCE_COMPANY
/facilities             - FACILITY_MANAGER
/api/facilities        - FACILITY_MANAGER
/pools                  - POOL_MANAGER
/api/pools             - POOL_MANAGER
/maintenance           - TECHNICIAN
/api/maintenance      - TECHNICIAN
```

### Permissions

Each role has specific permissions:

- GLOBAL_ADMIN: All permissions
- REGIONAL_MANAGER: VIEW, EDIT, CREATE, MANAGE_USERS, MANAGE_SETTINGS, etc.
- MAINTENANCE_COMPANY: VIEW, MANAGE_MAINTENANCE, MANAGE_CHEMICALS, etc.
- FACILITY_MANAGER: VIEW, EDIT, MANAGE_MAINTENANCE, etc.
- POOL_MANAGER: VIEW, EDIT, MANAGE_MAINTENANCE, etc.
- TECHNICIAN: VIEW, MANAGE_MAINTENANCE, MANAGE_CHEMICALS
- POOL_VIEWER: VIEW only

### Location-Based Access

The system implements hierarchical location-based access:
- GLOBAL → REGION → FACILITY → POOL
- Users can only access locations assigned to them
- Higher-level roles can access child locations

### Authentication Flow

1. User signs in via `/auth/signin`
2. NextAuth.js handles authentication with JWT strategy
3. Middleware checks route protection
4. Unauthorized access redirects to `/unauthorized`

### Usage

```typescript
// Check permissions
const { hasPermission } = useAuth();
if (hasPermission('MANAGE_MAINTENANCE')) {
  // Allow maintenance operations
}

// Check role level
const { hasRole } = useAuth();
if (hasRole('FACILITY_MANAGER')) {
  // Allow facility management
}

// Complex access checks
const { checkAccess } = useAuthorization();
const canAccess = checkAccess({
  requiredPermissions: ['MANAGE_MAINTENANCE'],
  requiredRole: 'TECHNICIAN',
  locationId: 'pool-123'
});

// Location management
const { locations, getLocationHierarchy } = useLocations();
const locationTree = getLocationHierarchy();
```

### Database Schema

The system uses Prisma with PostgreSQL, implementing:
- User-Role relationships
- Role-Permission mappings
- Location hierarchy
- User-Location assignments

## Setup & Development

[Add your setup instructions here] 