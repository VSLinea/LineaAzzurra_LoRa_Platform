'use client'

import { Shield, AlertTriangle, Waves, Users, Thermometer, Droplet, Activity } from 'lucide-react'
import PageHeader from '@/components/ui/PageHeader'
import Card from '@/components/ui/Card'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

interface Alert {
  id: string
  type: 'critical' | 'warning'
  message: string
  timestamp: string
  pool?: string
}

interface PoolStats {
  total: number
  healthy: number
  maintenance: number
  offline: number
}

interface StaffStats {
  total: number
  active: number
  onLeave: number
}

interface WaterQuality {
  ph: number
  chlorine: number
  temperature: number
}

interface FacilityStats {
  pools: PoolStats
  staff: StaffStats
  waterQuality: WaterQuality
  alerts: {
    critical: number
    warning: number
  }
}

export default function FacilityDashboard() {
  const router = useRouter()
  const { data: session } = useSession()

  // This would come from an API call based on user's assigned facility
  const stats: FacilityStats = {
    pools: {
      total: 8,
      healthy: 6,
      maintenance: 1,
      offline: 1
    },
    staff: {
      total: 24,
      active: 20,
      onLeave: 4
    },
    waterQuality: {
      ph: 7.2,
      chlorine: 1.5,
      temperature: 28
    },
    alerts: {
      critical: 1,
      warning: 2
    }
  }

  const alerts: Alert[] = [
    {
      id: '1',
      type: 'critical',
      message: 'pH levels critical in Olympic Pool',
      timestamp: '2024-02-20T10:30:00Z',
      pool: 'Olympic Pool'
    },
    {
      id: '2',
      type: 'warning',
      message: 'Chlorine levels above threshold',
      timestamp: '2024-02-20T09:15:00Z',
      pool: 'Training Pool'
    }
  ]

  return (
    <div className="page-container">
      <PageHeader
        icon={Shield}
        title="Facility Operations"
        subtitle={`${session?.user?.locations?.[0]?.name || 'Facility'} Dashboard`}
      />

      {/* Facility Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <Waves className="w-5 h-5 text-blue-500" />
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
              {Math.round((stats.pools.healthy / stats.pools.total) * 100)}% Operational
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-gray-500">
            <div>
              <span className="text-green-500">{stats.pools.healthy}</span> Active
            </div>
            <div>
              <span className="text-yellow-500">{stats.pools.maintenance}</span> Maintenance
            </div>
            <div>
              <span className="text-red-500">{stats.pools.offline}</span> Offline
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-indigo-500" />
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
              {stats.staff.active} On Duty
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-gray-500">
            <div>
              <span className="text-green-500">{stats.staff.active}</span> Active
            </div>
            <div>
              <span className="text-yellow-500">{stats.staff.onLeave}</span> On Leave
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Activity className="w-5 h-5 text-emerald-500" />
            <p className="text-sm text-gray-500">Water Quality</p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Thermometer className="w-4 h-4 text-blue-500" />
                <span className="text-xs text-gray-500">Temperature</span>
              </div>
              <span className="text-sm font-medium">{stats.waterQuality.temperature}°C</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Droplet className="w-4 h-4 text-indigo-500" />
                <span className="text-xs text-gray-500">pH Level</span>
              </div>
              <span className="text-sm font-medium">{stats.waterQuality.ph}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-emerald-500" />
                <span className="text-xs text-gray-500">Chlorine</span>
              </div>
              <span className="text-sm font-medium">{stats.waterQuality.chlorine} ppm</span>
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
                onClick={() => router.push(`/pools/${alert.pool?.toLowerCase().replace(' ', '-')}`)}
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
                    {alert.pool && (
                      <p className={`text-xs ${
                        alert.type === 'critical'
                          ? 'text-red-700 dark:text-red-300'
                          : 'text-yellow-700 dark:text-yellow-300'
                      } mt-1`}>
                        {alert.pool}
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