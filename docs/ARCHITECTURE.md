# Pool Monitor System Documentation

## Project Overview
**Estimated Development Time: 120-160 hours total**

### Tech Stack
- Next.js 14.1.0
- React 18.2.0
- TypeScript 5.3.3
- Tailwind CSS 3.4.1
- @react-pdf/renderer 4.1.6
- Recharts 2.15.1
- Lucide Icons

## Design System (Est. 16-20 hours)

### Theme Configuration
```typescript:src/app/globals.css
:root {
  --bg-primary: #ffffff;
  --bg-card: #ffffff;
  --text-primary: #111827;
  --text-secondary: #374151;
  --border-color: #e5e7eb;
}

.dark {
  --bg-primary: #151521;
  --bg-card: #1E1E2D;
  --text-primary: #f3f4f6;
  --text-secondary: #9ca3af;
  --border-color: #1f2937;
  color-scheme: dark;
}
```

### Core Components (Est. 4-6 hours per component)

1. **Card Containers**
```css
.card-container {
  @apply relative backdrop-blur-xl backdrop-saturate-150
         bg-white/95 dark:bg-[#1E1E2D]/90
         border border-gray-200 dark:border-gray-800/50
         shadow-sm hover:shadow-md dark:shadow-none
         rounded-xl transition-all duration-200;
}

.card-gradient-blue {
  @apply bg-gradient-to-br from-blue-50/50 to-transparent
         dark:from-blue-500/5 dark:to-transparent;
}
```

2. **Status Badges** (Est. 2-3 hours)
```css
.status-badge {
  @apply px-2.5 py-1 rounded-full text-xs font-medium;
}

.status-pending {
  @apply bg-amber-50 dark:bg-amber-500/20 
         text-amber-600 dark:text-amber-400
         border border-amber-100 dark:border-amber-500/30;
}
```

### Layout Components (Est. 20-24 hours)

1. **Sidebar Navigation**
```typescript:src/components/layout/Sidebar.tsx
export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-56 
                      bg-gradient-to-b from-gray-50 to-white 
                      dark:from-[#1E1E2D] dark:to-[#1E1E2D]
                      border-r border-gray-200 dark:border-gray-800/50">
      {/* Navigation implementation */}
    </aside>
  )
}
```

## Feature Components (Est. 40-48 hours)

### Dashboard Widgets (8-10 hours each)

1. **Water Quality Chart**
```typescript:src/components/features/WaterQualityChart.tsx
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts'

export default function WaterQualityChart() {
  return (
    <div className="card-container p-6">
      <h3 className="text-lg font-semibold mb-4">Water Quality Trends</h3>
      <LineChart width={600} height={300} data={data}>
        <Line type="monotone" dataKey="ph" stroke="#3b82f6" />
        <Line type="monotone" dataKey="chlorine" stroke="#10b981" />
        {/* Chart configuration */}
      </LineChart>
    </div>
  )
}
```

### PDF Report Generation (Est. 12-16 hours)
```typescript:src/components/PDFDownloadButton.tsx
interface PDFDownloadButtonProps {
  document: React.ReactElement
  fileName: string
}

const PDFDownloadLink = dynamic<any>(
  () => import('@react-pdf/renderer').then(mod => mod.PDFDownloadLink),
  { ssr: false }
)

// Implementation details...
```

## Pages Implementation (Est. 40-48 hours)

### Maintenance Page (Est. 16-20 hours)
Key features:
- Task management
- Status tracking
- PDF report generation
- History view
- Filtering and search

### Maintenance History (Est. 4-6 hours)
```typescript
interface MaintenanceHistoryItem {
  id: number
  task: string
  pool: string
  completedOn: string
  completedBy: string
  notes: string
  reportUrl: string
}

const maintenanceHistory: MaintenanceHistoryItem[] = [
  // Mock data implementation
]
```

Features implemented:
- Sortable history table
- PDF report links
- Detailed maintenance notes
- Staff attribution
- Completion dates
- Pool identification

Time breakdown:
- Data structure: 30 mins
- Table implementation: 2 hours
- Styling: 1 hour
- PDF linking: 30 mins
- Testing & refinement: 1 hour

```typescript:src/app/maintenance/page.tsx
export default function MaintenancePage() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'history' | 'reports'>('upcoming')
  
  return (
    <div className="page-container">
      {/* Implementation details */}
    </div>
  )
}
```

### Pools Page (Est. 12-14 hours)
Key features:
- Pool status cards
- Water chemistry monitoring
- Quick actions
- Alert system
- Search and filtering

