'use client'

import { Shield, AlertTriangle, Building2, Waves, Users } from 'lucide-react'
import PageHeader from '@/components/ui/PageHeader'
import Card from '@/components/ui/Card'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

interface Alert {
  id: string
  type: 'critical' | 'warning'
  message: string
  timestamp: string
  facility?: string
  pool?: string
}

interface RegionStats {
  facilities: {
    total: number
    healthy: number
  }
  pools: {
    total: number
    healthy: number
  }
  staff: {
    total: number
    active: number
  }
  alerts: {
    critical: number
    warning: number
  }
}

export default function RegionalDashboard() {
  const router = useRouter()
  const { data: session } = useSession()

  // This would come from an API call based on user's assigned regions
  const stats: RegionStats = {
    facilities: {
      total: 12,
      healthy: 10
    },
    pools: {
      total: 36,
      healthy: 32
    },
    staff: {
      total: 48,
      active: 45
    },
    alerts: {
      critical: 1,
      warning: 3
    }
  }

  const alerts: Alert[] = [
    {
      id: '1',
      type: 'critical',
      message: 'pH levels critical in Olympic Pool',
      timestamp: '2024-02-20T10:30:00Z',
      facility: 'Milano Central',
      pool: 'Olympic Pool'
    },
    {
      id: '2',
      type: 'warning',
      message: 'Chlorine levels above threshold',
      timestamp: '2024-02-20T09:15:00Z',
      facility: 'Milano Central',
      pool: 'Training Pool'
    }
  ]

  return (
    <div className="page-container">
      <PageHeader
        icon={Shield}
        title="Regional Operations"
        subtitle={`${session?.user?.locations?.[0]?.name || 'Regional'} Dashboard`}
      />

      <div className="grid grid-cols-1 gap-4 mt-6">
        <Card 
          className="p-6 cursor-pointer hover:shadow-lg transition-shadow duration-200"
          onClick={() => router.push('/facilities')}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-indigo-500" />
                <p className="text-sm text-gray-500">Facilities</p>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                8
              </h3>
            </div>
            <div className="px-3 py-1 rounded-full text-sm font-medium text-green-500 bg-green-100 dark:bg-green-900/20">
              87% Operational
            </div>
          </div>
        </Card>

        <Card 
          className="p-6 cursor-pointer hover:shadow-lg transition-shadow duration-200"
          onClick={() => router.push('/pools')}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <Waves className="w-5 h-5 text-cyan-500" />
                <p className="text-sm text-gray-500">Pools</p>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                24
              </h3>
            </div>
            <div className="px-3 py-1 rounded-full text-sm font-medium text-green-500 bg-green-100 dark:bg-green-900/20">
              92% Healthy
            </div>
          </div>
        </Card>
      </div>

      {/* Regional Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
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
              stats.facilities.healthy === stats.facilities.total
                ? 'text-green-500 bg-green-100 dark:bg-green-900/20'
                : 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20'
            }`}>
              {Math.round((stats.facilities.healthy / stats.facilities.total) * 100)}% Operational
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <Waves className="w-5 h-5 text-indigo-500" />
                <p className="text-sm text-gray-500">Pools</p>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {stats.pools.total}
              </h3>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              stats.pools.healthy === stats.pools.total
                ? 'text-green-500 bg-green-100 dark:bg-green-900/20'
                : 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20'
            }`}>
              {Math.round((stats.pools.healthy / stats.pools.total) * 100)}% Healthy
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-emerald-500" />
                <p className="text-sm text-gray-500">Staff</p>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {stats.staff.total}
              </h3>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              stats.staff.active === stats.staff.total
                ? 'text-green-500 bg-green-100 dark:bg-green-900/20'
                : 'text-blue-500 bg-blue-100 dark:bg-blue-900/20'
            }`}>
              {stats.staff.active} Active
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <p className="text-sm text-gray-500">Alerts</p>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {stats.alerts.critical + stats.alerts.warning}
              </h3>
            </div>
            {stats.alerts.critical > 0 ? (
              <div className="px-3 py-1 rounded-full text-sm font-medium text-red-500 bg-red-100 dark:bg-red-900/20">
                {stats.alerts.critical} Critical
              </div>
            ) : (
              <div className="px-3 py-1 rounded-full text-sm font-medium text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20">
                {stats.alerts.warning} Warnings
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Active Alerts */}
      {alerts.length > 0 && (
        <Card className="mt-6 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
            Active Alerts
          </h2>
          <div className="space-y-4">
            {alerts.map(alert => (
              <div 
                key={alert.id}
                className={`p-4 ${
                  alert.type === 'critical'
                    ? 'bg-red-50 dark:bg-red-900/20'
                    : 'bg-yellow-50 dark:bg-yellow-900/20'
                } rounded-lg cursor-pointer hover:bg-opacity-75`}
                onClick={() => router.push(`/facilities/${alert.facility?.toLowerCase().replace(' ', '-')}`)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className={`text-sm font-medium ${
                      alert.type === 'critical'
                        ? 'text-red-800 dark:text-red-200'
                        : 'text-yellow-800 dark:text-yellow-200'
                    }`}>
                      {alert.message}
                    </p>
                    {(alert.facility || alert.pool) && (
                      <p className={`text-xs ${
                        alert.type === 'critical'
                          ? 'text-red-700 dark:text-red-300'
                          : 'text-yellow-700 dark:text-yellow-300'
                      } mt-1`}>
                        {[alert.facility, alert.pool].filter(Boolean).join(' - ')}
                      </p>
                    )}
                  </div>
                  <span className={`text-xs ${
                    alert.type === 'critical'
                      ? 'text-red-700 dark:text-red-300'
                      : 'text-yellow-700 dark:text-yellow-300'
                  }`}>
                    {new Date(alert.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
} 