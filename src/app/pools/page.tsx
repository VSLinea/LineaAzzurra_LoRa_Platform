"use client"

import React, { useState } from 'react'
import {
  DropletIcon,
  ThermometerIcon,
  DropletsIcon,
  ClockIcon,
  AlertCircleIcon,
  PlusIcon,
  SearchIcon,
  FilterIcon,
  ChevronDownIcon,
  SettingsIcon,
  HistoryIcon
} from 'lucide-react'
import PoolDetailsModal from '../../components/pools/PoolDetailsModal'

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
  dimensions: {
    length: number
    width: number
    depth: number
    volume: number
  }
  equipment: {
    pump: string
    filter: string
    heater: string
    chlorinator: string
    lastServiced: string
  }
  chemicalLevels: {
    freeChlorine: number
    combinedChlorine: number
    cyanuricAcid: number
    calcium: number
    tds: number
    alkalinity: number
  }
  maintenanceHistory: Array<{
    date: string
    type: string
    description: string
    performedBy: string
    cost?: number
  }>
  operatingHours: {
    start: string
    end: string
    filterCycles: string[]
  }
  safetyEquipment: {
    lifebuoys: number
    firstAidKits: boolean
    emergencyPhone: boolean
    safetySignage: boolean
  }
  sensorData: {
    last24Hours: Array<{
      timestamp: string
      temperature: number
      ph: number
      chlorine: number
    }>
  }
  usage: {
    currentOccupancy: number
    maxCapacity: number
    peakHours: string[]
    averageDailyUsers: number
    weeklyUsageStats: Array<{
      day: string
      users: number
    }>
  }
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
    alerts: ['pH slightly high'],
    dimensions: {
      length: 20,
      width: 10,
      depth: 5,
      volume: 1000
    },
    equipment: {
      pump: 'Main Pump',
      filter: 'Cartridge Filter',
      heater: 'Heat Pump',
      chlorinator: 'Salt Chlorinator',
      lastServiced: 'Last month'
    },
    chemicalLevels: {
      freeChlorine: 2.0,
      combinedChlorine: 1.5,
      cyanuricAcid: 30,
      calcium: 100,
      tds: 2000,
      alkalinity: 100
    },
    maintenanceHistory: [
      {
        date: '2023-04-01',
        type: 'Routine Maintenance',
        description: 'Cleaned filter and checked chemical levels',
        performedBy: 'John Doe'
      },
      {
        date: '2023-03-01',
        type: 'Chemical Refill',
        description: 'Refilled salt levels',
        performedBy: 'Jane Smith'
      }
    ],
    operatingHours: {
      start: '06:00',
      end: '22:00',
      filterCycles: ['12:00', '18:00']
    },
    safetyEquipment: {
      lifebuoys: 4,
      firstAidKits: true,
      emergencyPhone: true,
      safetySignage: true
    },
    sensorData: {
      last24Hours: [
        {
          timestamp: '2024-02-20T12:00:00',
          temperature: 78,
          ph: 7.2,
          chlorine: 2.0
        },
        // Add more data points as needed
      ]
    },
    usage: {
      currentOccupancy: 45,
      maxCapacity: 100,
      peakHours: ['10:00 AM', '2:00 PM', '6:00 PM'],
      averageDailyUsers: 250,
      weeklyUsageStats: [
        { day: 'Mon', users: 220 },
        { day: 'Tue', users: 240 },
        { day: 'Wed', users: 280 },
        { day: 'Thu', users: 250 },
        { day: 'Fri', users: 300 },
        { day: 'Sat', users: 380 },
        { day: 'Sun', users: 350 }
      ]
    }
  },
  {
    id: 2,
    name: 'Kids Pool',
    status: 'maintenance',
    temperature: 82,
    ph: 7.4,
    chlorine: 1.8,
    alkalinity: 90,
    lastChecked: '1 hour ago',
    nextMaintenance: 'Today',
    alerts: ['Chlorine level low'],
    dimensions: {
      length: 15,
      width: 8,
      depth: 4,
      volume: 600
    },
    equipment: {
      pump: 'Kids Pump',
      filter: 'Cartridge Filter',
      heater: 'Heat Pump',
      chlorinator: 'Salt Chlorinator',
      lastServiced: 'Last month'
    },
    chemicalLevels: {
      freeChlorine: 1.8,
      combinedChlorine: 1.2,
      cyanuricAcid: 25,
      calcium: 80,
      tds: 1500,
      alkalinity: 90
    },
    maintenanceHistory: [
      {
        date: '2023-04-01',
        type: 'Routine Maintenance',
        description: 'Cleaned filter and checked chemical levels',
        performedBy: 'John Doe'
      },
      {
        date: '2023-03-01',
        type: 'Chemical Refill',
        description: 'Refilled salt levels',
        performedBy: 'Jane Smith'
      }
    ],
    operatingHours: {
      start: '06:00',
      end: '22:00',
      filterCycles: ['12:00', '18:00']
    },
    safetyEquipment: {
      lifebuoys: 2,
      firstAidKits: true,
      emergencyPhone: true,
      safetySignage: true
    },
    sensorData: {
      last24Hours: [
        {
          timestamp: '2024-02-20T12:00:00',
          temperature: 82,
          ph: 7.4,
          chlorine: 1.8
        },
        // Add more data points as needed
      ]
    },
    usage: {
      currentOccupancy: 45,
      maxCapacity: 100,
      peakHours: ['10:00 AM', '2:00 PM', '6:00 PM'],
      averageDailyUsers: 250,
      weeklyUsageStats: [
        { day: 'Mon', users: 220 },
        { day: 'Tue', users: 240 },
        { day: 'Wed', users: 280 },
        { day: 'Thu', users: 250 },
        { day: 'Fri', users: 300 },
        { day: 'Sat', users: 380 },
        { day: 'Sun', users: 350 }
      ]
    }
  },
  {
    id: 3,
    name: 'Lap Pool',
    status: 'active',
    temperature: 76,
    ph: 7.3,
    chlorine: 2.2,
    alkalinity: 110,
    lastChecked: '30 minutes ago',
    nextMaintenance: 'Next Week',
    alerts: [],
    dimensions: {
      length: 25,
      width: 12,
      depth: 5,
      volume: 1500
    },
    equipment: {
      pump: 'Lap Pump',
      filter: 'Cartridge Filter',
      heater: 'Heat Pump',
      chlorinator: 'Salt Chlorinator',
      lastServiced: 'Last month'
    },
    chemicalLevels: {
      freeChlorine: 2.2,
      combinedChlorine: 1.7,
      cyanuricAcid: 35,
      calcium: 100,
      tds: 2000,
      alkalinity: 110
    },
    maintenanceHistory: [
      {
        date: '2023-04-01',
        type: 'Routine Maintenance',
        description: 'Cleaned filter and checked chemical levels',
        performedBy: 'John Doe'
      },
      {
        date: '2023-03-01',
        type: 'Chemical Refill',
        description: 'Refilled salt levels',
        performedBy: 'Jane Smith'
      }
    ],
    operatingHours: {
      start: '06:00',
      end: '22:00',
      filterCycles: ['12:00', '18:00']
    },
    safetyEquipment: {
      lifebuoys: 6,
      firstAidKits: true,
      emergencyPhone: true,
      safetySignage: true
    },
    sensorData: {
      last24Hours: [
        {
          timestamp: '2024-02-20T12:00:00',
          temperature: 76,
          ph: 7.3,
          chlorine: 2.2
        },
        // Add more data points as needed
      ]
    },
    usage: {
      currentOccupancy: 45,
      maxCapacity: 100,
      peakHours: ['10:00 AM', '2:00 PM', '6:00 PM'],
      averageDailyUsers: 250,
      weeklyUsageStats: [
        { day: 'Mon', users: 220 },
        { day: 'Tue', users: 240 },
        { day: 'Wed', users: 280 },
        { day: 'Thu', users: 250 },
        { day: 'Fri', users: 300 },
        { day: 'Sat', users: 380 },
        { day: 'Sun', users: 350 }
      ]
    }
  },
  {
    id: 4,
    name: 'Spa Pool',
    status: 'issue',
    temperature: 98,
    ph: 7.8,
    chlorine: 1.5,
    alkalinity: 80,
    lastChecked: '4 hours ago',
    nextMaintenance: 'Today',
    alerts: ['Temperature too high', 'pH out of range'],
    dimensions: {
      length: 18,
      width: 9,
      depth: 4,
      volume: 720
    },
    equipment: {
      pump: 'Spa Pump',
      filter: 'Cartridge Filter',
      heater: 'Heat Pump',
      chlorinator: 'Salt Chlorinator',
      lastServiced: 'Last month'
    },
    chemicalLevels: {
      freeChlorine: 1.5,
      combinedChlorine: 1.0,
      cyanuricAcid: 20,
      calcium: 70,
      tds: 1000,
      alkalinity: 80
    },
    maintenanceHistory: [
      {
        date: '2023-04-01',
        type: 'Routine Maintenance',
        description: 'Cleaned filter and checked chemical levels',
        performedBy: 'John Doe'
      },
      {
        date: '2023-03-01',
        type: 'Chemical Refill',
        description: 'Refilled salt levels',
        performedBy: 'Jane Smith'
      }
    ],
    operatingHours: {
      start: '06:00',
      end: '22:00',
      filterCycles: ['12:00', '18:00']
    },
    safetyEquipment: {
      lifebuoys: 3,
      firstAidKits: true,
      emergencyPhone: true,
      safetySignage: true
    },
    sensorData: {
      last24Hours: [
        {
          timestamp: '2024-02-20T12:00:00',
          temperature: 98,
          ph: 7.8,
          chlorine: 1.5
        },
        // Add more data points as needed
      ]
    },
    usage: {
      currentOccupancy: 45,
      maxCapacity: 100,
      peakHours: ['10:00 AM', '2:00 PM', '6:00 PM'],
      averageDailyUsers: 250,
      weeklyUsageStats: [
        { day: 'Mon', users: 220 },
        { day: 'Tue', users: 240 },
        { day: 'Wed', users: 280 },
        { day: 'Thu', users: 250 },
        { day: 'Fri', users: 300 },
        { day: 'Sat', users: 380 },
        { day: 'Sun', users: 350 }
      ]
    }
  }
]