Time breakdown:
- UI Components: 6-7 hours
- Data structure: 1 hour
- Search/Filter: 2 hours
- Status system: 1 hour
- Alert system: 1 hour
- Testing & refinement: 1-2 hours

```typescript:src/app/pools/page.tsx
"use client"

import React, { useState } from 'react'
import { 
  Pool as PoolIcon, 
  Thermometer, 
  Droplets, 
  Clock, 
  AlertCircle,
  Plus,
  Search,
  Filter,
  ChevronDown,
  Settings,
  History
} from 'lucide-react'

interface PoolData {
  id: number
  name: string
  status: 'active' | 'maintenance' | 'issue'
  temperature: number
  ph: number
  chlorine: number
  alkalinity: number
  lastChecked: string
  nextMaintenance: string
  alerts?: string[]
}

const poolsData: PoolData[] = [
  {
    id: 1,
    name: 'Main Pool',
    status: 'active',
    temperature: 78,
    ph: 7.2,
    chlorine: 2.0,
    alkalinity: 100,
    lastChecked: '2 hours ago',
    nextMaintenance: 'Tomorrow',
    alerts: ['pH slightly high']
  },
  // Add more mock data...
]

export default function PoolsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="page-container">
      <div className="page-header">
        <PoolIcon className="w-7 h-7 text-blue-500" />
        <span>Pool Management</span>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search pools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800
                     rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-64"
          />
        </div>

        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800/50 
                         border border-gray-200 dark:border-gray-800 rounded-lg text-sm">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
            <ChevronDown className="w-4 h-4" />
          </button>

          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium 
                         hover:bg-blue-600 transition-colors flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Pool</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {poolsData.map((pool) => (
          <div key={pool.id} className="card-container p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {pool.name}
              </h3>
              <span className={`status-badge ${
                pool.status === 'active' ? 'status-completed' :
                pool.status === 'maintenance' ? 'status-pending' :
                'status-in-progress'
              }`}>
                {pool.status}
              </span>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <Thermometer className="w-4 h-4" />
                  <span>{pool.temperature}°F</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <Droplets className="w-4 h-4" />
                  <span>pH {pool.ph}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Water Chemistry
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Chlorine</span>
                    <span className="font-medium">{pool.chlorine} ppm</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Alkalinity</span>
                    <span className="font-medium">{pool.alkalinity} ppm</span>
                  </div>
                </div>
              </div>

              {pool.alerts && pool.alerts.length > 0 && (
                <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20 
                             rounded-lg p-3 flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5" />
                  <div className="text-sm text-amber-800 dark:text-amber-400">
                    {pool.alerts.map((alert, index) => (
                      <div key={index}>{alert}</div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>Last checked {pool.lastChecked}</span>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                    <History className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

## Development Process

### 1. Setup Phase (Est. 4-6 hours)
- Project initialization
- Dependencies installation
- Basic configuration
- Git repository setup

### 2. Core Components (Est. 16-20 hours)
- Design system implementation
- Theme setup
- Layout components
- Reusable UI components

### 3. Feature Development (Est. 60-80 hours)
- Dashboard widgets
- Maintenance system
- PDF generation
- Data visualization
- Error handling

### 4. Testing & Optimization (Est. 16-20 hours)
- Component testing
- Performance optimization
- Error boundary implementation
- Loading states
- Dark mode testing

### 5. Documentation (Est. 8-10 hours)
- Code documentation
- API documentation
- Setup instructions
- Deployment guide

## Best Practices Implemented

### Error Handling
```typescript:src/components/ErrorBoundary.tsx
export default class ErrorBoundary extends React.Component<Props, State> {
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }
  // Implementation...
}
```

### Loading States
```typescript
const LoadingState = () => (
  <div className="animate-pulse">
    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
    {/* Loading skeleton implementation */}
  </div>
)
```

## Future Roadmap (Est. 80-100 additional hours)

1. Authentication (Est. 20-24 hours)
   - User roles
   - Permissions system
   - Login/logout flow

2. Real-time Updates (Est. 16-20 hours)
   - WebSocket integration
   - Live data updates
   - Notification system

3. Mobile Optimization (Est. 24-30 hours)
   - Responsive design
   - Touch interactions
   - Mobile-specific features

4. API Integration (Est. 20-24 hours)
   - Backend connectivity
   - Data synchronization
   - Error handling

## Maintenance Considerations
- Regular dependency updates
- Performance monitoring
- Bug tracking and resolution
- Feature request management

Total Estimated Development Time: 120-160 hours
Maintenance Time: 8-10 hours/month 