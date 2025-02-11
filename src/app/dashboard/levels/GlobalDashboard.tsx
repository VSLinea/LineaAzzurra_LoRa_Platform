'use client'

import { useEffect, useState } from 'react'
import { Globe, Building2, Waves } from 'lucide-react'
import PageHeader from '@/components/ui/PageHeader'
import Card from '@/components/ui/Card'

interface DashboardStats {
  regions: {
    total: number
    healthy: number
    healthyPercentage: number
  }
  facilities: {
    total: number
    operational: number
    operationalPercentage: number
  }
  pools: {
    total: number
    healthy: number
    healthyPercentage: number
  }
}

const defaultStats: DashboardStats = {
  regions: {
    total: 0,
    healthy: 0,
    healthyPercentage: 0
  },
  facilities: {
    total: 0,
    operational: 0,
    operationalPercentage: 0
  },
  pools: {
    total: 0,
    healthy: 0,
    healthyPercentage: 0
  }
}

interface RegionalStat {
  id: string
  name: string
  facilitiesCount: number
  poolsCount: number
  status: string
}

export default function GlobalDashboard() {
  const [stats, setStats] = useState<DashboardStats>(defaultStats)
  const [regionalStats, setRegionalStats] = useState<RegionalStat[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true)
        const response = await fetch('/api/dashboard')
        const data = await response.json()
        if (data.success) {
          setStats(data.data.stats || defaultStats)
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="page-container">
      <PageHeader
        icon={Globe}
        title="Global Command Center"
        subtitle="System-wide Operations Overview"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-indigo-500" />
                <p className="text-sm text-gray-500">Regions</p>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {stats.regions.total}
              </h3>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              stats.regions.healthyPercentage >= 90
                ? 'text-green-500 bg-green-100 dark:bg-green-900/20'
                : 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20'
            }`}>
              {stats.regions.healthyPercentage}% Healthy
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-blue-500" />
                <p className="text-sm text-gray-500">Facilities</p>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {stats.facilities.total}
              </h3>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              stats.facilities.operationalPercentage >= 90
                ? 'text-green-500 bg-green-100 dark:bg-green-900/20'
                : 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20'
            }`}>
              {stats.facilities.operationalPercentage}% Operational
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <Waves className="w-5 h-5 text-cyan-500" />
                <p className="text-sm text-gray-500">Total Pools</p>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {stats.pools.total}
              </h3>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              stats.pools.healthyPercentage >= 90
                ? 'text-green-500 bg-green-100 dark:bg-green-900/20'
                : 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20'
            }`}>
              {stats.pools.healthyPercentage}% Healthy
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Regional Overview
        </h2>
        <div className="space-y-4">
          {regionalStats.map(region => (
            <div key={region.id} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-medium text-gray-900 dark:text-white">
                    {region.name}
                  </h3>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                    <span>{region.facilitiesCount} Facilities</span>
                    <span>•</span>
                    <span>{region.poolsCount} Pools</span>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  region.status === 'healthy'
                    ? 'text-green-500 bg-green-100 dark:bg-green-900/20'
                    : 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20'
                }`}>
                  {region.status === 'healthy' ? 'Healthy' : 'Warning'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 