"use client"

import React, { useState } from 'react'
import { 
  Truck,
  Package,
  Clock,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Eye,
  Route
} from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'
import TabNavigation from '../../components/ui/TabNavigation'
import SearchFilterBar from '../../components/ui/SearchFilterBar'
import StatusBadge from '../../components/ui/StatusBadge'
import KPICard from '../../components/ui/KPICard'
import DataTable from '../../components/ui/DataTable'
import Modal from '../../components/ui/Modal'

interface DeliveryRoute {
  id: string
  driver: string
  vehicle: string
  status: 'pending' | 'in-progress' | 'completed' | 'delayed'
  startTime: string
  estimatedEnd: string
  actualEnd?: string
  stops: Array<{
    id: string
    pool: string
    address: string
    timeWindow: string
    status: 'pending' | 'completed' | 'delayed'
    items: Array<{
      name: string
      quantity: number
    }>
  }>
}

const deliveryRoutes: DeliveryRoute[] = [
  {
    id: 'ROUTE-2024-001',
    driver: 'John Smith',
    vehicle: 'Van 1 (XYZ-123)',
    status: 'in-progress',
    startTime: '2024-03-19 08:00',
    estimatedEnd: '2024-03-19 16:00',
    stops: [
      {
        id: 'STOP-001',
        pool: 'Main Pool',
        address: '123 Pool St, City',
        timeWindow: '09:00 - 10:00',
        status: 'completed',
        items: [
          { name: 'Chlorine Tablets', quantity: 2 },
          { name: 'pH Increaser', quantity: 1 }
        ]
      },
      {
        id: 'STOP-002',
        pool: 'Spa Area',
        address: '456 Spa Ave, City',
        timeWindow: '10:30 - 11:30',
        status: 'pending',
        items: [
          { name: 'Filter Cartridge', quantity: 1 },
          { name: 'Test Strips', quantity: 2 }
        ]
      }
    ]
  },
  {
    id: 'ROUTE-2024-002',
    driver: 'Sarah Johnson',
    vehicle: 'Van 2 (ABC-789)',
    status: 'pending',
    startTime: '2024-03-19 09:00',
    estimatedEnd: '2024-03-19 17:00',
    stops: [
      {
        id: 'STOP-003',
        pool: 'Kids Pool',
        address: '789 Kids Way, City',
        timeWindow: '10:00 - 11:00',
        status: 'pending',
        items: [
          { name: 'Pool Shock', quantity: 3 },
          { name: 'Algaecide', quantity: 1 }
        ]
      }
    ]
  }
]

const statusTypeMap = {
  pending: 'warning',
  'in-progress': 'info',
  completed: 'success',
  delayed: 'error'
} as const

