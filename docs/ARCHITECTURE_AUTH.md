# Authentication and Project Structure

## Project Structure

```
pool-monitoring-dashboard/
├── src/
│   ├── app/                    # Next.js App Router pages
│   ├── components/             # React components
│   │   ├── features/          # Feature-specific components
│   │   └── ui/               # Reusable UI components
│   ├── server/                # Backend logic
│   │   ├── api/              # API route handlers
│   │   ├── auth/             # Authentication logic
│   │   ├── db/               # Database operations
│   │   └── services/         # Business logic services
│   ├── lib/                  # Shared utilities
│   │   ├── types/           # TypeScript types/interfaces
│   │   ├── constants/       # Constants and enums
│   │   └── utils/           # Helper functions
│   └── styles/               # Global styles
├── prisma/                   # Database schema and migrations
│   ├── schema.prisma        # Prisma schema
│   └── migrations/          # Database migrations
└── public/                  # Static assets
```

## Frontend/Backend Separation Benefits

1. **Clear Separation of Concerns**:
   - Frontend: User interface, state management, and client-side logic
   - Backend: Data processing, authentication, and business logic
   - Shared: Types, interfaces, and utilities

2. **Better Code Organization**:
   - Modular components
   - Reusable services
   - Clear dependency boundaries

3. **Enhanced Security**:
   - Sensitive operations isolated in backend
   - Better control over data access
   - Proper validation layers

4. **Easier Testing**:
   - Separate unit tests for frontend and backend
   - Isolated component testing
   - API integration testing

5. **Scalability**:
   - Independent scaling of frontend and backend
   - Easier to distribute work among teams
   - Better performance optimization

## Authentication Implementation

### 1. Database Schema (Prisma)
Located in `prisma/schema.prisma`:
```prisma
// User authentication and roles
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  password      String    // Hashed
  emailVerified DateTime?
  image         String?
  role          UserRole  @relation(fields: [roleId], references: [id])
  roleId        String
  locations     UserLocation[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

// Role-based access control
model UserRole {
  id          String   @id @default(cuid())
  index       String   // Hierarchical index
  name        String   
  permissions String[] 
  users       User[]
}

// Location hierarchy
model Location {
  id          String   @id @default(cuid())
  index       String   // Hierarchical index
  name        String
  type        String   
  parentId    String?
  parent      Location? @relation("Hierarchy", fields: [parentId], references: [id])
  children    Location[] @relation("Hierarchy")
  users       UserLocation[]
}

// User-Location assignments
model UserLocation {
  id          String   @id @default(cuid())
  userId      String
  locationId  String
  user        User     @relation(fields: [userId], references: [id])
  location    Location @relation(fields: [locationId], references: [id])
  assignedAt  DateTime @default(now())
}
```

### 2. Authentication Flow
Located in `src/server/auth/`:
```typescript
// Types of permissions and roles
export enum PermissionType {
  VIEW = 'VIEW',
  EDIT = 'EDIT',
  // ... other permissions
}

// Role definitions with hierarchical structure
export const RoleDefinitions = {
  GLOBAL_ADMIN: {
    index: '1',
    permissions: [/* ... */]
  },
  // ... other roles
}

// Permission checking logic
export const hasPermission = (
  userRole: string,
  requiredPermission: PermissionType,
  locationIndex?: string
): boolean => {
  // Implementation
}
```

### 3. API Routes
Located in `src/app/api/`:
```typescript
// Authentication endpoints
- /api/auth/[...nextauth]  // Auth.js routes
- /api/auth/register       // User registration
- /api/auth/verify        // Email verification
- /api/auth/reset         // Password reset
```

### 4. Frontend Components
Located in `src/components/`:
```typescript
// Authentication UI components
- LoginForm
- RegistrationForm
- PasswordResetForm
- EmailVerification
```

## Security Considerations

1. **Password Security**:
   - Bcrypt hashing
   - Salt rounds configuration
   - Password complexity requirements

2. **Session Management**:
   - JWT token handling
   - Session timeouts
   - Secure cookie settings

3. **API Security**:
   - CSRF protection
   - Rate limiting
   - Input validation

4. **Data Access**:
   - Role-based access control
   - Location-based permissions
   - Audit logging 