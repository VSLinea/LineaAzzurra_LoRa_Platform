# Pool Service Management System Architecture

## System Architecture Overview

### Core System (Maintenance Management)
The foundation of the system, focused on pool maintenance operations.

```typescript
// Core Modules
interface CoreSystem {
  // Essential Features
  maintenance: {
    workOrders: WorkOrderModule
    scheduling: SchedulingModule
    routing: RouteOptimizationModule
    inventory: BasicInventoryModule
    reporting: BasicReportingModule
  }
  
  // Base Features
  authentication: AuthModule
  users: UserManagementModule
  clients: ClientManagementModule
  settings: CoreSettingsModule
}

// Core Entities
interface WorkOrder {
  id: UUID
  poolId: UUID
  clientId: UUID  // Can be internal or external
  scheduledDate: DateTime
  status: WorkOrderStatus
  type: 'routine' | 'emergency' | 'inspection'
  assignedTechnician: UUID
  tasks: Task[]
  readings: ChemicalReading[]
  photos: Photo[]
  signoff: Signoff
}

interface Client {
  id: UUID
  type: 'external' | 'internal' // Allows for both service companies and self-managed facilities
  name: string
  contacts: Contact[]
  locations: Location[]
  contract?: ServiceContract // Optional for internal clients
}

interface Pool {
  id: UUID
  clientId: UUID
  name: string
  type: PoolType
  specifications: PoolSpecs
  maintenanceSchedule: Schedule
  lastService: DateTime
}
```

### Optional Modules (Facility Management)
Additional modules that can be enabled for facilities wanting full management capabilities.

```typescript
// Facility Management Module
interface FacilityModule {
  membership?: {
    members: MemberManagementModule
    access: AccessControlModule
    billing: MemberBillingModule
  }

  programming?: {
    classes: ClassManagementModule
    events: EventManagementModule
    scheduling: FacilitySchedulingModule
  }

  staff?: {
    scheduling: StaffSchedulingModule
    certifications: CertificationModule
    payroll: PayrollModule
  }

  operations?: {
    pointOfSale: POSModule
    inventory: FullInventoryModule
    reporting: AdvancedReportingModule
  }
}

// Module Integration
interface SystemConfiguration {
  core: CoreSystem
  facilityModules: {
    membership: boolean
    programming: boolean
    staff: boolean
    operations: boolean
  }
}
```

## Database Design

### Core Tables (Always Present)
```sql
-- Essential Maintenance Tables
work_orders (
  id UUID PRIMARY KEY,
  pool_id UUID,
  client_id UUID,
  status VARCHAR,
  scheduled_date TIMESTAMP,
  completed_date TIMESTAMP,
  technician_id UUID,
  type VARCHAR,
  FOREIGN KEY (pool_id) REFERENCES pools(id),
  FOREIGN KEY (client_id) REFERENCES clients(id)
)

pools (
  id UUID PRIMARY KEY,
  client_id UUID,
  name VARCHAR,
  type VARCHAR,
  specifications JSONB,
  maintenance_schedule JSONB,
  FOREIGN KEY (client_id) REFERENCES clients(id)
)

clients (
  id UUID PRIMARY KEY,
  type VARCHAR, -- 'external' or 'internal'
  name VARCHAR,
  contact_info JSONB,
  settings JSONB
)

maintenance_logs (
  id UUID PRIMARY KEY,
  work_order_id UUID,
  type VARCHAR,
  readings JSONB,
  notes TEXT,
  photos TEXT[],
  FOREIGN KEY (work_order_id) REFERENCES work_orders(id)
)
```

### Optional Module Tables
```sql
-- Activated only when facility modules are enabled
members (
  id UUID PRIMARY KEY,
  facility_id UUID,
  status VARCHAR,
  membership_type VARCHAR,
  -- Only created when membership module is activated
)

facility_schedule (
  id UUID PRIMARY KEY,
  facility_id UUID,
  event_type VARCHAR,
  start_time TIMESTAMP,
  end_time TIMESTAMP,
  -- Only created when programming module is activated
)

staff_schedule (
  id UUID PRIMARY KEY,
  staff_id UUID,
  shift_start TIMESTAMP,
  shift_end TIMESTAMP,
  role VARCHAR,
  -- Only created when staff module is activated
)
```

## API Structure

### Core API Endpoints (Always Available)
```typescript
/api/v1/maintenance/
  /work-orders
  /schedule
  /routes
  /readings
  /inventory

/api/v1/clients/
  /external
  /internal
  /locations
  /contracts
```

### Module-Specific Endpoints (Conditionally Available)
```typescript
// Only available when respective modules are enabled
/api/v1/facility/
  /members/*       // Requires membership module
  /classes/*       // Requires programming module
  /staff/*         // Requires staff module
  /pos/*          // Requires operations module
```

## Implementation Strategy

### Phase 1: Core Maintenance System
1. Basic user management & authentication
2. Work order management
3. Service scheduling
4. Chemical readings & logging
5. Basic inventory
6. Mobile app for technicians

### Phase 2: Module Framework
1. Module activation system
2. License management
3. Feature flagging
4. Database schema migration system
5. API endpoint conditional activation

### Phase 3: Facility Modules
Implement each module independently:
1. Membership Module
2. Programming Module
3. Staff Management Module
4. Operations Module

## Development Guidelines

### Module Development Rules
1. **Strict Separation**: Core features must never depend on optional modules
2. **Database Isolation**: Module tables should be self-contained
3. **Feature Flagging**: All module features must be toggle-able
4. **API Versioning**: Maintain backward compatibility
5. **Data Migration**: Support seamless module activation

### Code Organization
```typescript
// Example folder structure
src/
  core/           // Core maintenance features
    work-orders/
    scheduling/
    inventory/
  modules/        // Optional facility modules
    membership/
    programming/
    staff/
    operations/
  shared/         // Shared utilities and interfaces
  config/         // Module configuration
```

## Deployment Considerations

### License Management
```typescript
interface SystemLicense {
  core: {
    maxPools: number
    maxTechnicians: number
    features: CoreFeatures
  }
  modules: {
    membership?: ModuleLicense
    programming?: ModuleLicense
    staff?: ModuleLicense
    operations?: ModuleLicense
  }
}
```

### Module Activation Process
1. License verification
2. Database schema migration
3. Feature flag activation
4. UI update
5. User permission update

## Next Steps
1. Implement core maintenance system
2. Build module activation framework
3. Create first optional module
4. Develop upgrade path 