export default function DeliveryPage() {
  const [activeTab, setActiveTab] = useState('active')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRoute, setSelectedRoute] = useState<DeliveryRoute | null>(null)

  const tabs = [
    { id: 'active', label: 'Active Routes' },
    { id: 'history', label: 'Route History' }
  ]

  const columns = [
    {
      key: 'id',
      header: 'Route ID',
      cell: (route: DeliveryRoute) => (
        <div className="text-sm font-medium text-gray-900 dark:text-gray-200">
          {route.id}
        </div>
      )
    },
    {
      key: 'driver',
      header: 'Driver',
      cell: (route: DeliveryRoute) => (
        <div className="text-sm text-gray-500">
          {route.driver}
        </div>
      )
    },
    {
      key: 'vehicle',
      header: 'Vehicle',
      cell: (route: DeliveryRoute) => (
        <div className="text-sm text-gray-500">
          {route.vehicle}
        </div>
      )
    },
    {
      key: 'stops',
      header: 'Stops',
      cell: (route: DeliveryRoute) => (
        <div className="text-sm text-gray-500">
          {route.stops.length} stops
        </div>
      )
    },
    {
      key: 'time',
      header: 'Time Window',
      cell: (route: DeliveryRoute) => (
        <div className="text-sm text-gray-500">
          {route.startTime.split(' ')[1]} - {route.estimatedEnd.split(' ')[1]}
        </div>
      )
    },
    {
      key: 'status',
      header: 'Status',
      cell: (route: DeliveryRoute) => (
        <StatusBadge 
          status={route.status}
          type={statusTypeMap[route.status]}
        />
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      cell: (route: DeliveryRoute) => (
        <button 
          onClick={() => setSelectedRoute(route)}
          className="text-blue-500 hover:text-blue-600 font-medium text-sm inline-flex items-center space-x-1"
        >
          <Eye className="w-4 h-4" />
          <span>View</span>
        </button>
      )
    }
  ]

  return (
    <div className="page-container">
      <PageHeader 
        icon={Truck}
        title="Delivery Routes"
        subtitle="Manage and track chemical deliveries"
      />

      <div className="grid grid-cols-4 gap-4 mb-6">
        <KPICard
          title="Total Routes"
          value="8"
          icon={Route}
          gradient="blue"
          change={{ value: "+2", trend: "up" }}
        />
        <KPICard
          title="Active Routes"
          value="3"
          icon={Truck}
          gradient="emerald"
        />
        <KPICard
          title="Pending Stops"
          value="12"
          icon={MapPin}
          gradient="amber"
        />
        <KPICard
          title="Delayed"
          value="1"
          icon={AlertTriangle}
          gradient="rose"
        />
      </div>

      <div className="flex items-center justify-between mb-6">
        <TabNavigation 
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <SearchFilterBar
          searchPlaceholder="Search routes..."
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </div>

      <div className="card-container card-gradient-blue">
        <DataTable
          data={deliveryRoutes}
          columns={columns}
        />
      </div>

      <Modal
        isOpen={!!selectedRoute}
        onClose={() => setSelectedRoute(null)}
        title={`Route Details - ${selectedRoute?.id}`}
        size="lg"
      >
        {selectedRoute && (
          <div className="space-y-6">
            {/* Route Info */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500">Driver</div>
                  <div className="text-base font-medium text-gray-900 dark:text-gray-100">
                    {selectedRoute.driver}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Vehicle</div>
                  <div className="text-base font-medium text-gray-900 dark:text-gray-100">
                    {selectedRoute.vehicle}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Status</div>
                  <div className="mt-1">
                    <StatusBadge 
                      status={selectedRoute.status}
                      type={statusTypeMap[selectedRoute.status]}
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500">Start Time</div>
                  <div className="text-base font-medium text-gray-900 dark:text-gray-100">
                    {selectedRoute.startTime}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Estimated End</div>
                  <div className="text-base font-medium text-gray-900 dark:text-gray-100">
                    {selectedRoute.estimatedEnd}
                  </div>
                </div>
                {selectedRoute.actualEnd && (
                  <div>
                    <div className="text-sm text-gray-500">Actual End</div>
                    <div className="text-base font-medium text-gray-900 dark:text-gray-100">
                      {selectedRoute.actualEnd}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Delivery Stops */}
            <div>
              <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Delivery Stops
              </h4>
              <div className="space-y-4">
                {selectedRoute.stops.map((stop) => (
                  <div 
                    key={stop.id}
                    className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">
                          {stop.pool}
                        </div>
                        <div className="text-sm text-gray-500">
                          {stop.address}
                        </div>
                      </div>
                      <StatusBadge 
                        status={stop.status}
                        type={statusTypeMap[stop.status]}
                      />
                    </div>
                    <div className="text-sm text-gray-500 mb-3">
                      Time Window: {stop.timeWindow}
                    </div>
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Items:
                    </div>
                    <ul className="mt-1 space-y-1">
                      {stop.items.map((item, index) => (
                        <li key={index} className="text-sm text-gray-500">
                          {item.quantity}x {item.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-800">
              <button className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50
                               rounded-lg text-sm font-medium transition-colors">
                Edit Route
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium 
                               hover:bg-blue-600 transition-colors">
                Track Route
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
} 