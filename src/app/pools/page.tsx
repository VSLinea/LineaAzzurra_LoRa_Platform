"use client"

import React, { useState, useEffect } from 'react'
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
  HistoryIcon,
  Waves
} from 'lucide-react'
import PoolDetailsModal from '../../components/pools/PoolDetailsModal'
import PageHeader from '@/components/ui/PageHeader'
import Card from '@/components/ui/Card'
import Breadcrumb from '@/components/ui/Breadcrumb'

interface Pool {
  id: string
  name: string
  facility: string
  region: string
  temperature: number
  ph: number
  chlorine: number
  alkalinity: number
  status: 'active' | 'maintenance' | 'issue'
  lastChecked: string
  alerts?: string[]
}

export default function PoolsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPool, setSelectedPool] = useState<Pool | null>(null)
  const [pools, setPools] = useState<Pool[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPools = async () => {
      try {
        const response = await fetch('/api/pools')
        const result = await response.json()
        
        if (!result.success) {
          throw new Error(result.error || 'Failed to fetch pools')
        }

        setPools(result.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchPools()
  }, [])

  const filteredPools = pools.filter(pool =>
    pool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pool.facility.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pool.region.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const breadcrumbItems = [
    { label: 'Global', href: '/dashboard' },
    { label: 'All Pools', href: '/pools' }
  ]

  if (loading) {
    return (
      <div className="page-container">
        <Breadcrumb items={breadcrumbItems} />
        <PageHeader
          icon={Waves}
          title="Pool Management"
          subtitle="All Pools Overview"
        />
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Loading pools...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="page-container">
        <Breadcrumb items={breadcrumbItems} />
        <PageHeader
          icon={Waves}
          title="Pool Management"
          subtitle="All Pools Overview"
        />
        <div className="flex justify-center items-center h-64">
          <div className="text-red-500">Error: {error}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <Breadcrumb items={breadcrumbItems} />
      
      <PageHeader
        icon={Waves}
        title="Pool Management"
        subtitle="All Pools Overview"
      />

      <div className="mt-6">
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search pools..."
              className="pl-4 pr-10 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            + Add Pool
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPools.map(pool => (
            <Card key={pool.id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {pool.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {pool.facility}, {pool.region}
                  </p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  pool.status === 'active'
                    ? 'text-green-500 bg-green-100 dark:bg-green-900/20'
                    : pool.status === 'maintenance'
                    ? 'text-orange-500 bg-orange-100 dark:bg-orange-900/20'
                    : 'text-red-500 bg-red-100 dark:bg-red-900/20'
                }`}>
                  {pool.status.charAt(0).toUpperCase() + pool.status.slice(1)}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <ThermometerIcon className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {pool.temperature}°C
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <DropletIcon className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    pH {pool.ph}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <DropletsIcon className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {pool.chlorine} ppm
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <ClockIcon className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {new Date(pool.lastChecked).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>

              {pool.alerts && pool.alerts.length > 0 && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <div className="flex items-center space-x-2 text-red-600 dark:text-red-400">
                    <AlertCircleIcon className="w-4 h-4" />
                    <span className="text-sm font-medium">Alerts ({pool.alerts.length})</span>
                  </div>
                  <ul className="mt-2 space-y-1">
                    {pool.alerts.map((alert, index) => (
                      <li key={index} className="text-sm text-red-600 dark:text-red-400">
                        • {alert}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => setSelectedPool(pool)}
                  className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  View Details
                </button>
              </div>
            </Card>
          ))}
        </div>
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