export default function PoolsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPool, setSelectedPool] = useState<PoolData | null>(null)

  return (
    <div className="page-container">
      <div className="page-header">
        <DropletIcon className="w-7 h-7 text-blue-500" />
        <span>Pool Management</span>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
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
            <FilterIcon className="w-4 h-4" />
            <span>Filter</span>
            <ChevronDownIcon className="w-4 h-4" />
          </button>

          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium 
                         hover:bg-blue-600 transition-colors flex items-center space-x-2">
            <PlusIcon className="w-4 h-4" />
            <span>Add Pool</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {poolsData.map((pool) => (
          <div 
            key={pool.id} 
            className="card-container p-6 cursor-pointer hover:scale-[1.02] transition-transform"
            onClick={() => setSelectedPool(pool)}
          >
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
                  <ThermometerIcon className="w-4 h-4" />
                  <span>{pool.temperature}°F</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <DropletsIcon className="w-4 h-4" />
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
                    <span className="font-medium">{pool.chemicalLevels.freeChlorine} ppm</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Alkalinity</span>
                    <span className="font-medium">{pool.chemicalLevels.alkalinity} ppm</span>
                  </div>
                </div>
              </div>

              {pool.alerts && pool.alerts.length > 0 && (
                <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20 
                             rounded-lg p-3 flex items-start space-x-2">
                  <AlertCircleIcon className="w-4 h-4 text-amber-500 mt-0.5" />
                  <div className="text-sm text-amber-800 dark:text-amber-400">
                    {pool.alerts.map((alert, index) => (
                      <div key={index}>{alert}</div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <ClockIcon className="w-4 h-4" />
                  <span>Last checked {pool.lastChecked}</span>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                    <HistoryIcon className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                    <SettingsIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedPool && (
        <PoolDetailsModal
          pool={selectedPool}
          isOpen={!!selectedPool}
          onClose={() => setSelectedPool(null)}
        />
      )}
    </div>
  )
} 